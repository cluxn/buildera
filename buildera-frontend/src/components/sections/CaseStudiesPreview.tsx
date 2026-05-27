"use client"

import { motion } from "motion/react"
import { CaseStudyPreviewCard } from "@/components/ui/CaseStudyPreviewCard"

const CASE_STUDIES = [
  {
    id: 1,
    title: "Warehouse Management System for Logistics Company",
    industry: "Logistics",
    metricValue: 40,
    metricSuffix: "%",
    metricLabel: "faster operations",
    description:
      "Replaced legacy spreadsheets with a real-time inventory tracking system, cutting order fulfillment time and reducing picking errors across 3 warehouse locations.",
  },
  {
    id: 2,
    title: "Salesforce CRM Rollout for Trading Firm",
    industry: "Finance",
    metricValue: 200,
    metricSuffix: "%",
    metricLabel: "increase in lead pipeline",
    description:
      "Implemented a full Salesforce CRM with custom pipeline stages, automated lead scoring, and reporting dashboards that gave the sales team end-to-end visibility.",
  },
  {
    id: 3,
    title: "Custom E-Commerce Platform for Retail SMB",
    industry: "Retail",
    metricValue: 60,
    metricSuffix: "%",
    metricLabel: "more conversions",
    description:
      "Built a blazing-fast storefront with one-click checkout, mobile-first design, and deep inventory integration — turning window shoppers into paying customers.",
  },
]

export function CaseStudiesPreview() {
  return (
    <section className="py-16 lg:py-24 relative overflow-hidden"
      style={{ background: "linear-gradient(160deg, hsl(222,47%,11%) 0%, hsl(242,40%,14%) 100%)" }}
    >
      {/* Decorative glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, hsl(217 91% 60% / 10%), transparent 70%)", filter: "blur(60px)" }}
        aria-hidden="true" />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, hsl(242 75% 40% / 8%), transparent 70%)", filter: "blur(60px)" }}
        aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <p className="text-xs font-medium uppercase tracking-widest text-[var(--brand-primary)] mb-3">
            Proven Results
          </p>
          <h2 className="text-4xl font-bold tracking-tight text-white mb-3">
            Results We&apos;ve Delivered
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Three industries, three challenges, three measurable outcomes — scoped, shipped, and verified against real business results.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {CASE_STUDIES.map((study, index) => (
            <motion.div
              key={study.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.5, ease: "easeOut" }}
            >
              <CaseStudyPreviewCard
                title={study.title}
                industry={study.industry}
                metricValue={study.metricValue}
                metricSuffix={study.metricSuffix}
                metricLabel={study.metricLabel}
                description={study.description}
                variant="dark"
              />
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-10"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <a href="/case-studies" className="btn-white">
            View All Case Studies →
          </a>
        </motion.div>
      </div>
    </section>
  )
}
