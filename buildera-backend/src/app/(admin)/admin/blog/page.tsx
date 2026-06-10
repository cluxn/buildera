import { redirect } from 'next/navigation'
import Link from 'next/link'
import { verifySession } from '@/backend/auth/session'
import { listBlogPosts } from '@/db/admin/blog'
import { BlogListClient } from '@/components/admin/BlogListClient'

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; q?: string; page?: string }>
}) {
  const session = await verifySession()
  if (!session) redirect('/admin/login')

  const params = await searchParams
  const status = params.status ?? 'all'
  const q = params.q ?? ''
  const page = Number(params.page) || 1

  const { rows, total, perPage } = await listBlogPosts({ page, perPage: 20, status, q }).catch(() => ({ rows: [], total: 0, perPage: 20 }))

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-900">Blog Posts</h1>
        <Link href="/admin/blog/new" className="px-4 py-2 bg-[#002BFF] text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
          + New Post
        </Link>
      </div>
      <BlogListClient rows={rows} total={total} perPage={perPage} page={page} status={status} q={q} />
    </div>
  )
}
