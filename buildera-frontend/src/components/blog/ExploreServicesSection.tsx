import Link from 'next/link'

const SERVICE_TOPICS = [
  { label: 'Website Development', href: '/services/website-development' },
  { label: 'Salesforce Development', href: '/services/salesforce-development' },
  { label: 'DevOps & Cloud', href: '/services/devops-development' },
  { label: 'AI Agent Development', href: '/services/ai-agent-development' },
  { label: 'Software Development', href: '/services/software-development' },
  { label: 'Hire a Developer', href: '/services/hire-a-developer' },
]

export function ExploreServicesSection() {
  return (
    <section className="py-14 bg-[var(--brand-surface)]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl font-bold mb-2">Explore More Topics</h2>
        <p className="text-muted-foreground text-sm mb-8">
          Find expert content and insights related to your business needs.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          {SERVICE_TOPICS.map((topic) => (
            <Link
              key={topic.href}
              href={topic.href}
              className="px-5 py-2.5 rounded-full border border-border bg-background text-sm font-medium text-foreground hover:border-[var(--brand-primary)]/50 hover:text-[var(--brand-primary)] transition-colors"
            >
              {topic.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
