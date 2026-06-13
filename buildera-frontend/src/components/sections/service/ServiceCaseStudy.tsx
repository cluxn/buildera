import Link from 'next/link'
import type { CaseStudyData } from '@/types/service-page'

interface Props {
  caseStudy: CaseStudyData | null
}

export function ServiceCaseStudy({ caseStudy }: Props) {
  if (!caseStudy) return null

  return (
    <section className="py-20 bg-[var(--brand-surface)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-xs font-semibold uppercase tracking-widest text-[var(--brand-primary)] mb-3">
            Client Story
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            From Challenge to Result
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            A real engagement — the problem, what we built, and the measurable outcome.
          </p>
        </div>
        <div className="bg-background border border-border rounded-2xl p-8">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <h3 className="text-xl font-semibold">{caseStudy.client_name}</h3>
            <span className="text-sm px-3 py-1 rounded-full bg-[hsl(217_91%_60%/10%)] text-[var(--brand-primary)] font-medium capitalize">
              {caseStudy.industry}
            </span>
          </div>
          <p className="text-4xl font-bold text-[var(--brand-primary)] mb-6">{caseStudy.results}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h4 className="text-sm font-medium uppercase tracking-widest text-muted-foreground mb-2">Challenge</h4>
              <p className="text-base text-foreground">{caseStudy.challenge}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium uppercase tracking-widest text-muted-foreground mb-2">Solution</h4>
              <p className="text-base text-foreground">{caseStudy.solution}</p>
            </div>
          </div>
          <Link
            href={`/case-studies/${caseStudy.slug}`}
            className="text-sm font-semibold text-[var(--brand-primary)] hover:underline"
          >
            Read Full Case Study →
          </Link>
        </div>
      </div>
    </section>
  )
}
