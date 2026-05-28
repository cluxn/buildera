import Link from 'next/link'
import type { SolutionPageData } from '@/types/service-page'

function splitHeadline(h: string): [string, string] {
  if (h.includes(' — ')) {
    const idx = h.indexOf(' — ')
    return [h.slice(0, idx), h.slice(idx + 3)]
  }
  const words = h.split(' ')
  const mid = Math.ceil(words.length / 2)
  return [words.slice(0, mid).join(' '), words.slice(mid).join(' ')]
}

interface Props { data: SolutionPageData }

export function SolutionHero({ data }: Props) {
  const [line1, line2] = splitHeadline(data.heroHeadline)
  const topFeatures = data.featureCards.slice(0, 3)

  return (
    <section className="relative py-20 md:py-28 overflow-hidden bg-background">
      <div className="hero-orb-1" aria-hidden="true" />
      <div className="hero-orb-2" aria-hidden="true" />

      <div className="container mx-auto px-8 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--brand-primary)] mb-4">
              Solution
            </p>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
              <span className="block text-foreground">{line1}</span>
              <span className="block text-[var(--brand-primary)]">{line2}</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mb-8">
              {data.heroSubheadline}
            </p>
            <Link href="/contact" className="btn-primary">
              Book a Free Call
            </Link>
          </div>

          {/* Right — features card */}
          <div className="hidden lg:block">
            <div className="relative">
              <div
                className="absolute -inset-4 rounded-3xl pointer-events-none"
                style={{ background: 'radial-gradient(ellipse at 60% 40%, hsl(217 91% 60% / 12%), transparent 70%)' }}
                aria-hidden="true"
              />
              <div className="relative rounded-2xl p-6 border border-border/60" style={{ background: 'var(--brand-glass)', backdropFilter: 'blur(16px)' }}>
                <div className="flex items-center justify-between mb-5">
                  <span className="text-[11px] font-semibold uppercase tracking-widest text-[var(--brand-primary)]">What You Get</span>
                  <span className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500" aria-hidden="true" />
                    Built for SMBs
                  </span>
                </div>
                <div className="space-y-4">
                  {topFeatures.map((f, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="w-8 h-8 rounded-lg bg-[var(--brand-primary)] text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                        {i + 1}
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-foreground">{f.title}</p>
                        <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{f.description}</p>
                        {f.metric && <p className="text-xs text-[var(--brand-primary)] mt-1 font-medium">{f.metric}</p>}
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
