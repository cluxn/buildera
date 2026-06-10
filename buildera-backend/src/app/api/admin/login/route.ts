import { NextRequest, NextResponse } from 'next/server'
import { getUserByEmail } from '@/db/admin/users'
import { verifyPassword } from '@/backend/auth/hash'
import { createSession } from '@/backend/auth/session'
import { checkRateLimit } from '@/backend/forms/rateLimit'

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for') ?? request.headers.get('x-real-ip') ?? 'unknown'
  if (!checkRateLimit(`login:${ip}`, 5, 15 * 60 * 1000)) {
    return NextResponse.json({ error: 'Too many login attempts. Try again in 15 minutes.' }, { status: 429 })
  }

  let body: { email?: string; password?: string }
  try { body = await request.json() } catch { return NextResponse.json({ error: 'Invalid request' }, { status: 400 }) }

  const { email, password } = body
  if (!email || !password) {
    return NextResponse.json({ error: 'Email and password are required' }, { status: 400 })
  }

  const user = await getUserByEmail(email.toLowerCase().trim()).catch(() => null)
  if (!user) return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 })

  const valid = await verifyPassword(password, user.password_hash)
  if (!valid) return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 })

  await createSession({ userId: user.id, role: user.role, email: user.email })
  return NextResponse.json({ ok: true })
}
