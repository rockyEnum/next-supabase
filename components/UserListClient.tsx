"use client";

import { createClient } from '@/api/supabase/client';
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export function UserListClient({ userId }: { userId: string }) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  // 监听表单成功事件，关闭对话框
  useEffect(() => {
    const handleFormSuccess = () => {
      // 表单成功提交后可能需要执行的操作
    };
    
    window.addEventListener('userFormSuccess', handleFormSuccess);
    
    return () => {
      window.removeEventListener('userFormSuccess', handleFormSuccess);
    };
  }, []);

  const handleDelete = async () => {
    if (!confirm('确定要删除这个用户吗？')) {
      return;
    }

    setIsDeleting(true);
    try {
      const supabase = await createClient();
      const { error } = await supabase
        .from('user')
        .delete()
        .eq('id', userId);

      if (error) {
        console.error('删除用户时出错:', error);
        alert('删除失败: ' + error.message);
      } else {
        // 删除成功后刷新页面
        router.refresh();
      }
    } catch (error) {
      console.error('删除用户时出错:', error);
      alert('删除失败');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Button 
      variant="destructive" 
      size="sm"
      onClick={handleDelete}
      disabled={isDeleting}
    >
      {isDeleting ? '删除中...' : '删除'}
    </Button>
  );
}