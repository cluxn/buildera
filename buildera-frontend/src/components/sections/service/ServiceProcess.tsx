import { SequentialSteps } from '@/components/ui/SequentialSteps'
import type { ProcessStep } from '@/types/service-page'

interface Props {
  steps: ProcessStep[]
}

export function ServiceProcess({ steps }: Props) {
  return (
    <section className="py-16 bg-[var(--brand-surface)]">
      <div className="container mx-auto px-8 max-w-7xl">
        <p className="text-xs font-medium uppercase tracking-widest text-[var(--brand-primary)] mb-4">
          How We Work
        </p>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-12">
          Our Delivery Process
        </h2>
        <div className="max-w-2xl">
          <SequentialSteps steps={steps} />
        </div>
      </div>
    </section>
  )
}
