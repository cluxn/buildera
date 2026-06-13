import { NextRequest, NextResponse } from 'next/server'
import { getBlogPostBySlug } from '@/db/admin/blog'

export async function GET(_req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug).catch(() => null)
  if (!post) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const bodyText = ((post as Record<string, unknown>).content as string) ?? ''
  const wordCount = bodyText.replace(/<[^>]+>/g, '').split(/\s+/).filter(Boolean).length
  const readingTime = Math.max(1, Math.ceil(wordCount / 200))

  const p = post as Record<string, unknown>
  const mapped = {
    id: p.id,
    title: p.title,
    slug: p.slug,
    excerpt: p.excerpt ?? '',
    category: p.category ?? '',
    tags: [],
    image_path: p.cover_image ?? null,
    image_alt: p.cover_image_alt ?? null,
    reading_time: readingTime,
    published_at: p.published_at ?? '',
    body: bodyText,
    seo_title: p.meta_title ?? null,
    seo_description: p.meta_description ?? null,
    author: p.author_name
      ? { name: p.author_name, bio: null, role: null, linkedin_url: null, avatar: null }
      : null,
  }

  return NextResponse.json(mapped, {
    headers: { 'Cache-Control': 's-maxage=3600, stale-while-revalidate=86400' },
  })
}
