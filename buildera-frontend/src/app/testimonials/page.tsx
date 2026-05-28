import type { Metadata } from 'next'
import Link from 'next/link'
import { getTestimonialsPage } from '@/lib/api'
import { TestimonialCard } from '@/components/content/TestimonialCard'
import { ServiceCategoryFilterTabs } from '@/components/content/ServiceCategoryFilterTabs'
import { Breadcrumb } from '@/components/ui/Breadcrumb'

export const metadata: Metadata = {
  title: 'Client Testimonials | Buildera',
  description: 'What our clients say about working with Buildera across software development, Salesforce, DevOps, and AI projects.',
}

type Props = { searchParams: Promise<{ service_category?: string }> }

export default async function TestimonialsPage({ searchParams }: Props) {
  const { service_category } = await searchParams
  const testimonials = await getTestimonialsPage(service_category)

  return (
    <main>
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Testimonials' }]} />

      <section className="py-20 bg-background">
        <div className="container mx-auto px-8">
          <div className="max-w-2xl mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--brand-primary)] mb-3">TESTIMONIALS</p>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">What Our Clients Say</h1>
            <p className="text-lg text-muted-foreground">
              {testimonials.length}+ reviews from SMBs across India
            </p>
          </div>

          <ServiceCategoryFilterTabs activeCategory={service_category ?? ''} />

          {testimonials.length === 0 ? (
            <p className="text-muted-foreground text-center py-16">No testimonials found for this category yet.</p>
          ) : (
            <div className="columns-1 md:columns-2 lg:columns-3 gap-6">
              {testimonials.map((t) => <TestimonialCard key={t.id} testimonial={t} />)}
            </div>
          )}

          <div className="mt-20 text-center">
            <p className="text-muted-foreground mb-4">Had a great experience with Buildera?</p>
            <Link
              href="/book-a-call"
              className="inline-flex items-center px-8 py-4 bg-[var(--brand-primary)] text-white font-semibold rounded-xl hover:bg-[var(--brand-primary-dark)] transition-colors"
            >
              Let&apos;s Talk About Your Project
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
