import Link from 'next/link'
import type { ServicePageData } from '@/types/service-page'

function splitHeadline(h: string): [string, string] {
  if (h.includes(' — ')) {
    const idx = h.indexOf(' — ')
    return [h.slice(0, idx), h.slice(idx + 3)]
  }
  const words = h.split(' ')
  const mid = Math.ceil(words.length / 2)
  return [words.slice(0, mid).join(' '), words.slice(mid).join(' ')]
}

interface Props { data: ServicePageData }

export function ServiceHero({ data }: Props) {
  const [line1, line2] = splitHeadline(data.heroHeadline)
  const topOutcomes = data.outcomeCards.slice(0, 3)

  return (
    <section className="relative py-20 md:py-28 overflow-hidden bg-background">
      <div className="hero-orb-1" aria-hidden="true" />
      <div className="hero-orb-2" aria-hidden="true" />

      <div className="container mx-auto px-8 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--brand-primary)] mb-4">
              {data.categorySlug.replace(/-/g, ' ')}
            </p>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
              <span className="block text-foreground">{line1}</span>
              <span className="block text-[var(--brand-primary)]">{line2}</span>
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
            </div>
            <p className="text-sm text-muted-foreground">150+ Projects · 50+ Clients · 98% Satisfaction</p>
          </div>

          {/* Right — outcomes card */}
          <div className="hidden lg:block">
            <div className="relative">
              <div
                className="absolute -inset-4 rounded-3xl pointer-events-none"
                style={{ background: 'radial-gradient(ellipse at 60% 40%, hsl(217 91% 60% / 12%), transparent 70%)' }}
                aria-hidden="true"
              />
              <div className="relative rounded-2xl p-6 border border-border/60" style={{ background: 'var(--brand-glass)', backdropFilter: 'blur(16px)' }}>
                <div className="flex items-center justify-between mb-5">
                  <span className="text-[11px] font-semibold uppercase tracking-widest text-[var(--brand-primary)]">Key Results</span>
                  <span className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500" aria-hidden="true" />
                    Proven outcomes
                  </span>
                </div>

                {/* Stat highlight */}
                <div className="rounded-xl bg-[var(--brand-primary)] text-white px-5 py-4 mb-5 flex items-center gap-4">
                  <span className="text-4xl font-bold">{data.heroStat.value}{data.heroStat.suffix}</span>
                  <span className="text-sm font-medium opacity-90">{data.heroStat.label}</span>
                </div>

                {/* Outcome bullets */}
                <div className="space-y-3">
                  {topOutcomes.map((c, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="w-5 h-5 rounded-full bg-[hsl(217_91%_60%/15%)] text-[var(--brand-primary)] flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">✓</span>
                      <div>
                        <p className="text-sm font-semibold text-foreground">{c.title}</p>
                        {c.metric && <p className="text-xs text-[var(--brand-primary)] mt-0.5">{c.metric}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
