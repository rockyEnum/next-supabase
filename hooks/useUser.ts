import { useState, useEffect } from 'react'
import { createClient } from '@/api/supabase/client'
import { User } from '@supabase/supabase-js'

export function useUser() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const supabase = createClient()
        const { data, error } = await supabase.auth.getUser()
        
        if (error) {
          throw error
        }
        
        setUser(data.user)
      } catch (err) {
        setError(err as Error)
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [])

  return { user, loading, error }
}