import { redirect } from 'next/navigation'
import { verifySession } from '@/backend/auth/session'
import { listLeadMagnets } from '@/db/admin/lead-magnets'
import { LeadMagnetsClient } from '@/components/admin/LeadMagnetsClient'

export default async function LeadMagnetsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; q?: string; page?: string }>
}) {
  const session = await verifySession()
  if (!session) redirect('/admin/login')

  const params = await searchParams
  const status = params.status ?? 'all'
  const q = params.q ?? ''
  const page = Number(params.page) || 1

  const { rows, total, perPage } = await listLeadMagnets({ page, perPage: 20, status, q }).catch(() => ({ rows: [], total: 0, perPage: 20 }))

  return <LeadMagnetsClient rows={rows} total={total} perPage={perPage} page={page} status={status} q={q} />
}
