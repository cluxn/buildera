import { NextRequest, NextResponse } from 'next/server'
import { verifySession } from '@/backend/auth/session'
import { query } from '@/db/pool'

const ROLE_LEADS = ['SUPER_ADMIN', 'ADMIN', 'MARKETING_MANAGER']

const COLUMNS = [
  { key: 'id',            label: 'ID' },
  { key: 'name',          label: 'Name' },
  { key: 'email',         label: 'Email' },
  { key: 'phone',         label: 'Phone' },
  { key: 'company',       label: 'Company' },
  { key: 'role',          label: 'Role / Service Interest' },
  { key: 'source',        label: 'Source' },
  { key: 'status',        label: 'Status' },
  { key: 'message',       label: 'Message' },
  { key: 'admin_notes',   label: 'Admin Notes' },
  { key: 'lead_score',    label: 'Lead Score' },
  { key: 'follow_up_date',label: 'Follow-up Date' },
  { key: 'ip_address',    label: 'IP Address' },
  { key: 'created_at',    label: 'Created At' },
  { key: 'updated_at',    label: 'Updated At' },
]

const SAMPLE_ROW: Record<string, string> = {
  id: '1',
  name: 'Jane Smith',
  email: 'jane@example.com',
  phone: '+1 555 000 0000',
  company: 'Acme Corp',
  role: 'Website Development',
  source: 'CONTACT_FORM',
  status: 'NEW',
  message: 'We need a new website for our company.',
  admin_notes: 'Followed up via email',
  lead_score: '80',
  follow_up_date: '2026-07-05',
  ip_address: '192.168.1.1',
  created_at: '2026-06-27 10:00:00',
  updated_at: '2026-06-27 10:00:00',
}

function csvEscape(val: unknown): string {
  const s = val == null ? '' : String(val)
  if (s.includes(',') || s.includes('"') || s.includes('\n') || s.includes('\r')) {
    return `"${s.replace(/"/g, '""')}"`
  }
  return s
}

function buildCsv(rows: Record<string, unknown>[]): string {
  const header = COLUMNS.map(c => csvEscape(c.label)).join(',')
  const body = rows.map(row =>
    COLUMNS.map(c => csvEscape(row[c.key])).join(',')
  ).join('\r\n')
  return `${header}\r\n${body}`
}

export async function GET(request: NextRequest) {
  const session = await verifySession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  if (!ROLE_LEADS.includes(session.role)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const sp = request.nextUrl.searchParams
  const format = (sp.get('format') ?? 'csv').toLowerCase()

  // Sample template — no DB query needed
  if (format === 'sample') {
    const csv = buildCsv([SAMPLE_ROW as Record<string, unknown>])
    const bom = '﻿'
    return new NextResponse(bom + csv, {
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': 'attachment; filename="leads-sample-template.csv"',
      },
    })
  }

  // Build filter WHERE clause (same logic as listLeads)
  const status = sp.get('status')
  const source = sp.get('source')
  const q = sp.get('q')
  const dateFrom = sp.get('date_from')
  const dateTo = sp.get('date_to')

  const wheres: string[] = []
  const vals: unknown[] = []
  if (status && status !== 'all') {
    if (status === 'follow_up') {
      wheres.push(`follow_up_date <= CURDATE() AND status NOT IN ('converted','closed','lost','junk')`)
    } else {
      wheres.push('LOWER(status) = LOWER(?)'); vals.push(status)
    }
  }
  if (source && source !== 'all') { wheres.push('LOWER(source_form) = LOWER(?)'); vals.push(source) }
  if (q) { wheres.push('(name LIKE ? OR email LIKE ? OR company LIKE ?)'); vals.push(`%${q}%`, `%${q}%`, `%${q}%`) }
  if (dateFrom) { wheres.push('DATE(created_at) >= ?'); vals.push(dateFrom) }
  if (dateTo) { wheres.push('DATE(created_at) <= ?'); vals.push(dateTo) }
  const where = wheres.length ? `WHERE ${wheres.join(' AND ')}` : ''

  const rows = await query<Record<string, unknown>>(
    `SELECT *, source_form as source, service_interest as role, ip_hash as ip_address
     FROM leads ${where} ORDER BY created_at DESC LIMIT 10000`,
    vals,
  )

  const csv = buildCsv(rows)
  const bom = '﻿' // UTF-8 BOM — Excel auto-detects encoding
  const date = new Date().toISOString().slice(0, 10)

  // Both csv and excel use the same CSV content; Excel reads UTF-8 CSV fine with BOM
  const filename = format === 'excel'
    ? `leads-export-${date}.xlsx`
    : `leads-export-${date}.csv`
  const contentType = format === 'excel'
    ? 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    : 'text/csv; charset=utf-8'

  return new NextResponse(bom + csv, {
    headers: {
      'Content-Type': contentType,
      'Content-Disposition': `attachment; filename="${filename}"`,
    },
  })
}
