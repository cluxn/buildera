import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { Suspense } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { getGuide, getGuides } from '@/lib/api'
import { GuideCard } from '@/components/content/GuideCard'
import { BlogCtaBanner } from '@/components/sections/BlogCtaBanner'
import { MiniLeadForm } from '@/components/ui/MiniLeadForm'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { IconExternalLink } from '@tabler/icons-react'

const TYPE_COLORS: Record<string, string> = {
  article: 'bg-blue-100 text-blue-700',
  template: 'bg-green-100 text-green-700',
  checklist: 'bg-yellow-100 text-yellow-700',
  video: 'bg-red-100 text-red-700',
}

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const guides = await getGuides(1)
  return guides.data.map((g) => ({ slug: g.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const guide = await getGuide(slug)
  if (!guide) return { title: 'Guide Not Found | Buildera' }
  return {
    title: guide.seo_title ?? `${guide.title} | Buildera Guides`,
    description: guide.seo_description ?? guide.description,
  }
}

export default async function GuideDetailPage({ params }: Props) {
  const { slug } = await params
  const [guide, relatedData] = await Promise.all([
    getGuide(slug),
    getGuides(1),
  ])
  if (!guide) notFound()

  const relatedGuides = relatedData.data
    .filter((g) => g.slug !== slug && g.category === guide.category)
    .slice(0, 3)

  const typeColor = TYPE_COLORS[guide.resource_type?.toLowerCase()] ?? 'bg-[var(--brand-primary)]/10 text-[var(--brand-primary)]'

  return (
    <main>
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Guides', href: '/guides' }, { label: guide.title }]} />

      {/* Above-fold header renders immediately — no Suspense wrapper */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-8 max-w-4xl">
          <div className="flex items-center gap-3 mb-4">
            <span className={`px-2 py-0.5 rounded-full text-xs font-semibold capitalize ${typeColor}`}>
              {guide.resource_type}
            </span>
            <span className="text-xs text-muted-foreground capitalize">{guide.category?.replace(/-/g, ' ')}</span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight mb-4">{guide.title}</h1>
          <p className="text-lg text-muted-foreground mb-6">{guide.description}</p>
          {guide.cover_image && (
            <div className="relative w-full h-64 md:h-80 rounded-2xl overflow-hidden">
              <Image
                src={guide.cover_image}
                alt={guide.cover_image_alt ?? guide.title}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 1200px"
                className="object-cover"
              />
            </div>
          )}
        </div>
      </section>

      <Suspense fallback={<div className="animate-pulse h-96 bg-muted rounded mx-auto max-w-3xl my-12" />}>
        {/* Mini lead form ~33% */}
        <section className="bg-background pb-8">
          <div className="container mx-auto px-8 max-w-2xl">
            <MiniLeadForm
              sourceForm="mini-cta"
              headline="Get This Delivered to Your Inbox"
              subtext="We'll send you this guide along with more practical resources for SMB decision-makers."
            />
          </div>
        </section>

        {/* Body */}
        <section className="py-12 bg-background">
          <div className="container mx-auto px-8 max-w-3xl">
            <div className="prose prose-slate prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: guide.body }} />

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

            <BlogCtaBanner />
          </div>
        </section>

        {/* Related guides */}
        {relatedGuides.length > 0 && (
          <section className="bg-[var(--brand-surface)] py-16">
            <div className="container mx-auto px-8">
              <h2 className="text-2xl font-bold mb-6">More Resources</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedGuides.map((g) => <GuideCard key={g.id} guide={g} />)}
              </div>
            </div>
          </section>
        )}

        <section className="py-20 bg-background text-center">
          <div className="container mx-auto px-8 max-w-2xl">
            <h2 className="text-3xl font-bold mb-4">Ready to Apply This in Your Business?</h2>
            <p className="text-muted-foreground mb-8">Book a free call and let&apos;s talk through how this applies to your specific situation.</p>
            <Link href="/book-a-call" className="inline-flex items-center px-8 py-4 bg-[var(--brand-primary)] text-white font-semibold rounded-xl hover:bg-[var(--brand-primary-dark)] transition-colors">
              Book a Free Call
            </Link>
          </div>
        </section>
      </Suspense>
    </main>
  )
}
