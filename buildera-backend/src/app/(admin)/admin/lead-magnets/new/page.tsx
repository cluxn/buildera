import { redirect } from 'next/navigation'
import { verifySession } from '@/backend/auth/session'
import { GuideEditor } from '@/components/admin/GuideEditor'

export default async function NewGuidePage() {
  const session = await verifySession()
  if (!session) redirect('/admin/login')

  return (
    <div>
      <h1 className="text-xl font-semibold text-gray-900 mb-6">New Guide</h1>
      <GuideEditor />
    </div>
  )
}
