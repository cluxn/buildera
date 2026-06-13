import { query, queryOne, execute } from '@/db/pool'

export interface CaseStudy {
  id: number; title: string; slug: string; client_name: string | null
  industry: string | null; service_category: string | null
  cover_image: string | null; cover_image_alt: string | null
  challenge: string | null; solution: string | null; outcome: string | null
  result_stats: Record<string, unknown> | null; is_featured: number
  status: 'DRAFT' | 'PUBLISHED'; published_at: string | null
  meta_title: string | null; meta_description: string | null
  testimonial_quote: string | null; testimonial_author: string | null
  view_count: number; created_at: string; updated_at: string
}

// DB columns: results(→outcome), key_metrics(→result_stats), featured_image(→cover_image),
//             featured_image_alt(→cover_image_alt), is_published bool(→status), seo_title(→meta_title),
//             service_tags(→service_category), seo_description(→meta_description)
const SELECT_COLS = `
  id, title, slug, client_name, industry,
  service_tags as service_category,
  featured_image as cover_image,
  featured_image_alt as cover_image_alt,
  challenge, solution,
  results as outcome,
  key_metrics as result_stats,
  is_featured,
  IF(is_published = 1, 'PUBLISHED', 'DRAFT') as status,
  is_published,
  published_at,
  seo_title as meta_title,
  seo_description as meta_description,
  testimonial_quote, testimonial_author,
  view_count, created_at, updated_at
`

function slugify(t: string) { return t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') }

export async function listCaseStudies(opts: { page?: number; perPage?: number; status?: string; q?: string; industry?: string; service?: string; dateFrom?: string; dateTo?: string } = {}) {
  const { page = 1, perPage = 20, status, q, industry, service, dateFrom, dateTo } = opts
  const offset = (page - 1) * perPage
  const wheres: string[] = []
  const vals: unknown[] = []
  if (status && status !== 'all') {
    if (status.toUpperCase() === 'SCHEDULED') {
      wheres.push('is_published = 1'); wheres.push('published_at > NOW()')
    } else {
      wheres.push('is_published = ?')
      vals.push(status.toUpperCase() === 'PUBLISHED' ? 1 : 0)
    }
  }
  if (q) { wheres.push('(title LIKE ? OR client_name LIKE ?)'); vals.push(`%${q}%`, `%${q}%`) }
  if (industry) { wheres.push('industry = ?'); vals.push(industry) }
  if (service) { wheres.push('service_tags = ?'); vals.push(service) }
  if (dateFrom) { wheres.push('DATE(published_at) >= ?'); vals.push(dateFrom) }
  if (dateTo) { wheres.push('DATE(published_at) <= ?'); vals.push(dateTo) }
  const where = wheres.length ? `WHERE ${wheres.join(' AND ')}` : ''

  const [rows, countRow] = await Promise.all([
    query<CaseStudy>(`SELECT ${SELECT_COLS} FROM case_studies ${where} ORDER BY created_at DESC LIMIT ? OFFSET ?`, [...vals, perPage, offset]),
    queryOne<{ total: number }>(`SELECT COUNT(*) as total FROM case_studies ${where}`, vals),
  ])
  return { rows, total: countRow?.total ?? 0, page, perPage }
}

export async function getCaseStudy(id: number): Promise<CaseStudy | null> {
  return queryOne<CaseStudy>(`SELECT ${SELECT_COLS} FROM case_studies WHERE id = ?`, [id])
}

export async function createCaseStudy(data: Partial<CaseStudy>): Promise<number> {
  const slug = data.slug || slugify(data.title || 'untitled')
  const isPublished = data.status?.toUpperCase() === 'PUBLISHED' ? 1 : 0
  const r = await execute(
    `INSERT INTO case_studies (title, slug, client_name, industry, service_tags,
     featured_image, featured_image_alt, challenge, solution, results, key_metrics,
     is_featured, is_published, published_at, seo_title, seo_description)
     VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    [
      data.title, slug, data.client_name ?? null, data.industry ?? null,
      data.service_category ?? null,
      data.cover_image ?? null, data.cover_image_alt ?? null,
      data.challenge ?? null, data.solution ?? null, data.outcome ?? null,
      data.result_stats ? JSON.stringify(data.result_stats) : null,
      data.is_featured ?? 0, isPublished, data.published_at ?? null,
      data.meta_title ?? null, data.meta_description ?? null,
    ],
  )
  return r.insertId
}

export async function updateCaseStudy(id: number, data: Partial<CaseStudy>): Promise<void> {
  const fields: string[] = []; const vals: unknown[] = []
  const map: Record<string, string> = {
    title: 'title', slug: 'slug', client_name: 'client_name', industry: 'industry',
    service_category: 'service_tags', cover_image: 'featured_image',
    cover_image_alt: 'featured_image_alt', challenge: 'challenge', solution: 'solution',
    outcome: 'results', is_featured: 'is_featured',
    published_at: 'published_at', meta_title: 'seo_title', meta_description: 'seo_description',
  }
  for (const [codeKey, dbCol] of Object.entries(map)) {
    if (codeKey in data) {
      fields.push(`${dbCol} = ?`)
      const v = (data as Record<string, unknown>)[codeKey]
      vals.push(v)
    }
  }
  if ('result_stats' in data) {
    fields.push('key_metrics = ?')
    const v = data.result_stats
    vals.push(v && typeof v === 'object' ? JSON.stringify(v) : v)
  }
  if ('status' in data && data.status) {
    fields.push('is_published = ?')
    vals.push(data.status.toUpperCase() === 'PUBLISHED' ? 1 : 0)
  }
  if (!fields.length) return
  vals.push(id)
  await execute(`UPDATE case_studies SET ${fields.join(', ')} WHERE id = ?`, vals)
}

export async function deleteCaseStudy(id: number): Promise<void> {
  await execute('DELETE FROM case_studies WHERE id = ?', [id])
}

export async function listPublicCaseStudies(page = 1, perPage = 9, industry?: string, q?: string, sort?: string): Promise<{ rows: CaseStudy[]; total: number }> {
  const wheres = [`is_published = 1`, `(published_at IS NULL OR published_at <= NOW())`]
  const vals: unknown[] = []
  if (industry) { wheres.push('industry = ?'); vals.push(industry) }
  if (q) { wheres.push('(title LIKE ? OR client_name LIKE ?)'); vals.push(`%${q}%`, `%${q}%`) }
  const where = `WHERE ${wheres.join(' AND ')}`
  const orderBy = sort === 'oldest' ? 'published_at ASC' : sort === 'popular' ? 'view_count DESC' : 'is_featured DESC, published_at DESC'
  const [rows, countRow] = await Promise.all([
    query<CaseStudy>(`SELECT ${SELECT_COLS} FROM case_studies ${where} ORDER BY ${orderBy} LIMIT ? OFFSET ?`, [...vals, perPage, (page - 1) * perPage]),
    queryOne<{ total: number }>(`SELECT COUNT(*) as total FROM case_studies ${where}`, vals),
  ])
  return { rows, total: countRow?.total ?? 0 }
}

export async function getCaseStudyBySlug(slug: string): Promise<CaseStudy | null> {
  const study = await queryOne<CaseStudy>(
    `SELECT ${SELECT_COLS} FROM case_studies WHERE slug = ? AND is_published = 1 AND (published_at IS NULL OR published_at <= NOW())`,
    [slug],
  )
  if (study) {
    await execute('UPDATE case_studies SET view_count = view_count + 1 WHERE id = ?', [study.id])
  }
  return study
}

// ─── Public content shapes (consumed by buildera-frontend /case-studies) ──────

export type ContentCaseStudy = {
  id: number; title: string; slug: string; client_name: string | null
  industry: string; hero_image: string | null; hero_image_alt: string | null
  key_metrics: { label: string; value: string }[]; published_at: string
}
export type ContentCaseStudyDetail = ContentCaseStudy & {
  problem: string; solution: string; results: string
  testimonial_quote: string | null; testimonial_author: string | null
  seo_title: string | null; seo_description: string | null
}

function parseKeyMetrics(raw: CaseStudy['result_stats']): { label: string; value: string }[] {
  if (!raw) return []
  try {
    const parsed = typeof raw === 'string' ? JSON.parse(raw) : raw
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function toContentCaseStudy(c: CaseStudy): ContentCaseStudy {
  return {
    id: c.id, title: c.title, slug: c.slug, client_name: c.client_name,
    industry: c.industry ?? '', hero_image: c.cover_image, hero_image_alt: c.cover_image_alt,
    key_metrics: parseKeyMetrics(c.result_stats), published_at: c.published_at ?? '',
  }
}

export function toContentCaseStudyDetail(c: CaseStudy): ContentCaseStudyDetail {
  return {
    ...toContentCaseStudy(c),
    problem: c.challenge ?? '', solution: c.solution ?? '', results: c.outcome ?? '',
    testimonial_quote: c.testimonial_quote, testimonial_author: c.testimonial_author,
    seo_title: c.meta_title, seo_description: c.meta_description,
  }
}
