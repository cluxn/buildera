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
  const [dropdownLeft, setDropdownLeft] = useState<number | null>(null)

  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const buttonRefs = useRef<Partial<Record<string, HTMLButtonElement>>>({})

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  function handleNavMouseEnter(panel: string) {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current)

    // Capture button's left position for compact (Work/Resources) dropdowns
    const btn = buttonRefs.current[panel]
    if (btn && (panel === "Work" || panel === "Resources")) {
      setDropdownLeft(btn.getBoundingClientRect().left)
    } else {
      setDropdownLeft(null)
    }

    hoverTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(panel)
    }, 150)
  }

  function handleNavMouseLeave() {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current)
    closeTimeoutRef.current = setTimeout(() => setActiveDropdown(null), 300)
  }

  function handleDropdownMouseEnter() {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current)
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current)
  }

  function handleDropdownMouseLeave() {
    closeTimeoutRef.current = setTimeout(() => setActiveDropdown(null), 200)
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

            {/* Logo — SVG icon matching favicon + wordmark */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                className="flex-shrink-0 group-hover:opacity-90 transition-opacity"
              >
                <rect width="32" height="32" rx="8" fill="url(#nav-logo-grad)" />
                <text x="8" y="24" fontFamily="Inter, Arial, sans-serif" fontSize="20" fontWeight="700" fill="white">B</text>
                <defs>
                  <linearGradient id="nav-logo-grad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="hsl(217,91%,60%)" />
                    <stop offset="100%" stopColor="hsl(242,75%,40%)" />
                  </linearGradient>
                </defs>
              </svg>
              <span className="text-[1.1rem] font-bold text-foreground group-hover:text-[var(--brand-primary)] transition-colors tracking-tight">
                buildera
              </span>
            </Link>

            {/* Desktop nav links */}
            <div
              className="hidden lg:flex items-center gap-1"
              onMouseLeave={handleNavMouseLeave}
            >
              {NAV_PANELS.map((panel) => (
                <button
                  key={panel}
                  ref={(el) => { buttonRefs.current[panel] = el ?? undefined }}
                  aria-expanded={activeDropdown === panel}
                  aria-controls={`mega-dropdown-${panel.toLowerCase()}`}
                  className={cn(
                    "relative px-4 py-2 text-sm font-medium rounded-lg transition-colors min-h-[48px]",
                    activeDropdown === panel
                      ? "text-[var(--brand-primary)]"
                      : "text-foreground hover:text-[var(--brand-primary)] hover:bg-[var(--brand-surface)]"
                  )}
                  onMouseEnter={() => handleNavMouseEnter(panel)}
                >
                  {panel}
                </button>
              ))}
            </div>

            {/* Desktop CTA + Mobile hamburger */}
            <div className="flex items-center gap-3">
              <Link href="/book-a-call" className="hidden lg:inline-flex btn-primary !min-h-[42px]">
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

      {/* Mega dropdown */}
      <MegaDropdown
        activePanel={activeDropdown}
        dropdownLeft={dropdownLeft}
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
