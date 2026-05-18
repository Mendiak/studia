'use server'

import { cookies } from 'next/headers'

export async function login(password: string): Promise<{ success: boolean; error?: string }> {
  // If APP_PASSWORD is set in Vercel/env, we use it; otherwise fallback to 'studia123'
  const correctPassword = process.env.APP_PASSWORD || 'studia123'

  if (password === correctPassword) {
    const cookieStore = await cookies()
    cookieStore.set('app-authorized', 'true', {
      httpOnly: true, // Prevents client-side scripts from reading the cookie
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // Session valid for 1 week
      path: '/'
    })
    return { success: true }
  }

  return { success: false, error: 'Contraseña incorrecta' }
}
