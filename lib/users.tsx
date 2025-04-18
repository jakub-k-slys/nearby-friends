'use server'

import { neon } from '@neondatabase/serverless'

let users: Map<string, User> = new Map()

export interface User {
    id: string
    timestamp: string
    location?: GeolocationCoordinates | undefined
}

export const updateUser = async (user: User) => {
    users.set(user.id, user)
    filterUsers()
}

export const getUsers = async (): Promise<User[]> => {
    return users.values().toArray()
}

const filterUsers = () => {
    let now = new Date(Date.now())

    let filteredUsers: Map<string, User> = new Map()
    for (let [_, value] of users) {
        let lastSeen = new Date(value.timestamp)
        if (now.getTime() - lastSeen.getTime() < 30000) {
            filteredUsers.set(value.id, value)
        }
    }
    users = filteredUsers
}

const getVersion = async () => {
    const sql = neon(process.env.DATABASE_URL!);
    const response = await sql`SELECT version()`;
    return response[0].version;
}

export const Version = async ()=> {
    const data = await getVersion();
    return (<>{data}</>);
}