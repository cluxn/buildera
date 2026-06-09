import { NextRequest, NextResponse } from 'next/server'
import { readFile } from 'fs/promises'
import { join, extname } from 'path'

const MIME: Record<string, string> = {
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png',
  '.gif': 'image/gif', '.webp': 'image/webp', '.svg': 'image/svg+xml',
  '.pdf': 'application/pdf',
}

export async function GET(_req: NextRequest, { params }: { params: Promise<{ filename: string }> }) {
  const { filename } = await params
  // Prevent path traversal
  if (filename.includes('..') || filename.includes('/')) {
    return new NextResponse('Not found', { status: 404 })
  }

  const uploadDir = process.env.UPLOAD_DIR
  if (!uploadDir) return new NextResponse('Not configured', { status: 500 })

  try {
    const buffer = await readFile(join(uploadDir, filename))
    const ext = extname(filename).toLowerCase()
    const contentType = MIME[ext] ?? 'application/octet-stream'
    return new NextResponse(buffer, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    })
  } catch {
    return new NextResponse('Not found', { status: 404 })
  }
}
