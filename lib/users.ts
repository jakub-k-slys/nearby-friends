export interface ConnectedUser {
    id: string
    name: string
    avatar: string
    distance: number
    lastSeen: string
    status: 'online' | 'away' | 'offline'
    location?: {
        latitude: number
        longitude: number
    }
}

class ConnectedUsers {
    private static instance: ConnectedUsers
    private users: Map<string, ConnectedUser>

    private constructor() {
        this.users = new Map()
    }

    public static getInstance(): ConnectedUsers {
        if (!ConnectedUsers.instance) {
            ConnectedUsers.instance = new ConnectedUsers()
        }
        return ConnectedUsers.instance
    }

    public addUser(user: ConnectedUser): void {
        this.users.set(user.id, {
            ...user,
            lastSeen: new Date().toISOString(),
            status: 'online',
        })
    }

    public removeUser(userId: string): void {
        this.users.delete(userId)
    }

    public updateUserStatus(userId: string, status: 'online' | 'away' | 'offline'): void {
        const user = this.users.get(userId)
        if (user) {
            this.users.set(userId, {
                ...user,
                status,
                lastSeen: new Date().toISOString(),
            })
        }
    }

    public updateUserLocation(userId: string, latitude: number, longitude: number): void {
        const user = this.users.get(userId)
        if (user) {
            this.users.set(userId, {
                ...user,
                location: { latitude, longitude },
            })
        }
    }

    public getAllUsers(): ConnectedUser[] {
        return Array.from(this.users.values())
    }

    public getUser(userId: string): ConnectedUser | undefined {
        return this.users.get(userId)
    }
}

export const connectedUsers = ConnectedUsers.getInstance()
