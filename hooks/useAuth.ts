import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@/api/supabase/client'
import { User } from '@supabase/supabase-js'

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  // 获取当前用户
  const getUser = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      
      const supabase = createClient()
      const { data, error } = await supabase.auth.getUser()
      
      if (error) {
        throw error
      }
      
      setUser(data.user)
      return data.user
    } catch (err) {
      setError(err as Error)
      setUser(null)
      return null
    } finally {
      setLoading(false)
    }
  }, [])

  // 登录
  const signIn = useCallback(async (email: string, password: string) => {
    try {
      setLoading(true)
      setError(null)
      
      const supabase = createClient()
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      
      if (error) {
        throw error
      }
      
      setUser(data.user)
      return { user: data.user, error: null }
    } catch (err) {
      setError(err as Error)
      return { user: null, error: err as Error }
    } finally {
      setLoading(false)
    }
  }, [])

  // 注册
  const signUp = useCallback(async (email: string, password: string) => {
    try {
      setLoading(true)
      setError(null)
      
      const supabase = createClient()
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      })
      
      if (error) {
        throw error
      }
      
      setUser(data.user)
      return { user: data.user, error: null }
    } catch (err) {
      setError(err as Error)
      return { user: null, error: err as Error }
    } finally {
      setLoading(false)
    }
  }, [])

  // 登出
  const signOut = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      
      const supabase = createClient()
      const { error } = await supabase.auth.signOut()
      
      if (error) {
        throw error
      }
      
      setUser(null)
      return { error: null }
    } catch (err) {
      setError(err as Error)
      return { error: err as Error }
    } finally {
      setLoading(false)
    }
  }, [])

  // 重置密码
  const resetPassword = useCallback(async (email: string) => {
    try {
      setLoading(true)
      setError(null)
      
      const supabase = createClient()
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/update-password`,
      })
      
      if (error) {
        throw error
      }
      
      return { error: null }
    } catch (err) {
      setError(err as Error)
      return { error: err as Error }
    } finally {
      setLoading(false)
    }
  }, [])

  // 更新密码
  const updatePassword = useCallback(async (password: string) => {
    try {
      setLoading(true)
      setError(null)
      
      const supabase = createClient()
      const { error } = await supabase.auth.updateUser({
        password,
      })
      
      if (error) {
        throw error
      }
      
      return { error: null }
    } catch (err) {
      setError(err as Error)
      return { error: err as Error }
    } finally {
      setLoading(false)
    }
  }, [])

  // 初始化时获取用户信息
  useEffect(() => {
    getUser()
  }, [getUser])

  return {
    user,
    loading,
    error,
    signIn,
    signUp,
    signOut,
    resetPassword,
    updatePassword,
    getUser,
  }
}