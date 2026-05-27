"use client"

import Link from "next/link"
import {
  IconWorldWww,
  IconCloud,
  IconSettings,
  IconRobot,
  IconCode,
  IconUsers,
} from "@tabler/icons-react"
import { motion, AnimatePresence } from "motion/react"
import type { NavItem } from "@/lib/api"
import { toSlug } from "@/lib/utils"
import type { ServiceMenuItem } from "./SiteNav"

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  IconWorldWww,
  IconCloud,
  IconSettings,
  IconRobot,
  IconCode,
  IconUsers,
}

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
  { label: "AI Automation", href: "/solutions/india-mart-automation" },
  { label: "Manufacturing", href: "/solutions/manufacturing-production" },
] as const

const WORK_NAV_FALLBACK = [
  { label: "Industries We Serve", href: "/industries", desc: "Healthcare, retail, logistics, finance & more" },
  { label: "Case Studies", href: "/case-studies", desc: "Real projects, measurable outcomes" },
  { label: "How We Work", href: "/how-we-work", desc: "Scoped → Built → Shipped → Supported" },
  { label: "About Buildera", href: "/about", desc: "6+ years, 150+ projects, Kanpur-based" },
  { label: "Testimonials", href: "/testimonials", desc: "What our clients say" },
  { label: "Book a Discovery Call", href: "/book-a-call", desc: "Free 30-min scoping session" },
] as const

const RESOURCES_NAV_FALLBACK = [
  { label: "Blog", href: "/blog", desc: "Tech insights for decision-makers" },
  { label: "Guides", href: "/guides", desc: "How-to guides for your stack" },
  { label: "Contact Us", href: "/contact", desc: "Talk to a solution expert" },
  { label: "FAQ", href: "/faq", desc: "Pricing, timelines, and process" },
  { label: "Privacy Policy", href: "/privacy-policy", desc: "" },
  { label: "Terms of Service", href: "/terms", desc: "" },
] as const

interface Props {
  activePanel: string | null
  servicesMenu: readonly ServiceMenuItem[]
  navItems: NavItem[]
  onMouseEnter: () => void
  onMouseLeave: () => void
}

export function MegaDropdown({
  activePanel,
  servicesMenu,
  navItems,
  onMouseEnter,
  onMouseLeave,
}: Props) {
  const solutionItems = navItems.filter((item) => item.group === "solutions")
  const workItems = navItems.filter((item) => item.group === "work")
  const resourceItems = navItems.filter((item) => item.group === "resources")

  return (
    <AnimatePresence>
      {activePanel && (
        <motion.div
          id={`mega-dropdown-${activePanel?.toLowerCase()}`}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className={
            activePanel === "Services" || activePanel === "Solutions"
              ? "absolute left-0 right-0 top-full bg-white border-t border-border shadow-lg"
              : "absolute left-0 top-full bg-white border border-border shadow-xl rounded-b-xl min-w-[480px]"
          }
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          <div className={
            activePanel === "Services" || activePanel === "Solutions"
              ? "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
              : "px-6 py-6"
          }>
            {activePanel === "Services" && (
              <div className="grid grid-cols-3 gap-6">
                {servicesMenu.map((service) => {
                  const IconComponent = ICON_MAP[service.icon]
                  return (
                    <div key={service.slug} className="flex flex-col gap-2">
                      <Link
                        href={`/services/${service.slug}`}
                        className="flex items-center gap-2 font-semibold text-foreground hover:text-[var(--brand-primary)] transition-colors group"
                      >
                        {IconComponent && (
                          <IconComponent className="size-5 text-[var(--brand-primary)] shrink-0" />
                        )}
                        <span className="text-sm">{service.category}</span>
                      </Link>
                      <ul className="flex flex-col gap-1 pl-7">
                        {service.subServices.map((sub) => (
                          <li key={sub}>
                            <Link
                              href={`/services/${service.slug}/${toSlug(sub)}`}
                              className="text-xs text-muted-foreground hover:text-[var(--brand-primary)] transition-colors"
                            >
                              {sub}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )
                })}
              </div>
            )}

            {activePanel === "Solutions" && (
              <div className="grid grid-cols-4 gap-3">
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
              <div className="max-w-2xl">
                <div className="grid grid-cols-2 gap-3">
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
              </div>
            )}

            {activePanel === "Resources" && (
              <div className="max-w-2xl">
                <div className="grid grid-cols-2 gap-3">
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
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
