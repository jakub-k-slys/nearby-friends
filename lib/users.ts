'use server'

let users: Map<string, User> = new Map()

export interface User {
    id: string
    timestamp: string
    location?: {
        latitude: number
        longitude: number
    }
}

export const updateUser = async (user: User) => {
    filterUsers()
    users.set(user.id, user)
}

export const getUsers = async (): Promise<User[]> => {
    return users.values().toArray()
}

const filterUsers = () => {
    let now = new Date(Date.now())

    let filteredUsers: Map<string, User> = new Map()
    for (let [_, value] of users) {
        let lastSeen = new Date(value.timestamp)
        if (now.getTime() - lastSeen.getTime() < 10000) {
            filteredUsers.set(value.id, value)
        }
    }
    users = filteredUsers
}
