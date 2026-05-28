import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { AboutHero } from '@/components/sections/trust/AboutHero'
import { ValuesSection } from '@/components/sections/trust/ValuesSection'
import { TeamSection } from '@/components/sections/trust/TeamSection'
import { AboutCta } from '@/components/sections/trust/AboutCta'

export const metadata = {
  title: 'About Buildera | IT Services Company',
  description:
    'Learn who we are, how we work, and why 50+ Indian businesses trust Buildera to build their software.',
}

export default function AboutPage() {
  return (
    <main>
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'About Us' }]} />
      <AboutHero />
      <ValuesSection />
      <TeamSection />
      <AboutCta />
    </main>
  )
}
