import { cookies } from 'next/headers'

export default function AuthErrorPage({ searchParams }: { searchParams: { message?: string } }) {
  const errorMessage = searchParams.message || '登录或注册过程中发生了未知错误。'

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-red-600">
          认证错误
        </h2>
        <div className="mt-6 rounded-md bg-red-50 p-4">
          <div className="text-sm text-red-700">
            {errorMessage}
          </div>
        </div>
        <div className="mt-10 flex justify-center">
          <a
            href="/login"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            返回登录页面
          </a>
        </div>
      </div>
    </div>
  )
}