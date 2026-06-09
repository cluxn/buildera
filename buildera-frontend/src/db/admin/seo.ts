import { query, queryOne, execute } from '@/db/pool'

export interface SeoMeta {
  id: number; page_path: string; meta_title: string | null; meta_description: string | null
  og_title: string | null; og_description: string | null; og_image: string | null
  canonical_url: string | null; noindex: number; updated_at: string
}
export interface Redirect {
  id: number; from_path: string; to_path: string; redirect_type: string
  active: number; hit_count: number; created_at: string
}
export interface Script {
  id: number; name: string; content: string; location: 'HEAD' | 'BODY_START' | 'BODY_END'
  enabled: number; created_at: string; updated_at: string
}
export interface NotFoundLog {
  id: number; path: string; referrer: string | null; user_agent: string | null
  first_seen: string; last_seen: string; hit_count: number
}

export async function listSeoMeta(): Promise<SeoMeta[]> {
  return query<SeoMeta>('SELECT * FROM seo_meta ORDER BY page_path ASC')
}
export async function getSeoMeta(pagePathOrId: string | number): Promise<SeoMeta | null> {
  const col = typeof pagePathOrId === 'number' ? 'id' : 'page_path'
  return queryOne<SeoMeta>(`SELECT * FROM seo_meta WHERE ${col} = ?`, [pagePathOrId])
}
export async function upsertSeoMeta(pagePath: string, data: Partial<SeoMeta>): Promise<void> {
  await execute(
    `INSERT INTO seo_meta (page_path, meta_title, meta_description, og_title, og_description, og_image, canonical_url, noindex)
     VALUES (?,?,?,?,?,?,?,?)
     ON DUPLICATE KEY UPDATE meta_title=VALUES(meta_title), meta_description=VALUES(meta_description),
     og_title=VALUES(og_title), og_description=VALUES(og_description), og_image=VALUES(og_image),
     canonical_url=VALUES(canonical_url), noindex=VALUES(noindex)`,
    [pagePath, data.meta_title??null, data.meta_description??null, data.og_title??null,
     data.og_description??null, data.og_image??null, data.canonical_url??null, data.noindex??0],
  )
}

// DB columns: source_path(→from_path), destination_path(→to_path), status_code(→redirect_type), is_active(→active)
const REDIRECT_SELECT = `id, source_path as from_path, destination_path as to_path, status_code as redirect_type, is_active as active, hit_count, created_at`

export async function listRedirects(): Promise<Redirect[]> {
  return query<Redirect>(`SELECT ${REDIRECT_SELECT} FROM redirects ORDER BY created_at DESC`)
}
export async function createRedirect(from: string, to: string, type: string): Promise<number> {
  const r = await execute('INSERT INTO redirects (source_path, destination_path, status_code) VALUES (?,?,?)', [from, to, Number(type)])
  return r.insertId
}
export async function updateRedirect(id: number, data: Partial<Redirect>): Promise<void> {
  const fields: string[] = []; const vals: unknown[] = []
  const map: Record<string, string> = { from_path: 'source_path', to_path: 'destination_path', redirect_type: 'status_code', active: 'is_active' }
  for (const [codeKey, dbCol] of Object.entries(map)) {
    if (codeKey in data) { fields.push(`${dbCol} = ?`); vals.push((data as Record<string, unknown>)[codeKey]) }
  }
  if (!fields.length) return
  vals.push(id)
  await execute(`UPDATE redirects SET ${fields.join(', ')} WHERE id = ?`, vals)
}
export async function deleteRedirect(id: number): Promise<void> {
  await execute('DELETE FROM redirects WHERE id = ?', [id])
}
export async function incrementRedirectHit(fromPath: string): Promise<void> {
  await execute('UPDATE redirects SET hit_count = hit_count + 1 WHERE source_path = ? AND is_active = 1', [fromPath])
}
export async function getActiveRedirects(): Promise<Redirect[]> {
  return query<Redirect>(`SELECT ${REDIRECT_SELECT} FROM redirects WHERE is_active = 1`)
}

export async function listScripts(locationFilter?: string): Promise<Script[]> {
  if (locationFilter) return query<Script>('SELECT * FROM admin_scripts WHERE location = ? ORDER BY name', [locationFilter])
  return query<Script>('SELECT * FROM admin_scripts ORDER BY location, name')
}
export async function getEnabledScripts(): Promise<Script[]> {
  return query<Script>('SELECT * FROM admin_scripts WHERE enabled = 1 ORDER BY location, name')
}
export async function createScript(data: Partial<Script>): Promise<number> {
  const r = await execute(
    'INSERT INTO admin_scripts (name, content, location, enabled) VALUES (?,?,?,?)',
    [data.name, data.content, data.location ?? 'HEAD', data.enabled ?? 0],
  )
  return r.insertId
}
export async function updateScript(id: number, data: Partial<Script>): Promise<void> {
  const allowed = ['name','content','location','enabled']
  const fields: string[] = []; const vals: unknown[] = []
  for (const k of allowed) {
    if (k in data) { fields.push(`${k} = ?`); vals.push((data as Record<string, unknown>)[k]) }
  }
  if (!fields.length) return
  vals.push(id)
  await execute(`UPDATE admin_scripts SET ${fields.join(', ')} WHERE id = ?`, vals)
}
export async function deleteScript(id: number): Promise<void> {
  await execute('DELETE FROM admin_scripts WHERE id = ?', [id])
}

export async function list404Log(): Promise<NotFoundLog[]> {
  return query<NotFoundLog>('SELECT * FROM error_404_log ORDER BY hit_count DESC LIMIT 500')
}
export async function log404(path: string, referrer?: string, userAgent?: string): Promise<void> {
  await execute(
    `INSERT INTO error_404_log (path, referrer, user_agent, hit_count)
     VALUES (?,?,?,1)
     ON DUPLICATE KEY UPDATE hit_count = hit_count + 1, last_seen = CURRENT_TIMESTAMP, referrer = VALUES(referrer)`,
    [path.slice(0, 490), referrer?.slice(0, 490) ?? null, userAgent?.slice(0, 500) ?? null],
  )
}
export async function clear404Log(): Promise<void> {
  await execute('DELETE FROM error_404_log')
}
