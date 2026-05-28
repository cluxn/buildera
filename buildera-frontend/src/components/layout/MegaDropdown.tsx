"use client"

import Link from "next/link"
import {
  IconWorldWww,
  IconCloud,
  IconSettings,
  IconRobot,
  IconCode,
  IconUsers,
  IconExternalLink,
  IconBuildingFactory2,
  IconShoppingCart,
  IconPlaneDeparture,
  IconBuildingBank,
  IconHeart,
  IconUserCheck,
  IconBook,
  IconScale,
  IconLeaf,
  IconShieldCheck,
  IconCpu,
  IconLayoutDashboard,
  IconTruck,
  IconBuildingWarehouse,
  IconAddressBook,
  IconChartBar,
  IconTarget,
  IconDatabase,
  IconWallet,
  IconChecklist,
  IconTool,
  IconPackage,
  IconBottle,
  IconFileAnalytics,
  IconRoute,
  IconBuildingSkyscraper,
  IconMessageCircle,
  IconNews,
  IconBook2,
  IconMessage,
  IconArrowRight,
} from "@tabler/icons-react"
import { motion, AnimatePresence } from "motion/react"
import type { NavItem } from "@/lib/api"
import type { ServiceMenuItem } from "./SiteNav"

type IconComponent = React.ComponentType<{ className?: string }>

const ICON_MAP: Record<string, IconComponent> = {
  IconWorldWww,
  IconCloud,
  IconSettings,
  IconRobot,
  IconCode,
  IconUsers,
}

interface IndustryItem {
  label: string
  href: string
  desc: string
  icon: IconComponent
}

interface SolutionItem {
  label: string
  href: string
  icon: IconComponent
}

interface WorkItem {
  label: string
  href: string
  desc: string
  icon: IconComponent
}

interface ResourceItem {
  label: string
  href: string
  desc: string
  icon: IconComponent
}

const INDUSTRIES_NAV: IndustryItem[] = [
  { label: "Manufacturing",      href: "/industries/manufacturing",      desc: "Production, ERP & supply chain",       icon: IconBuildingFactory2 },
  { label: "Retail & eCommerce", href: "/industries/retail",             desc: "Inventory, CRM & commerce",            icon: IconShoppingCart },
  { label: "Travel & Hospitality",href: "/industries/travel-hospitality",desc: "PMS, OTA & guest experience",          icon: IconPlaneDeparture },
  { label: "FinTech",            href: "/industries/fintech",            desc: "Compliance, payments & reporting",     icon: IconBuildingBank },
  { label: "Healthcare",         href: "/industries/healthcare",         desc: "HMS, patient portals & billing",       icon: IconHeart },
  { label: "HRTech",             href: "/industries/hr-tech",            desc: "Payroll, onboarding & performance",    icon: IconUserCheck },
  { label: "EdTech",             href: "/industries/ed-tech",            desc: "LMS, admissions & batch management",   icon: IconBook },
  { label: "LegalTech",          href: "/industries/legal-tech",         desc: "Case management & billing",            icon: IconScale },
  { label: "Cleantech",          href: "/industries/cleantech",          desc: "ESG tracking & sustainability data",   icon: IconLeaf },
  { label: "InsurTech",          href: "/industries/insur-tech",         desc: "Policy admin & claims automation",     icon: IconShieldCheck },
  { label: "Software & Hi-Tech", href: "/industries/software-hi-tech",  desc: "SaaS, APIs & dev teams",               icon: IconCpu },
]

const SOLUTION_NAV_FALLBACK: SolutionItem[] = [
  { label: "Operations Management",     href: "/solutions/operations-management",   icon: IconLayoutDashboard },
  { label: "Supply Chain",              href: "/solutions/supply-chain",            icon: IconTruck },
  { label: "Warehouse Management",      href: "/solutions/warehouse-management",    icon: IconBuildingWarehouse },
  { label: "HR Management",             href: "/solutions/hr-management",           icon: IconUsers },
  { label: "CRM",                       href: "/solutions/crm",                     icon: IconAddressBook },
  { label: "Sales Management",          href: "/solutions/sales-management",        icon: IconChartBar },
  { label: "Lead Management",           href: "/solutions/lead-management",         icon: IconTarget },
  { label: "ERP",                       href: "/solutions/erp",                     icon: IconDatabase },
  { label: "Financial Management",      href: "/solutions/financial-management",    icon: IconWallet },
  { label: "Project Management",        href: "/solutions/project-management",      icon: IconChecklist },
  { label: "IndiaMart Automation",      href: "/solutions/india-mart-automation",   icon: IconRobot },
  { label: "Manufacturing & Production",href: "/solutions/manufacturing-production",icon: IconTool },
  { label: "Inventory Management",      href: "/solutions/inventory-management",    icon: IconPackage },
  { label: "Liquor Shop Management",    href: "/solutions/liquor-shop-management",  icon: IconBottle },
]

const WORK_NAV_FALLBACK: WorkItem[] = [
  { label: "Case Studies",   href: "/case-studies", desc: "Real projects, measurable outcomes",      icon: IconFileAnalytics },
  { label: "How We Work",    href: "/how-we-work",  desc: "Scoped → Built → Shipped → Supported",   icon: IconRoute },
  { label: "About Buildera", href: "/about",        desc: "10+ years, 800+ projects, Kanpur-based", icon: IconBuildingSkyscraper },
  { label: "Testimonials",   href: "/testimonials", desc: "What our clients say",                   icon: IconMessageCircle },
]

const RESOURCES_NAV_FALLBACK: ResourceItem[] = [
  { label: "Blog",      href: "/blog",    desc: "Tech insights for decision-makers", icon: IconNews },
  { label: "Guides",    href: "/guides",  desc: "How-to guides for your stack",      icon: IconBook2 },
  { label: "Contact Us",href: "/contact", desc: "Talk to a solution expert",         icon: IconMessage },
]

const PRODUCTS_NAV = [
  {
    name: "Barrel Books",
    href: "https://barrelbooks.com/",
    desc: "Liquor shop management — daily stocks, purchases & transfers",
    logo: "/products/barrelbooks-logo.svg",
  },
  {
    name: "Ease My Hotel",
    href: "https://easemyhotel.io/",
    desc: "Hotel & Airbnb management software for independent properties",
    logo: "/products/easemyhotel-logo.png",
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

            {/* ── Services ── */}
            {activePanel === "Services" && (
              <>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-4 px-1">
                  What We Build For You
                </p>
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
              </>
            )}

            {/* ── Industries ── */}
            {activePanel === "Industries" && (
              <>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-4 px-1">
                  Industries We Serve
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {INDUSTRIES_NAV.map((item) => {
                    const Icon = item.icon
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="flex items-start gap-3 p-3 rounded-lg border border-border hover:border-[var(--brand-primary)] hover:bg-[var(--brand-surface)] transition-colors group"
                      >
                        <div className="w-7 h-7 rounded-md bg-[var(--brand-surface)] group-hover:bg-[var(--brand-primary)] flex items-center justify-center flex-shrink-0 transition-colors mt-0.5">
                          <Icon className="size-4 text-[var(--brand-primary)] group-hover:text-white transition-colors" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-foreground group-hover:text-[var(--brand-primary)] transition-colors leading-tight">
                            {item.label}
                          </p>
                          <p className="text-xs text-muted-foreground mt-0.5 leading-snug">{item.desc}</p>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              </>
            )}

            {/* ── Solutions ── */}
            {activePanel === "Solutions" && (
              <>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-4 px-1">
                  Solutions We Deliver
                </p>
                <div className="grid grid-cols-3 gap-1.5">
                  {(solutionItems.length > 0
                    ? solutionItems.map((item) => ({ label: item.label, href: item.url, icon: IconArrowRight as IconComponent }))
                    : SOLUTION_NAV_FALLBACK
                  ).map((item) => {
                    const Icon = item.icon
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg border border-border hover:border-[var(--brand-primary)] hover:bg-[var(--brand-surface)] transition-colors group min-h-[44px]"
                      >
                        <Icon className="size-4 text-[var(--brand-primary)] shrink-0" />
                        <span className="text-sm font-medium text-foreground group-hover:text-[var(--brand-primary)] transition-colors">
                          {item.label}
                        </span>
                      </Link>
                    )
                  })}
                </div>
              </>
            )}

            {/* ── Work ── */}
            {activePanel === "Work" && (
              <>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-4 px-1">
                  Our Work & Company
                </p>
                <div className="grid grid-cols-2 gap-2 min-w-[400px]">
                  {(workItems.length > 0
                    ? workItems.map((i) => ({ label: i.label, href: i.url, desc: "", icon: IconArrowRight as IconComponent }))
                    : WORK_NAV_FALLBACK
                  ).map((item) => {
                    const Icon = item.icon
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="flex items-start gap-3 px-3 py-3 rounded-lg border border-border hover:border-[var(--brand-primary)] hover:bg-[var(--brand-surface)] transition-colors group"
                      >
                        <div className="w-7 h-7 rounded-md bg-[var(--brand-surface)] group-hover:bg-[var(--brand-primary)] flex items-center justify-center flex-shrink-0 transition-colors mt-0.5">
                          <Icon className="size-4 text-[var(--brand-primary)] group-hover:text-white transition-colors" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-foreground group-hover:text-[var(--brand-primary)] transition-colors">
                            {item.label}
                          </p>
                          {item.desc && (
                            <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                          )}
                        </div>
                      </Link>
                    )
                  })}
                </div>
              </>
            )}

            {/* ── Resources ── */}
            {activePanel === "Resources" && (
              <>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-4 px-1">
                  Learn & Connect
                </p>
                <div className="grid grid-cols-2 gap-2 min-w-[400px]">
                  {(resourceItems.length > 0
                    ? resourceItems.map((i) => ({ label: i.label, href: i.url, desc: "", icon: IconArrowRight as IconComponent }))
                    : RESOURCES_NAV_FALLBACK
                  ).map((item) => {
                    const Icon = item.icon
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="flex items-start gap-3 px-3 py-3 rounded-lg border border-border hover:border-[var(--brand-primary)] hover:bg-[var(--brand-surface)] transition-colors group"
                      >
                        <div className="w-7 h-7 rounded-md bg-[var(--brand-surface)] group-hover:bg-[var(--brand-primary)] flex items-center justify-center flex-shrink-0 transition-colors mt-0.5">
                          <Icon className="size-4 text-[var(--brand-primary)] group-hover:text-white transition-colors" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-foreground group-hover:text-[var(--brand-primary)] transition-colors">
                            {item.label}
                          </p>
                          {item.desc && (
                            <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                          )}
                        </div>
                      </Link>
                    )
                  })}
                </div>
              </>
            )}

            {/* ── Products ── */}
            {activePanel === "Products" && (
              <div className="flex flex-col gap-2 min-w-[420px]">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-3 px-1">
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
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden bg-white border border-border">
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
