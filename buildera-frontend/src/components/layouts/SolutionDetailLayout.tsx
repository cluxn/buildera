import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { SolutionHero } from '@/components/sections/solution/SolutionHero'
import { SolutionProblem } from '@/components/sections/solution/SolutionProblem'
import { SolutionFeatures } from '@/components/sections/solution/SolutionFeatures'
import { SolutionIndustries } from '@/components/sections/solution/SolutionIndustries'
import { SolutionRelatedServices } from '@/components/sections/solution/SolutionRelatedServices'
import { SolutionCaseStudy } from '@/components/sections/solution/SolutionCaseStudy'
import { SolutionTestimonials } from '@/components/sections/solution/SolutionTestimonials'
import { SolutionCta } from '@/components/sections/solution/SolutionCta'
import type { SolutionPageData, TestimonialData, CaseStudyData } from '@/types/service-page'

interface Props {
  data: SolutionPageData
  testimonials: TestimonialData[]
  caseStudy: CaseStudyData | null
}

export function SolutionDetailLayout({ data, testimonials, caseStudy }: Props) {
  return (
    <main>
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Solutions', href: '/solutions' }, { label: data.title }]} />
      <SolutionHero data={data} />
      <SolutionProblem points={data.problemPoints} />
      <SolutionFeatures title={data.title} cards={data.featureCards} />
      <SolutionIndustries industries={data.industriesServed} />
      <SolutionRelatedServices services={data.relatedServices} />
      {caseStudy && <SolutionCaseStudy caseStudy={caseStudy} />}
      {testimonials.length > 0 && <SolutionTestimonials testimonials={testimonials} />}
      <SolutionCta headline={data.ctaHeadline} />
    </main>
  )
}
