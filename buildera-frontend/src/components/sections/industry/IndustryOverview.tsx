import Link from 'next/link'
import { IconCheck, IconArrowRight } from '@tabler/icons-react'
import type { IndustryPageData } from '@/types/service-page'

interface Props { data: IndustryPageData }

const DELIVERY_STEPS = [
  {
    title: 'Discovery & Scoping',
    desc: 'We map your exact workflow gaps before writing a single line of code.',
  },
  {
    title: 'Purpose-Built Solution',
    desc: 'Custom-built for your industry, team size, and existing integrations.',
  },
  {
    title: 'Training & Handoff',
    desc: 'Your team gets fully onboarded — not just handed a login and a manual.',
  },
  {
    title: 'Ongoing Support',
    desc: 'Post-launch support so the system keeps working as your business grows.',
  },
]

export function IndustryOverview({ data }: Props) {
  const benefits = data.benefits ?? []

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left — why Buildera */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--brand-primary)] mb-3">
              Why Buildera
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6 leading-tight">
              Built Specifically for {data.name} Businesses
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">{data.overview}</p>

            {benefits.length > 0 && (
              <ul className="space-y-4 mb-8">
                {benefits.map((b, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[var(--brand-primary)] flex items-center justify-center shrink-0 mt-0.5">
                      <IconCheck className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-foreground leading-snug">{b}</span>
                  </li>
                ))}
              </ul>
            )}

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-[var(--brand-primary)] font-semibold hover:gap-3 transition-all"
            >
              Book a Free Discovery Call
              <IconArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Right — delivery process card */}
          <div>
            <div
              className="rounded-2xl border border-border/60 overflow-hidden"
              style={{ background: 'var(--brand-glass)', backdropFilter: 'blur(16px)' }}
            >
              <div className="px-7 py-5 border-b border-border/60 bg-[var(--brand-surface)]">
                <p className="text-xs font-semibold uppercase tracking-widest text-[var(--brand-primary)] mb-1">
                  What You Get
                </p>
                <h3 className="text-lg font-bold text-foreground">End-to-End {data.name} Software</h3>
              </div>
              <div className="px-7 py-6 space-y-5">
                {DELIVERY_STEPS.map((step, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-7 h-7 rounded-full bg-[var(--brand-primary)] text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {i + 1}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground mb-0.5">{step.title}</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
