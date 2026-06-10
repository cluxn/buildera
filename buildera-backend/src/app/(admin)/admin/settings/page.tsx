import { redirect } from 'next/navigation'
import { verifySession } from '@/backend/auth/session'
import { getAllSettings } from '@/db/admin/settings'
import { SettingsForm } from '@/components/admin/SettingsForm'

export default async function SettingsPage() {
  const session = await verifySession()
  if (!session) redirect('/admin/login')
  if (!['SUPER_ADMIN', 'ADMIN'].includes(session.role)) redirect('/admin')

  const settings = await getAllSettings().catch(() => ({}))

  return (
    <div className="max-w-3xl space-y-4">
      <h1 className="text-xl font-semibold text-gray-900">Site Settings</h1>
      <SettingsForm settings={settings} />
    </div>
  )
}
