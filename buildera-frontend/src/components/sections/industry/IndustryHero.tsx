import Link from 'next/link'
import { IconCheck, IconArrowRight } from '@tabler/icons-react'
import type { IndustryPageData } from '@/types/service-page'

interface Props { data: IndustryPageData }

export function IndustryHero({ data }: Props) {
  const stats = data.heroStats ?? [data.heroStat]

  return (
    <section className="relative overflow-hidden bg-background">
      <div className="hero-orb-1" aria-hidden="true" />
      <div className="hero-orb-2" aria-hidden="true" />

      <div className="container mx-auto px-8 max-w-7xl relative z-10 pt-12 pb-16 md:pt-20 md:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--brand-surface)] border border-[var(--brand-primary)]/20 mb-6">
              <span className="w-2 h-2 rounded-full bg-[var(--brand-primary)]" aria-hidden="true" />
              <span className="text-xs font-semibold uppercase tracking-widest text-[var(--brand-primary)]">
                {data.name} Solutions
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-[1.1] mb-6 text-foreground">
              {data.heroHeadline}
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mb-8 leading-relaxed">
              {data.heroSubheadline}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/contact" className="btn-primary inline-flex items-center gap-2">
                Book a Free Call
                <IconArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right — glass card */}
          <div className="hidden lg:block">
            <div className="relative">
              <div
                className="absolute -inset-4 rounded-3xl pointer-events-none"
                style={{ background: 'radial-gradient(ellipse at 60% 40%, hsl(217 91% 60% / 12%), transparent 70%)' }}
                aria-hidden="true"
              />
              <div
                className="relative rounded-2xl p-6 border border-border/60"
                style={{ background: 'var(--brand-glass)', backdropFilter: 'blur(16px)' }}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-semibold uppercase tracking-widest text-[var(--brand-primary)]">
                    Industry Impact
                  </span>
                  <span className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500" aria-hidden="true" />
                    Proven Results
                  </span>
                </div>

                <div className="rounded-xl bg-[var(--brand-primary)] text-white px-5 py-4 mb-5">
                  <span className="text-4xl font-bold">{data.heroStat.value}</span>
                  <p className="text-sm font-medium opacity-90 mt-1">{data.heroStat.label}</p>
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed mb-5">{data.overview}</p>

                {data.benefits && data.benefits.length > 0 && (
                  <ul className="space-y-2.5">
                    {data.benefits.slice(0, 3).map((b, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm">
                        <div className="w-4 h-4 rounded-full bg-[var(--brand-primary)]/15 flex items-center justify-center shrink-0 mt-0.5">
                          <IconCheck className="w-2.5 h-2.5 text-[var(--brand-primary)]" />
                        </div>
                        <span className="text-foreground leading-snug">{b}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats strip */}
      {stats.length > 1 && (
        <div className="border-t border-border bg-[var(--brand-surface)]">
          <div className="container mx-auto px-8 max-w-7xl">
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
