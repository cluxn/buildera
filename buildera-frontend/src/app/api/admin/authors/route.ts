import { NextRequest, NextResponse } from 'next/server'
import { verifySession } from '@/backend/auth/session'
import { listAuthors, createAuthor } from '@/db/admin/authors'

export async function GET() {
  const session = await verifySession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const authors = await listAuthors()
  return NextResponse.json(authors)
}

export async function POST(request: NextRequest) {
  const session = await verifySession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { name, bio, avatar_url, job_title, twitter_url, linkedin_url } = await request.json()
  if (!name?.trim()) return NextResponse.json({ error: 'Name is required' }, { status: 400 })
  const id = await createAuthor({ name: name.trim(), bio, avatar_url, job_title, twitter_url, linkedin_url })
  return NextResponse.json({ id }, { status: 201 })
}
