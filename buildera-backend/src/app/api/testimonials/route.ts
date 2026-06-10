import { NextRequest, NextResponse } from 'next/server'
import { listPublicTestimonials } from '@/db/admin/testimonials'

export async function GET(request: NextRequest) {
  const sp = request.nextUrl.searchParams
  const rows = await listPublicTestimonials(sp.get('service') ?? undefined, sp.get('industry') ?? undefined).catch(() => [])
  return NextResponse.json(rows, { headers: { 'Cache-Control': 's-maxage=3600, stale-while-revalidate=86400' } })
}
