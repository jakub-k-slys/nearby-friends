export const calculateDistance = (coordinates1: GeolocationCoordinates, coordinates2: GeolocationCoordinates): number => {
    const R = 6371 // Radius of the earth in km
    const dLat = deg2rad(coordinates2.latitude - coordinates1.latitude)
    const dLon = deg2rad(coordinates2.longitude - coordinates1.longitude)
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(coordinates1.latitude)) * Math.cos(deg2rad(coordinates2.latitude)) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c
}

const deg2rad = (deg: number): number => {
    return deg * (Math.PI / 180)
}
