"use client"

import { useEffect, useRef } from "react"
import {
  motion,
  useMotionValue,
  useMotionTemplate,
  useAnimationFrame,
} from "motion/react"

/** Subtle animated grid that brightens around the cursor — brand-blue, decorative only. */
export function InteractiveGridBackground() {
  const containerRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(-300)
  const mouseY = useMotionValue(-300)
  const gridOffsetX = useMotionValue(0)
  const gridOffsetY = useMotionValue(0)

  useAnimationFrame(() => {
    gridOffsetX.set((gridOffsetX.get() + 0.25) % 40)
    gridOffsetY.set((gridOffsetY.get() + 0.25) % 40)
  })

  useEffect(() => {
    function handleMouseMove(e: MouseEvent) {
      const rect = containerRef.current?.getBoundingClientRect()
      if (!rect) return
      mouseX.set(e.clientX - rect.left)
      mouseY.set(e.clientY - rect.top)
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [mouseX, mouseY])

  const maskImage = useMotionTemplate`radial-gradient(280px circle at ${mouseX}px ${mouseY}px, black, transparent)`

  const pattern = (
    <svg className="w-full h-full">
      <defs>
        <motion.pattern
          id="interactive-grid-pattern"
          width="40"
          height="40"
          patternUnits="userSpaceOnUse"
          x={gridOffsetX}
          y={gridOffsetY}
        >
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
        </motion.pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#interactive-grid-pattern)" />
    </svg>
  )

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0 overflow-hidden pointer-events-none text-[var(--brand-primary)]"
      aria-hidden="true"
    >
      <div className="absolute inset-0 opacity-[0.05]">{pattern}</div>
      <motion.div
        className="absolute inset-0 opacity-50"
        style={{ maskImage, WebkitMaskImage: maskImage }}
      >
        {pattern}
      </motion.div>
    </div>
  )
}
