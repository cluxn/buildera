import Link from 'next/link'
import type { ServicePageData } from '@/types/service-page'

interface Props { data: ServicePageData }

export function ServiceHero({ data }: Props) {
  const headline = data.heroHeadline

  return (
    <section className="relative overflow-hidden bg-background">
      <div className="hero-orb-1" aria-hidden="true" />
      <div className="hero-orb-2" aria-hidden="true" />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center text-center gap-6 py-20 md:py-28">
          <p className="text-xs font-semibold uppercase tracking-widest text-[var(--brand-primary)]">
            {data.categorySlug.replace(/-/g, ' ')}
          </p>

          <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-[1.1] text-foreground">
            {headline}
          </h1>

          <p className="text-lg text-muted-foreground max-w-2xl">
            {data.heroSubheadline}
          </p>

          <p className="text-sm text-muted-foreground">
            800+ Projects · 500+ Clients · 10+ Years Experience
          </p>

          <Link href="/contact" className="btn-primary">
            {data.heroCta}
          </Link>
        </div>
      </div>
    </section>
  )
}
