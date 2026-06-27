import { getSetting } from '@/db/admin/settings'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://buildera.co'

const DEFAULT_ROBOTS = `User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/
Disallow: /search
Disallow: /thank-you
Disallow: /faq

Sitemap: ${SITE_URL}/sitemap.xml`

export const dynamic = 'force-dynamic'

export async function GET() {
  const custom = await getSetting('robots_txt').catch(() => null)
  const content = custom?.trim() ? custom : DEFAULT_ROBOTS
  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
