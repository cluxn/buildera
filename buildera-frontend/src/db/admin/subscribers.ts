import { query, queryOne, execute } from '@/db/pool'

export interface Subscriber {
  id: number; email: string; name: string | null; source: string | null
  status: 'ACTIVE' | 'UNSUBSCRIBED'; subscribed_at: string; unsubscribed_at: string | null
}

export async function listSubscribers(opts: { status?: string; q?: string; page?: number; perPage?: number } = {}) {
  const { status, q, page = 1, perPage = 50 } = opts
  const offset = (page - 1) * perPage
  const wheres: string[] = []
  const vals: unknown[] = []
  if (status && status !== 'all') { wheres.push('status = ?'); vals.push(status.toUpperCase()) }
  if (q) { wheres.push('(email LIKE ? OR name LIKE ?)'); vals.push(`%${q}%`, `%${q}%`) }
  const where = wheres.length ? `WHERE ${wheres.join(' AND ')}` : ''

  const [rows, countRow] = await Promise.all([
    query<Subscriber>(`SELECT * FROM newsletter_subscribers ${where} ORDER BY subscribed_at DESC LIMIT ? OFFSET ?`, [...vals, perPage, offset]),
    queryOne<{ total: number }>(`SELECT COUNT(*) as total FROM newsletter_subscribers ${where}`, vals),
  ])
  return { rows, total: countRow?.total ?? 0, page, perPage }
}

export async function getSubscriberStats() {
  const [active, unsub, weekRow] = await Promise.all([
    queryOne<{ count: number }>(`SELECT COUNT(*) as count FROM newsletter_subscribers WHERE status = 'ACTIVE'`),
    queryOne<{ count: number }>(`SELECT COUNT(*) as count FROM newsletter_subscribers WHERE status = 'UNSUBSCRIBED'`),
    queryOne<{ count: number }>(`SELECT COUNT(*) as count FROM newsletter_subscribers WHERE subscribed_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)`),
  ])
  return { active: active?.count ?? 0, unsubscribed: unsub?.count ?? 0, thisWeek: weekRow?.count ?? 0 }
}

export async function updateSubscriberStatus(id: number, status: 'ACTIVE' | 'UNSUBSCRIBED'): Promise<void> {
  await execute('UPDATE newsletter_subscribers SET status = ? WHERE id = ?', [status, id])
}

export async function deleteSubscriber(id: number): Promise<void> {
  await execute('DELETE FROM newsletter_subscribers WHERE id = ?', [id])
}
