import { redirect } from 'next/navigation'
import { verifySession } from '@/backend/auth/session'
import { CaseStudyEditor } from '@/components/admin/CaseStudyEditor'

export default async function NewCaseStudyPage() {
  const session = await verifySession()
  if (!session) redirect('/admin/login')

  return (
    <div>
      <h1 className="text-xl font-semibold text-gray-900 mb-6">New Case Study</h1>
      <CaseStudyEditor />
    </div>
  )
}
