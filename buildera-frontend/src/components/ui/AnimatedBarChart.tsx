"use client"

import { motion } from "motion/react"

interface BarData {
  height: number
  label?: string
  value?: string
}

interface Props {
  bars: BarData[]
}

const MAX_BAR_PX = 76

export function AnimatedBarChart({ bars }: Props) {
  return (
    <div className="flex items-end gap-2.5" style={{ height: `${MAX_BAR_PX + 32}px` }}>
      {bars.map((bar, index) => {
        const targetH = Math.round((bar.height / 100) * MAX_BAR_PX)
        return (
          <div key={index} className="flex flex-col items-center gap-1 flex-1">
            {/* Value label above bar */}
            <motion.span
              className="text-[10px] font-bold text-[var(--brand-primary)]"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + index * 0.12, duration: 0.4 }}
            >
              {bar.value ?? `${bar.height}%`}
            </motion.span>

            {/* Bar */}
            <div className="w-full flex items-end" style={{ height: `${MAX_BAR_PX}px` }}>
              <motion.div
                className="w-full rounded-t"
                style={{
                  background: "linear-gradient(to top, hsl(242,75%,40%), hsl(217,91%,60%))",
                }}
                initial={{ height: 0 }}
                whileInView={{ height: targetH }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.12,
                  duration: 0.65,
                  ease: [0.23, 1, 0.32, 1],
                }}
              />
            </div>

            {/* Quarter label */}
            {bar.label && (
              <span className="text-[10px] text-muted-foreground">{bar.label}</span>
            )}
          </div>
        )
      })}
    </div>
  )
}
