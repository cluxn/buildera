"use client"

import { motion } from "motion/react"

interface CTASectionProps {
  heading?: string
  description?: string
}

export function CTASection({
  heading = "Ready to build something that grows your business?",
  description = "Book a free 30-minute discovery call. No pressure, no pitch deck — just a conversation about what you need.",
}: CTASectionProps) {
  return (
    <motion.section
      className="py-24 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, var(--brand-gradient-from), var(--brand-gradient-to))",
      }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.p
          className="text-sm text-white/60 uppercase tracking-widest font-medium mb-4"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          Ready to Start?
        </motion.p>
        <motion.h2
          className="text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight"
          initial={{ opacity: 0, y: 24, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {heading}
        </motion.h2>
        <motion.p
          className="text-white/80 text-lg mb-8 max-w-xl mx-auto"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
        >
          {description}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5, ease: "easeOut" }}
        >
          <a
            href="/contact"
            className="relative inline-flex items-center gap-2 bg-white text-[var(--brand-primary)] font-semibold px-8 py-4 rounded-lg transition-all duration-200 overflow-hidden min-h-[48px] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_hsl(221_83%_53%/40%)]"
          >
            Book a Free Discovery Call
          </a>
        </motion.div>
      </div>
    </motion.section>
  )
}
