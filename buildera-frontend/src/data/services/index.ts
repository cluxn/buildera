import type { ServicePageData } from '@/types/service-page'
import { websiteDevelopmentServices } from './website-development'
import { salesforceServices } from './salesforce'
import { devopsServices } from './devops'
import { aiAgentServices } from './ai-agent'
import { softwareDevServices } from './software-dev'
import { hireADeveloperServices } from './hire-a-developer'

export const allServices: ServicePageData[] = [
  ...websiteDevelopmentServices,
  ...salesforceServices,
  ...devopsServices,
  ...aiAgentServices,
  ...softwareDevServices,
  ...hireADeveloperServices,
]

export function getServicesByCategory(categorySlug: string): ServicePageData[] {
  return allServices.filter((s) => s.categorySlug === categorySlug)
}

export const CATEGORY_LABELS: Record<string, string> = {
  'website-development': 'Website Development',
  'salesforce-development': 'Salesforce Development',
  'devops-development': 'DevOps Development',
  'ai-agent-development': 'AI Agent Development',
  'software-development': 'Software Development',
  'hire-a-developer': 'Hire a Developer',
}

export const CATEGORY_SLUGS: string[] = [
  'website-development',
  'salesforce-development',
  'devops-development',
  'ai-agent-development',
  'software-development',
  'hire-a-developer',
]
