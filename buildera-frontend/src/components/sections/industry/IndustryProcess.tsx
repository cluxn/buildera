import { IconPhone, IconLayout, IconCode, IconRocket } from '@tabler/icons-react'

const STEPS = [
  {
    number: '01',
    icon: IconPhone,
    title: 'Discovery Call',
    description: 'A focused 30-minute call to understand your exact challenges, current systems, and what success looks like for your business.',
  },
  {
    number: '02',
    icon: IconLayout,
    title: 'Solution Design',
    description: 'We map your workflow gaps and design a solution architecture tailored to your industry, team size, and existing integrations.',
  },
  {
    number: '03',
    icon: IconCode,
    title: 'Build & Test',
    description: 'Iterative development with regular demos so you see progress at every stage. No black-box builds, no surprises at launch.',
  },
  {
    number: '04',
    icon: IconRocket,
    title: 'Launch & Support',
    description: 'We handle deployment, train your team, and stay engaged post-launch to ensure the system performs as your business grows.',
  },
]

export function IndustryProcess() {
  return (
    <section className="py-20 bg-[var(--brand-surface)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-16">
          <p className="text-xs font-semibold uppercase tracking-widest text-[var(--brand-primary)] mb-3">
            How We Work
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Our <span className="text-[var(--brand-primary)]">Delivery Process</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            From first conversation to go-live — here is exactly what working with Buildera looks like.
          </p>
        </div>

        <div className="relative">
          {/* Connector line — desktop only */}
          <div
            className="hidden md:block absolute top-10 left-[calc(12.5%-1px)] right-[calc(12.5%-1px)] h-px bg-border"
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {STEPS.map((step, i) => {
              const Icon = step.icon
              return (
                <div key={i} className="relative flex flex-col items-center text-center">
                  {/* Step circle */}
                  <div className="relative w-20 h-20 rounded-full bg-[var(--brand-primary)] flex items-center justify-center mb-6 z-10 shadow-lg">
                    <Icon className="w-8 h-8 text-white" />
                    <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-background border-2 border-[var(--brand-primary)] text-[10px] font-bold text-[var(--brand-primary)] flex items-center justify-center">
                      {step.number}
                    </span>
                  </div>
                  <h3 className="text-base font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
              )
            })}
          </div>
        </div>

      </div>
    </section>
  )
}
