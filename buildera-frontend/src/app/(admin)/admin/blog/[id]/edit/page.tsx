import { redirect, notFound } from 'next/navigation'
import { verifySession } from '@/backend/auth/session'
import { getBlogPost } from '@/db/admin/blog'
import { listCategories } from '@/db/admin/categories'
import { listAuthors } from '@/db/admin/authors'
import { BlogEditor } from '@/components/admin/BlogEditor'

export default async function EditBlogPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await verifySession()
  if (!session) redirect('/admin/login')

  const { id } = await params
  const [post, categories, authors] = await Promise.all([
    getBlogPost(Number(id)),
    listCategories().catch(() => []),
    listAuthors().catch(() => []),
  ])
  if (!post) notFound()

  return (
    <div>
      <h1 className="text-xl font-semibold text-gray-900 mb-6">Edit: {post.title}</h1>
      <BlogEditor post={post} categories={categories} authors={authors} />
    </div>
  )
}
