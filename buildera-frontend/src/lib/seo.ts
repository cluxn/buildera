import type { Metadata } from 'next'
import { fetchSeoMeta, fetchSettings, SETTINGS_FALLBACK } from './api'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://buildera.co'

interface SeoFallback {
  title: string
  description: string
  path?: string
}

export async function generateSeoMetadata(
  type: string,
  slug: string,
  fallback: SeoFallback,
): Promise<Metadata> {
  const [meta, settings] = await Promise.all([
    fetchSeoMeta(type, slug),
    fetchSettings().catch(() => SETTINGS_FALLBACK),
  ])

  const title = meta?.title || fallback.title || settings.default_seo_title
  const description = meta?.description || fallback.description || settings.default_seo_description
  const ogImage = meta?.og_image || settings.og_image || `${SITE_URL}/og-image.png`
  const path = fallback.path ?? `/${slug}`
  const canonical = meta?.canonical_url || `${SITE_URL}${path}`

  return {
    title,
    description,
    alternates: { canonical },
    robots: meta?.robots || 'index,follow',
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: 'Buildera',
      type: 'website',
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  }
}
