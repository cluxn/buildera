"use client"

import { motion } from "motion/react"
import { AnimatedRingStat } from "@/components/ui/AnimatedRingStat"
import { FeatureCheckList } from "@/components/ui/FeatureCheckList"
import { MiniMetricsCard } from "@/components/ui/MiniMetricsCard"

export function WhyBuilderaSection() {
  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <p className="text-xs font-medium uppercase tracking-widest text-[var(--brand-primary)] mb-3">
            Why Choose Buildera
          </p>
          <h2 className="text-4xl font-bold tracking-tight text-foreground">
            Why Smart Businesses Choose Buildera
          </h2>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-8 items-stretch">
          <motion.div
            className="h-full"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0, duration: 0.5 }}
          >
            <AnimatedRingStat percentage={98} label="Client Satisfaction" />
          </motion.div>
          <motion.div
            className="h-full"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <FeatureCheckList />
          </motion.div>
          <motion.div
            className="h-full"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <MiniMetricsCard />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
