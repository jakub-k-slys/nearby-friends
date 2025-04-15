import { useContext } from 'react'
import { StoredCoordinateContext } from '@/providers/stored-location-provider'

export const useStoredCoordinate = () => {
    return useContext(StoredCoordinateContext)
}
