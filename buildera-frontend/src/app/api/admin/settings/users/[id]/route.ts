import { NextRequest, NextResponse } from 'next/server'
import { verifySession } from '@/backend/auth/session'
import { updateUserRole, updateUserPassword, deleteUser, ALLOWED_ROLES } from '@/db/admin/users'
import { hashPassword } from '@/backend/auth/hash'

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await verifySession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  if (!['SUPER_ADMIN','ADMIN'].includes(session.role)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  const { id } = await params
  const { role, password } = await request.json()
  if (role !== undefined) {
    if (!ALLOWED_ROLES.includes(role)) return NextResponse.json({ error: 'Invalid role' }, { status: 400 })
    await updateUserRole(Number(id), role)
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
