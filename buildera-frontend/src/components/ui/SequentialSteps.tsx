"use client"

import { useRef } from "react"
import { motion, useInView, useReducedMotion } from "motion/react"
import type { ProcessStep } from "@/types/service-page"

interface Props {
  steps: ProcessStep[]
}

export function SequentialSteps({ steps }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  const prefersReducedMotion = useReducedMotion()

  return (
    <div ref={ref}>
      {steps.map((step, i) => {
        const isLast = i === steps.length - 1
        return (
          <div key={step.stepNumber} className="relative">
            <motion.div
              className="flex gap-4 mb-8"
              initial={prefersReducedMotion ? false : { opacity: 0, x: -16 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: i * 0.12, duration: 0.4, ease: "easeOut" }}
            >
              <div className="w-12 h-12 rounded-full bg-[var(--brand-primary)] text-white flex items-center justify-center font-bold text-xl flex-shrink-0">
                {step.stepNumber}
              </div>
              <div>
                <h4 className="text-xl font-semibold">{step.title}</h4>
                <p className="text-base text-muted-foreground mt-1">{step.description}</p>
              </div>
            </motion.div>
            {!isLast && (
              <motion.div
                className="absolute left-6 top-12 w-0.5 h-8 bg-[var(--brand-primary)]"
                initial={prefersReducedMotion ? false : { scaleY: 0 }}
                animate={isInView ? { scaleY: 1 } : {}}
                transition={{ delay: i * 0.12 + 0.4, duration: 0.3, ease: "easeOut" }}
                style={{ transformOrigin: "top" }}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}
