'use client'

import { useState, useEffect, useTransition } from 'react'
import { Users, MapPin, Loader2 } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'

import { getUsers, User } from '@/lib/users'
import { useUserId } from '@/hooks/use-user-id'

export default function NearbyFriends() {
    const [friends, setFriends] = useState<User[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getUsers().then(res => {
            setFriends(res)
            setLoading(false)
        })
    }, [friends])

    const [locationStatus, setLocationStatus] = useState<'requesting' | 'granted' | 'denied' | null>(null)
    const [error, setError] = useState<string | null>(null)

    const [isPending, startTransition] = useTransition()
    const { userId } = useUserId()

    useEffect(() => {
        setLocationStatus('granted')
    }, [])

    if (loading && locationStatus !== 'denied') {
        return (
            <section className='w-full py-12 md:py-24 bg-muted/30'>
                <div className='container px-4 md:px-6'>
                    <div className='flex flex-col items-center justify-center space-y-4 text-center'>
                        <Loader2 className='h-8 w-8 animate-spin' />
                        <p>
                            {locationStatus === 'requesting'
                                ? 'Requesting location access...'
                                : locationStatus === 'granted'
                                  ? 'Loading nearby friends...'
                                  : 'Initializing...'}
                        </p>
                    </div>
                </div>
            </section>
        )
    }

    if (error) {
        return (
            <section className='w-full py-12 md:py-24 bg-muted/30'>
                <div className='container px-4 md:px-6'>
                    <div className='flex flex-col items-center justify-center space-y-4 text-center'>
                        <p className='text-red-500'>{error}</p>
                    </div>
                </div>
            </section>
        )
    }

    return (
        <section className='w-full py-12 md:py-24 bg-muted/30'>
            <div className='container px-4 md:px-6'>
                <div className='flex flex-col items-center justify-center space-y-4 text-center'>
                    <div className='space-y-2'>
                        <div className='inline-flex items-center rounded-lg bg-muted px-3 py-1 text-sm'>
                            <Users className='mr-1 h-4 w-4' />
                            <span>Nearby Connections</span>
                        </div>
                        <h2 className='text-3xl font-bold tracking-tighter md:text-4xl'>Friends Around You</h2>
                        <p className='max-w-[700px] text-muted-foreground md:text-xl'>
                            See who's nearby and connect with friends in your area. Distance updates in real-time as you or your friends
                            move.
                        </p>
                    </div>
                </div>

                <div className='mx-auto mt-8 grid max-w-5xl gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
                    {friends.length === 0 ? (
                        <p className='col-span-full text-center text-muted-foreground'>No nearby friends found</p>
                    ) : (
                        friends.map(friend => (
                            <Card key={friend.id} className='overflow-hidden'>
                                <CardHeader className='p-4'>
                                    <div className='flex items-center space-x-4'>
                                        <Avatar>
                                            <AvatarImage />
                                            <AvatarFallback />
                                        </Avatar>
                                        <div>
                                            <CardTitle className='text-base'>{friend.id}</CardTitle>
                                            <CardDescription>{friend.timestamp}</CardDescription>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className='p-4 pt-0'>
                                    <div className='flex items-center justify-between'>
                                        <div className='flex items-center space-x-1'>
                                            <MapPin className='h-4 w-4 text-muted-foreground' />
                                            <span className='text-sm font-medium'>{friend.id} km away</span>
                                        </div>
                                        <Badge variant={'default'} className={'bg-green-500'}>
                                            {friend.id}
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
