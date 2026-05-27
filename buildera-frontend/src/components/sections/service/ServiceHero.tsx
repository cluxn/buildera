import Link from 'next/link'
import { AnimatedRingStat } from '@/components/ui/AnimatedRingStat'
import type { ServicePageData } from '@/types/service-page'

interface Props {
  data: ServicePageData
}

export function ServiceHero({ data }: Props) {
  return (
    <section className="py-20 md:py-24 bg-background">
      <div className="container mx-auto px-8 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-[var(--brand-primary)] mb-4">
              Service
            </p>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              {data.heroHeadline}
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mb-8">
              {data.heroSubheadline}
            </p>
            <div className="flex flex-wrap gap-4 mb-8">
              <Link
                href="/book-a-call"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-[var(--brand-primary)] text-white font-semibold hover:opacity-90 transition-opacity"
              >
                {data.heroCta}
              </Link>
              <Link
                href="/case-studies"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-border text-foreground font-semibold hover:bg-accent transition-colors"
              >
                View Our Work
              </Link>
            </div>
            <p className="text-sm text-muted-foreground">150+ Projects | 50+ Clients | 98% Satisfaction</p>
          </div>
          <div className="flex justify-center">
            <AnimatedRingStat
              value={data.heroStat.value}
              suffix={data.heroStat.suffix}
              label={data.heroStat.label}
              className="w-[100px] md:w-[140px]"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
