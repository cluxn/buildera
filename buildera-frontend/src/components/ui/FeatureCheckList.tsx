"use client"

import { motion } from "motion/react"
import { IconCheck, IconX } from "@tabler/icons-react"
import { cn } from "@/lib/utils"

const COMPARISON_ROWS = [
  { feature: "Cost Effective", buildera: true, inHouse: false, freelancer: true },
  { feature: "Delivery Speed", buildera: true, inHouse: false, freelancer: false },
  { feature: "Communication", buildera: true, inHouse: false, freelancer: true },
  { feature: "Accountability", buildera: true, inHouse: true, freelancer: false },
  { feature: "Expertise Depth", buildera: true, inHouse: true, freelancer: false },
]

const COLUMN_HEADERS = ["", "Buildera", "In-House", "Freelancer"]

export function FeatureCheckList() {
  return (
    <div className="flex flex-col gap-4 p-6 rounded-lg border border-border bg-card">
      <div className="grid grid-cols-4 gap-2 items-center text-xs font-medium text-muted-foreground mb-1">
        {COLUMN_HEADERS.map((header) => (
          <span key={header} className={cn(header === "Buildera" && "text-[var(--brand-primary)]")}>
            {header}
          </span>
        ))}
      </div>
      <h3 className="font-semibold text-foreground -mt-2 mb-2">
        Buildera vs. the alternatives
      </h3>
      {COMPARISON_ROWS.map((row, rowIndex) => (
        <motion.div
          key={row.feature}
          className="grid grid-cols-4 gap-2 items-center text-sm"
          initial={{ opacity: 0, x: -8 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{
            delay: rowIndex * 0.15,
            type: "spring",
            stiffness: 400,
            damping: 25,
          }}
        >
          <span className="text-muted-foreground text-xs">{row.feature}</span>
          {[row.buildera, row.inHouse, row.freelancer].map((val, cellIndex) => (
            <motion.span
              key={cellIndex}
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                delay: rowIndex * 0.15 + cellIndex * 0.05,
                type: "spring",
                stiffness: 400,
                damping: 25,
              }}
              className={cn(
                "flex items-center",
                val ? "text-[var(--brand-primary)]" : "text-muted-foreground"
              )}
            >
              {val ? (
                <IconCheck className="size-4" />
              ) : (
                <IconX className="size-4" />
              )}
            </motion.span>
          ))}
        </motion.div>
      ))}
    </div>
  )
}
