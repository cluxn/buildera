"use client"

import { motion } from "motion/react"

const HEADLINE = "We Build What Your Business Needs to Grow"
const words = HEADLINE.split(" ")

export function HeroHeadline() {
  return (
    <h1 className="text-[2.5rem] lg:text-[3.75rem] font-bold tracking-tight text-foreground leading-[1.1]">
      {words.map((word, index) => (
        <motion.span
          key={index}
          className="inline-block mr-[0.25em]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.07, duration: 0.4, ease: "easeOut" }}
        >
          {word}
        </motion.span>
      ))}
    </h1>
  )
}
