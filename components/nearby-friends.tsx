"use client"

import { useState } from "react"
import { Users, MapPin } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

// Mock data for nearby friends
const mockFriends = [
  {
    id: 1,
    name: "Alex Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    distance: 0.3,
    lastSeen: "2 min ago",
    status: "online",
  },
  {
    id: 2,
    name: "Jamie Smith",
    avatar: "/placeholder.svg?height=40&width=40",
    distance: 0.8,
    lastSeen: "5 min ago",
    status: "online",
  },
  {
    id: 3,
    name: "Taylor Wilson",
    avatar: "/placeholder.svg?height=40&width=40",
    distance: 1.2,
    lastSeen: "15 min ago",
    status: "away",
  },
  {
    id: 4,
    name: "Morgan Lee",
    avatar: "/placeholder.svg?height=40&width=40",
    distance: 2.5,
    lastSeen: "1 hour ago",
    status: "offline",
  },
]

export default function NearbyFriends() {
  const [friends, setFriends] = useState(mockFriends)

  // In a real app, this would fetch friends based on the user's location
  // For demo purposes, we're using mock data

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
          {friends.map((friend) => (
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
          ))}
        </div>
      </div>
    </section>
  )
}
