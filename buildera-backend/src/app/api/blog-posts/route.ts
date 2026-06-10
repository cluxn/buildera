import { NextRequest, NextResponse } from 'next/server'
import { listPublicBlogPosts } from '@/db/admin/blog'

export async function GET(request: NextRequest) {
  const sp = request.nextUrl.searchParams
  const page = Number(sp.get('page')) || 1
  const category = sp.get('category') ?? undefined
  const q = sp.get('q') ?? undefined
  const result = await listPublicBlogPosts(page, 12, category, q).catch(() => ({ data: [], current_page: 1, last_page: 1, per_page: 12, total: 0 }))
  return NextResponse.json(result, {
    headers: { 'Cache-Control': 's-maxage=3600, stale-while-revalidate=86400' },
  })
}
