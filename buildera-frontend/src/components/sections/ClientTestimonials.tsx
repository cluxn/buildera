import { TestimonialCard } from '@/components/ui/TestimonialCard'
import type { Testimonial } from '@/lib/api'

interface Props {
  testimonials: Testimonial[]
}

export function ClientTestimonials({ testimonials }: Props) {
  if (!testimonials.length) return null

  const items = [...testimonials, ...testimonials]

  return (
    <section className="py-20 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-xs font-semibold uppercase tracking-widest text-[var(--brand-primary)] mb-3">
            CLIENT RESULTS
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Trusted by Businesses Like Yours
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Real outcomes from real clients — see what working with Buildera looks like in practice.
          </p>
        </div>
      </div>

      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-16 z-10 pointer-events-none" style={{ background: 'linear-gradient(to right, var(--background), transparent)' }} aria-hidden="true" />
        <div className="absolute right-0 top-0 bottom-0 w-16 z-10 pointer-events-none" style={{ background: 'linear-gradient(to left, var(--background), transparent)' }} aria-hidden="true" />

        <div className="marquee-track">
          {items.map((t, idx) => (
            <div key={idx} className="w-[320px] sm:w-[360px] flex-shrink-0 px-3">
              <TestimonialCard
                quote={t.quote}
                name={t.person_name}
                title={t.person_title ?? ''}
                company={t.company ?? ''}
                rating={t.rating}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
