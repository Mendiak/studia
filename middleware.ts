import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Allow next-internal assets, static files, api/login, and the login page
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api/login') ||
    pathname.startsWith('/login') ||
    pathname.includes('.') // for files like favicon.ico, images, etc.
  ) {
    return NextResponse.next()
  }

  const authorized = request.cookies.get('app-authorized')?.value

  if (authorized !== 'true') {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}
