import { fetchNavItems } from "@/lib/api"
import { SiteNavClient } from "./SiteNavClient"

export interface SubServiceItem {
  name: string
  slug: string
}

export interface ServiceMenuItem {
  category: string
  icon: string
  slug: string
  subServices: readonly SubServiceItem[]
}

export const SERVICES_MENU: readonly ServiceMenuItem[] = [
  {
    category: "Website Development",
    icon: "IconWorldWww",
    slug: "website-development",
    subServices: [
      { name: "Custom Websites", slug: "custom-websites" },
      { name: "E-Commerce", slug: "ecommerce-websites" },
      { name: "App Development", slug: "app-development" },
      { name: "Progressive Web Apps", slug: "progressive-web-apps" },
    ],
  },
  {
    category: "Salesforce Development",
    icon: "IconCloud",
    slug: "salesforce-development",
    subServices: [
      { name: "CRM", slug: "crm" },
      { name: "Marketing Cloud", slug: "marketing-cloud" },
      { name: "Service Cloud", slug: "service-cloud" },
      { name: "Commerce Cloud", slug: "commerce-cloud" },
      { name: "Experience Cloud", slug: "experience-cloud" },
    ],
  },
  {
    category: "DevOps Development",
    icon: "IconSettings",
    slug: "devops-development",
    subServices: [
      { name: "Cloud Infrastructure", slug: "cloud-infrastructure" },
      { name: "CI/CD Pipeline", slug: "ci-cd-pipeline" },
      { name: "Cloud Management", slug: "cloud-management" },
      { name: "Server Monitoring", slug: "server-monitoring" },
    ],
  },
  {
    category: "AI Agent Development",
    icon: "IconRobot",
    slug: "ai-agent-development",
    subServices: [
      { name: "AI Agent Integration", slug: "ai-agent-integration" },
      { name: "Custom API Integration", slug: "custom-api-integration" },
      { name: "Business Optimization", slug: "business-optimization" },
      { name: "AI Chatbots", slug: "ai-chatbots" },
    ],
  },
  {
    category: "Software Development",
    icon: "IconCode",
    slug: "software-development",
    subServices: [
      { name: "ERP Development", slug: "erp-development" },
      { name: "CRM Development", slug: "crm-development" },
      { name: "SaaS Development", slug: "saas-development" },
      { name: "MVP Development", slug: "mvp-development" },
    ],
  },
  {
    category: "Hire a Developer",
    icon: "IconUsers",
    slug: "hire-a-developer",
    subServices: [
      { name: "Dedicated Teams", slug: "dedicated-teams" },
      { name: "Flexible Engagement", slug: "flexible-engagement" },
      { name: "End-to-End Support", slug: "end-to-end-support" },
    ],
  },
] as const

export async function SiteNav() {
  const navItems = await fetchNavItems()

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <SiteNavClient servicesMenu={SERVICES_MENU} navItems={navItems} />
    </header>
  )
}
