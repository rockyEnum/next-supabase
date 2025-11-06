import { createClient } from '@/api/supabase/client'
import Link from 'next/link'

export default async function Page() {
  const supabase = await createClient()
  const data = await supabase.from('user').select()
  
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50">
      <main className="flex font-bold min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white sm:items-start">
        <div className="w-full">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold">用户列表</h1>
            <Link 
              href="/protected" 
              className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
            >
              返回仪表板
            </Link>
          </div>
          
          {data.data && data.data.length > 0 ? (
            <ul className="space-y-4">
              {data.data.map(item => (
                <li key={item.id} className="p-4 border rounded-lg shadow-sm">
                  <div className="font-medium">姓名: {item.name || '未提供'}</div>
                  <div>年龄: {item.age || '未提供'}</div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">暂无用户数据</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}