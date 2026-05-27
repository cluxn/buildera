"use client"

import { motion } from "motion/react"
import { AnimatedCounter } from "@/components/ui/AnimatedCounter"
import type { Settings } from "@/lib/api"

interface Props {
  settings: Settings
}

export function StatsBarSection({ settings }: Props) {
  const stats = [
    {
      target: parseInt(settings.stat_projects) || 150,
      suffix: "+",
      label: "Projects Delivered",
    },
    {
      target: parseInt(settings.stat_clients) || 50,
      suffix: "+",
      label: "Happy Clients",
    },
    {
      target: parseInt(settings.stat_years) || 6,
      suffix: "+",
      label: "Years Experience",
    },
    {
      target: parseInt(settings.stat_satisfaction) || 98,
      suffix: "%",
      label: "Client Satisfaction",
    },
  ]

  return (
    <motion.section
      className="py-12 lg:py-16"
      style={{ background: "linear-gradient(135deg, var(--brand-gradient-from), var(--brand-gradient-to))" }}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Eyebrow label */}
        <p className="text-xs font-medium uppercase tracking-widest text-white/60 text-center mb-8">
          Trusted Results
        </p>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center text-white">
          {stats.map((stat, index) => (
            <div key={stat.label} className="text-center">
              <AnimatedCounter
                target={stat.target}
                suffix={stat.suffix}
                delay={index * 0.2}
              />
              <p className="text-sm font-medium text-white/80 mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
