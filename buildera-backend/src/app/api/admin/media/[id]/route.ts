import { NextRequest, NextResponse } from 'next/server'
import { verifySession } from '@/backend/auth/session'
import { deleteMedia, updateAltText } from '@/db/admin/media'
import { deleteUploadedFile } from '@/backend/storage/upload'

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await verifySession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await params
  const { alt_text } = await request.json()
  await updateAltText(Number(id), alt_text ?? '')
  return NextResponse.json({ ok: true })
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await verifySession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await params
  const filename = await deleteMedia(Number(id))
  if (filename) await deleteUploadedFile(filename)
  return NextResponse.json({ ok: true })
}
