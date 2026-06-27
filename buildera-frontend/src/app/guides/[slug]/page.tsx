import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { Suspense } from 'react'
import Image from 'next/image'
import { getGuide, getGuides } from '@/lib/api'
import { GuideCard } from '@/components/content/GuideCard'
import { GuideDownloadForm } from '@/components/content/GuideDownloadForm'
import { CTASection } from '@/components/sections/CTASection'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder'
import { IconExternalLink } from '@tabler/icons-react'

const TYPE_COLORS: Record<string, string> = {
  article: 'bg-blue-100 text-blue-700',
  template: 'bg-green-100 text-green-700',
  checklist: 'bg-yellow-100 text-yellow-700',
  video: 'bg-red-100 text-red-700',
}

type Props = { params: Promise<{ slug: string }> }

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://buildera.co'

export async function generateStaticParams() {
  const guides = await getGuides(1)
  return guides.data.map((g) => ({ slug: g.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const guide = await getGuide(slug)
  if (!guide) return { title: 'Guide Not Found | Buildera' }
  const title = guide.seo_title ?? `${guide.title} | Buildera Guides`
  const description = guide.seo_description ?? guide.description
  const ogImage = guide.cover_image ?? `${SITE_URL}/og-image.png`
  const canonical = `${SITE_URL}/guides/${slug}`
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title: guide.title,
      description,
      url: canonical,
      siteName: 'Buildera',
      type: 'article',
      locale: 'en_US',
      images: [{ url: ogImage, width: 1200, height: 630, alt: guide.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  }
}

export default async function GuideDetailPage({ params }: Props) {
  const { slug } = await params
  const [guide, relatedData] = await Promise.all([
    getGuide(slug),
    getGuides(1),
  ])
  if (!guide) notFound()

  const otherGuides = relatedData.data.filter((g) => g.slug !== slug)
  const sameCategory = otherGuides.filter((g) => g.category === guide.category)
  const relatedGuides = (sameCategory.length > 0 ? sameCategory : otherGuides).slice(0, 3)

  const typeColor = TYPE_COLORS[guide.resource_type?.toLowerCase()] ?? 'bg-[var(--brand-primary)]/10 text-[var(--brand-primary)]'

  return (
    <main>
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Guides', href: '/guides' }, { label: guide.title }]} />

      {/* Above-fold header */}
      <section className="py-20 md:py-28 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <span className={`px-2 py-0.5 rounded-full text-xs font-semibold capitalize ${typeColor}`}>
              {guide.resource_type}
            </span>
            <span className="text-xs text-muted-foreground capitalize">{guide.category?.replace(/-/g, ' ')}</span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight mb-4">{guide.title}</h1>
          <p className="text-lg text-muted-foreground mb-6">{guide.description}</p>
          <div className="relative w-full h-64 md:h-80 rounded-2xl overflow-hidden">
            {guide.cover_image ? (
              <Image
                src={guide.cover_image}
                alt={guide.cover_image_alt ?? guide.title}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 1200px"
                className="object-cover"
              />
            ) : (
              <ImagePlaceholder />
            )}
          </div>
        </div>
      </section>

      <Suspense fallback={<div className="animate-pulse h-96 bg-muted rounded mx-auto max-w-3xl my-12" />}>

        {/* Guide body */}
        <section className="py-12 bg-background">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="prose prose-slate prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: guide.body ?? '' }} />

            {guide.external_link && (
              <div className="mt-8">
                <a
                  href={guide.external_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[var(--brand-primary)] text-[var(--brand-primary)] font-semibold rounded-xl hover:bg-[var(--brand-primary)]/5 transition-colors"
                >
                  Access the Full Resource <IconExternalLink size={18} />
                </a>
              </div>
            )}
          </div>
        </section>

        {/* Download form — left: form, right: guide image */}
        <GuideDownloadForm
          guideTitle={guide.title}
          coverImage={guide.cover_image}
          sourceForm="guide-download"
        />

        {/* Related guides */}
        {relatedGuides.length > 0 && (
          <section className="bg-background py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl font-bold mb-6">More Resources</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedGuides.map((g) => <GuideCard key={g.id} guide={g} />)}
              </div>
            </div>
          </section>
        )}

        <CTASection
          heading="Ready to Apply This in Your Business?"
          description="Book a free call and let's talk through how this applies to your specific situation."
        />
      </Suspense>
    </main>
  )
}
