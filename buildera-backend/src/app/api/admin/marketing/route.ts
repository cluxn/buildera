import { NextRequest, NextResponse } from 'next/server'
import { verifySession } from '@/backend/auth/session'
import { listMarketingElements, createMarketingElement } from '@/db/admin/marketing'

export async function GET(request: NextRequest) {
  const session = await verifySession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const type = request.nextUrl.searchParams.get('type') ?? undefined
  const rows = await listMarketingElements(type)
  return NextResponse.json(rows)
}

export async function POST(request: NextRequest) {
  const session = await verifySession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await request.json()
  const id = await createMarketingElement(body)
  return NextResponse.json({ id }, { status: 201 })
}
