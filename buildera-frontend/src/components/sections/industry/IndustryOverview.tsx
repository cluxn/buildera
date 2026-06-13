import Link from 'next/link'
import { IconArrowRight } from '@tabler/icons-react'
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
  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

          {/* Left */}
          <div className="flex flex-col gap-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--brand-primary)]">
              Why Buildera
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight">
              Built Specifically for {data.name} Businesses
            </h2>
            <p className="text-muted-foreground leading-relaxed text-lg">
              {data.overview}
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-[var(--brand-primary)] font-semibold hover:gap-3 transition-all self-start"
            >
              Book a Free Discovery Call
              <IconArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Right — delivery process */}
          <div className="rounded-2xl border border-border bg-background overflow-hidden">
            <div className="px-7 py-5 border-b border-border">
              <p className="text-xs font-semibold uppercase tracking-widest text-[var(--brand-primary)] mb-1">
                What You Get
              </p>
              <h3 className="text-lg font-bold text-foreground">
                End-to-End {data.name} Software
              </h3>
            </div>
            <div className="divide-y divide-border">
              {DELIVERY_STEPS.map((step, i) => (
                <div key={i} className="flex items-start gap-4 px-7 py-5">
                  <div className="w-7 h-7 rounded-full bg-[var(--brand-primary)] text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {i + 1}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground mb-1">{step.title}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
