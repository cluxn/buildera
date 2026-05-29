import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getContentCaseStudy, getContentCaseStudies } from '@/lib/api'
import { ResultMetricCard } from '@/components/content/ResultMetricCard'
import { BlogCtaBanner } from '@/components/sections/BlogCtaBanner'
import { MiniLeadForm } from '@/components/ui/MiniLeadForm'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { JsonLd } from '@/components/ui/JsonLd'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const studies = await getContentCaseStudies(1)
  return studies.data.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const study = await getContentCaseStudy(slug)
  if (!study) return { title: 'Case Study Not Found | Buildera' }
  return {
    title: study.seo_title ?? `${study.title} | Buildera Case Study`,
    description: study.seo_description ?? `${study.industry} case study — ${study.title}`,
  }
}

export default async function CaseStudyDetailPage({ params }: Props) {
  const { slug } = await params
  const study = await getContentCaseStudy(slug)
  if (!study) notFound()

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://buildera.co'
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: study.title,
    image: study.hero_image || `${siteUrl}/og-image.png`,
    author: { '@type': 'Organization', name: 'Buildera' },
    publisher: { '@type': 'Organization', name: 'Buildera', logo: { '@type': 'ImageObject', url: `${siteUrl}/icon.svg` } },
    datePublished: study.published_at || new Date().toISOString(),
  }

  return (
    <main>
      <JsonLd data={articleSchema} />
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Case Studies', href: '/case-studies' }, { label: study.title }]} />

      {/* Hero */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-8 max-w-4xl">
          <span className="inline-block text-xs bg-[var(--brand-primary)] text-white px-2 py-0.5 rounded-full font-semibold mb-4 capitalize">
            {study.industry}
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight mb-4">{study.title}</h1>
          {study.client_name && <p className="text-muted-foreground mb-6">{study.client_name}</p>}
          {study.hero_image && (
            <div className="relative w-full h-64 md:h-96 rounded-2xl overflow-hidden mt-4">
              <Image
                src={study.hero_image}
                alt={study.hero_image_alt ?? study.title}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 1200px"
                className="object-cover"
              />
            </div>
          )}
        </div>
      </section>

      {/* Problem */}
      <section className="py-12 bg-[var(--brand-surface)]">
        <div className="container mx-auto px-8 max-w-3xl">
          <h2 className="text-2xl font-bold mb-6">The Problem</h2>
          <div className="prose prose-slate prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: study.problem }} />
        </div>
      </section>

      {/* Solution */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-8 max-w-3xl">
          <h2 className="text-2xl font-bold mb-6">Our Solution</h2>
          <div className="prose prose-slate prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: study.solution }} />
        </div>
      </section>

      {/* Results + metrics */}
      <section className="py-12 bg-[var(--brand-surface)]">
        <div className="container mx-auto px-8 max-w-3xl">
          <h2 className="text-2xl font-bold mb-6">The Results</h2>
          <div className="prose prose-slate prose-lg max-w-none mb-8" dangerouslySetInnerHTML={{ __html: study.results }} />
          {study.key_metrics.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              {study.key_metrics.map((m, i) => (
                <ResultMetricCard key={i} label={m.label} value={m.value} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Mid-page lead form */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-8 max-w-2xl">
          <MiniLeadForm sourceForm="mini-cta" headline="Want Results Like These for Your Business?" />
        </div>
      </section>

      {/* CTA banner */}
      <div className="container mx-auto px-8 max-w-3xl pb-8">
        <BlogCtaBanner />
      </div>

      {/* Testimonial quote */}
      {study.testimonial_quote && (
        <section className="py-12 bg-[var(--brand-surface)]">
          <div className="container mx-auto px-8 max-w-3xl">
            <blockquote className="border-l-4 border-[var(--brand-primary)] pl-6 italic text-lg">
              &ldquo;{study.testimonial_quote}&rdquo;
            </blockquote>
            {study.testimonial_author && (
              <p className="text-sm text-muted-foreground mt-3 pl-6">— {study.testimonial_author}</p>
            )}
          </div>
        </section>
      )}

      {/* Full bottom CTA */}
      <section className="py-20 bg-background text-center">
        <div className="container mx-auto px-8 max-w-2xl">
          <h2 className="text-3xl font-bold mb-4">Ready to Build Your Success Story?</h2>
          <p className="text-muted-foreground mb-8">Book a free discovery call and let&apos;s explore what&apos;s possible for your business.</p>
          <Link href="/book-a-call" className="inline-flex items-center px-8 py-4 bg-[var(--brand-primary)] text-white font-semibold rounded-xl hover:bg-[var(--brand-primary-dark)] transition-colors">
            Book a Free Call
          </Link>
        </div>
      </section>
    </main>
  )
}
