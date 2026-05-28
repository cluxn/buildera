import { SequentialSteps } from '@/components/ui/SequentialSteps'
import type { ProcessStep } from '@/types/service-page'

interface Props { steps: ProcessStep[] }

export function ServiceProcess({ steps }: Props) {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-8 max-w-7xl">
        <div className="text-center mb-14">
          <p className="text-xs font-semibold uppercase tracking-widest text-[var(--brand-primary)] mb-3">How We Work</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Our Delivery Process
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            A transparent, milestone-driven process so you always know what&apos;s happening and what&apos;s coming next.
          </p>
        </div>
        <SequentialSteps steps={steps} />
      </div>
    </section>
  )
}
