import React, { createContext, useState } from 'react'

type IStoredCoordinateContext = {
    readonly location: GeolocationCoordinates | undefined
    readonly setLocation: (coords: GeolocationCoordinates) => void
    readonly error: string | undefined
    readonly setError: (error: string) => void
}

export const StoredCoordinateContext = createContext<IStoredCoordinateContext>({
    location: undefined,
    setLocation: () => {},
    error: undefined,
    setError: () => {},
})

export const StoredCoordinateProvider = ({
    children,
}: Readonly<{
    children: React.ReactNode
}>) => {
    const [location, setLocation] = useState<GeolocationCoordinates | undefined>(undefined)
    const [error, setError] = useState<string | undefined>(undefined)
    return (
        <StoredCoordinateContext.Provider
            value={{
                location,
                setLocation,
                error,
                setError,
            }}>
            {children}
        </StoredCoordinateContext.Provider>
    )
}
