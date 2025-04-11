"use server"

import { connectedUsers, ConnectedUser } from "@/lib/users"

export async function getConnectedUsers(): Promise<ConnectedUser[]> {
  return connectedUsers.getAllUsers()
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
