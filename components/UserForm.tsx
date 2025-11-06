"use client";

import { createClient } from '@/api/supabase/client';
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import {
  DialogClose,
 
} from "@/components/ui/dialog"
import { toast } from "sonner"

export function UserForm({ 
  mode, 
  user 
}: { 
  mode: 'create' | 'edit'; 
  user?: { id: string; name: string; age: number }; 
}) {
  const router = useRouter();
  const [name, setName] = useState(user?.name || '');
  const [age, setAge] = useState(user?.age?.toString() || '');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const supabase = await createClient();
      
      if (mode === 'create') {
        // 新增用户
        const { error } = await supabase
          .from('user')
          .insert([{ name, age: age ? parseInt(age) : null }]);
        
          if (error) {
            toast.error(error.message)
            return;
          };
      } else if (mode === 'edit' && user) {
        // 编辑用户
        const { error } = await supabase
          .from('user')
          .update({ name, age: age ? parseInt(age) : null })
          .eq('id', user.id);
        
        if (error) {
          toast.error(error.message)
          return;
        };
      }
      toast.success(mode === 'create' ? '创建成功' :"更新成功")
     
      // 成功后关闭对话框并刷新页面
      // router.refresh();
      // 触发自定义事件通知对话框关闭
      // window.dispatchEvent(new CustomEvent('userFormSuccess'));
    } catch (error:any) {
      console.error('保存用户时出错:', error);
      alert('保存失败: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          姓名
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
          placeholder="请输入姓名"
        />
      </div>
      
      <div>
        <label htmlFor="age" className="block text-sm font-medium text-gray-700">
          年龄
        </label>
        <input
          id="age"
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
          placeholder="请输入年龄"
        />
      </div>
      
      <div className="flex justify-end space-x-2">
        <DialogClose asChild>
        <Button
          type="button"
          variant="outline"
          // onClick={() => window.dispatchEvent(new CustomEvent('closeUserFormDialog'))}
        >
          取消
          </Button>
          </DialogClose>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (mode === 'create' ? '创建中...' : '保存中...') : (mode === 'create' ? '创建' : '保存')}
        </Button>
      </div>
    </form>
  );
}