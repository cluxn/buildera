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
    <div ref={ref} className="flex flex-col gap-12">
      {steps.map((step, i) => {
        const isEven = i % 2 === 0
        return (
          <motion.div
            key={step.stepNumber}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.15, duration: 0.45, ease: "easeOut" }}
          >
            {/* Visual card — alternates left / right */}
            <div className={isEven ? "md:order-first" : "md:order-last"}>
              <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[var(--brand-primary)] to-[hsl(242,75%,45%)] p-8 min-h-[180px] flex flex-col justify-between">
                {/* Decorative circles */}
                <div className="absolute -top-6 -right-6 w-32 h-32 rounded-full bg-white/10" />
                <div className="absolute -bottom-8 -left-4 w-24 h-24 rounded-full bg-white/5" />
                <div className="absolute top-4 left-4 w-8 h-8 rounded-full bg-white/15" />

                {/* Step number */}
                <span
                  className="relative text-6xl font-black leading-none select-none"
                  style={{ color: "rgba(255,255,255,0.18)" }}
                >
                  {String(step.stepNumber).padStart(2, "0")}
                </span>

                {/* Step label */}
                <div className="relative">
                  <p className="text-xs font-semibold uppercase tracking-widest text-white/60 mb-1">
                    Step {step.stepNumber}
                  </p>
                  <p className="text-white font-semibold text-lg leading-snug">
                    {step.title}
                  </p>
                </div>
              </div>
            </div>

            {/* Text content */}
            <div className={isEven ? "md:order-last" : "md:order-first"}>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 rounded-full bg-[hsl(217_91%_60%/12%)] text-[var(--brand-primary)] flex items-center justify-center text-sm font-bold flex-shrink-0">
                  {step.stepNumber}
                </span>
                <div className="h-px flex-1 bg-border" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
              <p className="text-base text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
