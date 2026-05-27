import Link from 'next/link'
import type { SolutionPageData } from '@/types/service-page'

interface Props {
  data: SolutionPageData
}

export function SolutionHero({ data }: Props) {
  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="container mx-auto px-8 max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-widest text-[var(--brand-primary)] mb-4">
            Solution
          </p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            {data.heroHeadline}
          </h1>
          <p className="text-lg text-muted-foreground mb-8">{data.heroSubheadline}</p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/book-a-call"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-[var(--brand-primary)] text-white font-semibold hover:opacity-90 transition-opacity"
            >
              Book a Free Call
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-border text-foreground font-semibold hover:bg-accent transition-colors"
            >
              See Related Services
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
