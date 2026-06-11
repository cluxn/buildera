import { IconCheck } from '@tabler/icons-react'

const HIGHLIGHTS = [
  { title: 'Reply within 4 business hours', metric: 'Fast response' },
  { title: 'Free initial consultation', metric: 'No commitment' },
  { title: 'NDA available on request', metric: 'Confidential by default' },
]

export function ContactHero() {
  return (
    <section className="relative overflow-hidden py-16 md:py-20 bg-background">
      <div className="hero-orb-1" aria-hidden="true" />
      <div className="hero-orb-2" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--brand-surface)] border border-[var(--brand-primary)]/20 mb-6">
              <span className="w-2 h-2 rounded-full bg-[var(--brand-primary)]" aria-hidden="true" />
              <span className="text-xs font-semibold uppercase tracking-widest text-[var(--brand-primary)]">
                CONTACT US
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-[1.1] mb-6 text-foreground">
              Start Your Project Today
            </h1>

            <p className="text-lg text-muted-foreground max-w-xl mb-8 leading-relaxed">
              Tell us what you&apos;re building. We&apos;ll respond within 4 business hours with a clear next step — no generic proposal, no sales pitch.
            </p>
          </div>

          {/* Right — glass card */}
          <div className="hidden lg:block">
            <div className="relative">
              <div
                className="absolute -inset-4 rounded-3xl pointer-events-none"
                style={{ background: 'radial-gradient(ellipse at 60% 40%, hsl(217 91% 60% / 12%), transparent 70%)' }}
                aria-hidden="true"
              />
              <div className="relative rounded-2xl p-6 border border-border/60" style={{ background: 'var(--brand-glass)', backdropFilter: 'blur(16px)' }}>
                <span className="text-[11px] font-semibold uppercase tracking-widest text-[var(--brand-primary)]">Why Reach Out</span>

                {/* Stat highlight */}
                <div className="rounded-xl bg-[var(--brand-primary)] text-white px-5 py-4 mt-4 mb-5 flex items-center gap-4">
                  <span className="text-4xl font-bold">98%</span>
                  <span className="text-sm font-medium opacity-90">Client satisfaction rate across 6 service lines</span>
                </div>

                {/* Highlight bullets */}
                <div className="space-y-3">
                  {HIGHLIGHTS.map((h, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <span className="w-5 h-5 rounded-full bg-[hsl(217_91%_60%/15%)] text-[var(--brand-primary)] flex items-center justify-center text-xs font-bold flex-shrink-0">
                        <IconCheck className="w-3 h-3" />
                      </span>
                      <p className="text-sm font-semibold text-foreground">{h.title}</p>
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
