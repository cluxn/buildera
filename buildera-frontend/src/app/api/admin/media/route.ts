import { NextRequest, NextResponse } from 'next/server'
import { verifySession } from '@/backend/auth/session'
import { saveUploadedFile } from '@/backend/storage/upload'
import { createMedia, listMedia } from '@/db/admin/media'

export async function GET(request: NextRequest) {
  const session = await verifySession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const sp = request.nextUrl.searchParams
  const filter = sp.get('filter') as 'images' | 'pdfs' | 'other' | undefined
  const q = sp.get('q') ?? undefined
  const files = await listMedia(filter, q)
  return NextResponse.json(files)
}

export async function POST(request: NextRequest) {
  const session = await verifySession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const formData = await request.formData()
  const file = formData.get('file') as File | null
  if (!file) return NextResponse.json({ error: 'No file provided' }, { status: 400 })

  try {
    const saved = await saveUploadedFile(file)
    const id = await createMedia({
      filename: saved.filename,
      originalName: saved.originalName,
      mimeType: saved.mimeType,
      sizeBytes: saved.sizeBytes,
      url: saved.url,
    })
    return NextResponse.json({ id, ...saved }, { status: 201 })
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 422 })
  }
}
