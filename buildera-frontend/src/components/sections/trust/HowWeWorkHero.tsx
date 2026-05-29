import { IconShieldCheck, IconCalendar, IconCode } from '@tabler/icons-react'
import Link from 'next/link'

const PROMISES = [
  {
    icon: IconCalendar,
    title: 'Honest timelines',
    body: 'Every project gets a realistic schedule agreed upfront. If scope changes, you hear it immediately — not at deadline.',
  },
  {
    icon: IconShieldCheck,
    title: 'Full ownership',
    body: 'You receive all source code, documentation, and deployment assets at handoff. No vendor lock-in, ever.',
  },
  {
    icon: IconCode,
    title: 'Weekly working demos',
    body: 'You see live, working software every week. Not slides. Not screenshots. Actual product you can click through.',
  },
]

export function HowWeWorkHero() {
  return (
    <section className="relative overflow-hidden bg-background py-20">
      <div className="hero-orb-1" aria-hidden="true" />
      <div className="hero-orb-2" aria-hidden="true" />

      <div className="relative container mx-auto px-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--brand-primary)] mb-4">
              How We Work
            </p>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
              A Process Designed to Eliminate Surprises.
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Most software projects fail not because of bad code — but because of vague requirements,
              unrealistic timelines, and clients who only see progress when the invoice arrives.
              Our 6-step process is built to fix all three.
            </p>
            <Link
              href="/book-a-call"
              className="inline-flex items-center px-6 py-3 bg-[var(--brand-primary)] text-white font-semibold rounded-xl hover:bg-[var(--brand-primary-dark)] transition-colors text-sm"
            >
              Start with a Free Discovery Call
            </Link>
          </div>

          <div className="flex flex-col gap-4">
            {PROMISES.map((p) => {
              const Icon = p.icon
              return (
                <div key={p.title} className="flex gap-4 p-5 rounded-xl bg-[var(--brand-surface)] border border-border">
                  <div className="w-10 h-10 rounded-lg bg-[var(--brand-primary)]/10 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-[var(--brand-primary)]" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{p.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{p.body}</p>
                  </div>
                </div>
              )
            })}
          </div>

        </div>
      </div>
    </section>
  )
}
