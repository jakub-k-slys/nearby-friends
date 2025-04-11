"use server"

import { connectedUsers, ConnectedUser } from "@/lib/users"
import { calculateDistance } from "@/lib/geolocation"

// Current user's location (you might want to store this in a more permanent way)
let currentUserLocation = {
  latitude: 0,
  longitude: 0
}

export function setCurrentUserLocation(latitude: number, longitude: number) {
  currentUserLocation = { latitude, longitude }
}

export async function getConnectedUsers(): Promise<ConnectedUser[]> {
  const users = connectedUsers.getAllUsers()
  return users.map(user => ({
    ...user,
    distance: user.location 
      ? Math.round(calculateDistance(
          currentUserLocation.latitude,
          currentUserLocation.longitude,
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
