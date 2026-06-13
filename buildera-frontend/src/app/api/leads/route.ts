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

  // Honeypot — silently accept bot submissions without writing to DB
  if (body.website || body.honeypot) {
    return NextResponse.json({ id: 0 }, { status: 201 })
  }

  const { name, email, phone, company, message, source_form, service_interest, service } = body as Record<string, string>
  if (!name || !email) return NextResponse.json({ error: 'name and email are required' }, { status: 422 })

  const id = await createLead({
    name, email, phone, company,
    service_interest: service_interest || service,
    message,
    source_form: source_form || 'CONTACT_FORM',
  })

  // Fire n8n webhook non-blocking — no SMTP needed
  fireN8nWebhook(process.env.N8N_LEAD_WEBHOOK_URL, {
    id, name, email, phone, company,
    service_interest: service_interest || service,
    message, source_form, ip_address: ip,
    submitted_at: new Date().toISOString(),
  })

  return NextResponse.json({ id }, { status: 201 })
}
