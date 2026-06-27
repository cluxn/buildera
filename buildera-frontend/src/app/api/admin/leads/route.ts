import { NextRequest, NextResponse } from 'next/server'
import { verifySession } from '@/backend/auth/session'
import { listLeads, createLead } from '@/db/admin/leads'

const ROLE_LEADS = ['SUPER_ADMIN','ADMIN','MARKETING_MANAGER']

export async function GET(request: NextRequest) {
  const session = await verifySession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  if (!ROLE_LEADS.includes(session.role)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const sp = request.nextUrl.searchParams
  const result = await listLeads({
    page: Number(sp.get('page')) || 1,
    perPage: Number(sp.get('per_page')) || 50,
    status: sp.get('status') ?? undefined,
    source: sp.get('source') ?? undefined,
    q: sp.get('q') ?? undefined,
    dateFrom: sp.get('date_from') ?? undefined,
    dateTo: sp.get('date_to') ?? undefined,
  })
  return NextResponse.json(result)
}

export async function POST(request: NextRequest) {
  const session = await verifySession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  if (!ROLE_LEADS.includes(session.role)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  const body = await request.json()
  const id = await createLead({ ...body, source_form: 'MANUAL' })
  return NextResponse.json({ id }, { status: 201 })
}
