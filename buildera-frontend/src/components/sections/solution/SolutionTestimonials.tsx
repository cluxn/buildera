import { TestimonialCard } from '@/components/ui/TestimonialCard'
import type { TestimonialData } from '@/types/service-page'

interface Props { testimonials: TestimonialData[] }

export function SolutionTestimonials({ testimonials }: Props) {
  if (!testimonials.length) return null
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-8 max-w-7xl">
        <p className="text-xs font-medium uppercase tracking-widest text-[var(--brand-primary)] mb-4">What Our Clients Say</p>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-12">Trusted by Businesses Like Yours</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t) => (
            <TestimonialCard key={t.id} quote={t.content} name={t.client_name} title={t.client_title ?? ''} company={t.client_company ?? ''} rating={t.rating} />
          ))}
        </div>
      </div>
    </section>
  )
}
