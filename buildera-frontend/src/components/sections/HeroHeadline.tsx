"use client"

import { motion } from "motion/react"

const LINE_1 = "We Build Software"
const LINE_2 = "That Drives Growth"

export function HeroHeadline() {
  return (
    <h1 className="text-[2.5rem] lg:text-[3rem] xl:text-[3.75rem] font-bold tracking-tight leading-[1.1]">
      <motion.span
        className="block text-foreground whitespace-nowrap"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5, ease: "easeOut" }}
      >
        {LINE_1}
      </motion.span>
      <motion.span
        className="block text-[var(--brand-primary)] whitespace-nowrap"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.5, ease: "easeOut" }}
      >
        {LINE_2}
      </motion.span>
    </h1>
  )
}
