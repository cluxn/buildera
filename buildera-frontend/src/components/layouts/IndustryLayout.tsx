import { IndustryHero } from '@/components/sections/industry/IndustryHero'
import { IndustryChallenges } from '@/components/sections/industry/IndustryChallenges'
import { IndustrySolutions } from '@/components/sections/industry/IndustrySolutions'
import { IndustryServices } from '@/components/sections/industry/IndustryServices'
import { IndustryCta } from '@/components/sections/industry/IndustryCta'
import type { IndustryPageData } from '@/types/service-page'

interface Props { data: IndustryPageData }

export function IndustryLayout({ data }: Props) {
  return (
    <main>
      {/* 1 — Hero (background) */}
      <IndustryHero data={data} />

      {/* 2 — Challenges (surface) */}
      <IndustryChallenges challenges={data.challenges} />

      {/* 3 — Solutions (background) */}
      <IndustrySolutions solutions={data.solutions} />

      {/* 4 — Services (surface) */}
      <IndustryServices services={data.services} />

      {/* 5 — CTA (gradient) */}
      <IndustryCta headline={data.ctaHeadline} industryName={data.name} />
    </main>
  )
}
