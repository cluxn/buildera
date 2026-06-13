import { NextRequest, NextResponse } from 'next/server'
import { listPublicCaseStudies, toContentCaseStudy } from '@/db/admin/case-studies'

export async function GET(request: NextRequest) {
  const sp = request.nextUrl.searchParams
  const page = Number(sp.get('page')) || 1
  const industry = sp.get('industry') ?? undefined
  const q = sp.get('q') ?? undefined
  const sort = sp.get('sort') ?? undefined
  const perPage = 12
  const { rows, total } = await listPublicCaseStudies(page, perPage, industry, q, sort).catch(() => ({ rows: [], total: 0 }))
  return NextResponse.json({
    data: rows.map(toContentCaseStudy),
    current_page: page,
    last_page: Math.max(1, Math.ceil(total / perPage)),
    per_page: perPage,
    total,
  }, {
    headers: { 'Cache-Control': 's-maxage=3600, stale-while-revalidate=86400' },
  })
}
