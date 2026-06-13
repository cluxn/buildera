import { query, queryOne, execute } from '@/db/pool'

export interface ClientLogo {
  id: number; name: string; industry: string | null
  logo_url: string; visible: number; sort_order: number; created_at: string
}

export async function listClientLogos(): Promise<ClientLogo[]> {
  return query<ClientLogo>('SELECT * FROM client_logos ORDER BY sort_order ASC, name ASC')
}

export async function createClientLogo(data: Partial<ClientLogo>): Promise<number> {
  const r = await execute(
    'INSERT INTO client_logos (name, industry, logo_url, visible, sort_order) VALUES (?,?,?,?,?)',
    [data.name, data.industry ?? null, data.logo_url, data.visible ?? 1, data.sort_order ?? 0],
  )
  return r.insertId
}

export async function updateClientLogo(id: number, data: Partial<ClientLogo>): Promise<void> {
  const allowed = ['name','industry','logo_url','visible','sort_order']
  const fields: string[] = []; const vals: unknown[] = []
  for (const k of allowed) {
    if (k in data) { fields.push(`${k} = ?`); vals.push((data as Record<string, unknown>)[k]) }
  }
  if (!fields.length) return
  vals.push(id)
  await execute(`UPDATE client_logos SET ${fields.join(', ')} WHERE id = ?`, vals)
}

export async function deleteClientLogo(id: number): Promise<void> {
  await execute('DELETE FROM client_logos WHERE id = ?', [id])
}

export async function listVisibleClientLogos(): Promise<ClientLogo[]> {
  return query<ClientLogo>('SELECT * FROM client_logos WHERE visible = 1 ORDER BY sort_order ASC, name ASC')
}
