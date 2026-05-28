"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "motion/react"
import {
  IconX,
  IconChevronDown,
  IconExternalLink,
  IconWorldWww,
  IconCloud,
  IconSettings,
  IconRobot,
  IconCode,
  IconUsers,
} from "@tabler/icons-react"
import { cn } from "@/lib/utils"
import type { NavItem } from "@/lib/api"
import type { ServiceMenuItem } from "./SiteNav"

interface Props {
  isOpen: boolean
  onClose: () => void
  servicesMenu: readonly ServiceMenuItem[]
  navItems: NavItem[]
}

type AccordionGroup = "Services" | "Solutions" | "Industries" | "Work" | "Resources" | "Our Products"

type IconComponent = React.ComponentType<{ className?: string }>

const ICON_MAP: Record<string, IconComponent> = {
  IconWorldWww,
  IconCloud,
  IconSettings,
  IconRobot,
  IconCode,
  IconUsers,
}

const INDUSTRIES_MOBILE = [
  { label: "Manufacturing", href: "/industries/manufacturing" },
  { label: "Retail & eCommerce", href: "/industries/retail" },
  { label: "Travel & Hospitality", href: "/industries/travel-hospitality" },
  { label: "FinTech", href: "/industries/fintech" },
  { label: "Healthcare", href: "/industries/healthcare" },
  { label: "HRTech", href: "/industries/hr-tech" },
  { label: "EdTech", href: "/industries/ed-tech" },
  { label: "LegalTech", href: "/industries/legal-tech" },
  { label: "Cleantech", href: "/industries/cleantech" },
  { label: "InsurTech", href: "/industries/insur-tech" },
  { label: "Software & Hi-Tech", href: "/industries/software-hi-tech" },
]

const SOLUTIONS_MOBILE = [
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
]

const PRODUCTS_MOBILE = [
  { label: "Barrel Books", href: "https://barrelbooks.com/", desc: "Liquor shop management software", external: true },
  { label: "Ease My Hotel", href: "https://easemyhotel.io/", desc: "Hotel & Airbnb management software", external: true },
]

export function MobileNavDrawer({ isOpen, onClose, servicesMenu, navItems }: Props) {
  const [openGroup, setOpenGroup] = useState<AccordionGroup | null>(null)

  function toggleGroup(group: AccordionGroup) {
    setOpenGroup((prev) => (prev === group ? null : group))
  }

  const workItems = navItems.filter((item) => item.group === "work")
  const resourceItems = navItems.filter((item) => item.group === "resources")

  const defaultWorkItems = [
    { label: "About Us", href: "/about" },
    { label: "Testimonials", href: "/testimonials" },
    { label: "Case Studies", href: "/case-studies" },
    { label: "How We Work", href: "/how-we-work" },
  ]

  const defaultResourceItems = [
    { label: "Blog", href: "/blog" },
    { label: "Guides", href: "/guides" },
    { label: "Contact Us", href: "/contact" },
  ]

  function AccordionSection({
    group,
    label,
    children,
  }: {
    group: AccordionGroup
    label: string
    children: React.ReactNode
  }) {
    return (
      <div className="border-b border-border">
        <button
          className="flex items-center justify-between w-full px-5 py-3.5 min-h-[52px] text-sm font-semibold text-foreground hover:text-[var(--brand-primary)] hover:bg-[var(--brand-surface)] transition-colors"
          onClick={() => toggleGroup(group)}
          aria-expanded={openGroup === group}
        >
          <span>{label}</span>
          <IconChevronDown
            className={cn(
              "size-4 text-muted-foreground transition-transform duration-200",
              openGroup === group ? "rotate-180 text-[var(--brand-primary)]" : ""
            )}
          />
        </button>
        <AnimatePresence>
          {openGroup === group && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="overflow-hidden"
            >
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }

  /* Shared flat link row used by Solutions, Industries, Work, Resources */
  function FlatLink({ href, label }: { href: string; label: string }) {
    return (
      <Link
        href={href}
        onClick={onClose}
        className="flex items-center px-5 py-3 min-h-[48px] text-sm text-foreground hover:text-[var(--brand-primary)] hover:bg-[var(--brand-surface)] border-b border-border last:border-0 transition-colors"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand-primary)] opacity-50 mr-3 flex-shrink-0" />
        {label}
      </Link>
    )
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 z-40"
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="fixed top-0 right-0 h-full w-full max-w-sm bg-background z-50 flex flex-col overflow-hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            {/* Header */}
            <div className="flex justify-between items-center px-5 py-4 border-b border-border">
              <Link
                href="/"
                onClick={onClose}
                className="font-bold text-lg select-none"
                style={{
                  backgroundImage: "linear-gradient(135deg, hsl(217,91%,60%) 0%, hsl(242,75%,40%) 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  color: "transparent",
                }}
              >
                Buildera
              </Link>
              <button
                onClick={onClose}
                className="flex items-center justify-center min-h-[44px] min-w-[44px] text-foreground hover:text-[var(--brand-primary)] hover:bg-[var(--brand-surface)] transition-colors rounded-lg"
                aria-label="Close navigation menu"
              >
                <IconX className="size-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto">

              {/* ── Services ── */}
              <AccordionSection group="Services" label="Services">
                <div className="pb-2">
                  {servicesMenu.map((service, i) => {
                    const IconComponent = ICON_MAP[service.icon]
                    return (
                      <div
                        key={service.slug}
                        className={cn("px-5 py-3", i < servicesMenu.length - 1 && "border-b border-border")}
                      >
                        <Link
                          href={`/services/${service.slug}`}
                          onClick={onClose}
                          className="flex items-center gap-2.5 min-h-[36px] group"
                        >
                          {IconComponent && (
                            <div className="w-6 h-6 rounded-md bg-[var(--brand-surface)] flex items-center justify-center flex-shrink-0">
                              <IconComponent className="size-3.5 text-[var(--brand-primary)]" />
                            </div>
                          )}
                          <span className="text-sm font-semibold text-foreground group-hover:text-[var(--brand-primary)] transition-colors">
                            {service.category}
                          </span>
                        </Link>
                        <ul className="mt-1.5 flex flex-col pl-9">
                          {service.subServices.map((sub) => (
                            <li key={sub.slug}>
                              <Link
                                href={`/services/${service.slug}/${sub.slug}`}
                                onClick={onClose}
                                className="flex items-center text-sm text-muted-foreground hover:text-[var(--brand-primary)] transition-colors py-1.5 min-h-[36px]"
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
              </AccordionSection>

              {/* ── Solutions ── */}
              <AccordionSection group="Solutions" label="Solutions">
                <div>
                  {SOLUTIONS_MOBILE.map((item) => (
                    <FlatLink key={item.href} href={item.href} label={item.label} />
                  ))}
                </div>
              </AccordionSection>

              {/* ── Industries ── */}
              <AccordionSection group="Industries" label="Industries">
                <div>
                  {INDUSTRIES_MOBILE.map((item) => (
                    <FlatLink key={item.href} href={item.href} label={item.label} />
                  ))}
                </div>
              </AccordionSection>

              {/* ── Work ── */}
              <AccordionSection group="Work" label="Work">
                <div>
                  {(workItems.length > 0
                    ? workItems.map((item) => ({ label: item.label, href: item.url }))
                    : defaultWorkItems
                  ).map((item) => (
                    <FlatLink key={item.href} href={item.href} label={item.label} />
                  ))}
                </div>
              </AccordionSection>

              {/* ── Resources ── */}
              <AccordionSection group="Resources" label="Resources">
                <div>
                  {(resourceItems.length > 0
                    ? resourceItems.map((item) => ({ label: item.label, href: item.url }))
                    : defaultResourceItems
                  ).map((item) => (
                    <FlatLink key={item.href} href={item.href} label={item.label} />
                  ))}
                </div>
              </AccordionSection>

              {/* ── Our Products ── */}
              <AccordionSection group="Our Products" label="Our Products">
                <div className="px-5 py-3 flex flex-col gap-2.5 pb-4">
                  {PRODUCTS_MOBILE.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={onClose}
                      className="flex items-start gap-3 p-3.5 rounded-lg border border-border hover:border-[var(--brand-primary)] hover:bg-[var(--brand-surface)] transition-colors group"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="text-sm font-semibold text-foreground group-hover:text-[var(--brand-primary)] transition-colors">
                            {item.label}
                          </span>
                          <IconExternalLink className="size-3.5 text-muted-foreground flex-shrink-0" />
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </AccordionSection>

            </div>

            {/* CTA */}
            <div className="p-5 border-t border-border">
              <Link
                href="/contact"
                onClick={onClose}
                className="flex items-center justify-center w-full bg-[var(--brand-primary)] text-white py-3.5 rounded-lg font-semibold min-h-[52px] hover:bg-[var(--brand-primary-dark)] transition-colors text-sm"
              >
                Book a Free Call
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
