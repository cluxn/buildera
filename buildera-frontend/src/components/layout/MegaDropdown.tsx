"use client"

import Link from "next/link"
import Image from "next/image"
import {
  IconWorldWww,
  IconCloud,
  IconSettings,
  IconRobot,
  IconCode,
  IconUsers,
  IconExternalLink,
} from "@tabler/icons-react"
import { motion, AnimatePresence } from "motion/react"
import type { NavItem } from "@/lib/api"
import type { ServiceMenuItem } from "./SiteNav"

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  IconWorldWww,
  IconCloud,
  IconSettings,
  IconRobot,
  IconCode,
  IconUsers,
}

const INDUSTRIES_NAV = [
  { label: "Manufacturing", href: "/industries/manufacturing", desc: "Production, ERP & supply chain" },
  { label: "Retail & eCommerce", href: "/industries/retail", desc: "Inventory, CRM & commerce" },
  { label: "Travel & Hospitality", href: "/industries/travel-hospitality", desc: "PMS, OTA & guest experience" },
  { label: "FinTech", href: "/industries/fintech", desc: "Compliance, payments & reporting" },
  { label: "Healthcare", href: "/industries/healthcare", desc: "HMS, patient portals & billing" },
  { label: "HRTech", href: "/industries/hr-tech", desc: "Payroll, onboarding & performance" },
  { label: "EdTech", href: "/industries/ed-tech", desc: "LMS, admissions & batch management" },
  { label: "LegalTech", href: "/industries/legal-tech", desc: "Case management & billing" },
  { label: "Cleantech", href: "/industries/cleantech", desc: "ESG tracking & sustainability data" },
  { label: "InsurTech", href: "/industries/insur-tech", desc: "Policy admin & claims automation" },
  { label: "Software & Hi-Tech", href: "/industries/software-hi-tech", desc: "SaaS, APIs & dev teams" },
] as const

const SOLUTION_NAV_FALLBACK = [
  { label: "Operations Management", href: "/solutions/operations-management" },
  { label: "Supply Chain", href: "/solutions/supply-chain" },
  { label: "Warehouse Management", href: "/solutions/warehouse-management" },
  { label: "HR Management", href: "/solutions/hr-management" },
  { label: "CRM", href: "/solutions/crm" },
  { label: "Sales Management", href: "/solutions/sales-management" },
  { label: "Lead Management", href: "/solutions/lead-management" },
  { label: "ERP", href: "/solutions/erp" },
  { label: "Financial Management", href: "/solutions/financial-management" },
  { label: "Project Management", href: "/solutions/project-management" },
  { label: "IndiaMart Automation", href: "/solutions/india-mart-automation" },
  { label: "Manufacturing & Production", href: "/solutions/manufacturing-production" },
  { label: "Inventory Management", href: "/solutions/inventory-management" },
  { label: "Liquor Shop Management", href: "/solutions/liquor-shop-management" },
] as const

const WORK_NAV_FALLBACK = [
  { label: "Case Studies", href: "/case-studies", desc: "Real projects, measurable outcomes" },
  { label: "How We Work", href: "/how-we-work", desc: "Scoped → Built → Shipped → Supported" },
  { label: "About Buildera", href: "/about", desc: "10+ years, 800+ projects, Kanpur-based" },
  { label: "Testimonials", href: "/testimonials", desc: "What our clients say" },
  { label: "Book a Discovery Call", href: "/contact", desc: "Free 30-min scoping session" },
] as const

const RESOURCES_NAV_FALLBACK = [
  { label: "Blog", href: "/blog", desc: "Tech insights for decision-makers" },
  { label: "Guides", href: "/guides", desc: "How-to guides for your stack" },
  { label: "Contact Us", href: "/contact", desc: "Talk to a solution expert" },
  { label: "FAQ", href: "/faq", desc: "Pricing, timelines, and process" },
  { label: "Privacy Policy", href: "/privacy-policy", desc: "" },
  { label: "Terms of Service", href: "/terms", desc: "" },
] as const

const PRODUCTS_NAV = [
  {
    name: "Barrel Books",
    href: "https://barrelbooks.com/",
    desc: "Liquor shop management — daily stocks, purchases & transfers",
    logo: "/products/barrelbooks-logo.svg",
    color: "hsl(217 91% 60%)",
  },
  {
    name: "Ease My Hotel",
    href: "https://easemyhotel.io/",
    desc: "Hotel & Airbnb management software for independent properties",
    logo: "/products/easemyhotel-logo.png",
    color: "hsl(243 72% 50%)",
  },
] as const

interface Props {
  activePanel: string | null
  dropdownOffset: { left: number; width: number } | null
  servicesMenu: readonly ServiceMenuItem[]
  navItems: NavItem[]
  onMouseEnter: () => void
  onMouseLeave: () => void
}

export function MegaDropdown({
  activePanel,
  dropdownOffset,
  servicesMenu,
  navItems,
  onMouseEnter,
  onMouseLeave,
}: Props) {
  const solutionItems = navItems.filter((item) => item.group === "solutions")
  const workItems = navItems.filter((item) => item.group === "work")
  const resourceItems = navItems.filter((item) => item.group === "resources")

  return (
    <AnimatePresence mode="sync">
      {activePanel && (
        <motion.div
          key={activePanel}
          id={`mega-dropdown-${activePanel.toLowerCase().replace(/\s+/g, "-")}`}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          className="absolute top-full bg-white border border-border shadow-xl rounded-xl overflow-hidden"
          style={
            dropdownOffset != null
              ? { left: dropdownOffset.left, width: dropdownOffset.width }
              : { left: 0, right: 0 }
          }
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          <div className="px-6 py-6">
            {activePanel === "Services" && (
              <div className="grid grid-cols-3 gap-6">
                {servicesMenu.map((service) => {
                  const IconComponent = ICON_MAP[service.icon]
                  return (
                    <div key={service.slug} className="flex flex-col gap-2">
                      <Link
                        href={`/services/${service.slug}`}
                        className="flex items-center gap-2 font-semibold text-foreground hover:text-[var(--brand-primary)] transition-colors"
                      >
                        {IconComponent && (
                          <IconComponent className="size-5 text-[var(--brand-primary)] shrink-0" />
                        )}
                        <span className="text-sm">{service.category}</span>
                      </Link>
                      <ul className="flex flex-col gap-1 pl-7">
                        {service.subServices.map((sub) => (
                          <li key={sub.slug}>
                            <Link
                              href={`/services/${service.slug}/${sub.slug}`}
                              className="text-xs text-muted-foreground hover:text-[var(--brand-primary)] transition-colors"
                            >
                              {sub.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )
                })}
              </div>
            )}

            {activePanel === "Industries" && (
              <div className="grid grid-cols-3 gap-3">
                {INDUSTRIES_NAV.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex flex-col gap-0.5 p-3 rounded-lg hover:bg-[var(--brand-surface)] transition-colors group"
                  >
                    <span className="text-sm font-semibold text-foreground group-hover:text-[var(--brand-primary)] transition-colors">
                      {item.label}
                    </span>
                    <span className="text-xs text-muted-foreground">{item.desc}</span>
                  </Link>
                ))}
              </div>
            )}

            {activePanel === "Solutions" && (
              <div className="grid grid-cols-3 gap-2">
                {(solutionItems.length > 0
                  ? solutionItems.map((item) => ({ label: item.label, href: item.url }))
                  : SOLUTION_NAV_FALLBACK
                ).map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center p-3 rounded-lg hover:bg-[var(--brand-surface)] transition-colors group min-h-[44px]"
                  >
                    <span className="text-sm font-medium text-foreground group-hover:text-[var(--brand-primary)] transition-colors">
                      {item.label}
                    </span>
                  </Link>
                ))}
              </div>
            )}

            {activePanel === "Work" && (
              <div className="grid grid-cols-2 gap-3 min-w-[400px]">
                {(workItems.length > 0
                  ? workItems.map((i) => ({ label: i.label, href: i.url, desc: "" }))
                  : WORK_NAV_FALLBACK
                ).map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex flex-col gap-0.5 px-4 py-3 rounded-lg hover:bg-[var(--brand-surface)] transition-colors group"
                  >
                    <span className="text-sm font-semibold text-foreground group-hover:text-[var(--brand-primary)] transition-colors">
                      {item.label}
                    </span>
                    {item.desc && (
                      <span className="text-xs text-muted-foreground">{item.desc}</span>
                    )}
                  </Link>
                ))}
              </div>
            )}

            {activePanel === "Resources" && (
              <div className="grid grid-cols-2 gap-3 min-w-[400px]">
                {(resourceItems.length > 0
                  ? resourceItems.map((i) => ({ label: i.label, href: i.url, desc: "" }))
                  : RESOURCES_NAV_FALLBACK
                ).map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex flex-col gap-0.5 px-4 py-3 rounded-lg hover:bg-[var(--brand-surface)] transition-colors group"
                  >
                    <span className="text-sm font-semibold text-foreground group-hover:text-[var(--brand-primary)] transition-colors">
                      {item.label}
                    </span>
                    {item.desc && (
                      <span className="text-xs text-muted-foreground">{item.desc}</span>
                    )}
                  </Link>
                ))}
              </div>
            )}

            {activePanel === "Our Products" && (
              <div className="flex flex-col gap-2 min-w-[420px]">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-1 px-1">
                  Live Products Built by Buildera
                </p>
                {PRODUCTS_NAV.map((product) => (
                  <a
                    key={product.href}
                    href={product.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-xl border border-border hover:border-[var(--brand-primary)] hover:bg-[var(--brand-surface)] transition-all group"
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden bg-white border border-border"
                    >
                      <img
                        src={product.logo}
                        alt={`${product.name} logo`}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-semibold text-foreground group-hover:text-[var(--brand-primary)] transition-colors">
                          {product.name}
                        </span>
                        <IconExternalLink className="size-3 text-muted-foreground flex-shrink-0" />
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5 leading-snug">{product.desc}</p>
                    </div>
                  </a>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
