import { query, queryOne, execute } from '@/db/pool'

export interface Lead {
  id: number; name: string; email: string; phone: string | null
  company: string | null; role: string | null
  source: string; status: string; notes: string | null; admin_notes: string | null
  metadata: Record<string, unknown> | null; ip_address: string | null
  follow_up_date: string | null; lead_score: number | null; is_read: number
  created_at: string; updated_at: string
}

interface ListOpts {
  page?: number; perPage?: number; status?: string; source?: string
  q?: string; dateFrom?: string; dateTo?: string; sort?: string
}

export async function listLeads(opts: ListOpts = {}) {
  const { page = 1, perPage = 50, status, source, q, dateFrom, dateTo, sort = 'created_at' } = opts
  const offset = (page - 1) * perPage
  const wheres: string[] = []
  const vals: unknown[] = []

  if (status && status !== 'all') {
    if (status === 'follow_up') {
      wheres.push(`follow_up_date <= CURDATE() AND status NOT IN ('CONVERTED','CLOSED','LOST','JUNK')`)
    } else {
      wheres.push('status = ?'); vals.push(status.toUpperCase())
    }
  }
  if (source && source !== 'all') { wheres.push('source = ?'); vals.push(source.toUpperCase()) }
  if (q) { wheres.push('(name LIKE ? OR email LIKE ? OR company LIKE ?)'); vals.push(`%${q}%`, `%${q}%`, `%${q}%`) }
  if (dateFrom) { wheres.push('DATE(created_at) >= ?'); vals.push(dateFrom) }
  if (dateTo) { wheres.push('DATE(created_at) <= ?'); vals.push(dateTo) }

  const where = wheres.length ? `WHERE ${wheres.join(' AND ')}` : ''
  const orderCol = ['created_at', 'follow_up_date', 'name'].includes(sort) ? sort : 'created_at'

  const [rows, countRow] = await Promise.all([
    query<Lead>(
      `SELECT * FROM leads ${where} ORDER BY ${orderCol} DESC LIMIT ? OFFSET ?`,
      [...vals, perPage, offset],
    ),
    queryOne<{ total: number }>(`SELECT COUNT(*) as total FROM leads ${where}`, vals),
  ])

  return { rows, total: countRow?.total ?? 0, page, perPage }
}

export async function getLead(id: number): Promise<Lead | null> {
  return queryOne<Lead>('SELECT * FROM leads WHERE id = ?', [id])
}

export async function createLead(data: {
  name: string; email: string; phone?: string; company?: string; role?: string
  source?: string; notes?: string; metadata?: Record<string, unknown>; ip_address?: string
}): Promise<number> {
  const result = await execute(
    `INSERT INTO leads (name, email, phone, company, role, source, notes, metadata, ip_address)
     VALUES (?,?,?,?,?,?,?,?,?)`,
    [
      data.name, data.email, data.phone ?? null, data.company ?? null,
      data.role ?? null, data.source ?? 'CONTACT_FORM', data.notes ?? null,
      data.metadata ? JSON.stringify(data.metadata) : null, data.ip_address ?? null,
    ],
  )
  return result.insertId
}

export async function updateLead(id: number, data: Partial<Lead>): Promise<void> {
  const allowed = ['status','admin_notes','follow_up_date','lead_score','is_read']
  const fields: string[] = []
  const vals: unknown[] = []
  for (const k of allowed) {
    if (k in data) { fields.push(`${k} = ?`); vals.push((data as Record<string, unknown>)[k]) }
  }
  if (!fields.length) return
  vals.push(id)
  await execute(`UPDATE leads SET ${fields.join(', ')} WHERE id = ?`, vals)
}

export async function deleteLead(id: number): Promise<void> {
  await execute('DELETE FROM leads WHERE id = ?', [id])
}

export async function getUnreadCount(): Promise<number> {
  const row = await queryOne<{ count: number }>(
    `SELECT COUNT(*) as count FROM leads WHERE status = 'NEW' AND is_read = 0`
  )
  return row?.count ?? 0
}

export async function getLeadStats() {
  const weekAgo = new Date(Date.now() - 7 * 86400000)
  const [total, week, followUp, converted, totalRows] = await Promise.all([
    queryOne<{ count: number }>('SELECT COUNT(*) as count FROM leads'),
    queryOne<{ count: number }>('SELECT COUNT(*) as count FROM leads WHERE created_at >= ?', [weekAgo]),
    queryOne<{ count: number }>(`SELECT COUNT(*) as count FROM leads WHERE follow_up_date <= CURDATE() AND status NOT IN ('CONVERTED','CLOSED','LOST','JUNK')`),
    queryOne<{ count: number }>(`SELECT COUNT(*) as count FROM leads WHERE status = 'CONVERTED'`),
    queryOne<{ count: number }>('SELECT COUNT(*) as count FROM leads'),
  ])
  const totalCount = total?.count ?? 0
  const conversionRate = totalCount > 0 ? ((converted?.count ?? 0) / totalCount * 100).toFixed(1) : '0'
  return { total: totalCount, week: week?.count ?? 0, followUp: followUp?.count ?? 0, conversionRate }
}
