"use client"

import { motion } from "motion/react"
import { AnimatedRingStat } from "@/components/ui/AnimatedRingStat"
import { FeatureCheckList } from "@/components/ui/FeatureCheckList"
import { MiniMetricsCard } from "@/components/ui/MiniMetricsCard"

export function WhyBuilderaSection() {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-[var(--brand-primary)] mb-3">
            Our Difference
          </p>
          <h2 className="text-4xl font-bold tracking-tight text-foreground mb-4">
            Why Smart Businesses Choose Buildera
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Accountability, fixed scopes, and a team that ships on time — here&apos;s what consistently makes the difference.
          </p>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-8 items-stretch">
          <motion.div
            className="h-full"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0, duration: 0.5 }}
          >
            <div className="flex flex-col items-center justify-center gap-6 p-6 rounded-lg border border-border bg-card h-full">
              <AnimatedRingStat value={100} suffix="+" label="Industries Served" className="w-[120px]" />
              <div className="w-full border-t border-border pt-4 flex flex-col gap-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Projects Delivered</span>
                  <span className="font-semibold text-foreground">800+</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Happy Clients</span>
                  <span className="font-semibold text-foreground">500+</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Years of Experience</span>
                  <span className="font-semibold text-foreground">10+</span>
                </div>
              </div>
            </div>
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

        <motion.div
          className="text-center mt-10"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <a href="/about" className="btn-primary">
            Learn More About Buildera →
          </a>
        </motion.div>

      </div>
    </section>
  )
}
