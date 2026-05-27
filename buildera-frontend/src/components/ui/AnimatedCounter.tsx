"use client"

import { useEffect, useRef } from "react"
import {
  useMotionValue,
  useSpring,
  useTransform,
  useInView,
  useReducedMotion,
  motion,
} from "motion/react"

interface Props {
  target: number
  suffix?: string
  delay?: number
}

export function AnimatedCounter({ target, suffix = "", delay = 0 }: Props) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })
  const prefersReducedMotion = useReducedMotion()

  const count = useMotionValue(0)
  const spring = useSpring(count, { stiffness: 60, damping: 20 })
  const rounded = useTransform(spring, (v) => `${Math.round(v)}${suffix}`)

  useEffect(() => {
    if (isInView) {
      if (prefersReducedMotion) {
        count.set(target)
      } else {
        setTimeout(() => count.set(target), delay * 1000)
      }
    }
    // count, target, delay intentionally excluded — motion values are not React state
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInView, prefersReducedMotion])

  return (
    <motion.span
      ref={ref}
      className="text-[3.75rem] font-bold text-white"
    >
      {rounded}
    </motion.span>
  )
}
