import React, { createContext, useContext, useEffect, useState } from 'react'
import { User } from '../types'
import { getCurrentUser } from '../lib/appwrite'

type GlobalProviderProps = {
  children: React.ReactNode
}

type GlobalContextType = {
  isLoggedIn: boolean
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
  user: User | null
  setUser: React.Dispatch<React.SetStateAction<User | null>>
  setTrigger: React.Dispatch<React.SetStateAction<boolean>>
  isLoading: boolean
  trigger: boolean
}

export const GlobalContext = createContext<GlobalContextType | null>(null)

const GlobalProvider = ({ children }: GlobalProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [trigger, setTrigger] = useState(false)

  useEffect(() => {
    getCurrentUser()
      .then((res) => {
        if (res) {
          setIsLoggedIn(true)
          setUser(res)
        } else {
          setIsLoggedIn(false)
          setUser(null)
        }
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  return (
    <GlobalContext.Provider value={{ isLoggedIn, setIsLoggedIn, user, setUser, isLoading, trigger, setTrigger }}>
      {children}
    </GlobalContext.Provider>
  )
}

export default GlobalProvider

export const useGlobal = () => {
  const context = useContext(GlobalContext)
  if (!context) {
    throw new Error('useGlobal must be used within a GlobalProvider')
  }
  return context
}
