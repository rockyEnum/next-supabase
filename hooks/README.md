# 自定义认证Hooks

这个目录包含了用于处理Supabase认证的自定义React Hooks。

## Hooks

### useUser
简单的Hook，用于获取当前认证用户的信息。

```typescript
import { useUser } from '@/hooks/useUser'

export default function Component() {
  const { user, loading, error } = useUser()
  
  if (loading) return <div>加载中...</div>
  if (error) return <div>错误: {error.message}</div>
  if (!user) return <div>未登录</div>
  
  return <div>欢迎, {user.email}!</div>
}
```

### useAuth
功能完整的认证Hook，提供了登录、注册、登出等所有认证功能。

```typescript
import { useAuth } from '@/hooks/useAuth'

export default function AuthComponent() {
  const { 
    user, 
    loading, 
    error, 
    signIn, 
    signUp, 
    signOut 
  } = useAuth()
  
  const handleLogin = async () => {
    const { error } = await signIn('user@example.com', 'password')
    if (error) {
      console.error('登录失败:', error.message)
    }
  }
  
  // ... 其他逻辑
}
```

## 使用示例

查看 [/app/demo/auth-demo/page.tsx](file:///Users/han/Documents/other-work/next-supabase/app/demo/auth-demo/page.tsx) 文件了解完整的使用示例。