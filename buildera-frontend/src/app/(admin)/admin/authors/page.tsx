import { redirect } from 'next/navigation'
import { verifySession } from '@/backend/auth/session'
import { listAuthors } from '@/db/admin/authors'
import { AuthorsMgmtClient } from '@/components/admin/AuthorsMgmtClient'

export default async function AuthorsPage() {
  const session = await verifySession()
  if (!session) redirect('/admin/login')

  const authors = await listAuthors().catch(() => [])

  return <AuthorsMgmtClient authors={authors} />
}
