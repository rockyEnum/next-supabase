'use client'

import { useAuth } from '@/hooks/useAuth'
import { useState } from 'react'
import Link from 'next/link'

export default function AuthDemoPage() {
  const { 
    user, 
    loading, 
    error, 
    signIn, 
    signUp, 
    signOut,
    resetPassword
  } = useAuth()
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    const { error } = await signIn(email, password)
    if (error) {
      setMessage(`登录失败: ${error.message}`)
    } else {
      setMessage('登录成功!')
    }
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    const { error } = await signUp(email, password)
    if (error) {
      setMessage(`注册失败: ${error.message}`)
    } else {
      setMessage('注册成功! 请检查您的邮箱进行确认。')
    }
  }

  const handleSignOut = async () => {
    const { error } = await signOut()
    if (error) {
      setMessage(`登出失败: ${error.message}`)
    } else {
      setMessage('已登出')
    }
  }

  const handleResetPassword = async () => {
    if (!email) {
      setMessage('请输入邮箱地址')
      return
    }
    
    const { error } = await resetPassword(email)
    if (error) {
      setMessage(`密码重置请求失败: ${error.message}`)
    } else {
      setMessage('密码重置邮件已发送，请检查您的邮箱。')
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-xl">加载中...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            认证Hook演示
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            展示如何使用自定义useAuth Hook
          </p>
        </div>

        {message && (
          <div className="rounded-md bg-blue-50 p-4">
            <div className="text-sm text-blue-700">
              {message}
            </div>
          </div>
        )}

        {error && (
          <div className="rounded-md bg-red-50 p-4">
            <div className="text-sm text-red-700">
              错误: {error.message}
            </div>
          </div>
        )}

        {!user ? (
          <div className="mt-8 space-y-6 bg-white p-8 rounded-lg shadow">
            <div>
              <label htmlFor="email-address" className="sr-only">
                邮箱地址
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="邮箱地址"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                密码
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="密码"
              />
            </div>

            <div className="flex flex-col gap-3">
              <button
                onClick={handleSignIn}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                登录
              </button>
              
              <button
                onClick={handleSignUp}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                注册
              </button>
              
              <button
                onClick={handleResetPassword}
                className="group relative w-full flex justify-center py-2 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                重置密码
              </button>
            </div>
          </div>
        ) : (
          <div className="mt-8 space-y-6 bg-white p-8 rounded-lg shadow">
            <div className="text-center">
              <h3 className="text-lg font-medium text-gray-900">已登录</h3>
              <p className="mt-1 text-sm text-gray-500">
                欢迎, {user.email}
              </p>
            </div>
            
            <div className="flex flex-col gap-3">
              <button
                onClick={handleSignOut}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                登出
              </button>
              
              <Link 
                href="/protected"
                className="group relative w-full flex justify-center py-2 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                前往受保护页面
              </Link>
            </div>
          </div>
        )}
        
        <div className="text-center">
          <Link 
            href="/" 
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            ← 返回首页
          </Link>
        </div>
      </div>
    </div>
  )
}