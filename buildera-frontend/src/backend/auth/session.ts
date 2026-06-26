import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'

const COOKIE_NAME = 'buildera_session'
const EXPIRY_DAYS = 7

function getSecret(): Uint8Array {
  const secret = process.env.SESSION_SECRET
  if (!secret) throw new Error('SESSION_SECRET env var is required')
  return new TextEncoder().encode(secret)
}

export interface SessionPayload {
  userId: number
  role: string
  email: string
}

export async function createSession(payload: SessionPayload): Promise<void> {
  const secret = getSecret()
  const expiresAt = new Date(Date.now() + EXPIRY_DAYS * 24 * 60 * 60 * 1000)

  const token = await new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(expiresAt)
    .sign(secret)

  const jar = await cookies()
  jar.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    expires: expiresAt,
    path: '/',
  })
}

export async function verifySession(): Promise<SessionPayload | null> {
  try {
    const jar = await cookies()
    const token = jar.get(COOKIE_NAME)?.value
    if (!token) return null
    const secret = getSecret()
    const { payload } = await jwtVerify(token, secret)
    return payload as unknown as SessionPayload
  } catch {
    return null
  }
}

export function hasAnyRole(session: SessionPayload, allowed: string[]): boolean {
  return session.role.split(',').some(r => allowed.includes(r.trim()))
}

export async function destroySession(): Promise<void> {
  const jar = await cookies()
  jar.delete(COOKIE_NAME)
}
