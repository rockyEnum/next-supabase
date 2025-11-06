'use client'

import { useUser } from '@/hooks/useUser'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Link from 'next/link'

export default function ProtectedPage() {
  const { user, loading, error } = useUser()
  const router = useRouter()

  useEffect(() => {
    // 如果没有用户且不在加载状态，重定向到登录页面
    if (!user && !loading) {
      router.push('/login')
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            加载中...
          </h2>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-red-600">
            错误
          </h2>
          <p className="mt-6 text-center text-lg text-gray-600">
            {error.message}
          </p>
          <div className="mt-10 flex justify-center">
            <button
              onClick={() => router.push('/login')}
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              返回登录页面
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          欢迎, {user?.email}
        </h2>
        <p className="mt-6 text-center text-lg text-gray-600">
          您已成功登录到您的账户。
        </p>
        <div className="mt-10 flex flex-col gap-4">
          <Link
            href="/user/list"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 text-center"
          >
            查看用户列表
          </Link>
          
          <form action="/auth/logout" method="post">
            <button
              type="submit"
              className="w-full rounded-md bg-gray-200 px-3 py-2 text-sm font-semibold text-gray-800 shadow-sm hover:bg-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-400"
            >
              退出登录
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}