import Link from 'next/link'
import type { ReactNode } from 'react'

interface PageHeroProps {
  eyebrow: string
  heading: ReactNode
  description: string
  ctaLabel?: string
  ctaHref?: string
}

export function PageHero({
  eyebrow,
  heading,
  description,
  ctaLabel = 'Book a Free Call',
  ctaHref = '/contact',
}: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-background">
      <div className="hero-orb-1" aria-hidden="true" />
      <div className="hero-orb-2" aria-hidden="true" />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center text-center gap-6 py-20 md:py-28">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--brand-surface)] border border-[var(--brand-primary)]/20">
            <span className="w-2 h-2 rounded-full bg-[var(--brand-primary)]" aria-hidden="true" />
            <span className="text-xs font-semibold uppercase tracking-widest text-[var(--brand-primary)]">
              {eyebrow}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-[1.1] text-foreground">
            {heading}
          </h1>

          <p className="text-lg text-muted-foreground max-w-2xl">
            {description}
          </p>

          <Link href={ctaHref} className="btn-primary">
            {ctaLabel}
          </Link>
        </div>
      </div>
    </section>
  )
}
