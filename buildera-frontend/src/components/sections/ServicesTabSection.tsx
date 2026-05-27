"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import {
  IconWorldWww,
  IconCloud,
  IconSettings,
  IconRobot,
  IconCode,
  IconUsers,
} from "@tabler/icons-react"
import { cn } from "@/lib/utils"
import { ServiceCard } from "@/components/ui/ServiceCard"

interface SubService {
  name: string
  slug: string
  description: string
}

interface ServiceCategory {
  category: string
  icon: React.ComponentType<{ className?: string }>
  slug: string
  subServices: SubService[]
}

const SERVICES_DATA: ServiceCategory[] = [
  {
    category: "Website Development",
    icon: IconWorldWww,
    slug: "website-development",
    subServices: [
      {
        name: "Custom Websites",
        slug: "custom-websites",
        description: "Tailored websites built from scratch to reflect your brand and convert visitors.",
      },
      {
        name: "E-Commerce",
        slug: "e-commerce",
        description: "Full-featured online stores with payment integration and inventory management.",
      },
      {
        name: "App Development",
        slug: "app-development",
        description: "Web apps that solve real business problems with clean, maintainable code.",
      },
      {
        name: "PWA",
        slug: "pwa",
        description: "Progressive Web Apps that work offline and deliver app-like experiences on the web.",
      },
    ],
  },
  {
    category: "Salesforce Development",
    icon: IconCloud,
    slug: "salesforce-development",
    subServices: [
      {
        name: "CRM",
        slug: "crm",
        description: "Custom Salesforce CRM configurations that match your exact sales and service workflow.",
      },
      {
        name: "Marketing Cloud",
        slug: "marketing-cloud",
        description: "Automated marketing journeys and audience segmentation using Salesforce Marketing Cloud.",
      },
      {
        name: "Service Cloud",
        slug: "service-cloud",
        description: "Streamlined customer support operations with case management and SLA tracking.",
      },
      {
        name: "Commerce Cloud",
        slug: "commerce-cloud",
        description: "Enterprise-grade storefronts powered by Salesforce Commerce Cloud for scalable selling.",
      },
      {
        name: "Experience Cloud",
        slug: "experience-cloud",
        description: "Customer and partner portals built on Salesforce Experience Cloud for self-service.",
      },
    ],
  },
  {
    category: "DevOps Development",
    icon: IconSettings,
    slug: "devops-development",
    subServices: [
      {
        name: "Cloud Infrastructure",
        slug: "cloud-infrastructure",
        description: "Scalable cloud setups on AWS, GCP, or Azure tailored to your application load.",
      },
      {
        name: "CI/CD Pipeline",
        slug: "ci-cd-pipeline",
        description: "Automated deployment pipelines that ship code faster with fewer human errors.",
      },
      {
        name: "Cloud Mgmt",
        slug: "cloud-mgmt",
        description: "Ongoing management, cost optimization, and security hardening of your cloud environment.",
      },
      {
        name: "Server Monitoring",
        slug: "server-monitoring",
        description: "24/7 uptime monitoring and alerting so you know about issues before your customers do.",
      },
    ],
  },
  {
    category: "AI Agent Development",
    icon: IconRobot,
    slug: "ai-agent-development",
    subServices: [
      {
        name: "AI Agent Dev",
        slug: "ai-agent-dev",
        description: "Custom AI agents that automate multi-step business processes end to end.",
      },
      {
        name: "Custom API Integration",
        slug: "custom-api-integration",
        description: "Connect your AI tools with existing systems via secure, well-documented API bridges.",
      },
      {
        name: "Business Optimization",
        slug: "business-optimization",
        description: "AI-driven analysis and recommendations that cut costs and surface hidden opportunities.",
      },
      {
        name: "AI Chatbots",
        slug: "ai-chatbots",
        description: "Intelligent chatbots trained on your data to handle support, sales, and lead qualification.",
      },
    ],
  },
  {
    category: "Software Development",
    icon: IconCode,
    slug: "software-development",
    subServices: [
      {
        name: "ERP",
        slug: "erp",
        description: "Custom ERP systems that unify finance, inventory, HR, and operations in one platform.",
      },
      {
        name: "CRM Dev",
        slug: "crm-dev",
        description: "Bespoke CRM solutions built around your specific sales process and customer lifecycle.",
      },
      {
        name: "SaaS",
        slug: "saas",
        description: "Scalable SaaS products architected for multi-tenancy, fast onboarding, and recurring revenue.",
      },
      {
        name: "MVP Development",
        slug: "mvp-development",
        description: "Lean, launch-ready MVPs that validate your idea and attract early adopters quickly.",
      },
    ],
  },
  {
    category: "Hire a Developer",
    icon: IconUsers,
    slug: "hire-a-developer",
    subServices: [
      {
        name: "Dedicated Teams",
        slug: "dedicated-teams",
        description: "Full-time developers embedded in your workflow, operating as a seamless extension of your team.",
      },
      {
        name: "Flexible Engagement",
        slug: "flexible-engagement",
        description: "Part-time or sprint-based developer access to fill skill gaps without long-term commitments.",
      },
      {
        name: "End-to-End Support",
        slug: "end-to-end-support",
        description: "From architecture to delivery — one team handles design, development, testing, and deployment.",
      },
    ],
  },
]

export function ServicesTabSection() {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-10"
        >
          <p className="text-xs font-medium uppercase tracking-widest text-[var(--brand-primary)] mb-3">
            What We Build
          </p>
          <h2 className="text-4xl font-bold tracking-tight text-foreground mb-4">
            Everything Your Business Needs, Built Right
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Six service lines, each with dedicated specialists — so you always work with someone who knows your domain deeply.
          </p>
        </motion.div>

        {/* Tab bar */}
        <div className="relative flex gap-1 overflow-x-auto snap-x pb-2 mb-8 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {SERVICES_DATA.map((service, i) => {
            const Icon = service.icon
            return (
              <button
                key={service.slug}
                onClick={() => setActiveTab(i)}
                className={cn(
                  "relative flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap snap-start min-h-[48px] transition-colors",
                  activeTab === i
                    ? "text-[var(--brand-primary)]"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Icon className="size-4 hidden sm:block" />
                {service.category}
                {activeTab === i && (
                  <motion.div
                    layoutId="tab-indicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--brand-primary)]"
                    transition={{ type: "spring", stiffness: 500, damping: 40 }}
                  />
                )}
              </button>
            )
          })}
        </div>

        {/* Card grid with AnimatePresence */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
            exit={{ opacity: 0, scale: 0.95, y: 8 }}
            transition={{ duration: 0.15, ease: "easeIn" }}
          >
            {SERVICES_DATA[activeTab].subServices.map((sub, index) => {
              const Icon = SERVICES_DATA[activeTab].icon
              return (
                <motion.div
                  key={sub.slug}
                  initial={{ opacity: 0, scale: 0.97, y: 12 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.25, ease: "easeOut" }}
                >
                  <ServiceCard
                    name={sub.name}
                    slug={sub.slug}
                    parentSlug={SERVICES_DATA[activeTab].slug}
                    description={sub.description}
                    icon={<Icon className="size-6 text-[var(--brand-primary)]" />}
                  />
                </motion.div>
              )
            })}
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  )
}
