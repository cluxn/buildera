import crypto from 'crypto'

export async function revalidateFrontend(tag: string): Promise<void> {
  const secret = process.env.NEXTJS_REVALIDATE_SECRET
  const frontendUrl = process.env.FRONTEND_URL
  if (!secret || !frontendUrl) return

  const body = JSON.stringify({ tag })
  const signature = crypto.createHmac('sha256', secret).update(body).digest('hex')

  await fetch(`${frontendUrl}/api/revalidate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-revalidate-signature': signature },
    body,
  }).catch(() => {}) // non-blocking — don't fail admin save if revalidation fails
}
