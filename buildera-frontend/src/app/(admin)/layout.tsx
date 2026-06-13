import { redirect } from 'next/navigation'
import { verifySession } from '@/backend/auth/session'
import { getUnreadCount } from '@/db/admin/leads'
import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { AdminHeader } from '@/components/admin/AdminHeader'
import { AdminSectionTabs } from '@/components/admin/AdminSectionTabs'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await verifySession()
  if (!session) redirect('/admin/login')

  const unreadLeads = await getUnreadCount().catch(() => 0)

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <AdminSidebar role={session.role} unreadLeads={unreadLeads} />
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <AdminHeader email={session.email} role={session.role} />
        <AdminSectionTabs />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
