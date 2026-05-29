import { IconArrowRight } from '@tabler/icons-react'
import Link from 'next/link'

const STATS = [
  { value: '800+', label: 'Projects Delivered' },
  { value: '500+', label: 'Active Clients' },
  { value: '10+', label: 'Years Building' },
  { value: '98%', label: 'Client Satisfaction' },
]

export function AboutHero() {
  return (
    <section className="relative overflow-hidden bg-background pt-16 pb-0">
      <div className="hero-orb-1" aria-hidden="true" />
      <div className="hero-orb-2" aria-hidden="true" />

      <div className="relative container mx-auto px-8 max-w-7xl">

        {/* ── Top label ── */}
        <p className="text-xs font-semibold uppercase tracking-widest text-[var(--brand-primary)] mb-6">
          About Buildera
        </p>

        {/* ── Editorial headline ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end pb-16 border-b border-border">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight leading-[1.05] mb-0">
              We Build Software<br />
              <span className="text-[var(--brand-primary)]">That Moves</span><br />
              Businesses Forward.
            </h1>
          </div>
          <div className="flex flex-col gap-6 lg:pb-2">
            <p className="text-lg text-muted-foreground leading-relaxed">
              Buildera is a global IT services company helping growing businesses replace manual
              processes and legacy systems with custom software that actually fits the way they work.
            </p>
            <p className="text-base text-muted-foreground leading-relaxed">
              We don&apos;t sell off-the-shelf licenses or resell SaaS subscriptions. Every engagement
              starts with understanding your exact problem — and ends with something you own outright,
              built to last.
            </p>
            <Link
              href="/how-we-work"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--brand-primary)] hover:gap-3 transition-all w-fit"
            >
              See how we work
              <IconArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* ── Stats strip ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border border-b border-border">
          {STATS.map((stat) => (
            <div key={stat.label} className="py-10 px-6 first:pl-0">
              <p className="text-4xl font-bold tracking-tight text-foreground mb-1">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
