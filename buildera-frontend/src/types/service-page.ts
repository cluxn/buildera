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

export interface PainPoint {
  title: string
  description: string
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
  painPoints: PainPoint[]
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

export interface SolutionChallenge {
  title: string
  body: string
}

export interface SolutionPreviewRow {
  label: string
  qty: number
  prev: number
  highlight?: boolean
}

export interface SolutionPreviewStat {
  label: string
  value: string
  color: string
}

export interface SolutionPreviewBar {
  label: string
  value: string
  pct: number
}

export interface SolutionPageData {
  slug: string
  title: string
  heroHeadline: string
  heroSubheadline: string
  problemPoints: SolutionChallenge[]
  featureCards: OutcomeCard[]
  industriesServed: string[]
  relatedServices: string[]
  ctaHeadline: string
  previewTableTitle?: string
  previewTableRows?: SolutionPreviewRow[]
  previewStats?: SolutionPreviewStat[]
  previewBars?: SolutionPreviewBar[]
  previewEyebrow?: string
  previewHeading?: string
  previewDescription?: string
}

export interface IndustryChallenge {
  title: string
  description: string
}

export interface IndustrySolutionRef {
  slug: string
  label: string
}

export interface IndustryServiceRef {
  categorySlug: string
  label: string
  description: string
}

export interface IndustryPageData {
  slug: string
  name: string
  heroHeadline: string
  heroSubheadline: string
  heroStat: { value: string; label: string }
  heroStats?: Array<{ value: string; label: string }>
  overview: string
  benefits?: string[]
  challenges: IndustryChallenge[]
  solutions: IndustrySolutionRef[]
  services: IndustryServiceRef[]
  faqItems: FaqItem[]
  ctaHeadline: string
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
