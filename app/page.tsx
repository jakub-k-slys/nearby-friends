'use client'
import Header from '@/components/header'
import HeroSection from '@/components/hero-section'
import NearbyFriends from '@/components/nearby-friends'
import Footer from '@/components/footer'
import { updateUser, User } from '@/lib/users'
import { useUserId } from '@/hooks/use-user-id'
import { useEffect } from 'react'
import { StoredCoordinateProvider } from '@/providers/stored-location-provider'
import { useStoredCoordinate } from '@/hooks/use-stored-geolocation'

const getUser = (): User => {
    const { userId } = useUserId()
    const { location } = useStoredCoordinate()
    return {
        id: userId,
        timestamp: new Date(Date.now()).toISOString(),
        location: location,
    }
}

export default function LandingPage() {
    const user = getUser()
    useEffect(() => {
        const intervalId = setInterval(async () => {
            await updateUser(user)
        }, 3000)
    }, [user])
    return (
        <StoredCoordinateProvider>
            <div className='flex flex-col min-h-screen items-center justify-center'>
                <Header />
                <main className='flex flex-col'>
                    <HeroSection />
                    <NearbyFriends />
                </main>
                <Footer />
            </div>
        </StoredCoordinateProvider>
    )
}
