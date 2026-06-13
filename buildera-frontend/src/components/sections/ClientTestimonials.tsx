import { TestimonialCard } from '@/components/ui/TestimonialCard'
import type { Testimonial } from '@/lib/api'

interface Props {
  testimonials: Testimonial[]
}

export function ClientTestimonials({ testimonials }: Props) {
  if (!testimonials.length) return null

  return (
    <section className="py-20 bg-background">
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
        <div className={`grid gap-6 ${testimonials.length === 1 ? 'max-w-2xl mx-auto' : testimonials.length >= 3 ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1 md:grid-cols-2'}`}>
          {testimonials.map((t) => (
            <TestimonialCard
              key={t.id}
              quote={t.quote}
              name={t.person_name}
              title={t.person_title ?? ''}
              company={t.company ?? ''}
              rating={t.rating}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
