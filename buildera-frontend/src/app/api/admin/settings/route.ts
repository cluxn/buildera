import { NextRequest, NextResponse } from 'next/server'
import { verifySession } from '@/backend/auth/session'
import { getAllSettings, upsertSettings } from '@/db/admin/settings'

export async function GET() {
  const session = await verifySession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const settings = await getAllSettings()
  return NextResponse.json(settings)
}

export async function PUT(request: NextRequest) {
  const session = await verifySession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  if (!['SUPER_ADMIN', 'ADMIN'].includes(session.role)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }
  const body = await request.json() as Record<string, string>
  // Only save string values, sanitize keys
  const safe: Record<string, string> = {}
  for (const [k, v] of Object.entries(body)) {
    if (typeof k === 'string' && typeof v === 'string') safe[k] = v
  }
  await upsertSettings(safe)
  return NextResponse.json({ ok: true })
}
