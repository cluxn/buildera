import Link from 'next/link'
import type { IndustryPageData } from '@/types/service-page'

interface Props { data: IndustryPageData }

function splitHeadline(h: string): [string, string] {
  const words = h.split(' ')
  const mid = Math.ceil(words.length / 2)
  return [words.slice(0, mid).join(' '), words.slice(mid).join(' ')]
}

export function IndustryHero({ data }: Props) {
  const [line1, line2] = splitHeadline(data.heroHeadline)

  return (
    <section className="relative py-20 md:py-28 overflow-hidden bg-background">
      <div className="hero-orb-1" aria-hidden="true" />
      <div className="hero-orb-2" aria-hidden="true" />

      <div className="container mx-auto px-8 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--brand-primary)] mb-4">
              {data.name}
            </p>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
              <span className="block text-foreground">{line1}</span>
              <span className="block text-[var(--brand-primary)]">{line2}</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mb-8">
              {data.heroSubheadline}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/book-a-call" className="btn-primary">
                Book a Free Call
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-border text-foreground font-semibold hover:bg-[var(--brand-surface)] transition-colors"
              >
                View All Services
              </Link>
            </div>
          </div>

          {/* Right — stat + overview card */}
          <div className="hidden lg:block">
            <div className="relative">
              <div
                className="absolute -inset-4 rounded-3xl pointer-events-none"
                style={{ background: 'radial-gradient(ellipse at 60% 40%, hsl(217 91% 60% / 12%), transparent 70%)' }}
                aria-hidden="true"
              />
              <div className="relative rounded-2xl p-6 border border-border/60" style={{ background: 'var(--brand-glass)', backdropFilter: 'blur(16px)' }}>
                <div className="flex items-center justify-between mb-5">
                  <span className="text-[11px] font-semibold uppercase tracking-widest text-[var(--brand-primary)]">
                    Industry Impact
                  </span>
                  <span className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500" aria-hidden="true" />
                    Proven results
                  </span>
                </div>

                <div className="rounded-xl bg-[var(--brand-primary)] text-white px-5 py-4 mb-5">
                  <span className="text-4xl font-bold">{data.heroStat.value}</span>
                  <p className="text-sm font-medium opacity-90 mt-1">{data.heroStat.label}</p>
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed">{data.overview}</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
