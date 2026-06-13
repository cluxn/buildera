import {
  IconAlertCircle,
  IconClock,
  IconDatabase,
} from '@tabler/icons-react'
import type { PainPoint } from '@/types/service-page'

const CHALLENGE_ICONS = [IconAlertCircle, IconClock, IconDatabase]

interface Props { points: PainPoint[] }

export function ServicePainPoints({ points }: Props) {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-xs font-semibold uppercase tracking-widest text-[var(--brand-primary)] mb-3">Common Challenges</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Does This Sound Familiar?</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Problems we hear from businesses every week — if any resonate, we can help.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {points.map((point, i) => {
            const Icon = CHALLENGE_ICONS[i % CHALLENGE_ICONS.length]
            return (
              <div
                key={i}
                className="h-full flex flex-col bg-background rounded-xl p-6 border border-border hover:border-[var(--brand-primary)]/50 hover:shadow-sm transition-all group"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-[var(--brand-primary)]/10 flex items-center justify-center shrink-0 group-hover:bg-[var(--brand-primary)]/20 transition-colors">
                    <Icon className="w-5 h-5 text-[var(--brand-primary)]" />
                  </div>
                  <span className="text-xs font-bold text-[var(--brand-primary)] tabular-nums opacity-60">0{i + 1}</span>
                </div>
                <h3 className="text-base font-semibold mb-2 leading-snug group-hover:text-[var(--brand-primary)] transition-colors">{point.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{point.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
