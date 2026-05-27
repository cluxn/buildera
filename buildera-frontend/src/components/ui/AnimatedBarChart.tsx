"use client"

import { motion } from "motion/react"

interface BarData {
  height: number
  label?: string
}

interface Props {
  bars: BarData[]
}

export function AnimatedBarChart({ bars }: Props) {
  return (
    <div className="flex items-end gap-2 h-24">
      {bars.map((bar, index) => (
        <div key={index} className="flex flex-col items-center gap-1 flex-1">
          <motion.div
            className="w-full bg-[var(--brand-primary)] rounded-t"
            style={{ originY: 1, height: "100%" }}
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: bar.height / 100 }}
            viewport={{ once: true }}
            transition={{
              delay: index * 0.1,
              type: "spring",
              stiffness: 120,
              damping: 20,
            }}
          />
          {bar.label && (
            <span className="text-[10px] text-muted-foreground">{bar.label}</span>
          )}
        </div>
      ))}
    </div>
  )
}
