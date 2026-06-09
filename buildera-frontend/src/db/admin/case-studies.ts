import { query, queryOne, execute } from '@/db/pool'

export interface CaseStudy {
  id: number; title: string; slug: string; client_name: string | null
  industry: string | null; service_category: string | null
  cover_image: string | null; cover_image_alt: string | null
  challenge: string | null; solution: string | null; outcome: string | null
  result_stats: Record<string, unknown> | null; is_featured: number
  status: 'DRAFT' | 'PUBLISHED'; published_at: string | null
  meta_title: string | null; meta_description: string | null
  view_count: number; created_at: string; updated_at: string
}

function slugify(t: string) { return t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') }

export async function listCaseStudies(opts: { page?: number; perPage?: number; status?: string; q?: string } = {}) {
  const { page = 1, perPage = 20, status, q } = opts
  const offset = (page - 1) * perPage
  const wheres: string[] = []
  const vals: unknown[] = []
  if (status && status !== 'all') { wheres.push('status = ?'); vals.push(status) }
  if (q) { wheres.push('(title LIKE ? OR client_name LIKE ?)'); vals.push(`%${q}%`, `%${q}%`) }
  const where = wheres.length ? `WHERE ${wheres.join(' AND ')}` : ''

  const [rows, countRow] = await Promise.all([
    query<CaseStudy>(`SELECT * FROM case_studies ${where} ORDER BY created_at DESC LIMIT ? OFFSET ?`, [...vals, perPage, offset]),
    queryOne<{ total: number }>(`SELECT COUNT(*) as total FROM case_studies ${where}`, vals),
  ])
  return { rows, total: countRow?.total ?? 0, page, perPage }
}

export async function getCaseStudy(id: number): Promise<CaseStudy | null> {
  return queryOne<CaseStudy>('SELECT * FROM case_studies WHERE id = ?', [id])
}

export async function createCaseStudy(data: Partial<CaseStudy>): Promise<number> {
  const slug = data.slug || slugify(data.title || 'untitled')
  const r = await execute(
    `INSERT INTO case_studies (title, slug, client_name, industry, service_category, cover_image, cover_image_alt,
     challenge, solution, outcome, result_stats, is_featured, status, published_at, meta_title, meta_description)
     VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    [
      data.title, slug, data.client_name ?? null, data.industry ?? null, data.service_category ?? null,
      data.cover_image ?? null, data.cover_image_alt ?? null, data.challenge ?? null,
      data.solution ?? null, data.outcome ?? null,
      data.result_stats ? JSON.stringify(data.result_stats) : null,
      data.is_featured ?? 0, data.status ?? 'DRAFT', data.published_at ?? null,
      data.meta_title ?? null, data.meta_description ?? null,
    ],
  )
  return r.insertId
}

export async function updateCaseStudy(id: number, data: Partial<CaseStudy>): Promise<void> {
  const allowed = ['title','slug','client_name','industry','service_category','cover_image','cover_image_alt',
    'challenge','solution','outcome','result_stats','is_featured','status','published_at','meta_title','meta_description']
  const fields: string[] = []; const vals: unknown[] = []
  for (const k of allowed) {
    if (k in data) {
      fields.push(`${k} = ?`)
      const v = (data as Record<string, unknown>)[k]
      vals.push(k === 'result_stats' && v && typeof v === 'object' ? JSON.stringify(v) : v)
    }
  }
  if (!fields.length) return
  vals.push(id)
  await execute(`UPDATE case_studies SET ${fields.join(', ')} WHERE id = ?`, vals)
}

export async function deleteCaseStudy(id: number): Promise<void> {
  await execute('DELETE FROM case_studies WHERE id = ?', [id])
}

export async function listPublicCaseStudies(page = 1, perPage = 9, industry?: string): Promise<{ rows: CaseStudy[]; total: number }> {
  const wheres = [`status = 'PUBLISHED'`]
  const vals: unknown[] = []
  if (industry) { wheres.push('industry = ?'); vals.push(industry) }
  const where = `WHERE ${wheres.join(' AND ')}`
  const [rows, countRow] = await Promise.all([
    query<CaseStudy>(`SELECT * FROM case_studies ${where} ORDER BY is_featured DESC, published_at DESC LIMIT ? OFFSET ?`, [...vals, perPage, (page - 1) * perPage]),
    queryOne<{ total: number }>(`SELECT COUNT(*) as total FROM case_studies ${where}`, vals),
  ])
  return { rows, total: countRow?.total ?? 0 }
}
