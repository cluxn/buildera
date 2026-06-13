import { query, queryOne, execute } from '@/db/pool'

export interface BlogPost {
  id: number; title: string; slug: string; excerpt: string | null
  content: string | null; author_id: number | null; category: string | null; category_id?: number | null
  service_type: string | null; industry: string | null
  cover_image: string | null; cover_image_alt: string | null; is_featured: number
  status: string; published_at: string | null
  meta_title: string | null; meta_description: string | null
  view_count: number; created_at: string; updated_at: string
  author_name?: string | null
}

// DB has: body, featured_image, featured_image_alt, views, category(string), seo_title, seo_description
// We alias to what the code expects
const SELECT_COLS = `
  bp.id, bp.title, bp.slug, bp.excerpt,
  bp.body as content,
  bp.author_id,
  bp.category,
  bp.service_type,
  bp.industry,
  bp.featured_image as cover_image,
  bp.featured_image_alt as cover_image_alt,
  bp.is_featured,
  bp.status,
  bp.is_published,
  bp.published_at,
  bp.seo_title as meta_title,
  bp.seo_description as meta_description,
  bp.views as view_count,
  bp.created_at, bp.updated_at,
  u.name as author_name
`

interface ListOpts {
  page?: number; perPage?: number; status?: string; q?: string
  category?: string; service?: string; industry?: string
  dateFrom?: string; dateTo?: string
}

export async function listBlogPosts(opts: ListOpts = {}) {
  const { page = 1, perPage = 20, status, q, category, service, industry, dateFrom, dateTo } = opts
  const offset = (page - 1) * perPage
  const wheres: string[] = []
  const vals: unknown[] = []
  if (status && status !== 'all') {
    if (status.toUpperCase() === 'SCHEDULED') {
      wheres.push("bp.status = 'published'"); wheres.push('bp.published_at > NOW()')
    } else {
      wheres.push('bp.status = ?'); vals.push(status.toLowerCase())
    }
  }
  if (q) { wheres.push('(bp.title LIKE ? OR bp.excerpt LIKE ?)'); vals.push(`%${q}%`, `%${q}%`) }
  if (category) { wheres.push('bp.category = ?'); vals.push(category) }
  if (service) { wheres.push('bp.service_type = ?'); vals.push(service) }
  if (industry) { wheres.push('bp.industry = ?'); vals.push(industry) }
  if (dateFrom) { wheres.push('DATE(bp.published_at) >= ?'); vals.push(dateFrom) }
  if (dateTo) { wheres.push('DATE(bp.published_at) <= ?'); vals.push(dateTo) }
  const where = wheres.length ? `WHERE ${wheres.join(' AND ')}` : ''

  const [rows, countRow] = await Promise.all([
    query<BlogPost>(
      `SELECT ${SELECT_COLS} FROM blog_posts bp LEFT JOIN users u ON u.id = bp.author_id
       ${where} ORDER BY bp.created_at DESC LIMIT ? OFFSET ?`,
      [...vals, perPage, offset],
    ),
    queryOne<{ total: number }>(`SELECT COUNT(*) as total FROM blog_posts bp ${where}`, vals),
  ])
  return { rows: rows.map(normalizePost), total: countRow?.total ?? 0, page, perPage }
}

export async function getBlogPost(id: number): Promise<BlogPost | null> {
  const post = await queryOne<BlogPost>(
    `SELECT ${SELECT_COLS} FROM blog_posts bp LEFT JOIN users u ON u.id = bp.author_id WHERE bp.id = ?`,
    [id],
  )
  return post ? normalizePost(post) : null
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const post = await queryOne<BlogPost>(
    `SELECT ${SELECT_COLS} FROM blog_posts bp LEFT JOIN users u ON u.id = bp.author_id
     WHERE bp.slug = ? AND bp.status = 'published' AND (bp.published_at IS NULL OR bp.published_at <= NOW())`,
    [slug],
  )
  if (post) {
    await execute('UPDATE blog_posts SET views = views + 1 WHERE id = ?', [post.id])
  }
  return post ? normalizePost(post) : null
}

function slugify(title: string): string {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

function normalizePost(post: BlogPost): BlogPost {
  return {
    ...post,
    status: (post.status ?? 'draft').toLowerCase(),
  }
}

export async function createBlogPost(data: Partial<BlogPost>): Promise<number> {
  const slug = data.slug || slugify(data.title || 'untitled')
  const status = (data.status ?? 'draft').toLowerCase()
  const result = await execute(
    `INSERT INTO blog_posts (title, slug, excerpt, body, author_id, category,
     service_type, industry,
     featured_image, featured_image_alt, is_featured, status, is_published, published_at,
     seo_title, seo_description)
     VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    [
      data.title, slug, data.excerpt ?? null, data.content ?? null,
      data.author_id ?? null, data.category ?? null,
      data.service_type ?? null, data.industry ?? null,
      data.cover_image ?? null, data.cover_image_alt ?? null,
      data.is_featured ?? 0, status,
      status === 'published' ? 1 : 0,
      data.published_at ?? null,
      data.meta_title ?? null, data.meta_description ?? null,
    ],
  )
  return result.insertId
}

export async function updateBlogPost(id: number, data: Partial<BlogPost>): Promise<void> {
  const fields: string[] = []
  const vals: unknown[] = []
  const map: Record<string, string> = {
    title: 'title', slug: 'slug', excerpt: 'excerpt', content: 'body',
    author_id: 'author_id', category: 'category',
    service_type: 'service_type', industry: 'industry',
    cover_image: 'featured_image', cover_image_alt: 'featured_image_alt',
    is_featured: 'is_featured', published_at: 'published_at',
    meta_title: 'seo_title', meta_description: 'seo_description',
  }
  for (const [codeKey, dbCol] of Object.entries(map)) {
    if (codeKey in data) { fields.push(`${dbCol} = ?`); vals.push((data as Record<string, unknown>)[codeKey]) }
  }
  if ('status' in data && data.status) {
    const s = (data.status as string).toLowerCase()
    fields.push('status = ?', 'is_published = ?')
    vals.push(s, s === 'published' ? 1 : 0)
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
    status: 'draft',
    published_at: null,
    view_count: 0,
  })
}

export async function listPublicBlogPosts(page = 1, perPage = 12, category?: string, q?: string, sort?: string) {
  const offset = (page - 1) * perPage
  const wheres = [`bp.status = 'published'`, `(bp.published_at IS NULL OR bp.published_at <= NOW())`]
  const vals: unknown[] = []
  if (category) { wheres.push('bp.category = ?'); vals.push(category) }
  if (q) { wheres.push('(bp.title LIKE ? OR bp.excerpt LIKE ?)'); vals.push(`%${q}%`, `%${q}%`) }
  const where = `WHERE ${wheres.join(' AND ')}`
  const orderBy = sort === 'oldest' ? 'bp.published_at ASC' : sort === 'popular' ? 'bp.views DESC' : 'bp.published_at DESC'

  const [rows, countRow] = await Promise.all([
    query<BlogPost>(
      `SELECT bp.id, bp.title, bp.slug, bp.excerpt,
       bp.featured_image as cover_image, bp.featured_image_alt as cover_image_alt,
       bp.published_at, bp.views as view_count, bp.category,
       u.name as author_name
       FROM blog_posts bp LEFT JOIN users u ON u.id = bp.author_id
       ${where} ORDER BY ${orderBy} LIMIT ? OFFSET ?`,
      [...vals, perPage, offset],
    ),
    queryOne<{ total: number }>(
      `SELECT COUNT(*) as total FROM blog_posts bp ${where}`, vals,
    ),
  ])
  const total = countRow?.total ?? 0
  return { data: rows, current_page: page, last_page: Math.ceil(total / perPage), per_page: perPage, total }
}
