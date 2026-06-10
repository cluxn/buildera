import { NextRequest, NextResponse } from 'next/server'
import { verifySession } from '@/backend/auth/session'
import { listUsers, createUser, ALLOWED_ROLES } from '@/db/admin/users'
import { hashPassword } from '@/backend/auth/hash'

export async function GET() {
  const session = await verifySession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  if (!['SUPER_ADMIN','ADMIN'].includes(session.role)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  const rows = await listUsers()
  return NextResponse.json(rows)
}

export async function POST(request: NextRequest) {
  const session = await verifySession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  if (!['SUPER_ADMIN','ADMIN'].includes(session.role)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  const { name, email, password, role } = await request.json()
  if (!name || !email || !password) return NextResponse.json({ error: 'name, email, password required' }, { status: 400 })
  if (!ALLOWED_ROLES.includes(role)) return NextResponse.json({ error: 'Invalid role' }, { status: 400 })
  const passwordHash = await hashPassword(password)
  const id = await createUser({ name, email, passwordHash, role })
  return NextResponse.json({ id }, { status: 201 })
}
