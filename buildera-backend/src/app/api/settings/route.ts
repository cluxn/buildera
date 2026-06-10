import { NextResponse } from 'next/server'
import { getAllSettings } from '@/db/admin/settings'

export async function GET() {
  const settings = await getAllSettings().catch(() => ({}))
  return NextResponse.json(settings, {
    headers: { 'Cache-Control': 's-maxage=3600, stale-while-revalidate=86400' },
  })
}
