import { NextRequest, NextResponse } from 'next/server'
import { verifySession } from '@/backend/auth/session'
import { listCategories, createCategory } from '@/db/admin/categories'

export async function GET() {
  const session = await verifySession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const rows = await listCategories()
  return NextResponse.json(rows)
}

export async function POST(request: NextRequest) {
  const session = await verifySession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { name, description } = await request.json()
  const id = await createCategory(name, description)
  return NextResponse.json({ id }, { status: 201 })
}
