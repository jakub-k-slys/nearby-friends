'use client'
import { useEffect, useState } from 'react'
const isServer = typeof window === 'undefined'

export const useLocalStorage = <V,>(key: string, defaultValue: V): [V, (v: V) => void] => {
    const [storedValue, setStoredValue] = useState(() => defaultValue)
    const initialize = () => {
        try {
            if (isServer) return defaultValue
            const item = localStorage.getItem(key)
            return item ? JSON.parse(item) : defaultValue
        } catch (error) {
            console.log(error)
            return defaultValue
        }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => setStoredValue(initialize()), [])
    const setValue = (value: V) => {
        try {
            setStoredValue(value)
            if (!isServer) window.localStorage.setItem(key, JSON.stringify(value))
        } catch (error) {
            console.log(error)
        }
    }
    return [storedValue, setValue]
}
