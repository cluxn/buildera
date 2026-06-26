import { NextRequest, NextResponse } from 'next/server'
import { verifySession } from '@/backend/auth/session'
import { updateUserRole, updateUserPassword, deleteUser } from '@/db/admin/users'
import { ALLOWED_ROLE_VALUES as ALLOWED_ROLES } from '@/lib/admin-permissions'
import { hashPassword } from '@/backend/auth/hash'

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await verifySession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  if (!['SUPER_ADMIN','ADMIN'].includes(session.role)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  const { id } = await params
  const { roles, password } = await request.json()
  if (roles !== undefined) {
    const rolesArr: string[] = Array.isArray(roles) ? roles : [roles]
    if (rolesArr.length === 0 || !rolesArr.every((r: string) => ALLOWED_ROLES.includes(r))) {
      return NextResponse.json({ error: 'Invalid role(s)' }, { status: 400 })
    }
    await updateUserRole(Number(id), rolesArr.join(','))
  }
  if (password) {
    const hash = await hashPassword(password)
    await updateUserPassword(Number(id), hash)
  }
  return NextResponse.json({ ok: true })
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await verifySession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  if (!['SUPER_ADMIN'].includes(session.role)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  const { id } = await params
  if (Number(id) === session.userId) return NextResponse.json({ error: 'Cannot delete yourself' }, { status: 400 })
  await deleteUser(Number(id))
  return NextResponse.json({ ok: true })
}
