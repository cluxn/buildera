import { NextRequest, NextResponse } from 'next/server'
import { listPublicBlogPosts, type BlogPost } from '@/db/admin/blog'

export async function GET(request: NextRequest) {
  const sp = request.nextUrl.searchParams
  const page = Number(sp.get('page')) || 1
  const category = sp.get('category') ?? undefined
  const q = sp.get('q') ?? undefined
  const sort = sp.get('sort') ?? undefined

  const result = await listPublicBlogPosts(page, 12, category, q, sort).catch(() => ({
    data: [], current_page: 1, last_page: 1, per_page: 12, total: 0,
  }))

  const mapped = {
    ...result,
    data: result.data.map((post: BlogPost) => {
      const p = post as unknown as Record<string, unknown>
      return {
      id: p.id,
      title: p.title,
      slug: p.slug,
      excerpt: p.excerpt ?? '',
      category: p.category ?? '',
      tags: [],
      image_path: p.cover_image ?? null,
      image_alt: p.cover_image_alt ?? null,
      reading_time: 5,
      published_at: p.published_at ?? '',
      author: p.author_name ? { name: p.author_name, avatar: null } : null,
      }
    }),
  }

  return NextResponse.json(mapped, {
    headers: { 'Cache-Control': 's-maxage=3600, stale-while-revalidate=86400' },
  })
}
