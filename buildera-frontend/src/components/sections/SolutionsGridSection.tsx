"use client"

import { motion } from "motion/react"
import {
  IconBuildingFactory,
  IconTruck,
  IconMap,
  IconPackage,
  IconClipboardList,
  IconCalculator,
  IconBox,
  IconBuildingHospital,
  IconCoin,
  IconCar,
  IconHome,
  IconUsers,
  IconUserCheck,
  IconChartBar,
  IconAddressBook,
  IconRobot,
  IconBriefcase,
  IconTool,
  IconStack2,
  IconBottle,
} from "@tabler/icons-react"
import { SolutionTile } from "@/components/ui/SolutionTile"

const SOLUTIONS = [
  { name: "Operations Management", slug: "operations-management", icon: <IconBuildingFactory className="size-5" /> },
  { name: "Vendor Management", slug: "vendor-management", icon: <IconTruck className="size-5" /> },
  { name: "OTA Channel Partner", slug: "ota-channel-partner", icon: <IconMap className="size-5" /> },
  { name: "Supply Chain", slug: "supply-chain", icon: <IconPackage className="size-5" /> },
  { name: "Project Management", slug: "project-management", icon: <IconClipboardList className="size-5" /> },
  { name: "Accounting Management", slug: "accounting-management", icon: <IconCalculator className="size-5" /> },
  { name: "Warehouse Management", slug: "warehouse-management", icon: <IconBox className="size-5" /> },
  { name: "Hotels & Resorts", slug: "hotels-and-resorts", icon: <IconBuildingHospital className="size-5" /> },
  { name: "Financial Management", slug: "financial-management", icon: <IconCoin className="size-5" /> },
  { name: "Fleet Management", slug: "fleet-management", icon: <IconCar className="size-5" /> },
  { name: "Airbnb & Vacation Rental", slug: "airbnb-vacation-rental", icon: <IconHome className="size-5" /> },
  { name: "HR Management", slug: "hr-management", icon: <IconUsers className="size-5" /> },
  { name: "Lead Management", slug: "lead-management", icon: <IconUserCheck className="size-5" /> },
  { name: "Sales Management", slug: "sales-management", icon: <IconChartBar className="size-5" /> },
  { name: "CRM", slug: "crm", icon: <IconAddressBook className="size-5" /> },
  { name: "India Mart Automation", slug: "india-mart-automation", icon: <IconRobot className="size-5" /> },
  { name: "ERP", slug: "erp", icon: <IconBriefcase className="size-5" /> },
  { name: "Manufacturing/Production", slug: "manufacturing-production", icon: <IconTool className="size-5" /> },
  { name: "Inventory Management", slug: "inventory-management", icon: <IconStack2 className="size-5" /> },
  { name: "Liquor Shop Management", slug: "liquor-shop-management", icon: <IconBottle className="size-5" /> },
]

export function SolutionsGridSection() {
  return (
    <section className="py-20 bg-[var(--brand-surface)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-12 text-center"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-[var(--brand-primary)] mb-3">
            Problems We Solve
          </p>
          <h2 className="text-4xl font-bold tracking-tight text-foreground mb-4">
            Find the Solution to Your Problem
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            From operations to finance, we build the software that eliminates the exact bottleneck holding your business back.
          </p>
        </motion.div>

        {/* Solutions grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {SOLUTIONS.map((solution, index) => {
            const colIndex = index % 4
            const rowIndex = Math.floor(index / 4)
            return (
              <motion.div
                key={solution.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  delay: (colIndex + rowIndex) * 0.05,
                  duration: 0.35,
                  ease: "easeOut",
                }}
              >
                <SolutionTile
                  name={solution.name}
                  slug={solution.slug}
                  icon={solution.icon}
                />
              </motion.div>
            )
          })}
        </div>

        <motion.div
          className="text-center mt-10"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <a href="/contact" className="btn-primary">
            Found Your Problem? Let&apos;s Build the Fix →
          </a>
        </motion.div>

      </div>
    </section>
  )
}
