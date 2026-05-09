import { useCallback, useEffect, useState } from 'react'
import {
  type AuthUser,
  type SustainabilityProfile,
  clearSession,
  getSession,
  saveProfile,
} from '../utils/authHelpers'

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(() => getSession())

  // Keep in sync if another tab logs out
  useEffect(() => {
    const handler = () => setUser(getSession())
    window.addEventListener('storage', handler)
    return () => window.removeEventListener('storage', handler)
  }, [])

  const refresh = useCallback(() => setUser(getSession()), [])

  const logout = useCallback(() => {
    clearSession()
    setUser(null)
  }, [])

  const updateProfile = useCallback((profile: SustainabilityProfile) => {
    saveProfile(profile)
    setUser(getSession())
  }, [])

  return { user, isLoggedIn: !!user, refresh, logout, updateProfile }
}
