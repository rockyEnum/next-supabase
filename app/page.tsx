import { createClient } from '@/api/supabase/server'
import Link from 'next/link'

export default async function Home() {
  const supabase = await createClient()
  
  // 检查用户是否已登录
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    // 如果用户未登录，显示登录提示
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans">
        <main className="flex flex-col items-center justify-center min-h-screen w-full max-w-3xl bg-white py-32 px-16 sm:items-center">
          <h1 className="text-3xl font-bold mb-6">欢迎来到我们的应用</h1>
          <p className="text-lg mb-8">请登录以继续访问</p>
          <Link 
            href="/login" 
            className="rounded-md bg-indigo-600 px-6 py-3 text-lg font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            登录 / 注册
          </Link>
        </main>
      </div>
    )
  }
  
  // 如果用户已登录，显示用户数据
  const data = await supabase.from('user').select()
  console.log(data.data,33)
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans">
      <main className="flex font-bold min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white sm:items-start">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-4">欢迎, {user.email}</h1>
          <Link 
            href="/protected" 
            className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
          >
            前往仪表板
          </Link>
        </div>
        <ul>
          {
            data.data?.map(item=>{
              return <li key={item.id}>{item.age}</li>
            })
          }
        </ul>
      </main>
    </div>
  );
}