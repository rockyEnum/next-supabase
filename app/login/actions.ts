'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/api/supabase/server'

/**
 * 登录
 * @param formData 
 */
export async function login(formData: FormData) {
  const supabase = await createClient()
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    console.error('登录错误:', error.message)
    // 重定向到错误页面，并传递错误信息
    redirect(`/auth/error?message=${encodeURIComponent(error.message)}`)
  }

  revalidatePath('/', 'layout')
  redirect('/protected')
}

/**
 * 注册
 * @param formData 
 */
export async function signup(formData: FormData) {
  const supabase = await createClient()
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signUp(data)

  if (error) {
    console.error('注册错误:', error.message)
    // 重定向到错误页面，并传递错误信息
    redirect(`/auth/error?message=${encodeURIComponent(error.message)}`)
  }

  // 如果注册成功，重定向到注册成功页面
  revalidatePath('/', 'layout')
  redirect('/auth/sign-up-success')
}