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
}

export async function getConnectedUsers(): Promise<ConnectedUser[]> {
  const users = connectedUsers.getAllUsers()
  return users
    .filter(user => user.id !== currentUser.id) // Exclude current user
    .map(user => ({
      ...user,
      distance: user.location 
        ? Math.round(calculateDistance(
            currentUser.location.latitude,
            currentUser.location.longitude,
            user.location.latitude,
            user.location.longitude
          ) * 0.621371) // Convert km to miles and round to nearest mile
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
