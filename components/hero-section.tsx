"use client"

import { useState, useTransition, useEffect } from "react"
import { MapPin, Navigation } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { updateUserLocation, addConnectedUser } from "@/app/actions"

const generateUserId = () => {
  return 'user-' + Math.random().toString(36).substr(2, 9);
}

export default function HeroSection() {
  const [userId, setUserId] = useState<string>("")

  useEffect(() => {
    // Get or create user ID
    const storedUserId = localStorage.getItem('userId')
    if (storedUserId) {
      setUserId(storedUserId)
    } else {
      const newUserId = generateUserId()
      localStorage.setItem('userId', newUserId)
      setUserId(newUserId)
      // Add new user
      startTransition(async () => {
        try {
          await addConnectedUser({
            id: newUserId,
            name: `User ${newUserId.split('-')[1]}`,
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${newUserId}`,
            distance: 0,
            lastSeen: new Date().toISOString(),
            status: 'online'
          })
        } catch (err) {
          console.error("Failed to add new user:", err)
        }
      })
    }
  }, [])

  const [location, setLocation] = useState<{
    latitude: number | null
    longitude: number | null
    error: string | null
  }>({
    latitude: null,
    longitude: null,
    error: null,
  })

  const [isLoading, setIsLoading] = useState(false)

  const [isPending, startTransition] = useTransition()

  const getLocation = () => {
    setIsLoading(true)

    if (!navigator.geolocation) {
      setLocation({
        ...location,
        error: "Geolocation is not supported by your browser",
      })
      setIsLoading(false)
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude
        const longitude = position.coords.longitude
        
        // Update local state
        setLocation({
          latitude,
          longitude,
          error: null,
        })

        // Update server with location
        startTransition(async () => {
          try {
            if (userId) {
              await updateUserLocation(userId, latitude, longitude)
            } else {
              throw new Error("No user ID available")
            }
          } catch (err) {
            console.error("Failed to update location on server:", err)
            setLocation(prev => ({
              ...prev,
              error: "Failed to share location with server"
            }))
          }
        })
        
        setIsLoading(false)
      },
      (error) => {
        setLocation({
          ...location,
          error: `Unable to retrieve your location: ${error.message}`,
        })
        setIsLoading(false)
      },
    )
  }

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted/50">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Connect with friends in your area
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                GeoConnect helps you discover friends nearby and connect in real-time. Share your location and see who's
                around you.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button size="lg" onClick={getLocation} disabled={isLoading}>
                {isLoading ? "Getting Location..." : "Share My Location"}
              </Button>
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <Card className="w-full max-w-md">
              <CardContent className="p-6">
                <div className="flex flex-col space-y-4">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    <h3 className="text-xl font-semibold">Your Current Location</h3>
                  </div>

                  {location.error ? (
                    <div className="rounded-lg bg-destructive/10 p-4 text-destructive">{location.error}</div>
                  ) : location.latitude && location.longitude ? (
                    <div className="space-y-2">
                      <div className="grid grid-cols-2 gap-2">
                        <div className="rounded-lg bg-muted p-3">
                          <p className="text-sm font-medium">Latitude</p>
                          <p className="text-lg font-semibold">{location.latitude.toFixed(6)}</p>
                        </div>
                        <div className="rounded-lg bg-muted p-3">
                          <p className="text-sm font-medium">Longitude</p>
                          <p className="text-lg font-semibold">{location.longitude.toFixed(6)}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-center rounded-lg bg-muted/50 p-4">
                        <div className="flex items-center space-x-2">
                          <Navigation className="h-5 w-5 text-primary" />
                          <span className="text-sm">Location shared successfully</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="rounded-lg bg-muted p-6 text-center">
                      <p className="text-muted-foreground">Click "Share My Location" to see your coordinates</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
