import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/db/pool'

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get('q') ?? ''
  if (q.length < 2) return NextResponse.json([])

  const like = `%${q}%`
  const [posts, cs, guides] = await Promise.all([
    query<{ title: string; slug: string; excerpt: string }>(
      `SELECT title, slug, excerpt FROM blog_posts WHERE (status='published' OR is_published=1) AND (published_at IS NULL OR published_at <= NOW()) AND (title LIKE ? OR excerpt LIKE ?) LIMIT 5`,
      [like, like],
    ),
    query<{ title: string; slug: string }>(
      `SELECT title, slug FROM case_studies WHERE is_published=1 AND (published_at IS NULL OR published_at <= NOW()) AND title LIKE ? LIMIT 5`,
      [like],
    ),
    query<{ title: string; slug: string; excerpt: string }>(
      `SELECT title, slug, excerpt FROM lead_magnets WHERE status='PUBLISHED' AND (title LIKE ? OR excerpt LIKE ?) LIMIT 5`,
      [like, like],
    ),
  ]).catch(() => [[], [], []])

  const results = [
    ...(posts as { title: string; slug: string; excerpt: string }[]).map(r => ({ ...r, type: 'blog_post', url: `/blog/${r.slug}` })),
    ...(cs as { title: string; slug: string }[]).map(r => ({ ...r, type: 'case_study', url: `/case-studies/${r.slug}` })),
    ...(guides as { title: string; slug: string; excerpt: string }[]).map(r => ({ ...r, type: 'guide', url: `/guides/${r.slug}` })),
  ]
  return NextResponse.json(results)
}
