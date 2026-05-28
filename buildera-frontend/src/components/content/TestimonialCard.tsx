import Image from 'next/image'
import type { Testimonial } from '@/lib/api'

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="break-inside-avoid bg-background border border-border rounded-xl p-6 mb-4">
      <p className="text-yellow-500 text-lg mb-3">{'★'.repeat(testimonial.star_rating)}</p>
      <p className="text-base italic mb-4 leading-relaxed">&ldquo;{testimonial.quote}&rdquo;</p>
      {testimonial.company_logo && (
        <div className="mb-3">
          <Image src={testimonial.company_logo} alt={testimonial.company ?? ''} width={40} height={40} className="object-contain" />
        </div>
      )}
      <p className="font-semibold">{testimonial.client_name}</p>
      {(testimonial.job_title || testimonial.company) && (
        <p className="text-sm text-muted-foreground">
          {[testimonial.job_title, testimonial.company].filter(Boolean).join(', ')}
        </p>
      )}
      {testimonial.service_category && (
        <span className="inline-block mt-2 text-xs px-2 py-0.5 rounded-full bg-[var(--brand-primary)]/10 text-[var(--brand-primary)]">
          {testimonial.service_category}
        </span>
      )}
    </div>
  )
}
