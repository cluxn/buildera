import { NextRequest, NextResponse } from 'next/server'
import { getLeadMagnetBySlug, toGuideDetail } from '@/db/admin/lead-magnets'

export async function GET(_req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const guide = await getLeadMagnetBySlug(slug).catch(() => null)
  if (!guide) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(toGuideDetail(guide), {
    headers: { 'Cache-Control': 's-maxage=3600, stale-while-revalidate=86400' },
  })
}
