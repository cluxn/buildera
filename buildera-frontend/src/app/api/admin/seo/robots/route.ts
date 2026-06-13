import { NextRequest, NextResponse } from 'next/server'
import { verifySession } from '@/backend/auth/session'
import { getSetting, upsertSetting } from '@/db/admin/settings'

export async function GET() {
  const session = await verifySession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const content = await getSetting('robots_txt')
  return NextResponse.json({ content: content ?? '' })
}

export async function PUT(request: NextRequest) {
  const session = await verifySession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  if (!['SUPER_ADMIN','ADMIN'].includes(session.role)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  const { content } = await request.json()
  await upsertSetting('robots_txt', content ?? '')
  return NextResponse.json({ ok: true })
}
