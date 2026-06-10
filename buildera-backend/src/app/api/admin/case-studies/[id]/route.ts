import { NextRequest, NextResponse } from 'next/server'
import { verifySession } from '@/backend/auth/session'
import { getCaseStudy, updateCaseStudy, deleteCaseStudy } from '@/db/admin/case-studies'

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await verifySession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await params
  const row = await getCaseStudy(Number(id))
  if (!row) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(row)
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await verifySession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await params
  const body = await request.json()
  await updateCaseStudy(Number(id), body)
  return NextResponse.json({ ok: true })
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await verifySession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await params
  const body = await request.json()
  await updateCaseStudy(Number(id), body)
  return NextResponse.json({ ok: true })
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await verifySession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  if (!['SUPER_ADMIN','ADMIN'].includes(session.role)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  const { id } = await params
  await deleteCaseStudy(Number(id))
  return NextResponse.json({ ok: true })
}
