import Link from 'next/link'
import {
  IconSettings,
  IconChartBar,
  IconUsers,
  IconDatabase,
  IconBolt,
  IconTrendingUp,
  IconShieldCheck,
  IconLink,
  IconBriefcase,
  IconTarget,
  IconArrowRight,
} from '@tabler/icons-react'
import type { IndustrySolutionRef } from '@/types/service-page'

const SOLUTION_ICONS = [
  IconSettings,
  IconChartBar,
  IconUsers,
  IconDatabase,
  IconBolt,
  IconTrendingUp,
  IconShieldCheck,
  IconLink,
  IconBriefcase,
  IconTarget,
]

interface Props { solutions: IndustrySolutionRef[] }

export function IndustrySolutions({ solutions }: Props) {
  if (!solutions.length) return null

  return (
    <section className="py-20 bg-[var(--brand-surface)]">
      <div className="container mx-auto px-8 max-w-7xl">

        <div className="text-center mb-14">
          <p className="text-xs font-semibold uppercase tracking-widest text-[var(--brand-primary)] mb-3">
            Our Solutions
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Purpose-Built Software for Your Industry
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Pre-scoped software modules designed around the exact workflows and data your industry runs on — ready to customise, not start from scratch.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {solutions.map((s, i) => {
            const Icon = SOLUTION_ICONS[i % SOLUTION_ICONS.length]
            return (
              <Link
                key={s.slug}
                href={`/solutions/${s.slug}`}
                className="group flex flex-col p-6 rounded-xl border border-border bg-background hover:border-[var(--brand-primary)] hover:shadow-md transition-all"
              >
                <div className="w-11 h-11 rounded-lg bg-[var(--brand-primary)]/10 flex items-center justify-center mb-4 group-hover:bg-[var(--brand-primary)]/20 transition-colors">
                  <Icon className="w-5 h-5 text-[var(--brand-primary)]" />
                </div>
                <h3 className="text-sm font-semibold text-foreground group-hover:text-[var(--brand-primary)] transition-colors mb-auto leading-snug">
                  {s.label}
                </h3>
                <span className="mt-4 text-xs font-semibold text-[var(--brand-primary)] flex items-center gap-1">
                  Learn More
                  <IconArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            )
          })}
        </div>

      </div>
    </section>
  )
}
