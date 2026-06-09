import { query, queryOne, execute } from '@/db/pool'

export interface MarketingElement {
  id: number; name: string
  type: 'POPUP'|'ANNOUNCEMENT_BAR'|'NUDGE'|'BANNER_AD'|'MINI_CTA'|'MINI_LEAD_CAPTURE_FORM'
  content: Record<string, unknown>; enabled: number
  start_date: string | null; end_date: string | null; target_pattern: string | null
  delay_ms: number | null; created_at: string; updated_at: string
}

export async function listMarketingElements(type?: string): Promise<MarketingElement[]> {
  if (type) return query<MarketingElement>('SELECT * FROM marketing_elements WHERE type = ? ORDER BY created_at DESC', [type.toUpperCase()])
  return query<MarketingElement>('SELECT * FROM marketing_elements ORDER BY type, created_at DESC')
}

export async function getMarketingElement(id: number): Promise<MarketingElement | null> {
  return queryOne<MarketingElement>('SELECT * FROM marketing_elements WHERE id = ?', [id])
}

export async function createMarketingElement(data: Partial<MarketingElement>): Promise<number> {
  const r = await execute(
    `INSERT INTO marketing_elements (name, type, content, enabled, start_date, end_date, target_pattern, delay_ms)
     VALUES (?,?,?,?,?,?,?,?)`,
    [
      data.name, data.type, JSON.stringify(data.content ?? {}),
      data.enabled ?? 0, data.start_date ?? null, data.end_date ?? null,
      data.target_pattern ?? null, data.delay_ms ?? null,
    ],
  )
  return r.insertId
}

export async function updateMarketingElement(id: number, data: Partial<MarketingElement>): Promise<void> {
  const fields: string[] = []; const vals: unknown[] = []
  if ('name' in data) { fields.push('name = ?'); vals.push(data.name) }
  if ('type' in data) { fields.push('type = ?'); vals.push(data.type) }
  if ('content' in data) { fields.push('content = ?'); vals.push(JSON.stringify(data.content)) }
  if ('enabled' in data) { fields.push('enabled = ?'); vals.push(data.enabled) }
  if ('start_date' in data) { fields.push('start_date = ?'); vals.push(data.start_date) }
  if ('end_date' in data) { fields.push('end_date = ?'); vals.push(data.end_date) }
  if ('target_pattern' in data) { fields.push('target_pattern = ?'); vals.push(data.target_pattern) }
  if ('delay_ms' in data) { fields.push('delay_ms = ?'); vals.push(data.delay_ms) }
  if (!fields.length) return
  vals.push(id)
  await execute(`UPDATE marketing_elements SET ${fields.join(', ')} WHERE id = ?`, vals)
}

export async function deleteMarketingElement(id: number): Promise<void> {
  await execute('DELETE FROM marketing_elements WHERE id = ?', [id])
}

export async function getEnabledMarketingElements(): Promise<MarketingElement[]> {
  const now = new Date().toISOString().slice(0, 19)
  return query<MarketingElement>(
    `SELECT * FROM marketing_elements WHERE enabled = 1
     AND (start_date IS NULL OR start_date <= ?)
     AND (end_date IS NULL OR end_date >= ?)`,
    [now, now],
  )
}
