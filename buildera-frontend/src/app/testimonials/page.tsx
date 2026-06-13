import type { Metadata } from 'next'
import Link from 'next/link'
import { getTestimonialsPage } from '@/lib/api'
import { TestimonialCard } from '@/components/content/TestimonialCard'
import { ServiceCategoryFilterTabs } from '@/components/content/ServiceCategoryFilterTabs'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { PageHero } from '@/components/sections/PageHero'
import { generateSeoMetadata } from '@/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
  return generateSeoMetadata('page', 'testimonials', {
    title: 'Client Testimonials | Buildera',
    description: 'What our clients say about working with Buildera across software development, Salesforce, DevOps, and AI projects.',
    path: '/testimonials',
  })
}

type Props = { searchParams: Promise<{ service_category?: string }> }

export default async function TestimonialsPage({ searchParams }: Props) {
  const { service_category } = await searchParams
  const testimonials = await getTestimonialsPage(service_category)

  return (
    <main>
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Testimonials' }]} />

      <PageHero
        eyebrow="Testimonials"
        heading={
          <>
            Real Results,<br />
            <span className="text-[var(--brand-primary)]">Real Client Stories.</span>
          </>
        }
        description="Real feedback from SMB owners and decision-makers across manufacturing, retail, finance, and more — unedited."
      />

      {/* ── Filter + Grid ── */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="mb-8">
            <ServiceCategoryFilterTabs activeCategory={service_category ?? ''} />
          </div>

          {testimonials.length === 0 ? (
            <p className="text-muted-foreground text-center py-16">
              No testimonials found for this category yet.
            </p>
          ) : (
            <div className="columns-1 md:columns-2 lg:columns-3 gap-6 mt-8">
              {testimonials.map((t) => <TestimonialCard key={t.id} testimonial={t} />)}
            </div>
          )}

          {/* ── CTA strip ── */}
          <div className="mt-20 p-10 rounded-2xl bg-[var(--brand-surface)] border border-border text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--brand-primary)] mb-3">
              Work With Us
            </p>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">
              Ready to Become Our Next Success Story?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Book a free 30-minute discovery call. No sales pitch — just an honest conversation about
              your project and whether we&apos;re the right fit.
            </p>
            <Link
              href="/book-a-call"
              className="inline-flex items-center px-8 py-4 bg-[var(--brand-primary)] text-white font-semibold rounded-xl hover:bg-[var(--brand-primary-dark)] transition-colors"
            >
              Book a Free Discovery Call
            </Link>
          </div>

        </div>
      </section>
    </main>
  )
}
