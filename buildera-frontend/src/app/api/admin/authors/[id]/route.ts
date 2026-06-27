import { NextRequest, NextResponse } from 'next/server'
import { verifySession } from '@/backend/auth/session'
import { updateAuthor, deleteAuthor } from '@/db/admin/authors'

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await verifySession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await params
  const body = await request.json()
  const { name, bio, avatar_url, job_title, twitter_url, linkedin_url } = body
  if (name !== undefined && !name.trim()) return NextResponse.json({ error: 'Name cannot be empty' }, { status: 400 })
  await updateAuthor(Number(id), { name: name?.trim(), bio, avatar_url, job_title, twitter_url, linkedin_url })
  return NextResponse.json({ ok: true })
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await verifySession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await params
  await deleteAuthor(Number(id))
  return NextResponse.json({ ok: true })
}
