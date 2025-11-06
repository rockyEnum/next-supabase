import { createClient } from '@/api/supabase/client'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { UserListClient } from '@/components/UserListClient'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { UserForm } from '@/components/UserForm'

export default async function Page() {
  
  const supabase = await createClient()
  const data = await supabase.from('user').select()
  
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50">
      <main className="flex font-bold min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white sm:items-start">
        <div className="w-full">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold">用户列表</h1>
            <div className="flex gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button>新增用户</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>新增用户</DialogTitle>
                    <DialogDescription>
                      请输入用户信息
                    </DialogDescription>
                  </DialogHeader>
                  <UserForm mode="create" />
                </DialogContent>
              </Dialog>
              <Link 
                href="/protected" 
                className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
              >
                返回仪表板
              </Link>
            </div>
          </div>
          
          {data.data && data.data.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>姓名</TableHead>
                  <TableHead>年龄</TableHead>
                  <TableHead className="text-right">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.data.map(item => (
                  <TableRow key={item.id}>
                    <TableCell>{item.name || '未提供'}</TableCell>
                    <TableCell>{item.age || '未提供'}</TableCell>
                    <TableCell className="text-right space-x-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">编辑</Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>编辑用户</DialogTitle>
                            <DialogDescription>
                              修改用户信息
                            </DialogDescription>
                          </DialogHeader>
                          <UserForm mode="edit" user={item} />
                        </DialogContent>
                      </Dialog>
                      <UserListClient userId={item.id} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
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