import { writeFile, unlink } from 'fs/promises'
import { join } from 'path'
import { randomUUID } from 'crypto'

const ALLOWED_MIME = new Set([
  'image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml',
  'application/pdf',
])

const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024 // 10MB

function getUploadDir(): string {
  const dir = process.env.UPLOAD_DIR
  if (!dir) throw new Error('UPLOAD_DIR env var is required')
  return dir
}

export async function saveUploadedFile(file: File): Promise<{
  filename: string
  originalName: string
  mimeType: string
  sizeBytes: number
  url: string
}> {
  if (!ALLOWED_MIME.has(file.type)) {
    throw new Error(`File type not allowed: ${file.type}`)
  }
  if (file.size > MAX_FILE_SIZE_BYTES) {
    throw new Error(`File too large: max size is ${MAX_FILE_SIZE_BYTES / (1024 * 1024)}MB`)
  }
  const ext = file.name.split('.').pop()?.toLowerCase() || 'bin'
  const filename = `${randomUUID()}.${ext}`
  const dir = getUploadDir()
  const buffer = Buffer.from(await file.arrayBuffer())
  await writeFile(join(dir, filename), buffer)
  return {
    filename,
    originalName: file.name,
    mimeType: file.type,
    sizeBytes: file.size,
    url: `/uploads/${filename}`,
  }
}

export async function deleteUploadedFile(filename: string): Promise<void> {
  const dir = getUploadDir()
  try {
    await unlink(join(dir, filename))
  } catch {
    // File may not exist on disk — ignore
  }
}
