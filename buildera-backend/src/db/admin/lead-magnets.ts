import { query, queryOne, execute } from '@/db/pool'

export interface LeadMagnet {
  id: number; title: string; slug: string; excerpt: string | null
  content: string | null; pdf_url: string | null; cta_text: string | null
  thank_you_url: string | null; read_time_minutes: number | null
  cover_image: string | null; cover_image_alt: string | null
  resource_type: string; category: string | null
  status: 'DRAFT' | 'PUBLISHED'
  published_at: string | null; meta_title: string | null; meta_description: string | null
  download_count: number; created_at: string; updated_at: string
}

function slugify(t: string) { return t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') }

export async function listLeadMagnets(opts: { page?: number; perPage?: number; status?: string; q?: string; resourceType?: string; category?: string; dateFrom?: string; dateTo?: string } = {}) {
  const { page = 1, perPage = 20, status, q, resourceType, category, dateFrom, dateTo } = opts
  const offset = (page - 1) * perPage
  const wheres: string[] = []
  const vals: unknown[] = []
  if (status && status !== 'all') {
    if (status.toUpperCase() === 'SCHEDULED') {
      wheres.push("status = 'PUBLISHED'"); wheres.push('published_at > NOW()')
    } else {
      wheres.push('status = ?'); vals.push(status)
    }
  }
  if (q) { wheres.push('title LIKE ?'); vals.push(`%${q}%`) }
  if (resourceType) { wheres.push('resource_type = ?'); vals.push(resourceType) }
  if (category) { wheres.push('category = ?'); vals.push(category) }
  if (dateFrom) { wheres.push('DATE(published_at) >= ?'); vals.push(dateFrom) }
  if (dateTo) { wheres.push('DATE(published_at) <= ?'); vals.push(dateTo) }
  const where = wheres.length ? `WHERE ${wheres.join(' AND ')}` : ''

  const [rows, countRow] = await Promise.all([
    query<LeadMagnet>(`SELECT * FROM lead_magnets ${where} ORDER BY created_at DESC LIMIT ? OFFSET ?`, [...vals, perPage, offset]),
    queryOne<{ total: number }>(`SELECT COUNT(*) as total FROM lead_magnets ${where}`, vals),
  ])
  return { rows, total: countRow?.total ?? 0, page, perPage }
}

export async function getLeadMagnet(id: number): Promise<LeadMagnet | null> {
  return queryOne<LeadMagnet>('SELECT * FROM lead_magnets WHERE id = ?', [id])
}

export async function createLeadMagnet(data: Partial<LeadMagnet>): Promise<number> {
  const slug = data.slug || slugify(data.title || 'untitled')
  const r = await execute(
    `INSERT INTO lead_magnets (title, slug, excerpt, content, pdf_url, cta_text, thank_you_url,
     read_time_minutes, cover_image, cover_image_alt, resource_type, category, status, published_at, meta_title, meta_description)
     VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    [
      data.title, slug, data.excerpt ?? null, data.content ?? null,
      data.pdf_url ?? null, data.cta_text ?? null, data.thank_you_url ?? null,
      data.read_time_minutes ?? null, data.cover_image ?? null, data.cover_image_alt ?? null,
      data.resource_type ?? 'article', data.category ?? null,
      data.status ?? 'DRAFT', data.published_at ?? null,
      data.meta_title ?? null, data.meta_description ?? null,
    ],
  )
  return r.insertId
}

export async function updateLeadMagnet(id: number, data: Partial<LeadMagnet>): Promise<void> {
  const allowed = ['title','slug','excerpt','content','pdf_url','cta_text','thank_you_url',
    'read_time_minutes','cover_image','cover_image_alt','resource_type','category',
    'status','published_at','meta_title','meta_description']
  const fields: string[] = []; const vals: unknown[] = []
  for (const k of allowed) {
    if (k in data) { fields.push(`${k} = ?`); vals.push((data as Record<string, unknown>)[k]) }
  }
  if (!fields.length) return
  vals.push(id)
  await execute(`UPDATE lead_magnets SET ${fields.join(', ')} WHERE id = ?`, vals)
}

export async function deleteLeadMagnet(id: number): Promise<void> {
  await execute('DELETE FROM lead_magnets WHERE id = ?', [id])
}

export async function listPublicLeadMagnets(page = 1, perPage = 9, category?: string, resourceType?: string, q?: string, sort?: string): Promise<{ rows: LeadMagnet[]; total: number }> {
  const wheres = [`status = 'PUBLISHED'`, `(published_at IS NULL OR published_at <= NOW())`]
  const vals: unknown[] = []
  if (category) { wheres.push('category = ?'); vals.push(category) }
  if (resourceType) { wheres.push('resource_type = ?'); vals.push(resourceType) }
  if (q) { wheres.push('(title LIKE ? OR excerpt LIKE ?)'); vals.push(`%${q}%`, `%${q}%`) }
  const where = `WHERE ${wheres.join(' AND ')}`
  const orderBy = sort === 'oldest' ? 'published_at ASC' : sort === 'popular' ? 'download_count DESC' : 'published_at DESC'
  const [rows, countRow] = await Promise.all([
    query<LeadMagnet>(`SELECT * FROM lead_magnets ${where} ORDER BY ${orderBy} LIMIT ? OFFSET ?`, [...vals, perPage, (page - 1) * perPage]),
    queryOne<{ total: number }>(`SELECT COUNT(*) as total FROM lead_magnets ${where}`, vals),
  ])
  return { rows, total: countRow?.total ?? 0 }
}

export async function getLeadMagnetBySlug(slug: string): Promise<LeadMagnet | null> {
  return queryOne<LeadMagnet>(`SELECT * FROM lead_magnets WHERE slug = ? AND status = 'PUBLISHED' AND (published_at IS NULL OR published_at <= NOW())`, [slug])
}

// ─── Public content shapes (consumed by buildera-frontend /guides) ────────────

export type Guide = {
  id: number; title: string; slug: string; category: string
  description: string; resource_type: string
  cover_image: string | null; cover_image_alt: string | null; published_at: string
}
export type GuideDetail = Guide & { body: string; external_link: string | null; seo_title: string | null; seo_description: string | null }

export function toGuide(m: LeadMagnet): Guide {
  return {
    id: m.id, title: m.title, slug: m.slug, category: m.category ?? '',
    description: m.excerpt ?? '', resource_type: m.resource_type ?? 'article',
    cover_image: m.cover_image, cover_image_alt: m.cover_image_alt, published_at: m.published_at ?? '',
  }
}

export function toGuideDetail(m: LeadMagnet): GuideDetail {
  return {
    ...toGuide(m),
    body: m.content ?? '', external_link: m.pdf_url,
    seo_title: m.meta_title, seo_description: m.meta_description,
  }
}
