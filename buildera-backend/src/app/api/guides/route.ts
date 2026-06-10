import { NextRequest, NextResponse } from 'next/server'
import { listPublicLeadMagnets, toGuide } from '@/db/admin/lead-magnets'

export async function GET(request: NextRequest) {
  const sp = request.nextUrl.searchParams
  const page = Number(sp.get('page')) || 1
  const category = sp.get('category') ?? undefined
  const resourceType = sp.get('resource_type') ?? undefined
  const q = sp.get('q') ?? undefined
  const sort = sp.get('sort') ?? undefined
  const perPage = 12
  const { rows, total } = await listPublicLeadMagnets(page, perPage, category, resourceType, q, sort).catch(() => ({ rows: [], total: 0 }))
  return NextResponse.json({
    data: rows.map(toGuide),
    current_page: page,
    last_page: Math.max(1, Math.ceil(total / perPage)),
    per_page: perPage,
    total,
  }, {
    headers: { 'Cache-Control': 's-maxage=3600, stale-while-revalidate=86400' },
  })
}
