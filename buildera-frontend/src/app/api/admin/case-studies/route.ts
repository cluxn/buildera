import { NextRequest, NextResponse } from 'next/server'
import { verifySession } from '@/backend/auth/session'
import { listCaseStudies, createCaseStudy } from '@/db/admin/case-studies'
import { revalidateTag } from 'next/cache'

export async function GET(request: NextRequest) {
  const session = await verifySession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const sp = request.nextUrl.searchParams
  const result = await listCaseStudies({
    page: Number(sp.get('page')) || 1,
    perPage: Number(sp.get('per_page')) || 20,
    status: sp.get('status') ?? undefined,
    q: sp.get('q') ?? undefined,
  })
  return NextResponse.json(result)
}

export async function POST(request: NextRequest) {
  const session = await verifySession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await request.json()
  const id = await createCaseStudy(body)
  revalidateTag('case_studies')
  return NextResponse.json({ id }, { status: 201 })
}
