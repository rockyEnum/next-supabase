'use client'

import { useState } from 'react'

export default function ForgotPasswordPage() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [email, setEmail] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    // 这里应该调用重置密码的API
    // 为简化起见，我们直接设置提交状态
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-green-600">
            密码重置邮件已发送
          </h2>
          <p className="mt-6 text-center text-lg text-gray-600">
            我们已向 {email} 发送了密码重置链接。请检查您的邮箱并按照指示操作。
          </p>
          <div className="mt-10 flex justify-center">
            <a
              href="/login"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              返回登录
            </a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          忘记密码
        </h2>
        <p className="mt-6 text-center text-sm text-gray-600">
          请输入您的邮箱地址，我们将向您发送重置密码的链接。
        </p>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              邮箱地址
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              发送重置链接
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          <a href="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
            返回登录
          </a>
        </p>
      </div>
    </div>
  )
}