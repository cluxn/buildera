import { redirect } from 'next/navigation'
import { verifySession } from '@/backend/auth/session'
import { listLeadMagnets } from '@/db/admin/lead-magnets'
import { LeadMagnetsClient } from '@/components/admin/LeadMagnetsClient'

export default async function LeadMagnetsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; q?: string; page?: string; resourceType?: string; category?: string; dateFrom?: string; dateTo?: string }>
}) {
  const session = await verifySession()
  if (!session) redirect('/admin/login')

  const params = await searchParams
  const status = params.status ?? 'all'
  const q = params.q ?? ''
  const page = Number(params.page) || 1
  const resourceType = params.resourceType ?? ''
  const category = params.category ?? ''
  const dateFrom = params.dateFrom ?? ''
  const dateTo = params.dateTo ?? ''

  const { rows, total, perPage } = await listLeadMagnets({ page, perPage: 20, status, q, resourceType, category, dateFrom, dateTo }).catch(() => ({ rows: [], total: 0, perPage: 20 }))

  return <LeadMagnetsClient rows={rows} total={total} perPage={perPage} page={page} status={status} q={q} resourceType={resourceType} category={category} dateFrom={dateFrom} dateTo={dateTo} />
}
