import { NextRequest, NextResponse } from 'next/server'
import { verifySession } from '@/backend/auth/session'
import { listRedirects, createRedirect } from '@/db/admin/seo'

export async function GET() {
  const session = await verifySession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const rows = await listRedirects()
  return NextResponse.json(rows)
}

export async function POST(request: NextRequest) {
  const session = await verifySession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { from_path, to_path, redirect_type = '301' } = await request.json()
  const id = await createRedirect(from_path, to_path, redirect_type)
  return NextResponse.json({ id }, { status: 201 })
}
