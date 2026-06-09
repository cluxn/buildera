import { query, queryOne, execute } from '@/db/pool'

export interface Category { id: number; name: string; slug: string; description: string | null; created_at: string }

function slugify(name: string) { return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') }

export async function listCategories(): Promise<Category[]> {
  return query<Category>('SELECT * FROM categories ORDER BY name ASC')
}

export async function createCategory(name: string, description?: string): Promise<number> {
  const slug = slugify(name)
  const result = await execute(
    'INSERT INTO categories (name, slug, description) VALUES (?,?,?)',
    [name, slug, description ?? null],
  )
  return result.insertId
}

export async function updateCategory(id: number, name: string, description?: string): Promise<void> {
  await execute('UPDATE categories SET name = ?, slug = ?, description = ? WHERE id = ?',
    [name, slugify(name), description ?? null, id])
}

export async function deleteCategory(id: number): Promise<void> {
  await execute('DELETE FROM categories WHERE id = ?', [id])
}
