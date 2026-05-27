"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "motion/react"
import { IconX, IconChevronDown } from "@tabler/icons-react"
import { cn } from "@/lib/utils"
import type { NavItem } from "@/lib/api"
import type { ServiceMenuItem } from "./SiteNav"

interface Props {
  isOpen: boolean
  onClose: () => void
  servicesMenu: readonly ServiceMenuItem[]
  navItems: NavItem[]
}

type AccordionGroup = "Services" | "Solutions" | "Work" | "Resources"

export function MobileNavDrawer({ isOpen, onClose, servicesMenu, navItems }: Props) {
  const [openGroup, setOpenGroup] = useState<AccordionGroup | null>(null)

  function toggleGroup(group: AccordionGroup) {
    setOpenGroup((prev) => (prev === group ? null : group))
  }

  const solutionItems = navItems.filter((item) => item.group === "solutions")
  const workItems = navItems.filter((item) => item.group === "work")
  const resourceItems = navItems.filter((item) => item.group === "resources")

  const defaultWorkItems = [
    { label: "Industries", href: "/industries" },
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

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 z-40"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Drawer — slides from right */}
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
            {/* Drawer header */}
            <div className="flex justify-between items-center p-4 border-b border-border">
              <button
                onClick={onClose}
                className="flex items-center justify-center min-h-[48px] min-w-[48px] text-foreground hover:text-[var(--brand-primary)] transition-colors rounded-lg"
                aria-label="Close navigation menu"
              >
                <IconX className="size-6" />
              </button>
              <Link
                href="/"
                onClick={onClose}
                className="text-xl font-bold text-foreground hover:text-[var(--brand-primary)] transition-colors"
              >
                Buildera
              </Link>
            </div>

            {/* Drawer body */}
            <div className="flex-1 overflow-y-auto py-2">
              {/* Services accordion */}
              <div className="border-b border-border">
                <button
                  className="flex items-center justify-between w-full px-4 py-3 min-h-[48px] text-sm font-medium text-foreground hover:text-[var(--brand-primary)] hover:bg-[var(--brand-surface)] transition-colors"
                  onClick={() => toggleGroup("Services")}
                  aria-expanded={openGroup === "Services"}
                >
                  <span>Services</span>
                  <IconChevronDown
                    className={cn(
                      "size-4 transition-transform duration-200",
                      openGroup === "Services" ? "rotate-180" : ""
                    )}
                  />
                </button>
                <AnimatePresence>
                  {openGroup === "Services" && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
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
                                <li key={sub}>
                                  <Link
                                    href={`/services/${service.slug}/${sub.toLowerCase().replace(/\s+/g, "-")}`}
                                    onClick={onClose}
                                    className="block text-xs text-muted-foreground hover:text-[var(--brand-primary)] transition-colors py-1 min-h-[36px] flex items-center"
                                  >
                                    {sub}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Solutions accordion */}
              <div className="border-b border-border">
                <button
                  className="flex items-center justify-between w-full px-4 py-3 min-h-[48px] text-sm font-medium text-foreground hover:text-[var(--brand-primary)] hover:bg-[var(--brand-surface)] transition-colors"
                  onClick={() => toggleGroup("Solutions")}
                  aria-expanded={openGroup === "Solutions"}
                >
                  <span>Solutions</span>
                  <IconChevronDown
                    className={cn(
                      "size-4 transition-transform duration-200",
                      openGroup === "Solutions" ? "rotate-180" : ""
                    )}
                  />
                </button>
                <AnimatePresence>
                  {openGroup === "Solutions" && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
                      <ul className="pb-3 px-4">
                        {solutionItems.length > 0 ? (
                          solutionItems.map((item) => (
                            <li key={item.id}>
                              <Link
                                href={item.url}
                                onClick={onClose}
                                className="block text-sm text-muted-foreground hover:text-[var(--brand-primary)] transition-colors py-2 min-h-[40px] flex items-center"
                              >
                                {item.label}
                              </Link>
                            </li>
                          ))
                        ) : (
                          <li className="text-sm text-muted-foreground py-2">
                            Solutions coming soon.
                          </li>
                        )}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Work accordion */}
              <div className="border-b border-border">
                <button
                  className="flex items-center justify-between w-full px-4 py-3 min-h-[48px] text-sm font-medium text-foreground hover:text-[var(--brand-primary)] hover:bg-[var(--brand-surface)] transition-colors"
                  onClick={() => toggleGroup("Work")}
                  aria-expanded={openGroup === "Work"}
                >
                  <span>Work</span>
                  <IconChevronDown
                    className={cn(
                      "size-4 transition-transform duration-200",
                      openGroup === "Work" ? "rotate-180" : ""
                    )}
                  />
                </button>
                <AnimatePresence>
                  {openGroup === "Work" && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
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
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Resources accordion */}
              <div className="border-b border-border">
                <button
                  className="flex items-center justify-between w-full px-4 py-3 min-h-[48px] text-sm font-medium text-foreground hover:text-[var(--brand-primary)] hover:bg-[var(--brand-surface)] transition-colors"
                  onClick={() => toggleGroup("Resources")}
                  aria-expanded={openGroup === "Resources"}
                >
                  <span>Resources</span>
                  <IconChevronDown
                    className={cn(
                      "size-4 transition-transform duration-200",
                      openGroup === "Resources" ? "rotate-180" : ""
                    )}
                  />
                </button>
                <AnimatePresence>
                  {openGroup === "Resources" && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
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
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Pinned footer CTA */}
            <div className="mt-auto p-4 border-t border-border">
              <Link
                href="/book-a-call"
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
