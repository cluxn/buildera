import { redirect } from 'next/navigation'
import { verifySession } from '@/backend/auth/session'
import { listCategories } from '@/db/admin/categories'
import { listUsers } from '@/db/admin/users'
import { BlogEditor } from '@/components/admin/BlogEditor'

export default async function NewBlogPage() {
  const session = await verifySession()
  if (!session) redirect('/admin/login')

  const [categories, users] = await Promise.all([
    listCategories().catch(() => []),
    listUsers().catch(() => []),
  ])

  return (
    <div>
      <h1 className="text-xl font-semibold text-gray-900 mb-6">New Blog Post</h1>
      <BlogEditor categories={categories} users={users} />
    </div>
  )
}
