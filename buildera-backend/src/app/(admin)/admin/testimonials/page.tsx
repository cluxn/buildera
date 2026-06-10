import { redirect } from 'next/navigation'
import { verifySession } from '@/backend/auth/session'
import { listTestimonials } from '@/db/admin/testimonials'
import { TestimonialsClient } from '@/components/admin/TestimonialsClient'

export default async function TestimonialsPage() {
  const session = await verifySession()
  if (!session) redirect('/admin/login')

  const rows = await listTestimonials().catch(() => [])

  return <TestimonialsClient rows={rows} />
}
