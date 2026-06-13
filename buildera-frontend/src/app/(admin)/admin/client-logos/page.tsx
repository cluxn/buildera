import { redirect } from 'next/navigation'
import { verifySession } from '@/backend/auth/session'
import { listClientLogos } from '@/db/admin/client-logos'
import { ClientLogosClient } from '@/components/admin/ClientLogosClient'

export default async function ClientLogosPage() {
  const session = await verifySession()
  if (!session) redirect('/admin/login')

  const rows = await listClientLogos().catch(() => [])

  return <ClientLogosClient rows={rows} />
}
