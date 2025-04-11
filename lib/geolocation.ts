// Utility functions for handling geolocation

export interface GeolocationPosition {
  latitude: number
  longitude: number
  accuracy?: number
  timestamp?: number
}

export interface GeolocationError {
  code: number
  message: string
}

export type GeolocationCallback = (position: GeolocationPosition) => void
export type GeolocationErrorCallback = (error: GeolocationError) => void

export const getCurrentPosition = (onSuccess: GeolocationCallback, onError?: GeolocationErrorCallback): void => {
  if (!navigator.geolocation) {
    if (onError) {
      onError({
        code: 0,
        message: "Geolocation is not supported by this browser.",
      })
    }
    return
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      onSuccess({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        accuracy: position.coords.accuracy,
        timestamp: position.timestamp,
      })
    },
    (error) => {
      if (onError) {
        onError({
          code: error.code,
          message: error.message,
        })
      }
    },
  )
}

export const watchPosition = (onSuccess: GeolocationCallback, onError?: GeolocationErrorCallback): number => {
  if (!navigator.geolocation) {
    if (onError) {
      onError({
        code: 0,
        message: "Geolocation is not supported by this browser.",
      })
    }
    return 0
  }

  return navigator.geolocation.watchPosition(
    (position) => {
      onSuccess({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        accuracy: position.coords.accuracy,
        timestamp: position.timestamp,
      })
    },
    (error) => {
      if (onError) {
        onError({
          code: error.code,
          message: error.message,
        })
      }
    },
  )
}

export const clearWatch = (watchId: number): void => {
  if (navigator.geolocation) {
    navigator.geolocation.clearWatch(watchId)
  }
}

// Calculate distance between two points in kilometers using the Haversine formula
export const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 6371 // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1)
  const dLon = deg2rad(lon2 - lon1)
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  const distance = R * c // Distance in km
  return distance
}

const deg2rad = (deg: number): number => {
  return deg * (Math.PI / 180)
}
