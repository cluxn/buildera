import { redirect } from 'next/navigation'
import { verifySession } from '@/backend/auth/session'
import { listCategories } from '@/db/admin/categories'
import { CategoriesClient } from '@/components/admin/CategoriesClient'

export default async function CategoriesPage() {
  const session = await verifySession()
  if (!session) redirect('/admin/login')

  const rows = await listCategories().catch(() => [])

  return <CategoriesClient rows={rows} />
}
