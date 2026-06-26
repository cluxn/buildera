import { redirect } from 'next/navigation'
import { verifySession, hasAnyRole } from '@/backend/auth/session'
import { listUsers } from '@/db/admin/users'
import { AuthorsClient } from '@/components/admin/AuthorsClient'

export default async function UsersSettingsPage() {
  const session = await verifySession()
  if (!session) redirect('/admin/login')
  if (!hasAnyRole(session, ['SUPER_ADMIN', 'ADMIN'])) redirect('/admin')

  const rows = await listUsers().catch(() => [])

  return <AuthorsClient rows={rows} currentUserId={session.userId} isAdmin={true} />
}
