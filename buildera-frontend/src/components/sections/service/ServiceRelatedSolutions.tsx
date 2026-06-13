import Link from 'next/link'

const SOLUTION_LABELS: Record<string, string> = {
  'operations-mgmt': 'Operations Management',
  'vendor-mgmt': 'Vendor Management',
  'ota-channel': 'OTA Channel Partner',
  'supply-chain': 'Supply Chain Management',
  'project-mgmt': 'Project Management',
  'accounting-mgmt': 'Accounting Management',
  'warehouse-mgmt': 'Warehouse Management',
  'hotels-resorts': 'Hotels & Resorts Management',
  'financial-mgmt': 'Financial Management',
  'fleet-mgmt': 'Fleet Management',
  'vacation-rental': 'Airbnb & Vacation Rental',
  'hr-mgmt': 'HR Management',
  'lead-mgmt': 'Lead Management',
  'sales-mgmt': 'Sales Management',
  crm: 'CRM Solution',
  'india-mart': 'India Mart Automation',
  erp: 'ERP Solution',
  manufacturing: 'Manufacturing & Production',
}

interface Props {
  solutions: string[]
}

export function ServiceRelatedSolutions({ solutions }: Props) {
  if (!solutions.length) return null

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-xs font-semibold uppercase tracking-widest text-[var(--brand-primary)] mb-3">
            Related Solutions
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Tools We Build for This Service
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Purpose-built solutions that extend this service — each one scoped and ready to deploy.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {solutions.map((slug) => (
            <Link
              key={slug}
              href={`/solutions/${slug}`}
              className="bg-background border border-border rounded-xl p-4 hover:border-[var(--brand-primary)] hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 text-sm font-medium"
            >
              {SOLUTION_LABELS[slug] ?? slug}
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
