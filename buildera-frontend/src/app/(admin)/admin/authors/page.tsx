import { redirect } from 'next/navigation'
import { verifySession, hasAnyRole } from '@/backend/auth/session'
import { listUsers } from '@/db/admin/users'
import { AuthorsClient } from '@/components/admin/AuthorsClient'

export default async function AuthorsPage() {
  const session = await verifySession()
  if (!session) redirect('/admin/login')

  const rows = await listUsers().catch(() => [])

  return <AuthorsClient rows={rows} currentUserId={session.userId} isAdmin={hasAnyRole(session, ['SUPER_ADMIN', 'ADMIN'])} />
}
