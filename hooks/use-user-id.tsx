'use client'
import { useLocalStorage } from '@/hooks/use-local-storage'

export interface UseUserIdTypeProps {
    readonly userId: string
    readonly setUserId: (userId: string) => void
}

export const useUserId = (): UseUserIdTypeProps => {
    const [user, setUser] = useLocalStorage<string>('user-id', `user_${Math.random().toString(36).slice(2)}`)
    return { userId: user, setUserId: setUser }
}
