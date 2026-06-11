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
  IconBuildingWarehouse,
  IconPackage,
  IconCash,
  IconUserCheck,
  IconClipboardList,
  IconTruck,
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
  IconBuildingWarehouse,
  IconPackage,
  IconCash,
  IconUserCheck,
  IconClipboardList,
  IconTruck,
]

const SOLUTION_DESCRIPTIONS: Record<string, string> = {
  'operations-management': 'Centralise orders, inventory, and workflows into a single real-time dashboard your whole team works from.',
  'vendor-management': 'Manage POs, contracts, and supplier performance in one portal — with three-way invoice matching built in.',
  'crm': 'Track every lead, deal, and customer interaction from first contact to repeat purchase.',
  'erp': 'Unify finance, procurement, production, and HR into one connected ERP tailored to your business.',
  'lead-management': 'Capture, qualify, and route inbound leads automatically so your sales team focuses on closing.',
  'hr-management': 'Automate payroll, attendance, onboarding, and leave management for growing teams.',
  'warehouse-management': 'Real-time bin-level inventory tracking, pick-and-pack automation, and dispatch accuracy.',
  'inventory-management': 'Prevent stockouts and overstock with live inventory counts and automated reorder triggers.',
  'manufacturing-production': 'Production scheduling, machine utilisation, and quality control from floor to boardroom.',
  'supply-chain': 'End-to-end supply chain visibility — from supplier lead times to last-mile delivery status.',
  'ota-channel-partner': 'Push rate changes and availability across every OTA channel in real time from one dashboard.',
  'booking-reservation': 'Custom booking engine that handles availability, payments, and confirmations automatically.',
  'patient-management': 'Patient records, appointment scheduling, and billing — built for clinics that see volume.',
  'pos-retail': 'Multi-location POS that syncs inventory, loyalty, and reporting in real time.',
  'saas-mvp': 'Go from validated idea to live SaaS product with a lean, scalable MVP architecture.',
  'liquor-shop-management': 'Excise-compliant stock tracking, barcode billing, and supplier PO management for liquor retailers.',
}

const SOLUTION_FALLBACK = 'Purpose-built for your industry — pre-scoped, customisable, and ready to deploy.'

interface Props { solutions: IndustrySolutionRef[] }

export function IndustrySolutions({ solutions }: Props) {
  if (!solutions.length) return null

  return (
    <section className="py-20 bg-[var(--brand-surface)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {solutions.map((s, i) => {
            const Icon = SOLUTION_ICONS[i % SOLUTION_ICONS.length]
            const desc = SOLUTION_DESCRIPTIONS[s.slug] ?? SOLUTION_FALLBACK
            return (
              <Link
                key={s.slug}
                href={`/solutions/${s.slug}`}
                className="group flex flex-col p-6 rounded-xl border border-border bg-background hover:border-[var(--brand-primary)] hover:shadow-md transition-all"
              >
                <div className="w-11 h-11 rounded-lg bg-[var(--brand-primary)]/10 flex items-center justify-center mb-4 group-hover:bg-[var(--brand-primary)]/20 transition-colors">
                  <Icon className="w-5 h-5 text-[var(--brand-primary)]" />
                </div>
                <h3 className="font-semibold text-foreground group-hover:text-[var(--brand-primary)] transition-colors mb-2 leading-snug">
                  {s.label}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-auto">
                  {desc}
                </p>
                <span className="mt-5 text-xs font-semibold text-[var(--brand-primary)] flex items-center gap-1">
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
