import { query, queryOne, execute } from '@/db/pool'

export interface BlogPost {
  id: number; title: string; slug: string; excerpt: string | null
  content: string | null; author_id: number | null; category_id: number | null
  cover_image: string | null; cover_image_alt: string | null; is_featured: number
  status: 'DRAFT' | 'SUBMITTED' | 'PUBLISHED'; published_at: string | null
  scheduled_at: string | null; meta_title: string | null; meta_description: string | null
  service_type: string | null; industry: string | null; view_count: number
  created_at: string; updated_at: string
  author_name?: string | null; category_name?: string | null
}

interface ListOpts { page?: number; perPage?: number; status?: string; q?: string }

export async function listBlogPosts(opts: ListOpts = {}) {
  const { page = 1, perPage = 20, status, q } = opts
  const offset = (page - 1) * perPage
  const wheres: string[] = []
  const vals: unknown[] = []
  if (status && status !== 'all') { wheres.push('bp.status = ?'); vals.push(status) }
  if (q) { wheres.push('(bp.title LIKE ? OR bp.excerpt LIKE ?)'); vals.push(`%${q}%`, `%${q}%`) }
  const where = wheres.length ? `WHERE ${wheres.join(' AND ')}` : ''

  const [rows, countRow] = await Promise.all([
    query<BlogPost>(
      `SELECT bp.*, u.name as author_name, c.name as category_name
       FROM blog_posts bp
       LEFT JOIN users u ON u.id = bp.author_id
       LEFT JOIN categories c ON c.id = bp.category_id
       ${where} ORDER BY bp.created_at DESC LIMIT ? OFFSET ?`,
      [...vals, perPage, offset],
    ),
    queryOne<{ total: number }>(
      `SELECT COUNT(*) as total FROM blog_posts bp ${where}`,
      vals,
    ),
  ])

  return { rows, total: countRow?.total ?? 0, page, perPage }
}

export async function getBlogPost(id: number): Promise<BlogPost | null> {
  return queryOne<BlogPost>(
    `SELECT bp.*, u.name as author_name, c.name as category_name
     FROM blog_posts bp
     LEFT JOIN users u ON u.id = bp.author_id
     LEFT JOIN categories c ON c.id = bp.category_id
     WHERE bp.id = ?`,
    [id],
  )
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const post = await queryOne<BlogPost>(
    `SELECT bp.*, u.name as author_name, c.name as category_name
     FROM blog_posts bp
     LEFT JOIN users u ON u.id = bp.author_id
     LEFT JOIN categories c ON c.id = bp.category_id
     WHERE bp.slug = ? AND bp.status = 'PUBLISHED'`,
    [slug],
  )
  if (post) {
    await execute('UPDATE blog_posts SET view_count = view_count + 1 WHERE id = ?', [post.id])
  }
  return post
}

function slugify(title: string): string {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

export async function createBlogPost(data: Partial<BlogPost>): Promise<number> {
  const slug = data.slug || slugify(data.title || 'untitled')
  const result = await execute(
    `INSERT INTO blog_posts (title, slug, excerpt, content, author_id, category_id,
     cover_image, cover_image_alt, is_featured, status, published_at, scheduled_at,
     meta_title, meta_description, service_type, industry)
     VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    [
      data.title, slug, data.excerpt, data.content,
      data.author_id ?? null, data.category_id ?? null,
      data.cover_image ?? null, data.cover_image_alt ?? null,
      data.is_featured ?? 0, data.status ?? 'DRAFT',
      data.published_at ?? null, data.scheduled_at ?? null,
      data.meta_title ?? null, data.meta_description ?? null,
      data.service_type ?? null, data.industry ?? null,
    ],
  )
  return result.insertId
}

export async function updateBlogPost(id: number, data: Partial<BlogPost>): Promise<void> {
  const fields: string[] = []
  const vals: unknown[] = []
  const allowed = ['title','slug','excerpt','content','author_id','category_id','cover_image',
    'cover_image_alt','is_featured','status','published_at','scheduled_at','meta_title',
    'meta_description','service_type','industry']
  for (const k of allowed) {
    if (k in data) { fields.push(`${k} = ?`); vals.push((data as Record<string, unknown>)[k]) }
  }
  if (!fields.length) return
  vals.push(id)
  await execute(`UPDATE blog_posts SET ${fields.join(', ')} WHERE id = ?`, vals)
}

export async function deleteBlogPost(id: number): Promise<void> {
  await execute('DELETE FROM blog_posts WHERE id = ?', [id])
}

export async function duplicateBlogPost(id: number): Promise<number> {
  const post = await getBlogPost(id)
  if (!post) throw new Error('Post not found')
  return createBlogPost({
    ...post,
    id: undefined,
    title: `${post.title} (copy)`,
    slug: undefined,
    status: 'DRAFT',
    published_at: null,
    view_count: 0,
  })
}

export async function listPublicBlogPosts(page = 1, perPage = 12, category?: string, q?: string) {
  const offset = (page - 1) * perPage
  const wheres = [`bp.status = 'PUBLISHED'`]
  const vals: unknown[] = []
  if (category) { wheres.push('c.slug = ?'); vals.push(category) }
  if (q) { wheres.push('(bp.title LIKE ? OR bp.excerpt LIKE ?)'); vals.push(`%${q}%`, `%${q}%`) }
  const where = `WHERE ${wheres.join(' AND ')}`

  const [rows, countRow] = await Promise.all([
    query<BlogPost>(
      `SELECT bp.id, bp.title, bp.slug, bp.excerpt, bp.cover_image, bp.cover_image_alt,
       bp.published_at, bp.view_count, bp.service_type, bp.industry,
       u.name as author_name, c.name as category_name, c.slug as category_slug
       FROM blog_posts bp
       LEFT JOIN users u ON u.id = bp.author_id
       LEFT JOIN categories c ON c.id = bp.category_id
       ${where} ORDER BY bp.published_at DESC LIMIT ? OFFSET ?`,
      [...vals, perPage, offset],
    ),
    queryOne<{ total: number }>(
      `SELECT COUNT(*) as total FROM blog_posts bp
       LEFT JOIN categories c ON c.id = bp.category_id
       ${where}`,
      vals,
    ),
  ])
  return { data: rows, current_page: page, last_page: Math.ceil((countRow?.total ?? 0) / perPage), per_page: perPage, total: countRow?.total ?? 0 }
}
