import { query, queryOne, execute } from '@/db/pool'

export interface Author {
  id: number
  name: string
  bio: string | null
  avatar_url: string | null
  job_title: string | null
  twitter_url: string | null
  linkedin_url: string | null
  created_at: string
}

export async function listAuthors(): Promise<Author[]> {
  return query('SELECT * FROM authors ORDER BY name ASC')
}

export async function getAuthor(id: number): Promise<Author | null> {
  return queryOne('SELECT * FROM authors WHERE id = ?', [id])
}

export async function createAuthor(data: {
  name: string
  bio?: string
  avatar_url?: string
  job_title?: string
  twitter_url?: string
  linkedin_url?: string
}): Promise<number> {
  const result = await execute(
    'INSERT INTO authors (name, bio, avatar_url, job_title, twitter_url, linkedin_url) VALUES (?,?,?,?,?,?)',
    [data.name, data.bio ?? null, data.avatar_url ?? null, data.job_title ?? null, data.twitter_url ?? null, data.linkedin_url ?? null],
  )
  return result.insertId
}

export async function updateAuthor(id: number, data: Partial<{
  name: string
  bio: string
  avatar_url: string
  job_title: string
  twitter_url: string
  linkedin_url: string
}>): Promise<void> {
  const fields = Object.entries(data).filter(([, v]) => v !== undefined)
  if (!fields.length) return
  const sql = `UPDATE authors SET ${fields.map(([k]) => `${k} = ?`).join(', ')} WHERE id = ?`
  await execute(sql, [...fields.map(([, v]) => v ?? null), id])
}

export async function deleteAuthor(id: number): Promise<void> {
  await execute('DELETE FROM authors WHERE id = ?', [id])
}
