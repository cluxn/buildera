import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { StaggeredRevealGrid } from '@/components/ui/StaggeredRevealGrid'
import { CATEGORY_LABELS, CATEGORY_SLUGS, getServicesByCategory } from '@/data/services/index'

const CATEGORY_DESCRIPTORS: Record<string, string> = {
  'website-development': 'Custom websites and web apps that convert visitors into clients.',
  'salesforce-development': 'Unlock the full ROI of your Salesforce investment.',
  'devops-development': 'Ship faster, scale reliably, break less.',
  'ai-agent-development': "Automate the manual work killing your team's productivity.",
  'software-development': 'Purpose-built software that runs your operations — not the other way around.',
  'hire-a-developer': 'Dedicated technical talent that integrates with your team from day one.',
}

const CATEGORY_HEADINGS: Record<string, string> = {
  'website-development': 'Website Development Services',
  'salesforce-development': 'Salesforce Development Services',
  'devops-development': 'DevOps & Cloud Services',
  'ai-agent-development': 'AI Agent Development Services',
  'software-development': 'Custom Software Development',
  'hire-a-developer': 'Hire a Developer',
}

export function generateStaticParams() {
  return CATEGORY_SLUGS.map((category) => ({ category }))
}

interface Props {
  params: Promise<{ category: string }>
}

export default async function ServiceCategoryPage({ params }: Props) {
  const { category } = await params

  if (!CATEGORY_SLUGS.includes(category)) {
    notFound()
  }

  const services = getServicesByCategory(category)
  const heading = CATEGORY_HEADINGS[category] ?? CATEGORY_LABELS[category]
  const descriptor = CATEGORY_DESCRIPTORS[category] ?? ''

  return (
    <main>
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: CATEGORY_LABELS[category] ?? category },
        ]}
      />
      <section className="py-20 bg-background">
        <div className="container mx-auto px-8 max-w-7xl">
          <p className="text-xs font-medium uppercase tracking-widest text-[var(--brand-primary)] mb-4">
            Services
          </p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">{heading}</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">{descriptor}</p>
        </div>
      </section>

      {services.length > 0 && (
        <section className="py-16 bg-[var(--brand-surface)]">
          <div className="container mx-auto px-8 max-w-7xl">
            <StaggeredRevealGrid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => (
                <Link
                  key={service.slug}
                  href={`/services/${category}/${service.slug}`}
                  className="block bg-background border border-border rounded-xl p-6 hover:border-[var(--brand-primary)] transition-colors"
                >
                  <h3 className="text-lg font-semibold mb-2">{service.heroHeadline}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">{service.heroSubheadline}</p>
                  <p className="text-sm font-medium text-[var(--brand-primary)] mt-4">
                    Learn More →
                  </p>
                </Link>
              ))}
            </StaggeredRevealGrid>
          </div>
        </section>
      )}

      <section className="py-16 bg-background">
        <div className="container mx-auto px-8 max-w-7xl text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to get started?</h2>
          <Link
            href="/book-a-call"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-[var(--brand-primary)] text-white font-semibold hover:opacity-90 transition-opacity"
          >
            Book a Free Discovery Call
          </Link>
        </div>
      </section>
    </main>
  )
}
