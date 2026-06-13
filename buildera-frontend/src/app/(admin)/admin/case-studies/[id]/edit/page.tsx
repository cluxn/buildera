import { redirect, notFound } from 'next/navigation'
import { verifySession } from '@/backend/auth/session'
import { getCaseStudy } from '@/db/admin/case-studies'
import { CaseStudyEditor } from '@/components/admin/CaseStudyEditor'

export default async function EditCaseStudyPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await verifySession()
  if (!session) redirect('/admin/login')

  const { id } = await params
  const study = await getCaseStudy(Number(id))
  if (!study) notFound()

  return (
    <div>
      <h1 className="text-xl font-semibold text-gray-900 mb-6">Edit: {study.title}</h1>
      <CaseStudyEditor study={study} />
    </div>
  )
}
