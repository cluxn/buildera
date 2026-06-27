import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { Suspense } from 'react'
import Image from 'next/image'
import { getContentCaseStudy, getContentCaseStudies } from '@/lib/api'
import { CaseStudyCard } from '@/components/content/CaseStudyCard'
import { CTASection } from '@/components/sections/CTASection'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder'
import { JsonLd } from '@/components/ui/JsonLd'
import {
  IconBuilding,
  IconMapPin,
  IconClock,
  IconCode,
  IconTrendingUp,
  IconUser,
} from '@tabler/icons-react'

type Props = { params: Promise<{ slug: string }> }

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://buildera.co'

export async function generateStaticParams() {
  const studies = await getContentCaseStudies(1)
  return studies.data.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const study = await getContentCaseStudy(slug)
  if (!study) return { title: 'Case Study Not Found | Buildera' }
  const title = study.seo_title ?? `${study.title} | Buildera Case Study`
  const description = study.seo_description ?? `${study.industry} case study — ${study.title}`
  const ogImage = study.hero_image ?? `${SITE_URL}/og-image.png`
  const canonical = `${SITE_URL}/case-studies/${slug}`
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title: study.title,
      description,
      url: canonical,
      siteName: 'Buildera',
      type: 'article',
      locale: 'en_US',
      images: [{ url: ogImage, width: 1200, height: 630, alt: study.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  }
}

export default async function CaseStudyDetailPage({ params }: Props) {
  const { slug } = await params
  const [study, allStudies] = await Promise.all([
    getContentCaseStudy(slug),
    getContentCaseStudies(1),
  ])
  if (!study) notFound()

  const otherStudies = allStudies.data.filter((s) => s.slug !== slug)
  const sameIndustry = otherStudies.filter((s) => s.industry === study.industry)
  const related = (sameIndustry.length > 0 ? sameIndustry : otherStudies).slice(0, 3)
  const relatedSameIndustry = sameIndustry.length > 0

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
      <section className="py-20 md:py-28 bg-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="inline-block text-xs bg-[var(--brand-primary)] text-white px-2 py-0.5 rounded-full font-semibold mb-4 capitalize">
            {study.industry}
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight mb-4">
            {study.title}
          </h1>
          {study.client_name && (
            <p className="text-muted-foreground mb-6">{study.client_name}</p>
          )}
          <div className="relative w-full h-64 md:h-96 rounded-2xl overflow-hidden mt-4">
            {study.hero_image ? (
              <Image
                src={study.hero_image}
                alt={study.hero_image_alt ?? study.title}
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

      <Suspense fallback={<div className="animate-pulse h-96 bg-muted rounded mx-auto max-w-5xl my-12" />}>

        {/* 2-col: left scrollable content + right sticky sidebar */}
        <section className="py-12 bg-background">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:grid lg:grid-cols-[280px_1fr] lg:gap-12 items-start">

              {/* LEFT — sticky project details sidebar */}
              <aside className="hidden lg:block">
                <div className="sticky top-24 space-y-4">

                  {/* Project Details card */}
                  <div className="rounded-2xl border border-border bg-background overflow-hidden">
                    <div className="px-5 py-4 border-b border-border bg-[var(--brand-primary)]">
                      <p className="text-xs font-semibold uppercase tracking-widest text-white/70 mb-0.5">
                        Project Details
                      </p>
                      <p className="text-sm font-bold text-white">
                        {study.client_name ?? 'Client Overview'}
                      </p>
                    </div>

                    <div className="divide-y divide-border">
                      {study.client_about && (
                        <div className="px-5 py-4">
                          <p className="text-xs text-muted-foreground mb-1.5">About the Client</p>
                          <p className="text-sm text-foreground leading-relaxed">{study.client_about}</p>
                        </div>
                      )}

                      {study.industry && (
                        <div className="px-5 py-4 flex items-center gap-3">
                          <IconBuilding size={15} className="text-[var(--brand-primary)] shrink-0" />
                          <div>
                            <p className="text-xs text-muted-foreground mb-0.5">Industry</p>
                            <p className="text-sm font-medium text-foreground capitalize">{study.industry}</p>
                          </div>
                        </div>
                      )}

                      {study.country && (
                        <div className="px-5 py-4 flex items-center gap-3">
                          <IconMapPin size={15} className="text-[var(--brand-primary)] shrink-0" />
                          <div>
                            <p className="text-xs text-muted-foreground mb-0.5">Country</p>
                            <p className="text-sm font-medium text-foreground">{study.country}</p>
                          </div>
                        </div>
                      )}

                      {study.timeline && (
                        <div className="px-5 py-4 flex items-center gap-3">
                          <IconClock size={15} className="text-[var(--brand-primary)] shrink-0" />
                          <div>
                            <p className="text-xs text-muted-foreground mb-0.5">Timeline</p>
                            <p className="text-sm font-medium text-foreground">{study.timeline}</p>
                          </div>
                        </div>
                      )}

                      {study.tech_stack && (
                        <div className="px-5 py-4 flex items-start gap-3">
                          <IconCode size={15} className="text-[var(--brand-primary)] shrink-0 mt-0.5" />
                          <div>
                            <p className="text-xs text-muted-foreground mb-0.5">Tech Stack</p>
                            <p className="text-sm font-medium text-foreground">{study.tech_stack}</p>
                          </div>
                        </div>
                      )}

                      <div className="px-5 py-4">
                        <a
                          href="/contact"
                          className="w-full btn-primary flex items-center justify-center text-sm"
                        >
                          Discuss Your Project
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Key Metrics card */}
                  {study.key_metrics.length > 0 && (
                    <div className="rounded-2xl border border-border bg-background overflow-hidden">
                      <div className="grid grid-cols-2 divide-x divide-y divide-border">
                        {study.key_metrics.slice(0, 4).map((m, i) => (
                          <div key={i} className="px-4 py-5 min-w-0">
                            <p className="text-2xl font-bold text-foreground leading-tight mb-1 break-words">
                              {m.value}
                            </p>
                            <p className="text-xs text-muted-foreground leading-snug">{m.label}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                </div>
              </aside>

              {/* RIGHT — scrollable case study content */}
              <div className="min-w-0 space-y-12">

                {/* Problem */}
                <div>
                  <h2 className="text-2xl font-bold mb-5 pb-3 border-b border-border">The Problem</h2>
                  <div className="prose prose-slate prose-lg max-w-none"
                    dangerouslySetInnerHTML={{ __html: study.problem ?? '' }} />
                </div>

                {/* Solution */}
                <div>
                  <h2 className="text-2xl font-bold mb-5 pb-3 border-b border-border">Our Solution</h2>
                  <div className="prose prose-slate prose-lg max-w-none"
                    dangerouslySetInnerHTML={{ __html: study.solution ?? '' }} />
                </div>

                {/* Results */}
                <div>
                  <h2 className="text-2xl font-bold mb-5 pb-3 border-b border-border">The Results</h2>
                  <div className="prose prose-slate prose-lg max-w-none mb-8"
                    dangerouslySetInnerHTML={{ __html: study.results ?? '' }} />

                </div>

                {/* Testimonial */}
                {study.testimonial_quote && (
                  <div className="rounded-2xl bg-background border border-border p-8">
                    <blockquote className="text-lg italic text-foreground leading-relaxed mb-4">
                      &ldquo;{study.testimonial_quote}&rdquo;
                    </blockquote>
                    {study.testimonial_author && (
                      <p className="text-sm font-semibold text-[var(--brand-primary)]">
                        — {study.testimonial_author}
                      </p>
                    )}
                  </div>
                )}
              </div>


            </div>
          </div>
        </section>

        {/* Related case studies */}
        {related.length > 0 && (
          <section className="py-20 bg-[var(--brand-surface)]">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl font-bold mb-2">Explore More Case Studies</h2>
              <p className="text-muted-foreground text-sm mb-8">
                {relatedSameIndustry ? `More projects from the ${study.industry} space.` : 'More success stories from our clients.'}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {related.map((s) => <CaseStudyCard key={s.id} study={s} />)}
              </div>
            </div>
          </section>
        )}

        <CTASection
          heading="Ready to Build Your Success Story?"
          description="Book a free discovery call and let's explore what's possible for your business."
        />
      </Suspense>
    </main>
  )
}
