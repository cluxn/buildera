import { NextRequest, NextResponse } from 'next/server'
import { verifySession, hasAnyRole } from '@/backend/auth/session'
import { listUsers, createUser } from '@/db/admin/users'
import { ALLOWED_ROLE_VALUES as ALLOWED_ROLES } from '@/lib/admin-permissions'
import { hashPassword } from '@/backend/auth/hash'

export async function GET() {
  const session = await verifySession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  if (!hasAnyRole(session, ['SUPER_ADMIN', 'ADMIN'])) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  try {
    const rows = await listUsers()
    return NextResponse.json(rows)
  } catch {
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const session = await verifySession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  if (!hasAnyRole(session, ['SUPER_ADMIN', 'ADMIN'])) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  try {
    const { name, email, password, roles } = await request.json()
    if (!name || !email || !password) return NextResponse.json({ error: 'name, email, password required' }, { status: 400 })
    const rolesArr: string[] = Array.isArray(roles) ? roles : [roles]
    if (rolesArr.length === 0 || !rolesArr.every((r: string) => ALLOWED_ROLES.includes(r))) {
      return NextResponse.json({ error: 'Invalid role(s)' }, { status: 400 })
    }
    const passwordHash = await hashPassword(password)
    const id = await createUser({ name, email, passwordHash, role: rolesArr.join(',') })
    return NextResponse.json({ id }, { status: 201 })
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : ''
    if (msg.includes('Duplicate entry') || msg.includes('ER_DUP_ENTRY')) {
      return NextResponse.json({ error: 'A user with that email already exists.' }, { status: 409 })
    }
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 })
  }
}
