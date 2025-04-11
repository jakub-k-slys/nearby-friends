"use client"

import { useState, useEffect, useTransition } from "react"
import { Users, MapPin, Loader2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

import { ConnectedUser } from "@/lib/users"
import { getConnectedUsers, setCurrentUser } from "@/app/actions"
import { getCurrentPosition, watchPosition, clearWatch, GeolocationPosition } from "@/lib/geolocation"

export default function NearbyFriends() {
  const [friends, setFriends] = useState<ConnectedUser[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [isPending, startTransition] = useTransition()
  const [currentUserId] = useState(() => `user_${Math.random().toString(36).slice(2)}`) // Generate unique ID for current user

  useEffect(() => {
    let watchId: number;

    // Initialize location tracking
    getCurrentPosition(
      async (position: GeolocationPosition) => {
        await setCurrentUser(currentUserId, position.latitude, position.longitude);
        
        // Start watching position
        watchId = watchPosition(async (pos: GeolocationPosition) => {
          await setCurrentUser(currentUserId, pos.latitude, pos.longitude);
        });
      },
      (error: { code: number; message: string }) => {
        console.error('Geolocation error:', error);
        setError('Unable to access location. Please enable location services.');
      }
    );

    const fetchUsers = () => {
      startTransition(async () => {
        try {
          const users = await getConnectedUsers()
          setFriends(users)
          setError(null)
        } catch (err) {
          setError('Failed to load nearby friends')
          console.error('Error fetching users:', err)
        } finally {
          setLoading(false)
        }
      })
    }

    // Initial fetch
    fetchUsers()

    // Set up polling interval
    const interval = setInterval(fetchUsers, 5000) // Update every 5 seconds

    // Cleanup interval and location watch on unmount
    return () => {
      clearInterval(interval)
      if (watchId) {
        clearWatch(watchId)
      }
    }
  }, [])

  if (loading) {
    return (
      <section className="w-full py-12 md:py-24 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <Loader2 className="h-8 w-8 animate-spin" />
            <p>Loading nearby friends...</p>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="w-full py-12 md:py-24 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <p className="text-red-500">{error}</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="w-full py-12 md:py-24 bg-muted/30">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-flex items-center rounded-lg bg-muted px-3 py-1 text-sm">
              <Users className="mr-1 h-4 w-4" />
              <span>Nearby Connections</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Friends Around You</h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl">
              See who's nearby and connect with friends in your area. Distance updates in real-time as you or your
              friends move.
            </p>
          </div>
        </div>

        <div className="mx-auto mt-8 grid max-w-5xl gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {friends.length === 0 ? (
            <p className="col-span-full text-center text-muted-foreground">No nearby friends found</p>
          ) : (
            friends.map((friend) => (
              <Card key={friend.id} className="overflow-hidden">
              <CardHeader className="p-4">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src={friend.avatar} alt={friend.name} />
                    <AvatarFallback>{friend.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-base">{friend.name}</CardTitle>
                    <CardDescription>{friend.lastSeen}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">{friend.distance} miles away</span>
                  </div>
                  <Badge
                    variant={
                      friend.status === "online" ? "default" : friend.status === "away" ? "outline" : "secondary"
                    }
                    className={friend.status === "online" ? "bg-green-500" : ""}
                  >
                    {friend.status}
                  </Badge>
                </div>
              </CardContent>
            </Card>
            ))
          )}
        </div>
      </div>
    </section>
  )
}
