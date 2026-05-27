import Link from 'next/link'
import { StaggeredRevealGrid } from '@/components/ui/StaggeredRevealGrid'
import { solutions } from '@/data/solutions/solutions'

export default function SolutionsPage() {
  return (
    <main>
      <section className="py-20 bg-background">
        <div className="container mx-auto px-8 max-w-7xl text-center">
          <p className="text-xs font-medium uppercase tracking-widest text-[var(--brand-primary)] mb-4">Solutions</p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Find the Right Solution for Your Business</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">We build purpose-built software for the specific problem you&apos;re trying to solve.</p>
        </div>
      </section>
      {solutions.length > 0 && (
        <section className="py-16 bg-[var(--brand-surface)]">
          <div className="container mx-auto px-8 max-w-7xl">
            <StaggeredRevealGrid className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {solutions.map((s, i) => (
                <Link
                  key={s.slug}
                  href={`/solutions/${s.slug}`}
                  className="block bg-background border border-border rounded-xl p-4 hover:border-[var(--brand-primary)] transition-colors text-sm font-medium text-center"
                  style={{ animationDelay: `${(Math.floor(i / 6) + (i % 6)) * 0.05}s` }}
                >
                  {s.title}
                </Link>
              ))}
            </StaggeredRevealGrid>
          </div>
        </section>
      )}
    </main>
  )
}
