import { query, queryOne, execute } from '@/db/pool'

export interface LeadMagnet {
  id: number; title: string; slug: string; excerpt: string | null
  content: string | null; pdf_url: string | null; cta_text: string | null
  thank_you_url: string | null; read_time_minutes: number | null
  cover_image: string | null; status: 'DRAFT' | 'PUBLISHED'
  published_at: string | null; meta_title: string | null; meta_description: string | null
  download_count: number; created_at: string; updated_at: string
}

function slugify(t: string) { return t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') }

export async function listLeadMagnets(opts: { page?: number; perPage?: number; status?: string; q?: string } = {}) {
  const { page = 1, perPage = 20, status, q } = opts
  const offset = (page - 1) * perPage
  const wheres: string[] = []
  const vals: unknown[] = []
  if (status && status !== 'all') { wheres.push('status = ?'); vals.push(status) }
  if (q) { wheres.push('title LIKE ?'); vals.push(`%${q}%`) }
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
     read_time_minutes, cover_image, status, published_at, meta_title, meta_description)
     VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    [
      data.title, slug, data.excerpt ?? null, data.content ?? null,
      data.pdf_url ?? null, data.cta_text ?? null, data.thank_you_url ?? null,
      data.read_time_minutes ?? null, data.cover_image ?? null,
      data.status ?? 'DRAFT', data.published_at ?? null,
      data.meta_title ?? null, data.meta_description ?? null,
    ],
  )
  return r.insertId
}

export async function updateLeadMagnet(id: number, data: Partial<LeadMagnet>): Promise<void> {
  const allowed = ['title','slug','excerpt','content','pdf_url','cta_text','thank_you_url',
    'read_time_minutes','cover_image','status','published_at','meta_title','meta_description']
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

export async function listPublicLeadMagnets(page = 1, perPage = 9): Promise<{ rows: LeadMagnet[]; total: number }> {
  const [rows, countRow] = await Promise.all([
    query<LeadMagnet>(`SELECT * FROM lead_magnets WHERE status = 'PUBLISHED' ORDER BY published_at DESC LIMIT ? OFFSET ?`, [perPage, (page - 1) * perPage]),
    queryOne<{ total: number }>(`SELECT COUNT(*) as total FROM lead_magnets WHERE status = 'PUBLISHED'`),
  ])
  return { rows, total: countRow?.total ?? 0 }
}
