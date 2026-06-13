import { NextRequest, NextResponse } from 'next/server'
import { execute, queryOne } from '@/db/pool'
import { checkRateLimit } from '@/backend/forms/rateLimit'
import { fireN8nWebhook } from '@/backend/webhooks/n8n'

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for') ?? 'unknown'
  if (!checkRateLimit(`sub:${ip}`, 3, 3600 * 1000)) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
  }

  let body: { email?: string; name?: string; source?: string }
  try { body = await request.json() } catch { return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 }) }

  const { email, name, source } = body
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Valid email required' }, { status: 422 })
  }

  const normalized = email.toLowerCase().trim()
  const existing = await queryOne<{ id: number }>('SELECT id FROM newsletter_subscribers WHERE email = ?', [normalized])
  if (existing) return NextResponse.json({ ok: true, already: true })

  const result = await execute(
    'INSERT INTO newsletter_subscribers (email, name, source) VALUES (?,?,?)',
    [normalized, name ?? null, source ?? 'website'],
  )

  // Fire n8n webhook non-blocking
  fireN8nWebhook(process.env.N8N_NEWSLETTER_WEBHOOK_URL, {
    id: result.insertId, email: normalized, name, source,
    subscribed_at: new Date().toISOString(),
  })

  return NextResponse.json({ ok: true }, { status: 201 })
}
