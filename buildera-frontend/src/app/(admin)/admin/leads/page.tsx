import { redirect } from 'next/navigation'
import { verifySession } from '@/backend/auth/session'
import { listLeads, getLeadStats } from '@/db/admin/leads'
import { LeadsListClient } from '@/components/admin/LeadsListClient'

const ROLE_LEADS = ['SUPER_ADMIN','ADMIN','MARKETING_MANAGER']

export default async function LeadsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; source?: string; q?: string; page?: string; dateFrom?: string; dateTo?: string }>
}) {
  const session = await verifySession()
  if (!session) redirect('/admin/login')
  if (!ROLE_LEADS.includes(session.role)) redirect('/admin')

  const params = await searchParams
  const { status = 'all', source = 'all', q = '', page: pageStr = '1', dateFrom, dateTo } = params
  const page = Number(pageStr) || 1

  const [{ rows, total, perPage }, stats] = await Promise.all([
    listLeads({ page, perPage: 50, status, source, q, dateFrom, dateTo }).catch(() => ({ rows: [], total: 0, perPage: 50 })),
    getLeadStats().catch(() => ({ total: 0, week: 0, followUp: 0, conversionRate: '0' })),
  ])

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold text-gray-900">Leads</h1>
      <LeadsListClient rows={rows} total={total} perPage={perPage} page={page} stats={stats} filters={{ status, source, q, dateFrom: dateFrom ?? '', dateTo: dateTo ?? '' }} />
    </div>
  )
}
