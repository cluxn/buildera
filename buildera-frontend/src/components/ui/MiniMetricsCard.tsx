"use client"

import { motion } from "motion/react"
import { AnimatedBarChart } from "@/components/ui/AnimatedBarChart"

const CHART_BARS = [
  { height: 40, label: "Q1", value: "40%" },
  { height: 65, label: "Q2", value: "65%" },
  { height: 80, label: "Q3", value: "80%" },
  { height: 92, label: "Q4", value: "92%" },
]

const PROJECT_OUTCOMES = [
  {
    project: "Warehouse Mgmt System",
    result: "40% faster ops",
  },
  {
    project: "Salesforce CRM Rollout",
    result: "3x lead pipeline",
  },
  {
    project: "E-Commerce Platform",
    result: "60% more conversions",
  },
]

export function MiniMetricsCard() {
  return (
    <div className="flex flex-col gap-4 p-6 rounded-lg border border-border bg-card h-full">
      <h3 className="font-semibold text-foreground">Typical Project Impact</h3>
      <div className="mt-2"><AnimatedBarChart bars={CHART_BARS} /></div>
      <div className="border-t border-border" />
      <div className="flex flex-col gap-3">
        {PROJECT_OUTCOMES.map((item, index) => (
          <motion.div
            key={item.project}
            className="flex items-start gap-2"
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              delay: 0.6 + index * 0.2,
              duration: 0.4,
              ease: "easeOut",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand-primary)] mt-1.5 flex-shrink-0" />
            <div className="flex flex-col">
              <span className="font-medium text-sm text-foreground">{item.project}</span>
              <span className="text-xs text-muted-foreground">{item.result}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
