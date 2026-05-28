"use client"

import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'motion/react'

export interface TimelineStep {
  number: number
  phase: string
  title: string
  description: string
  duration: string
  deliverables: string[]
}

interface Props {
  steps: TimelineStep[]
}

export function AnimatedTimeline({ steps }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const prefersReducedMotion = useReducedMotion()

  return (
    <div ref={ref} className="max-w-3xl mx-auto">
      {steps.map((step, i) => {
        const isLast = i === steps.length - 1

        return (
          <motion.div
            key={step.number}
            className="flex gap-6"
            initial={prefersReducedMotion ? false : { opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: i * 0.15, duration: 0.5, ease: 'easeOut' }}
          >
            {/* Left column: step circle + connector */}
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-[var(--brand-primary)] text-white font-bold text-xl flex items-center justify-center flex-shrink-0">
                {step.number}
              </div>
              {!isLast && (
                <div className="w-0.5 bg-border flex-grow mt-2 min-h-[60px]" />
              )}
            </div>

            {/* Right column: content card */}
            <div className="bg-background border border-border rounded-xl p-6 flex-1 mb-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-[var(--brand-primary)] mb-1">
                {step.phase}
              </p>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <span className="inline-flex px-2 py-0.5 rounded-full bg-[var(--brand-surface)] text-xs text-muted-foreground mb-3">
                {step.duration}
              </span>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                {step.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {step.deliverables.map((deliverable) => (
                  <span
                    key={deliverable}
                    className="text-xs px-3 py-1 rounded-full border border-border text-foreground"
                  >
                    {deliverable}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
