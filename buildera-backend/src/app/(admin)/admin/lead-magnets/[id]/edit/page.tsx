import { redirect, notFound } from 'next/navigation'
import { verifySession } from '@/backend/auth/session'
import { getLeadMagnet } from '@/db/admin/lead-magnets'
import { GuideEditor } from '@/components/admin/GuideEditor'

export default async function EditGuidePage({ params }: { params: Promise<{ id: string }> }) {
  const session = await verifySession()
  if (!session) redirect('/admin/login')

  const { id } = await params
  const guide = await getLeadMagnet(Number(id))
  if (!guide) notFound()

  return (
    <div>
      <h1 className="text-xl font-semibold text-gray-900 mb-6">Edit: {guide.title}</h1>
      <GuideEditor guide={guide} />
    </div>
  )
}
