// Simple in-memory rate limiter (per IP, resets on process restart)
// For production use, swap with Redis-backed store

interface Window {
  count: number
  resetAt: number
}

const store = new Map<string, Window>()

export function checkRateLimit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now()
  const entry = store.get(key)
  if (!entry || entry.resetAt < now) {
    store.set(key, { count: 1, resetAt: now + windowMs })
    return true
  }
  if (entry.count >= limit) return false
  entry.count++
  return true
}
