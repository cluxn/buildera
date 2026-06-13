"use client"

import Link from "next/link"
import { motion } from "motion/react"
import { HeroHeadline } from "./HeroHeadline"
import { InteractiveGridBackground } from "@/components/ui/InteractiveGridBackground"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-background">
      {/* Decorative CSS floating orbs */}
      <div className="hero-orb-1" aria-hidden="true" />
      <div className="hero-orb-2" aria-hidden="true" />
      <InteractiveGridBackground />

      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl w-full relative z-10">
        <div className="flex flex-col items-center text-center gap-6 py-24">
          {/* Word-by-word animated headline (Client Component) */}
          <HeroHeadline />

          {/* Sub-headline */}
          <motion.p
            className="text-lg text-muted-foreground max-w-2xl"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            Custom software, Salesforce, AI agents, and dedicated dev teams — built for growth-focused businesses that demand accountability, fixed scopes, and technology that actually ships.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            className="flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <Link href="/contact" className="btn-primary">
              Book a Free Call
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
