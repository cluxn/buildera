import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

interface RedirectRecord {
  from_path: string
  to_path: string
  redirect_type: string
}

let redirectCache: RedirectRecord[] = []
let cacheLoadedAt = 0
const CACHE_TTL_MS = 5 * 60 * 1000

async function getRedirects(): Promise<RedirectRecord[]> {
  const now = Date.now()
  if (redirectCache.length > 0 && now - cacheLoadedAt < CACHE_TTL_MS) {
    return redirectCache
  }
  const origin = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
  try {
    const res = await fetch(`${origin}/api/redirects`, { cache: 'no-store' })
    if (res.ok) {
      redirectCache = await res.json()
      cacheLoadedAt = now
    }
  } catch {
    // Use stale cache or empty — never break middleware
  }
  return redirectCache
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  const response = NextResponse.next()
  const redirects = await getRedirects()
  const match = redirects.find((r) => r.from_path === pathname)
  if (match) {
    const destination = match.to_path.startsWith('http')
      ? match.to_path
      : new URL(match.to_path, request.url).href
    return NextResponse.redirect(destination, { status: Number(match.redirect_type) || 301 })
  }

  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|api/).*)',
  ],
}
