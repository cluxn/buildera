import { NextResponse } from 'next/server'
import { getSetting } from '@/db/admin/settings'

export const dynamic = 'force-dynamic'

export async function GET() {
  const [number, enabled] = await Promise.all([
    getSetting('whatsapp_number').catch(() => ''),
    getSetting('whatsapp_enabled').catch(() => '0'),
  ])
  return NextResponse.json(
    { number: number ?? '', enabled: enabled === '1' },
    { headers: { 'Cache-Control': 'no-store, max-age=0' } },
  )
}
