import { AnimatedTimeline } from '@/components/ui/AnimatedTimeline'
import type { TimelineStep } from '@/components/ui/AnimatedTimeline'

const PROCESS_STEPS: TimelineStep[] = [
  {
    number: 1,
    phase: 'WEEK 1',
    title: 'Discovery Call',
    description:
      "We learn your actual problem — not the symptom. No NDAs required for this call.",
    duration: '30–60 min',
    deliverables: ['Problem definition', 'Initial scope', 'Go/no-go decision'],
  },
  {
    number: 2,
    phase: 'WEEK 1–2',
    title: 'Requirements Workshop',
    description:
      "We document every workflow, edge case, and integration before a line of code is written.",
    duration: '2–5 days',
    deliverables: ['Functional requirements doc', 'Wireframes', 'Tech stack recommendation'],
  },
  {
    number: 3,
    phase: 'WEEK 2',
    title: 'Proposal & Timeline',
    description:
      "A fixed-price proposal with an honest timeline. No change-order surprises.",
    duration: '1–2 days',
    deliverables: ['Project proposal', 'Payment schedule', 'Kickoff date'],
  },
  {
    number: 4,
    phase: 'WEEKS 3–10',
    title: 'Build & Weekly Demos',
    description:
      "You see working software every week — not a presentation. Feedback is built in.",
    duration: 'Project-dependent',
    deliverables: ['Weekly builds', 'Bug reports resolved in 48hrs', 'Mid-point review call'],
  },
  {
    number: 5,
    phase: 'FINAL 2 WEEKS',
    title: 'Testing & QA',
    description:
      "We break it before your users do. UAT with your team before handoff.",
    duration: '10–14 days',
    deliverables: ['QA report', 'UAT sign-off', 'Load testing results'],
  },
  {
    number: 6,
    phase: 'LAUNCH + 30 DAYS',
    title: 'Launch & Support',
    description:
      "We stay on for 30 days post-launch. Your team gets training and documentation.",
    duration: 'Ongoing',
    deliverables: ['Production deployment', 'Team training', '30-day support window'],
  },
]

export function ProcessTimeline() {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-xs font-semibold uppercase tracking-widest text-[var(--brand-primary)] mb-3">
            HOW WE WORK
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            From Discovery to Delivery — A Process That Actually Works
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Most software projects fail because requirements are vague, timelines are fiction, and
            the client finds out too late. We&apos;ve designed our process to eliminate all three.
          </p>
        </div>

        <AnimatedTimeline steps={PROCESS_STEPS} />
      </div>
    </section>
  )
}
