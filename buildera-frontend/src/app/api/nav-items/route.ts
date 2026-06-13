import { NextResponse } from 'next/server'
import { query } from '@/db/pool'

export async function GET() {
  const rows = await query('SELECT id, label, url, `group`, display_order FROM nav_items WHERE is_active = 1 ORDER BY display_order ASC').catch(() => [])
  return NextResponse.json(rows, { headers: { 'Cache-Control': 's-maxage=3600, stale-while-revalidate=86400' } })
}
