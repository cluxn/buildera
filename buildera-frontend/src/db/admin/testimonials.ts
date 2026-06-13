import { query, queryOne, execute } from '@/db/pool'

export interface Testimonial {
  id: number; person_name: string; person_title: string | null; company: string | null
  quote: string; rating: number; industry: string | null; service_category: string | null
  logo_url: string | null; visible: number; featured: number; sort_order: number; created_at: string
}

// DB: client_name(→person_name), client_title(→person_title), client_company(→company),
//     content(→quote), client_photo(→logo_url), is_published(→visible), is_featured(→featured)
const SELECT_COLS = `
  id,
  client_name as person_name,
  client_title as person_title,
  client_company as company,
  content as quote,
  rating, industry, service_category,
  client_photo as logo_url,
  is_published as visible,
  is_featured as featured,
  sort_order, created_at
`

export async function listTestimonials(): Promise<Testimonial[]> {
  return query<Testimonial>(`SELECT ${SELECT_COLS} FROM testimonials ORDER BY sort_order ASC, created_at DESC`)
}

export async function getTestimonial(id: number): Promise<Testimonial | null> {
  return queryOne<Testimonial>(`SELECT ${SELECT_COLS} FROM testimonials WHERE id = ?`, [id])
}

export async function createTestimonial(data: Partial<Testimonial>): Promise<number> {
  const result = await execute(
    `INSERT INTO testimonials (client_name, client_title, client_company, content, rating, industry,
     service_category, client_photo, is_published, is_featured, sort_order)
     VALUES (?,?,?,?,?,?,?,?,?,?,?)`,
    [
      data.person_name, data.person_title ?? null, data.company ?? null,
      data.quote, data.rating ?? 5, data.industry ?? null,
      data.service_category ?? null, data.logo_url ?? null,
      data.visible ?? 1, data.featured ?? 0, data.sort_order ?? 0,
    ],
  )
  return result.insertId
}

export async function updateTestimonial(id: number, data: Partial<Testimonial>): Promise<void> {
  const fields: string[] = []; const vals: unknown[] = []
  const map: Record<string, string> = {
    person_name: 'client_name', person_title: 'client_title', company: 'client_company',
    quote: 'content', logo_url: 'client_photo', visible: 'is_published', featured: 'is_featured',
    rating: 'rating', industry: 'industry', service_category: 'service_category', sort_order: 'sort_order',
  }
  for (const [codeKey, dbCol] of Object.entries(map)) {
    if (codeKey in data) { fields.push(`${dbCol} = ?`); vals.push((data as Record<string, unknown>)[codeKey]) }
  }
  if (!fields.length) return
  vals.push(id)
  await execute(`UPDATE testimonials SET ${fields.join(', ')} WHERE id = ?`, vals)
}

export async function deleteTestimonial(id: number): Promise<void> {
  await execute('DELETE FROM testimonials WHERE id = ?', [id])
}

export async function listPublicTestimonials(service?: string, industry?: string): Promise<Testimonial[]> {
  const wheres = ['is_published = 1']
  const vals: unknown[] = []
  if (service) { wheres.push('service_category = ?'); vals.push(service) }
  if (industry) { wheres.push('industry = ?'); vals.push(industry) }
  return query<Testimonial>(
    `SELECT ${SELECT_COLS} FROM testimonials WHERE ${wheres.join(' AND ')} ORDER BY is_featured DESC, sort_order ASC LIMIT 50`,
    vals,
  )
}
