import { NextResponse } from 'next/server'
import { destroySession } from '@/backend/auth/session'

export async function POST() {
  await destroySession()
  return NextResponse.json({ ok: true })
}
