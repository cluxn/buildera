"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "motion/react"
import { IconX, IconChevronDown, IconExternalLink } from "@tabler/icons-react"
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
          className="flex items-center justify-between w-full px-4 py-3 min-h-[48px] text-sm font-medium text-foreground hover:text-[var(--brand-primary)] hover:bg-[var(--brand-surface)] transition-colors"
          onClick={() => toggleGroup(group)}
          aria-expanded={openGroup === group}
        >
          <span>{label}</span>
          <IconChevronDown
            className={cn(
              "size-4 transition-transform duration-200",
              openGroup === group ? "rotate-180" : ""
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
            <div className="flex justify-between items-center p-4 border-b border-border">
              <button
                onClick={onClose}
                className="flex items-center justify-center min-h-[48px] min-w-[48px] text-foreground hover:text-[var(--brand-primary)] transition-colors rounded-lg"
                aria-label="Close navigation menu"
              >
                <IconX className="size-6" />
              </button>
              <Link href="/" onClick={onClose} className="text-xl font-bold text-foreground hover:text-[var(--brand-primary)] transition-colors">
                Buildera
              </Link>
            </div>

            <div className="flex-1 overflow-y-auto py-2">

              <AccordionSection group="Services" label="Services">
                <div className="pb-3">
                  {servicesMenu.map((service) => (
                    <div key={service.slug} className="px-4 py-2">
                      <Link
                        href={`/services/${service.slug}`}
                        onClick={onClose}
                        className="block text-sm font-semibold text-foreground hover:text-[var(--brand-primary)] transition-colors py-1 min-h-[40px] flex items-center"
                      >
                        {service.category}
                      </Link>
                      <ul className="pl-3 mt-1 flex flex-col gap-1">
                        {service.subServices.map((sub) => (
                          <li key={sub.slug}>
                            <Link
                              href={`/services/${service.slug}/${sub.slug}`}
                              onClick={onClose}
                              className="block text-xs text-muted-foreground hover:text-[var(--brand-primary)] transition-colors py-1 min-h-[36px] flex items-center"
                            >
                              {sub.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </AccordionSection>

              <AccordionSection group="Solutions" label="Solutions">
                <ul className="pb-3 px-4">
                  {SOLUTIONS_MOBILE.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className="block text-sm text-muted-foreground hover:text-[var(--brand-primary)] transition-colors py-2 min-h-[40px] flex items-center"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </AccordionSection>

              <AccordionSection group="Industries" label="Industries">
                <ul className="pb-3 px-4">
                  {INDUSTRIES_MOBILE.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className="block text-sm text-muted-foreground hover:text-[var(--brand-primary)] transition-colors py-2 min-h-[40px] flex items-center"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </AccordionSection>

              <AccordionSection group="Work" label="Work">
                <ul className="pb-3 px-4">
                  {(workItems.length > 0 ? workItems.map((item) => ({ label: item.label, href: item.url })) : defaultWorkItems).map(
                    (item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          onClick={onClose}
                          className="block text-sm text-muted-foreground hover:text-[var(--brand-primary)] transition-colors py-2 min-h-[40px] flex items-center"
                        >
                          {item.label}
                        </Link>
                      </li>
                    )
                  )}
                </ul>
              </AccordionSection>

              <AccordionSection group="Resources" label="Resources">
                <ul className="pb-3 px-4">
                  {(resourceItems.length > 0
                    ? resourceItems.map((item) => ({ label: item.label, href: item.url }))
                    : defaultResourceItems
                  ).map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className="block text-sm text-muted-foreground hover:text-[var(--brand-primary)] transition-colors py-2 min-h-[40px] flex items-center"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </AccordionSection>

              <AccordionSection group="Our Products" label="Our Products">
                <div className="pb-3 px-4 flex flex-col gap-2">
                  {PRODUCTS_MOBILE.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={onClose}
                      className="flex items-start gap-3 py-2"
                    >
                      <div className="flex-1">
                        <span className="flex items-center gap-1 text-sm font-medium text-foreground hover:text-[var(--brand-primary)] transition-colors">
                          {item.label}
                          <IconExternalLink className="size-3 text-muted-foreground" />
                        </span>
                        <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </AccordionSection>

            </div>

            <div className="mt-auto p-4 border-t border-border">
              <Link
                href="/contact"
                onClick={onClose}
                className="flex items-center justify-center w-full text-center bg-[var(--brand-primary)] text-white py-3 rounded-lg font-medium min-h-[48px] hover:bg-[var(--brand-primary-dark)] transition-colors text-sm"
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
