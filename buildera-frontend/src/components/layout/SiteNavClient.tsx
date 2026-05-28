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

const NAV_PANELS = ["Services", "Industries", "Solutions", "Work", "Resources", "Our Products"] as const

// Pixel width for each dropdown panel
const PANEL_WIDTHS: Record<string, number> = {
  Services: 900,
  Industries: 660,
  Solutions: 720,
  Work: 460,
  Resources: 460,
  "Our Products": 480,
}

export function SiteNavClient({ servicesMenu, navItems }: Props) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [dropdownOffset, setDropdownOffset] = useState<{ left: number; width: number } | null>(null)

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
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current)

    const btn = buttonRefs.current[panel]
    if (btn) {
      const rect = btn.getBoundingClientRect()
      const btnCenter = rect.left + rect.width / 2
      const w = PANEL_WIDTHS[panel] ?? 460
      const left = Math.max(8, Math.min(btnCenter - w / 2, window.innerWidth - w - 8))
      setDropdownOffset({ left, width: w })
    } else {
      setDropdownOffset(null)
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

            {/* Logo */}
            <Link href="/" className="group">
              <span
                className="font-bold text-[1.2rem] tracking-tight select-none"
                style={{
                  backgroundImage: "linear-gradient(135deg, hsl(217,91%,60%) 0%, hsl(242,75%,40%) 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  color: "transparent",
                }}
              >
                Buildera
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
                  aria-controls={`mega-dropdown-${panel.toLowerCase().replace(/\s+/g, "-")}`}
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
              <Link href="/contact" className="hidden lg:inline-flex btn-primary !min-h-[42px]">
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
        dropdownOffset={dropdownOffset}
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
