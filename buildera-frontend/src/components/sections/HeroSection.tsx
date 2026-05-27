"use client"

import Link from "next/link"
import { motion } from "motion/react"
import { HeroHeadline } from "./HeroHeadline"
import { StatsBadgeStrip } from "./StatsBadgeStrip"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-background">
      {/* Decorative CSS floating orbs */}
      <div className="hero-orb-1" aria-hidden="true" />
      <div className="hero-orb-2" aria-hidden="true" />

      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center py-24">
          {/* Left column */}
          <div className="flex flex-col gap-6">
            {/* Word-by-word animated headline (Client Component) */}
            <HeroHeadline />

            {/* Sub-headline */}
            <motion.p
              className="text-lg text-muted-foreground max-w-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              From custom software and Salesforce implementations to AI automation and dedicated dev teams — Buildera delivers technology that drives real business outcomes for SMBs across India.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <Link
                href="/book-a-call"
                className="inline-flex items-center justify-center rounded-lg bg-[var(--brand-primary)] text-white font-medium text-sm px-6 min-h-[48px] transition-all hover:bg-[var(--brand-primary-dark)] active:translate-y-px"
              >
                Book a Free Call
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center rounded-lg border border-border bg-background text-foreground font-medium text-sm px-6 min-h-[48px] transition-all hover:bg-muted"
              >
                View Our Services
              </Link>
            </motion.div>

            {/* Social proof badge strip */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.5 }}
            >
              <StatsBadgeStrip />
            </motion.div>
          </div>

          {/* Right column — inline SVG tech illustration */}
          <div className="hidden lg:flex items-center justify-center">
            <div className="hero-illustration">
              <svg
                viewBox="0 0 400 400"
                width="400"
                height="400"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                {/* Connection lines */}
                <line x1="200" y1="80" x2="120" y2="160" stroke="var(--brand-primary)" strokeWidth="1.5" strokeOpacity="0.4" />
                <line x1="200" y1="80" x2="280" y2="160" stroke="var(--brand-primary)" strokeWidth="1.5" strokeOpacity="0.4" />
                <line x1="120" y1="160" x2="80" y2="260" stroke="var(--brand-primary)" strokeWidth="1.5" strokeOpacity="0.4" />
                <line x1="120" y1="160" x2="200" y2="240" stroke="var(--brand-primary)" strokeWidth="1.5" strokeOpacity="0.4" />
                <line x1="280" y1="160" x2="200" y2="240" stroke="var(--brand-primary)" strokeWidth="1.5" strokeOpacity="0.4" />
                <line x1="280" y1="160" x2="320" y2="260" stroke="var(--brand-primary)" strokeWidth="1.5" strokeOpacity="0.4" />
                <line x1="200" y1="240" x2="200" y2="330" stroke="var(--brand-primary)" strokeWidth="1.5" strokeOpacity="0.4" />
                <line x1="80" y1="260" x2="200" y2="330" stroke="var(--brand-primary)" strokeWidth="1.5" strokeOpacity="0.3" />
                <line x1="320" y1="260" x2="200" y2="330" stroke="var(--brand-primary)" strokeWidth="1.5" strokeOpacity="0.3" />

                {/* Main central node (top) */}
                <circle cx="200" cy="80" r="14" fill="var(--brand-primary)" fillOpacity="0.15" stroke="var(--brand-primary)" strokeWidth="2" />
                <circle cx="200" cy="80" r="6" fill="var(--brand-primary)" />

                {/* Mid-level nodes */}
                <circle cx="120" cy="160" r="11" fill="var(--brand-primary)" fillOpacity="0.12" stroke="var(--brand-primary)" strokeWidth="1.5" />
                <circle cx="120" cy="160" r="5" fill="var(--brand-primary)" />

                <circle cx="280" cy="160" r="11" fill="var(--brand-primary)" fillOpacity="0.12" stroke="var(--brand-primary)" strokeWidth="1.5" />
                <circle cx="280" cy="160" r="5" fill="var(--brand-primary)" />

                {/* Center large node */}
                <circle cx="200" cy="240" r="18" fill="var(--brand-primary)" fillOpacity="0.18" stroke="var(--brand-primary)" strokeWidth="2" />
                <circle cx="200" cy="240" r="8" fill="var(--brand-primary)" />

                {/* Lower nodes */}
                <circle cx="80" cy="260" r="9" fill="var(--brand-primary)" fillOpacity="0.1" stroke="var(--brand-primary)" strokeWidth="1.5" />
                <circle cx="80" cy="260" r="4" fill="var(--brand-primary)" />

                <circle cx="320" cy="260" r="9" fill="var(--brand-primary)" fillOpacity="0.1" stroke="var(--brand-primary)" strokeWidth="1.5" />
                <circle cx="320" cy="260" r="4" fill="var(--brand-primary)" />

                {/* Bottom anchor node */}
                <circle cx="200" cy="330" r="12" fill="var(--brand-primary)" fillOpacity="0.12" stroke="var(--brand-primary)" strokeWidth="1.5" />
                <circle cx="200" cy="330" r="5" fill="var(--brand-primary)" />

                {/* Code bracket shapes */}
                <text x="50" y="130" fontFamily="monospace" fontSize="18" fill="var(--brand-primary)" fillOpacity="0.5">{"{"}</text>
                <text x="340" y="200" fontFamily="monospace" fontSize="18" fill="var(--brand-primary)" fillOpacity="0.5">{"}"}</text>
                <text x="155" y="45" fontFamily="monospace" fontSize="14" fill="var(--brand-primary)" fillOpacity="0.4">{"</>"}</text>

                {/* Floating data dots */}
                <circle cx="155" cy="115" r="3" fill="var(--brand-primary)" fillOpacity="0.5">
                  <animate attributeName="opacity" values="0.5;1;0.5" dur="3s" repeatCount="indefinite" />
                </circle>
                <circle cx="248" cy="115" r="3" fill="var(--brand-primary)" fillOpacity="0.5">
                  <animate attributeName="opacity" values="0.5;1;0.5" dur="3.5s" repeatCount="indefinite" />
                </circle>
                <circle cx="98" cy="215" r="3" fill="var(--brand-primary)" fillOpacity="0.4">
                  <animate attributeName="opacity" values="0.4;0.9;0.4" dur="4s" repeatCount="indefinite" />
                </circle>
                <circle cx="305" cy="215" r="3" fill="var(--brand-primary)" fillOpacity="0.4">
                  <animate attributeName="opacity" values="0.4;0.9;0.4" dur="2.8s" repeatCount="indefinite" />
                </circle>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
