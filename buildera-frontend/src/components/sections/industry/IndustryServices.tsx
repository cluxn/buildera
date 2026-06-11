import Link from 'next/link'
import {
  IconCode,
  IconCloud,
  IconCpu,
  IconServer,
  IconBrain,
  IconUsers,
  IconArrowRight,
} from '@tabler/icons-react'
import type { IndustryServiceRef } from '@/types/service-page'
import { allServices } from '@/data/services/index'

const SERVICE_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  'website-development': IconCode,
  'salesforce-development': IconCloud,
  'software-development': IconCpu,
  'devops-development': IconServer,
  'ai-agent-development': IconBrain,
  'hire-a-developer': IconUsers,
}

function getFirstServiceUrl(categorySlug: string): string {
  const first = allServices.find((s) => s.categorySlug === categorySlug)
  if (first) return `/services/${categorySlug}/${first.slug}`
  return '/services'
}

interface Props { services: IndustryServiceRef[] }

export function IndustryServices({ services }: Props) {
  if (!services.length) return null

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-14">
          <p className="text-xs font-semibold uppercase tracking-widest text-[var(--brand-primary)] mb-3">
            Our Services
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            The Services That{' '}
            <span className="text-[var(--brand-primary)]">Power This Industry</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            The specific capabilities we bring to every engagement in your sector — delivered by specialists, not generalists.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((s) => {
            const Icon = SERVICE_ICONS[s.categorySlug] ?? IconCpu
            return (
              <Link
                key={s.categorySlug}
                href={getFirstServiceUrl(s.categorySlug)}
                className="group flex flex-col gap-5 p-7 rounded-xl border border-border bg-[var(--brand-surface)] hover:border-[var(--brand-primary)] hover:shadow-md transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-[var(--brand-primary)] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-base font-semibold text-foreground group-hover:text-[var(--brand-primary)] transition-colors mb-2 leading-snug">
                    {s.label}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.description}</p>
                </div>
                <span className="text-sm font-semibold text-[var(--brand-primary)] flex items-center gap-1.5 mt-auto">
                  Explore Service
                  <IconArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            )
          })}
        </div>

      </div>
    </section>
  )
}
