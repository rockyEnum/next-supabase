"use client"

import { createClient } from '@/api/supabase/client'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { UserForm } from '@/components/UserForm'

import { useEffect, useState } from 'react'
import { useUser } from '@/hooks/useUser'
import { useRouter } from 'next/navigation'
import { CopilotPopup } from "@copilotkit/react-ui";
import { useFrontendTool } from "@copilotkit/react-core";
import { toast } from 'sonner'

type User = {
  id: string
  name: string | null
  age: number | null
}

export default function Page() {
  const router = useRouter()
  const { user, loading: authLoading } = useUser()
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [isDeleting, setIsDeleting] = useState(false);
  useFrontendTool({
    name: "addUser",
    description: "新增一行记录",
    parameters: [
      {
        name: "name",
        type: "string",
        description: "新增一行记录",
        required: true,
      },
      {
        name: "age",
        type: "number",
        description: "新增一行记录",
        required: true,
      },
    ],
    handler: async ({ name, age }) => {
      const supabase = await createClient();
      const { error } = await supabase
        .from('user')
        .insert([{ name, age: age ? age : null }]);

      if (error) {
        toast.error(error.message)
        return;
      };
      toast.success('新增成功')
      fetchUsers()
    },
  });

  useFrontendTool({
    name: "del",
    description: "删除一行记录",
    parameters: [
      {
        name: "id",
        type: "string",
        description: "删除一条记录",
        required: true,
      },
      
    ],
    handler: async ({ id }) => {
      const supabase = await createClient();
      const { error } = await supabase
        .from('user')
        .delete()
        .eq('id', id);

      if (error) {
        toast.error(error.message)
        return;
      };
      toast.success('删除成功')
      fetchUsers()
    },
  });

  const fetchUsers = async () => {
    const supabase = await createClient()
    const { data, error } = await supabase.from('user').select().order('created_at', { ascending: false }); // 升序
    if (!error && data) {
      setUsers(data as User[])
    }
    setLoading(false)
  }

  /**
   * 删除
   */
  const handleDelete = async (user: User) => {
    const supabase = await createClient();
    const { error } = await supabase
      .from('user')
      .delete()
      .eq('id', user.id);
    if (error) {
      toast.error(error.code)
      return;
    }
    toast.success('删除成功')
    fetchUsers()
  }

  useEffect(() => {
    if (authLoading) return
    if (!user) {
      router.replace('/login')
      return
    }

    fetchUsers()
  }, [authLoading, user, router])

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
                  <UserForm mode="create" onSuccess={fetchUsers} />
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

          {authLoading || loading ? (
            <div className="text-center py-8">
              <p className="text-gray-500">加载中...</p>
            </div>
          ) : users && users.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>姓名</TableHead>
                  <TableHead>年龄</TableHead>
                  <TableHead className="text-right">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map(item => (
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
                          <UserForm
                            mode="edit"
                            user={{ id: item.id, name: item.name ?? '', age: item.age ?? 0 }}
                            onSuccess={fetchUsers}
                          />
                        </DialogContent>
                      </Dialog>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(item)}
                        disabled={isDeleting}
                      >
                        {isDeleting ? '删除中...' : '删除'}
                      </Button>
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
      <CopilotPopup
        instructions={"你是一个AI助手，请根据用户的问题给出最佳答案。"}
        labels={{
          title: "ai 助手",
          initial: "需要帮助吗？",
        }}
      />
    </div>
  );
}