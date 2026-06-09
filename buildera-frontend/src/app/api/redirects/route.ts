import { NextResponse } from 'next/server'
import { getActiveRedirects } from '@/db/admin/seo'

export async function GET() {
  const rows = await getActiveRedirects().catch(() => [])
  return NextResponse.json(rows, {
    headers: { 'Cache-Control': 's-maxage=300, stale-while-revalidate=600' },
  })
}
