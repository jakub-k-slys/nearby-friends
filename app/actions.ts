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

// Add some test users for development
const testUsers = [
  {
    id: "test_user_1",
    name: "Alice",
    avatar: "",
    distance: 0,
    lastSeen: new Date().toISOString(),
    status: "online" as const,
    location: { latitude: 52.237049, longitude: 21.017532 } // Warsaw
  },
  {
    id: "test_user_2",
    name: "Bob",
    avatar: "",
    distance: 0,
    lastSeen: new Date().toISOString(),
    status: "online" as const,
    location: { latitude: 52.239271, longitude: 21.019802 } // Nearby Warsaw
  }
];

// Initialize test users
testUsers.forEach(user => connectedUsers.addUser(user));

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
  return users
    .filter(user => user.id !== currentUser.id) // Only exclude current user, keep test users for now
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
