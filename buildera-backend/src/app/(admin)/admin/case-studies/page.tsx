import { redirect } from 'next/navigation'
import { verifySession } from '@/backend/auth/session'
import { listCaseStudies } from '@/db/admin/case-studies'
import { CaseStudiesClient } from '@/components/admin/CaseStudiesClient'

export default async function CaseStudiesPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; q?: string; page?: string; industry?: string; service?: string; dateFrom?: string; dateTo?: string }>
}) {
  const session = await verifySession()
  if (!session) redirect('/admin/login')

  const params = await searchParams
  const status = params.status ?? 'all'
  const q = params.q ?? ''
  const page = Number(params.page) || 1
  const industry = params.industry ?? ''
  const service = params.service ?? ''
  const dateFrom = params.dateFrom ?? ''
  const dateTo = params.dateTo ?? ''

  const { rows, total, perPage } = await listCaseStudies({ page, perPage: 20, status, q, industry, service, dateFrom, dateTo }).catch(() => ({ rows: [], total: 0, perPage: 20 }))

  return <CaseStudiesClient rows={rows} total={total} perPage={perPage} page={page} status={status} q={q} industry={industry} service={service} dateFrom={dateFrom} dateTo={dateTo} />
}
