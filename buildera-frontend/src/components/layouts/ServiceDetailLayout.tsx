import { VideoEmbed } from '@/components/ui/VideoEmbed'
import { ServiceHero } from '@/components/sections/service/ServiceHero'
import { ServiceStatsRow } from '@/components/sections/service/ServiceStatsRow'
import { ServicePainPoints } from '@/components/sections/service/ServicePainPoints'
import { ServiceOutcomeCards } from '@/components/sections/service/ServiceOutcomeCards'
import { ServiceProcess } from '@/components/sections/service/ServiceProcess'
import { ServiceMidCta } from '@/components/sections/service/ServiceMidCta'
import { TechShowcase } from '@/components/sections/service/TechShowcase'
import { ServiceRelatedSolutions } from '@/components/sections/service/ServiceRelatedSolutions'
import { ServiceCaseStudy } from '@/components/sections/service/ServiceCaseStudy'
import { ServiceTestimonials } from '@/components/sections/service/ServiceTestimonials'
import { ServiceIndustries } from '@/components/sections/service/ServiceIndustries'
import { ServiceFaq } from '@/components/sections/service/ServiceFaq'
import { ServiceCta } from '@/components/sections/service/ServiceCta'
import type { ServicePageData, TestimonialData, CaseStudyData } from '@/types/service-page'

interface Props {
  data: ServicePageData
  testimonials: TestimonialData[]
  caseStudy: CaseStudyData | null
}

export function ServiceDetailLayout({ data, testimonials, caseStudy }: Props) {
  return (
    <main>
      {/* 1 — Hero */}
      <ServiceHero data={data} />

      {/* 2 — Stats strip (bg: surface) */}
      <ServiceStatsRow heroStat={data.heroStat} />

      {/* 3 — Pain Points (bg: background) */}
      <ServicePainPoints points={data.painPoints} />

      {/* 4 — Outcome Cards (bg: surface) */}
      <ServiceOutcomeCards cards={data.outcomeCards} />

      {/* 5 — Process (bg: background) */}
      <ServiceProcess steps={data.processSteps} />
      {data.videoUrl && <VideoEmbed url={data.videoUrl} />}

      {/* 6 — Mid-page CTA banner (gradient) */}
      <ServiceMidCta />

      {/* 7 — Tech Stack (bg: surface) */}
      <TechShowcase technologies={data.technologies} />

      {/* 8 — Related Solutions (bg: background) */}
      <ServiceRelatedSolutions solutions={data.relatedSolutions} />

      {/* 9 — Case Study (bg: surface) */}
      {caseStudy && <ServiceCaseStudy caseStudy={caseStudy} />}

      {/* 10 — Testimonials (bg: background) */}
      {testimonials.length > 0 && <ServiceTestimonials testimonials={testimonials} />}

      {/* 11 — Industries (bg: surface) */}
      <ServiceIndustries />

      {/* 12 — FAQ (bg: background) */}
      <ServiceFaq items={data.faqItems} />

      {/* 13 — Final CTA (gradient) */}
      <ServiceCta headline={data.ctaHeadline} subtext={data.ctaSubtext} />
    </main>
  )
}
