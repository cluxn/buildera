"use client"

import { useRef, useEffect } from "react"
import { motion, useMotionValue, useSpring, useTransform, useInView } from "motion/react"

interface Props {
  title: string
  industry: string
  metricValue: number
  metricLabel: string
  description: string
}

export function CaseStudyPreviewCard({
  title,
  industry,
  metricValue,
  metricLabel,
  description,
}: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

  const count = useMotionValue(0)
  const spring = useSpring(count, { stiffness: 60, damping: 20 })
  const rounded = useTransform(spring, (v) => `${Math.round(v)}%`)

  useEffect(() => {
    if (isInView) {
      setTimeout(() => count.set(metricValue), 400)
    }
  }, [isInView, count, metricValue])

  return (
    <div
      ref={ref}
      className="rounded-lg border border-border bg-card p-6 flex flex-col gap-4 hover:-translate-y-1 hover:shadow-[0_0_0_2px_var(--brand-primary)] transition-all duration-200"
    >
      <span className="text-xs font-medium uppercase tracking-wider text-[var(--brand-primary)] bg-[var(--brand-glass)] px-3 py-1 rounded-full w-fit">
        {industry}
      </span>
      <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      <div className="flex items-baseline gap-1 flex-wrap">
        <motion.span className="text-2xl font-bold text-[var(--brand-primary)]">
          {rounded}
        </motion.span>
        <span className="text-sm text-muted-foreground">{metricLabel}</span>
      </div>
      <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
      <a
        href="/case-studies"
        className="text-sm font-medium text-[var(--brand-primary)] hover:underline mt-auto"
      >
        Read Case Study
      </a>
    </div>
  )
}
