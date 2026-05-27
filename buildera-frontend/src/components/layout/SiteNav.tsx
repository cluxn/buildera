import { fetchNavItems } from "@/lib/api"
import { SiteNavClient } from "./SiteNavClient"

export interface ServiceMenuItem {
  category: string
  icon: string
  slug: string
  subServices: readonly string[]
}

export const SERVICES_MENU: readonly ServiceMenuItem[] = [
  {
    category: "Website Development",
    icon: "IconWorldWww",
    slug: "website-development",
    subServices: ["Custom Websites", "E-Commerce", "App Development", "PWA"],
  },
  {
    category: "Salesforce Development",
    icon: "IconCloud",
    slug: "salesforce-development",
    subServices: ["CRM", "Marketing Cloud", "Service Cloud", "Commerce Cloud", "Experience Cloud"],
  },
  {
    category: "DevOps Development",
    icon: "IconSettings",
    slug: "devops-development",
    subServices: ["Cloud Infrastructure", "CI/CD Pipeline", "Cloud Mgmt", "Server Monitoring"],
  },
  {
    category: "AI Agent Development",
    icon: "IconRobot",
    slug: "ai-agent-development",
    subServices: ["AI Agent Dev", "Custom API Integration", "Business Optimization", "AI Chatbots"],
  },
  {
    category: "Software Development",
    icon: "IconCode",
    slug: "software-development",
    subServices: ["ERP", "CRM Dev", "SaaS", "MVP Development"],
  },
  {
    category: "Hire a Developer",
    icon: "IconUsers",
    slug: "hire-a-developer",
    subServices: ["Dedicated Teams", "Flexible Engagement", "End-to-End Support"],
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
