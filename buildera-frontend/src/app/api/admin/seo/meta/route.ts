import { NextRequest, NextResponse } from 'next/server'
import { verifySession } from '@/backend/auth/session'
import { listSeoMeta, upsertSeoMeta } from '@/db/admin/seo'

export async function GET() {
  const session = await verifySession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const rows = await listSeoMeta()
  return NextResponse.json(rows)
}

export async function POST(request: NextRequest) {
  const session = await verifySession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { page_path, ...data } = await request.json()
  await upsertSeoMeta(page_path, data)
  return NextResponse.json({ ok: true })
}
