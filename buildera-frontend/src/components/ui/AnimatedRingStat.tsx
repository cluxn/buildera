"use client"

import { useRef, useEffect } from "react"
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useInView,
  useReducedMotion,
} from "motion/react"

interface Props {
  value: number
  suffix: string
  label: string
  size?: number
  className?: string
}

export function AnimatedRingStat({ value, suffix, label, className }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })
  const prefersReducedMotion = useReducedMotion()

  const count = useMotionValue(0)
  const spring = useSpring(count, { stiffness: 60, damping: 20 })
  const display = useTransform(spring, (v) => Math.round(v).toString() + suffix)

  useEffect(() => {
    if (!isInView) return
    if (prefersReducedMotion) {
      count.set(value)
      return
    }
    count.set(value)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInView, prefersReducedMotion])

  return (
    <div ref={ref} className={`flex flex-col items-center ${className ?? ''}`}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 120 120"
      >
        <circle
          cx="60"
          cy="60"
          r="52"
          fill="none"
          stroke="hsl(217 91% 60% / 15%)"
          strokeWidth="8"
        />
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
          animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
          transition={{
            duration: prefersReducedMotion ? 0 : 1.5,
            ease: "easeInOut",
            delay: prefersReducedMotion ? 0 : 0.3,
          }}
          style={{ rotate: -90, transformOrigin: "60px 60px" }}
        />
        <foreignObject x="20" y="35" width="80" height="50">
          <div className="flex items-center justify-center h-full">
            <motion.span className="text-2xl font-bold text-foreground text-center leading-none">
              {display}
            </motion.span>
          </div>
        </foreignObject>
      </svg>
      <p className="text-sm font-medium text-center mt-2">{label}</p>
    </div>
  )
}
