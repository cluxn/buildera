import { NextRequest, NextResponse } from 'next/server'
import { createLead } from '@/db/admin/leads'
import { checkRateLimit } from '@/backend/forms/rateLimit'
import { fireN8nWebhook } from '@/backend/webhooks/n8n'

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for') ?? 'unknown'
  if (!checkRateLimit(`leads:${ip}`, 5, 3600 * 1000)) {
    return NextResponse.json({ error: 'Too many submissions' }, { status: 429 })
  }

  const apiKey = request.headers.get('x-api-key')
  if (process.env.APP_API_KEY && apiKey !== process.env.APP_API_KEY) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let body: Record<string, unknown>
  try { body = await request.json() } catch { return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 }) }

  const { name, email, phone, company, role, source, notes, metadata } = body as Record<string, string>
  if (!name || !email) return NextResponse.json({ error: 'name and email are required' }, { status: 422 })

  const id = await createLead({
    name, email, phone, company, role,
    source: source || 'CONTACT_FORM',
    notes,
    metadata: metadata && typeof metadata === 'object' ? metadata as Record<string, unknown> : undefined,
    ip_address: ip,
  })

  // Fire n8n webhook non-blocking — no SMTP needed
  fireN8nWebhook(process.env.N8N_LEAD_WEBHOOK_URL, {
    id, name, email, phone, company, role, source, notes, metadata, ip_address: ip,
    submitted_at: new Date().toISOString(),
  })

  return NextResponse.json({ id }, { status: 201 })
}
