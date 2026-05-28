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

export const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  'website-development': 'Fast, mobile-first websites and web apps that convert visitors into clients — from brochure sites to full e-commerce platforms.',
  'salesforce-development': 'End-to-end Salesforce implementation, customisation, and integration across Sales, Service, Marketing, and Commerce clouds.',
  'devops-development': 'Cloud infrastructure, CI/CD pipelines, and server monitoring that keep your systems fast, reliable, and scalable.',
  'ai-agent-development': 'Custom AI agents, chatbots, and automation workflows that eliminate repetitive work and accelerate decision-making.',
  'software-development': 'ERP, CRM, SaaS, and MVP software engineered to your exact business requirements — no off-the-shelf compromises.',
  'hire-a-developer': 'Dedicated developers and teams on flexible terms — integrated with your workflow, accountable to your outcomes.',
}

export const SERVICE_NAMES: Record<string, string> = {
  'custom-websites': 'Custom Websites',
  'ecommerce-websites': 'E-Commerce',
  'app-development': 'App Development',
  'progressive-web-apps': 'Progressive Web Apps',
  'crm': 'CRM',
  'marketing-cloud': 'Marketing Cloud',
  'service-cloud': 'Service Cloud',
  'commerce-cloud': 'Commerce Cloud',
  'experience-cloud': 'Experience Cloud',
  'cloud-infrastructure': 'Cloud Infrastructure',
  'ci-cd-pipeline': 'CI/CD Pipeline',
  'cloud-management': 'Cloud Management',
  'server-monitoring': 'Server Monitoring',
  'ai-agent-integration': 'AI Agent Integration',
  'custom-api-integration': 'Custom API Integration',
  'business-optimization': 'Business Optimization',
  'ai-chatbots': 'AI Chatbots',
  'erp-development': 'ERP Development',
  'crm-development': 'CRM Development',
  'saas-development': 'SaaS Development',
  'mvp-development': 'MVP Development',
  'dedicated-teams': 'Dedicated Teams',
  'flexible-engagement': 'Flexible Engagement',
  'end-to-end-support': 'End-to-End Support',
}
