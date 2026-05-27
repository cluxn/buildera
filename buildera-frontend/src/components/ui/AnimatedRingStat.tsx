"use client"

import { motion, useReducedMotion } from "motion/react"
import { IconCheck } from "@tabler/icons-react"

interface Props {
  percentage: number
  label: string
}

const CHECKLIST_ITEMS = [
  "Dedicated project manager",
  "Weekly progress updates",
  "Post-launch support included",
]

export function AnimatedRingStat({ percentage, label }: Props) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <div className="flex flex-col items-center gap-4">
      <svg width="120" height="120" viewBox="0 0 120 120">
        {/* Track ring */}
        <circle
          cx="60"
          cy="60"
          r="52"
          fill="none"
          stroke="hsl(217 91% 60% / 15%)"
          strokeWidth="8"
        />
        {/* Animated fill ring */}
        <motion.circle
          cx="60"
          cy="60"
          r="52"
          fill="none"
          stroke="var(--brand-primary)"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray="326.7"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{
            pathLength: prefersReducedMotion ? 1 : percentage / 100,
            opacity: 1,
          }}
          viewport={{ once: true }}
          transition={{
            duration: prefersReducedMotion ? 0 : 1.5,
            ease: "easeInOut",
            delay: 0.3,
          }}
          style={{ rotate: -90, transformOrigin: "60px 60px" }}
        />
        {/* Center percentage text */}
        <text
          x="60"
          y="60"
          textAnchor="middle"
          dominantBaseline="central"
          className="text-2xl font-bold fill-foreground"
        >
          {percentage}%
        </text>
      </svg>
      <p className="text-sm font-medium text-muted-foreground">{label}</p>
      <div className="flex flex-col gap-2 w-full">
        {CHECKLIST_ITEMS.map((item, index) => (
          <motion.div
            key={item}
            className="flex items-center gap-2"
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              delay: 0.8 + index * 0.15,
              duration: 0.4,
              ease: "easeOut",
            }}
          >
            <IconCheck className="size-4 text-[var(--brand-primary)] flex-shrink-0" />
            <span className="text-sm text-foreground">{item}</span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
