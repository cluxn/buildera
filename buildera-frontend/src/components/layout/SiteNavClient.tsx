"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { IconMenu2 } from "@tabler/icons-react"
import { cn } from "@/lib/utils"
import { MegaDropdown } from "./MegaDropdown"
import { MobileNavDrawer } from "./MobileNavDrawer"
import type { NavItem } from "@/lib/api"
import type { ServiceMenuItem } from "./SiteNav"

interface Props {
  servicesMenu: readonly ServiceMenuItem[]
  navItems: NavItem[]
}

const NAV_PANELS = ["Services", "Solutions", "Work", "Resources"] as const

export function SiteNavClient({ servicesMenu, navItems }: Props) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  function handleNavMouseEnter(panel: string) {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current)
    }
    hoverTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(panel)
    }, 150)
  }

  function handleNavMouseLeave() {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current)
    // Delay close so mouse has time to reach the dropdown panel
    closeTimeoutRef.current = setTimeout(() => setActiveDropdown(null), 120)
  }

  function handleDropdownMouseEnter() {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current)
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current)
  }

  function handleDropdownMouseLeave() {
    closeTimeoutRef.current = setTimeout(() => setActiveDropdown(null), 80)
  }

  return (
    <div className="relative">
      <nav
        className={cn(
          "w-full transition-all duration-300",
          isScrolled ? "glass-nav" : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link
              href="/"
              className="text-xl font-bold text-foreground hover:text-[var(--brand-primary)] transition-colors"
            >
              Buildera
            </Link>

            {/* Desktop nav links */}
            <div className="hidden lg:flex items-center gap-1">
              {NAV_PANELS.map((panel) => (
                <button
                  key={panel}
                  aria-expanded={activeDropdown === panel}
                  aria-controls={`mega-dropdown-${panel.toLowerCase()}`}
                  className={cn(
                    "relative px-4 py-2 text-sm font-medium rounded-lg transition-colors min-h-[48px]",
                    activeDropdown === panel
                      ? "text-[var(--brand-primary)]"
                      : "text-foreground hover:text-[var(--brand-primary)] hover:bg-[var(--brand-surface)]"
                  )}
                  onMouseEnter={() => handleNavMouseEnter(panel)}
                  onMouseLeave={handleNavMouseLeave}
                >
                  {panel}
                </button>
              ))}
            </div>

            {/* Desktop CTA + Mobile hamburger */}
            <div className="flex items-center gap-3">
              <Link
                href="/book-a-call"
                className="hidden lg:inline-flex items-center bg-[var(--brand-primary)] text-white px-5 py-2.5 rounded-lg font-medium min-h-[48px] hover:bg-[var(--brand-primary-dark)] transition-colors text-sm"
              >
                Book a Call
              </Link>
              <button
                className="lg:hidden flex items-center justify-center min-h-[48px] min-w-[48px] text-foreground hover:text-[var(--brand-primary)] transition-colors"
                onClick={() => setIsMobileOpen(true)}
                aria-label="Open navigation menu"
              >
                <IconMenu2 className="size-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mega dropdown — positioned below nav bar */}
      <MegaDropdown
        activePanel={activeDropdown}
        servicesMenu={servicesMenu}
        navItems={navItems}
        onMouseEnter={handleDropdownMouseEnter}
        onMouseLeave={handleDropdownMouseLeave}
      />

      {/* Mobile drawer */}
      <MobileNavDrawer
        isOpen={isMobileOpen}
        onClose={() => setIsMobileOpen(false)}
        servicesMenu={servicesMenu}
        navItems={navItems}
      />
    </div>
  )
}
