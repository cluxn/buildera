import { NextRequest, NextResponse } from 'next/server'
import { verifySession } from '@/backend/auth/session'
import { listScripts, createScript } from '@/db/admin/seo'

export async function GET() {
  const session = await verifySession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const rows = await listScripts()
  return NextResponse.json(rows)
}

export async function POST(request: NextRequest) {
  const session = await verifySession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  if (!['SUPER_ADMIN','ADMIN'].includes(session.role)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  const body = await request.json()
  const id = await createScript(body)
  return NextResponse.json({ id }, { status: 201 })
}
