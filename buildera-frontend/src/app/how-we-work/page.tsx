import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { ProcessTimeline } from '@/components/sections/trust/ProcessTimeline'
import { ProcessCta } from '@/components/sections/trust/ProcessCta'

export const metadata = {
  title: 'How We Work | Buildera',
  description:
    'Our 6-step software delivery process from discovery to launch. No vague timelines, no change-order surprises.',
}

export default function HowWeWorkPage() {
  return (
    <main>
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'How We Work' }]} />
      <ProcessTimeline />
      <ProcessCta />
    </main>
  )
}
