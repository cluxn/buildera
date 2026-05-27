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
import type { ServiceMenuItem } from "./SiteNav"

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  IconWorldWww,
  IconCloud,
  IconSettings,
  IconRobot,
  IconCode,
  IconUsers,
}

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
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="absolute left-0 right-0 top-full bg-white border-t border-border shadow-lg"
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
                              href={`/services/${service.slug}/${sub.toLowerCase().replace(/\s+/g, "-")}`}
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
              <div>
                {solutionItems.length > 0 ? (
                  <div className="grid grid-cols-4 gap-4">
                    {solutionItems.map((item) => (
                      <Link
                        key={item.id}
                        href={item.url}
                        className="flex items-center gap-2 p-3 rounded-lg hover:bg-[var(--brand-surface)] transition-colors group min-h-[48px]"
                      >
                        <span className="text-sm font-medium text-foreground group-hover:text-[var(--brand-primary)] transition-colors">
                          {item.label}
                        </span>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">Solutions coming soon.</p>
                )}
              </div>
            )}

            {activePanel === "Work" && (
              <div>
                {workItems.length > 0 ? (
                  <ul className="flex flex-col gap-2">
                    {workItems.map((item) => (
                      <li key={item.id}>
                        <Link
                          href={item.url}
                          className="text-sm font-medium text-foreground hover:text-[var(--brand-primary)] transition-colors block py-1 min-h-[48px] flex items-center"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <ul className="flex flex-col gap-2">
                    {[
                      { label: "Industries", href: "/industries" },
                      { label: "About Us", href: "/about" },
                      { label: "Testimonials", href: "/testimonials" },
                      { label: "Case Studies", href: "/case-studies" },
                      { label: "How We Work", href: "/how-we-work" },
                    ].map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className="text-sm font-medium text-foreground hover:text-[var(--brand-primary)] transition-colors block py-1"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            {activePanel === "Resources" && (
              <div>
                {resourceItems.length > 0 ? (
                  <ul className="flex flex-col gap-2">
                    {resourceItems.map((item) => (
                      <li key={item.id}>
                        <Link
                          href={item.url}
                          className="text-sm font-medium text-foreground hover:text-[var(--brand-primary)] transition-colors block py-1 min-h-[48px] flex items-center"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <ul className="flex flex-col gap-2">
                    {[
                      { label: "Blog", href: "/blog" },
                      { label: "Guides", href: "/guides" },
                      { label: "Contact Us", href: "/contact" },
                    ].map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className="text-sm font-medium text-foreground hover:text-[var(--brand-primary)] transition-colors block py-1"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
