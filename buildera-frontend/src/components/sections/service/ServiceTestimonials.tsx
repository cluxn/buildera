import { TestimonialCard } from '@/components/ui/TestimonialCard'
import type { TestimonialData } from '@/types/service-page'

interface Props {
  testimonials: TestimonialData[]
}

export function ServiceTestimonials({ testimonials }: Props) {
  if (!testimonials.length) return null

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-8 max-w-7xl">
        <div className="text-center mb-14">
          <p className="text-xs font-semibold uppercase tracking-widest text-[var(--brand-primary)] mb-3">
            Client Results
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
              quote={t.content}
              name={t.client_name}
              title={t.client_title ?? ''}
              company={t.client_company ?? ''}
              rating={t.rating}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
