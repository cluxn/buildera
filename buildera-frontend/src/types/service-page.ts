export interface HeroStat {
  value: number
  suffix: string
  label: string
}

export interface OutcomeCard {
  title: string
  description: string
  metric?: string
  icon?: string
}

export interface ProcessStep {
  stepNumber: number
  title: string
  description: string
}

export interface FaqItem {
  question: string
  answer: string
}

export interface Technology {
  name: string
  icon?: string
  category: 'frontend' | 'backend' | 'cloud-devops' | 'tools'
}

export interface ServicePageData {
  categorySlug: string
  slug: string
  heroHeadline: string
  heroSubheadline: string
  heroCta: string
  heroStat: HeroStat
  painPoints: string[]
  outcomeCards: OutcomeCard[]
  processSteps: ProcessStep[]
  industriesServed: string[]
  relatedSolutions: string[]
  faqItems: FaqItem[]
  ctaHeadline: string
  ctaSubtext?: string
  technologies: Technology[]
  videoUrl?: string
}

export interface SolutionPageData {
  slug: string
  title: string
  heroHeadline: string
  heroSubheadline: string
  problemPoints: string[]
  featureCards: OutcomeCard[]
  industriesServed: string[]
  relatedServices: string[]
  ctaHeadline: string
}

export interface TestimonialData {
  id: number
  client_name: string
  client_title?: string
  client_company?: string
  content: string
  rating: number
}

export interface CaseStudyData {
  id: number
  title: string
  slug: string
  client_name: string
  industry: string
  challenge: string
  solution: string
  results: string
}
