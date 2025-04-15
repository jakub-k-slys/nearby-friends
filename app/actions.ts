'use server'

import { User } from '@/lib/users'
import { calculateDistance } from '@/lib/geolocation'

// Current user's information
let currentUser = {
    id: '',
    location: {
        latitude: 0,
        longitude: 0,
    },
}