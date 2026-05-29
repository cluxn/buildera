import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

interface RedirectRecord {
  source_path: string
  destination_path: string
  status_code: number
}

let redirectCache: RedirectRecord[] = []
let cacheLoadedAt = 0
const CACHE_TTL_MS = 5 * 60 * 1000 // 5 minutes

async function getRedirects(): Promise<RedirectRecord[]> {
  const now = Date.now()
  if (redirectCache.length > 0 && now - cacheLoadedAt < CACHE_TTL_MS) {
    return redirectCache
  }
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? ''
    const res = await fetch(`${apiUrl}/api/redirects`, { cache: 'no-store' })
    if (res.ok) {
      redirectCache = await res.json()
      cacheLoadedAt = now
    }
  } catch {
    // Return stale cache or empty on fetch error — never break the middleware
  }
  return redirectCache
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  const redirects = await getRedirects()
  const match = redirects.find((r) => r.source_path === pathname)
  if (match) {
    const destination = match.destination_path.startsWith('http')
      ? match.destination_path
      : new URL(match.destination_path, request.url).href
    return NextResponse.redirect(destination, { status: match.status_code })
  }
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|api/).*)',
  ],
}
