import { query, queryOne, execute } from '@/db/pool'

export interface Testimonial {
  id: number; person_name: string; person_title: string | null; company: string | null
  quote: string; rating: number; industry: string | null; service_category: string | null
  logo_url: string | null; visible: number; featured: number
  show_on_pages: string[] | null; sort_order: number; created_at: string
}

export async function listTestimonials(): Promise<Testimonial[]> {
  return query<Testimonial>('SELECT * FROM testimonials ORDER BY sort_order ASC, created_at DESC')
}

export async function getTestimonial(id: number): Promise<Testimonial | null> {
  return queryOne<Testimonial>('SELECT * FROM testimonials WHERE id = ?', [id])
}

export async function createTestimonial(data: Partial<Testimonial>): Promise<number> {
  const result = await execute(
    `INSERT INTO testimonials (person_name, person_title, company, quote, rating, industry,
     service_category, logo_url, visible, featured, show_on_pages, sort_order)
     VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`,
    [
      data.person_name, data.person_title ?? null, data.company ?? null,
      data.quote, data.rating ?? 5, data.industry ?? null,
      data.service_category ?? null, data.logo_url ?? null,
      data.visible ?? 1, data.featured ?? 0,
      data.show_on_pages ? JSON.stringify(data.show_on_pages) : null,
      data.sort_order ?? 0,
    ],
  )
  return result.insertId
}

export async function updateTestimonial(id: number, data: Partial<Testimonial>): Promise<void> {
  const allowed = ['person_name','person_title','company','quote','rating','industry',
    'service_category','logo_url','visible','featured','show_on_pages','sort_order']
  const fields: string[] = []; const vals: unknown[] = []
  for (const k of allowed) {
    if (k in data) {
      fields.push(`${k} = ?`)
      const v = (data as Record<string, unknown>)[k]
      vals.push(k === 'show_on_pages' && Array.isArray(v) ? JSON.stringify(v) : v)
    }
  }
  if (!fields.length) return
  vals.push(id)
  await execute(`UPDATE testimonials SET ${fields.join(', ')} WHERE id = ?`, vals)
}

export async function deleteTestimonial(id: number): Promise<void> {
  await execute('DELETE FROM testimonials WHERE id = ?', [id])
}

export async function listPublicTestimonials(service?: string, industry?: string): Promise<Testimonial[]> {
  const wheres = ['visible = 1']
  const vals: unknown[] = []
  if (service) { wheres.push('service_category = ?'); vals.push(service) }
  if (industry) { wheres.push('industry = ?'); vals.push(industry) }
  return query<Testimonial>(
    `SELECT * FROM testimonials WHERE ${wheres.join(' AND ')} ORDER BY featured DESC, sort_order ASC LIMIT 50`,
    vals,
  )
}
