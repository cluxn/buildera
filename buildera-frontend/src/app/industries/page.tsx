import Link from 'next/link'
import {
  IconCoin, IconUsers, IconSchool, IconShoppingCart, IconScale,
  IconBuildingFactory2, IconHeartbeat, IconLeaf, IconShieldCheck,
  IconPlane, IconCode,
} from '@tabler/icons-react'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Industries We Serve | Buildera',
  description: 'Deep domain expertise across 11 industry verticals. Buildera builds custom software for FinTech, Healthcare, Manufacturing, Retail, and more.',
}

const INDUSTRIES = [
  {
    slug: 'manufacturing',
    name: 'Manufacturing',
    desc: 'Smart manufacturing software — ERP, MES, and production dashboards.',
    stat: '40% faster production cycles',
    Icon: IconBuildingFactory2,
  },
  {
    slug: 'retail',
    name: 'Retail & eCommerce',
    desc: 'Inventory sync, CRM, and multi-channel commerce solutions.',
    stat: '3x more online revenue',
    Icon: IconShoppingCart,
  },
  {
    slug: 'travel-hospitality',
    name: 'Travel & Hospitality',
    desc: 'Hotel PMS, OTA channel management, and guest experience software.',
    stat: '85%+ occupancy achieved',
    Icon: IconPlane,
  },
  {
    slug: 'fintech',
    name: 'FinTech',
    desc: 'Secure, compliant financial platforms and payment automation.',
    stat: '70% less manual processing',
    Icon: IconCoin,
  },
  {
    slug: 'healthcare',
    name: 'Healthcare',
    desc: 'Hospital information systems, patient portals, and billing software.',
    stat: '50% less admin overhead',
    Icon: IconHeartbeat,
  },
  {
    slug: 'hr-tech',
    name: 'HRTech',
    desc: 'Custom HRMS — payroll input, onboarding, compliance, and analytics.',
    stat: '60% faster onboarding',
    Icon: IconUsers,
  },
  {
    slug: 'ed-tech',
    name: 'EdTech',
    desc: 'LMS platforms, student portals, and batch management systems.',
    stat: '10x student capacity',
    Icon: IconSchool,
  },
  {
    slug: 'legal-tech',
    name: 'LegalTech',
    desc: 'Case management, document automation, and client billing tools.',
    stat: '30% more billable hours',
    Icon: IconScale,
  },
  {
    slug: 'cleantech',
    name: 'Cleantech',
    desc: 'ESG dashboards, carbon tracking, and sustainability reporting.',
    stat: '45% faster ESG reporting',
    Icon: IconLeaf,
  },
  {
    slug: 'insur-tech',
    name: 'InsurTech',
    desc: 'Policy admin, claims automation, and broker portals.',
    stat: '65% faster claims processing',
    Icon: IconShieldCheck,
  },
  {
    slug: 'software-hi-tech',
    name: 'Software & Hi-Tech',
    desc: 'SaaS platforms, API development, and scalable product engineering.',
    stat: '3x faster time to market',
    Icon: IconCode,
  },
]

export default function IndustriesListingPage() {
  return (
    <>
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Industries' },
        ]}
      />

      {/* Hero */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-8 max-w-7xl text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-[var(--brand-primary)] mb-3">
            Domain Expertise
          </p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-5">
            Industries We Serve
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We don&apos;t build generic software. Every engagement starts with understanding your industry — the workflows, the compliance requirements, and the competitive dynamics that make your sector unique.
          </p>
        </div>
      </section>

      {/* Industry grid */}
      <section className="py-20 bg-[var(--brand-surface)]">
        <div className="container mx-auto px-8 max-w-7xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {INDUSTRIES.map(({ slug, name, desc, stat, Icon }) => (
              <Link
                key={slug}
                href={`/industries/${slug}`}
                className="group flex flex-col gap-4 p-6 rounded-xl border border-border bg-background hover:border-[var(--brand-primary)] hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-3">
                  <span className="w-11 h-11 rounded-lg bg-[hsl(217_91%_60%/10%)] text-[var(--brand-primary)] flex items-center justify-center flex-shrink-0 group-hover:bg-[var(--brand-primary)] group-hover:text-white transition-colors">
                    <Icon size={22} />
                  </span>
                  <h2 className="text-base font-semibold text-foreground group-hover:text-[var(--brand-primary)] transition-colors">
                    {name}
                  </h2>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                <span className="mt-auto text-xs font-medium text-[var(--brand-primary)] bg-[hsl(217_91%_60%/10%)] px-3 py-1 rounded-full w-fit">
                  {stat}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-8 max-w-7xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Don&apos;t See Your Industry?
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-8">
            We work across sectors. If you have a business problem that software can solve, we&apos;d like to hear about it.
          </p>
          <Link href="/book-a-call" className="btn-primary">
            Book a Free Discovery Call
          </Link>
        </div>
      </section>
    </>
  )
}
