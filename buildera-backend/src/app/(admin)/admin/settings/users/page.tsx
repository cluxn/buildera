import { redirect } from 'next/navigation'
import { verifySession } from '@/backend/auth/session'
import { listUsers, ALLOWED_ROLES } from '@/db/admin/users'
import { AuthorsClient } from '@/components/admin/AuthorsClient'

export default async function UsersSettingsPage() {
  const session = await verifySession()
  if (!session) redirect('/admin/login')
  if (!['SUPER_ADMIN','ADMIN'].includes(session.role)) redirect('/admin')

  const rows = await listUsers().catch(() => [])

  return <AuthorsClient rows={rows} currentUserId={session.userId} roles={ALLOWED_ROLES} isAdmin={true} />
}
