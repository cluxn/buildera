import Link from 'next/link'
import type { IndustryPageData } from '@/types/service-page'

interface Props { data: IndustryPageData }

export function IndustryHero({ data }: Props) {
  const stats = data.heroStats ?? [data.heroStat]

  return (
    <section className="relative overflow-hidden bg-background">
      <div className="hero-orb-1" aria-hidden="true" />
      <div className="hero-orb-2" aria-hidden="true" />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center text-center gap-6 py-20 md:py-28">
          <p className="text-xs font-semibold uppercase tracking-widest text-[var(--brand-primary)]">
            {data.name} Solutions
          </p>

          <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-[1.1] text-foreground">
            {data.heroHeadline}
          </h1>

          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
            {data.heroSubheadline}
          </p>

          <Link href="/contact" className="btn-primary">
            Book a Free Call
          </Link>
        </div>
      </div>

      {/* Stats strip */}
      {stats.length > 1 && (
        <div className="border-t border-border bg-[var(--brand-surface)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border">
              {stats.slice(0, 4).map((s, i) => (
                <div key={i} className="py-8 px-6 text-center">
                  <div className="text-3xl md:text-4xl font-bold text-[var(--brand-primary)]">{s.value}</div>
                  <div className="text-sm text-muted-foreground mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
