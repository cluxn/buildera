"use client"

import { motion, useReducedMotion } from "motion/react"

interface Props {
  children: React.ReactNode[]
  delayMs?: number
  className?: string
}

export function StaggeredRevealGrid({ children, delayMs = 80, className }: Props) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <div className={className}>
      {children.map((child, i) =>
        prefersReducedMotion ? (
          <div key={i}>{child}</div>
        ) : (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: i * (delayMs / 1000), duration: 0.5, ease: "easeOut" }}
          >
            {child}
          </motion.div>
        )
      )}
    </div>
  )
}
