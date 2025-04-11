"use server"

import { connectedUsers, ConnectedUser } from "@/lib/users"
import { calculateDistance } from "@/lib/geolocation"

// Current user's information
let currentUser = {
  id: '',
  location: {
    latitude: 0,
    longitude: 0
  }
}

export async function setCurrentUser(userId: string, latitude: number, longitude: number) {
  currentUser = {
    id: userId,
    location: { latitude, longitude }
  }
  
  // Add or update current user in the connected users list
  connectedUsers.addUser({
    id: userId,
    name: "You",
    avatar: "",
    distance: 0,
    lastSeen: new Date().toISOString(),
    status: "online" as const,
    location: { latitude, longitude }
  })
}

export async function getConnectedUsers(): Promise<ConnectedUser[]> {
  const users = connectedUsers.getAllUsers()
  const tenSecondsAgo = new Date(Date.now() - 10000).toISOString(); // 10 seconds ago
  
  return users
    .filter(user => {
      // Exclude current user and users who haven't been seen in last 10 seconds
      return user.id !== currentUser.id && user.lastSeen > tenSecondsAgo;
    })
    .map(user => ({
      ...user,
      distance: user.location 
        ? Math.round(calculateDistance(
            currentUser.location.latitude,
            currentUser.location.longitude,
            user.location.latitude,
            user.location.longitude
          )) // Distance in kilometers, rounded to nearest km
        : 0
    }))
}

export async function addConnectedUser(user: ConnectedUser): Promise<void> {
  connectedUsers.addUser(user)
}

export async function updateUserStatus(
  userId: string,
  status: "online" | "away" | "offline"
): Promise<void> {
  connectedUsers.updateUserStatus(userId, status)
}

export async function updateUserLocation(
  userId: string,
  latitude: number,
  longitude: number
): Promise<void> {
  connectedUsers.updateUserLocation(userId, latitude, longitude)
}

export async function removeConnectedUser(userId: string): Promise<void> {
  connectedUsers.removeUser(userId)
}
