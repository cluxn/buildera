import { NextRequest, NextResponse } from 'next/server'
import { getCaseStudyBySlug, toContentCaseStudyDetail } from '@/db/admin/case-studies'

export async function GET(_req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const study = await getCaseStudyBySlug(slug).catch(() => null)
  if (!study) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(toContentCaseStudyDetail(study), {
    headers: { 'Cache-Control': 's-maxage=3600, stale-while-revalidate=86400' },
  })
}
