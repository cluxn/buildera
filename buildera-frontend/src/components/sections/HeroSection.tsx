"use client"

import Link from "next/link"
import { motion } from "motion/react"
import { HeroHeadline } from "./HeroHeadline"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-background">
      {/* Decorative CSS floating orbs */}
      <div className="hero-orb-1" aria-hidden="true" />
      <div className="hero-orb-2" aria-hidden="true" />

      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center py-24">
          {/* Left column */}
          <div className="flex flex-col gap-6 min-w-0">
            {/* Word-by-word animated headline (Client Component) */}
            <HeroHeadline />

            {/* Sub-headline */}
            <motion.p
              className="text-lg text-muted-foreground"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              Custom software, Salesforce, AI agents, and dedicated dev teams — built for Indian SMBs that need real accountability, fixed scopes, and technology that actually ships.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <Link href="/contact" className="btn-primary">
                Book a Free Call
              </Link>
            </motion.div>
          </div>

          {/* Right column — Client Results Dashboard */}
          <motion.div
            className="hidden lg:flex lg:flex-col min-w-0"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.6, ease: "easeOut" }}
          >
            <div className="relative w-full max-w-md mx-auto">
              {/* Glow behind card */}
              <div
                className="absolute -inset-4 rounded-3xl pointer-events-none"
                style={{ background: "radial-gradient(ellipse at 60% 40%, hsl(217 91% 60% / 12%), transparent 70%)" }}
                aria-hidden="true"
              />

              {/* Dashboard card */}
              <div className="relative glass-card p-6 rounded-2xl">

                {/* Card header */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-[11px] font-semibold uppercase tracking-widest text-[var(--brand-primary)]">
                    Client Results
                  </span>
                  <span className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" aria-hidden="true" />
                    Live
                  </span>
                </div>

                {/* Outcome rows */}
                {[
                  {
                    icon: "🏭",
                    project: "Warehouse Mgmt System",
                    outcome: "40% faster operations",
                    tag: "Manufacturing",
                  },
                  {
                    icon: "☁️",
                    project: "Salesforce CRM Rollout",
                    outcome: "3× lead pipeline growth",
                    tag: "Sales",
                  },
                  {
                    icon: "🛒",
                    project: "E-Commerce Platform",
                    outcome: "2× revenue in 90 days",
                    tag: "Retail",
                  },
                ].map((item, i) => (
                  <motion.div
                    key={item.project}
                    className="flex items-start gap-3 mb-4"
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.9 + i * 0.18, duration: 0.4, ease: "easeOut" }}
                  >
                    <div className="w-9 h-9 rounded-xl bg-[var(--brand-surface)] flex items-center justify-center text-lg flex-shrink-0">
                      {item.icon}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-sm font-semibold text-foreground truncate">{item.project}</span>
                        <span className="text-[10px] font-medium text-muted-foreground bg-muted px-2 py-0.5 rounded-full flex-shrink-0">
                          {item.tag}
                        </span>
                      </div>
                      <span className="text-xs font-medium text-green-600 mt-0.5 block">{item.outcome}</span>
                    </div>
                  </motion.div>
                ))}

                {/* Divider */}
                <div className="border-t border-border my-4" />

                {/* Bottom stats row */}
                <motion.div
                  className="grid grid-cols-3 gap-3 text-center"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.45, duration: 0.4 }}
                >
                  {[
                    { value: "800+", label: "Projects" },
                    { value: "500+", label: "Clients" },
                    { value: "10+", label: "Yrs Experience" },
                  ].map((stat) => (
                    <div key={stat.label} className="flex flex-col gap-0.5">
                      <span className="text-base font-bold text-foreground">{stat.value}</span>
                      <span className="text-[10px] text-muted-foreground">{stat.label}</span>
                    </div>
                  ))}
                </motion.div>

              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
