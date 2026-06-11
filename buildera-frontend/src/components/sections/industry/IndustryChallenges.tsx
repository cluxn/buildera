import {
  IconAlertCircle,
  IconClock,
  IconDatabase,
  IconUsers,
  IconTrendingDown,
  IconShieldOff,
  IconBriefcase,
  IconAlertTriangle,
} from '@tabler/icons-react'
import type { IndustryChallenge } from '@/types/service-page'

const CHALLENGE_ICONS = [
  IconAlertCircle,
  IconClock,
  IconDatabase,
  IconUsers,
  IconTrendingDown,
  IconShieldOff,
  IconBriefcase,
  IconAlertTriangle,
]

interface Props {
  challenges: IndustryChallenge[]
  industryName: string
}

export function IndustryChallenges({ challenges, industryName }: Props) {
  return (
    <section className="py-20 bg-[var(--brand-surface)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-xs font-semibold uppercase tracking-widest text-[var(--brand-primary)] mb-3">
            Industry Challenges
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            The Problems We Solve Every Day
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
            These are the operational bottlenecks we hear from {industryName} businesses week after week. If any resonate, we already know how to fix them.
          </p>
        </div>

        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {challenges.map((c, i) => {
              const Icon = CHALLENGE_ICONS[i % CHALLENGE_ICONS.length]
              return (
                <div
                  key={i}
                  className="bg-background rounded-xl p-6 border border-border hover:border-[var(--brand-primary)]/50 hover:shadow-sm transition-all group"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-[var(--brand-primary)]/10 flex items-center justify-center shrink-0 group-hover:bg-[var(--brand-primary)]/20 transition-colors">
                      <Icon className="w-5 h-5 text-[var(--brand-primary)]" />
                    </div>
                    <span className="text-xs font-bold text-[var(--brand-primary)] tabular-nums opacity-60">
                      0{i + 1}
                    </span>
                  </div>
                  <h3 className="text-base font-semibold mb-2 group-hover:text-[var(--brand-primary)] transition-colors leading-snug">
                    {c.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{c.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
