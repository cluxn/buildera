import Link from 'next/link'

const INDUSTRY_LABELS: Record<string, string> = {
  manufacturing: 'Manufacturing',
  retail: 'Retail & E-Commerce',
  hospitality: 'Hospitality',
  logistics: 'Logistics',
  finance: 'Finance',
  healthcare: 'Healthcare',
  'real-estate': 'Real Estate',
  'professional-services': 'Professional Services',
}

interface Props {
  industries: string[]
}

export function ServiceIndustries({ industries }: Props) {
  if (!industries.length) return null

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-8 max-w-7xl">
        <p className="text-xs font-medium uppercase tracking-widest text-[var(--brand-primary)] mb-4">
          Industries We Serve
        </p>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-12">
          Built for Your Industry
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {industries.map((slug) => (
            <Link
              key={slug}
              href={`/industries/${slug}`}
              className="bg-background border border-border rounded-xl p-4 hover:border-[var(--brand-primary)] transition-colors text-sm font-medium"
            >
              {INDUSTRY_LABELS[slug] ?? slug}
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
