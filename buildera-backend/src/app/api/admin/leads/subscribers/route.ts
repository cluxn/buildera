import { NextRequest, NextResponse } from 'next/server'
import { verifySession } from '@/backend/auth/session'
import { listSubscribers, getSubscriberStats } from '@/db/admin/subscribers'

const ROLE_ALLOWED = ['SUPER_ADMIN','ADMIN','MARKETING_MANAGER']

export async function GET(request: NextRequest) {
  const session = await verifySession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  if (!ROLE_ALLOWED.includes(session.role)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  const sp = request.nextUrl.searchParams
  const [result, stats] = await Promise.all([
    listSubscribers({
      status: sp.get('status') ?? undefined,
      q: sp.get('q') ?? undefined,
      page: Number(sp.get('page')) || 1,
      perPage: Number(sp.get('per_page')) || 50,
    }),
    getSubscriberStats(),
  ])
  return NextResponse.json({ ...result, stats })
}
