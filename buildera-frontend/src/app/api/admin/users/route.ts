import { NextRequest, NextResponse } from 'next/server'
import { verifySession } from '@/backend/auth/session'
import { listUsers, createUser } from '@/db/admin/users'
import { ALLOWED_ROLE_VALUES as ALLOWED_ROLES } from '@/lib/admin-permissions'
import { hashPassword } from '@/backend/auth/hash'

export async function GET() {
  const session = await verifySession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const rows = await listUsers()
  return NextResponse.json(rows)
}

export async function POST(request: NextRequest) {
  const session = await verifySession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  if (!['SUPER_ADMIN', 'ADMIN'].includes(session.role)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  const { name, email, password, roles } = await request.json()
  if (!name || !email || !password) return NextResponse.json({ error: 'name, email, password required' }, { status: 400 })
  const rolesArr: string[] = Array.isArray(roles) ? roles : [roles]
  if (rolesArr.length === 0 || !rolesArr.every((r: string) => ALLOWED_ROLES.includes(r))) {
    return NextResponse.json({ error: 'Invalid role(s)' }, { status: 400 })
  }
  const passwordHash = await hashPassword(password)
  const id = await createUser({ name, email, passwordHash, role: rolesArr.join(',') })
  return NextResponse.json({ id }, { status: 201 })
}
