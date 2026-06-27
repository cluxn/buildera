import type { Metadata } from 'next'
import Link from 'next/link'
import { Suspense } from 'react'
import { SearchInput } from '@/components/ui/SearchInput'
import { Breadcrumb } from '@/components/ui/Breadcrumb'

export const metadata: Metadata = {
  title: 'Search — Buildera',
  description: 'Search Buildera services, blog posts, case studies, and guides.',
  robots: { index: false, follow: true },
}

interface SearchResult {
  id?: number
  title: string
  slug: string
  excerpt?: string
  type: 'blog_post' | 'case_study' | 'guide' | 'service_page'
  url?: string
}

async function fetchResults(q: string): Promise<SearchResult[]> {
  if (!q || q.length < 2) return []
  try {
    const base = process.env.NEXT_PUBLIC_SITE_URL ?? process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000'
    const res = await fetch(
      `${base}/api/search?q=${encodeURIComponent(q)}`,
      { cache: 'no-store' },
    )
    if (!res.ok) return []
    return await res.json()
  } catch {
    return []
  }
}

function resultUrl(result: SearchResult): string {
  if (result.url) return result.url
  switch (result.type) {
    case 'blog_post':   return `/blog/${result.slug}`
    case 'case_study':  return `/case-studies/${result.slug}`
    case 'guide':       return `/guides/${result.slug}`
    default:            return '/'
  }
}

function resultTypeLabel(type: SearchResult['type']): string {
  switch (type) {
    case 'blog_post':   return 'Blog'
    case 'case_study':  return 'Case Study'
    case 'guide':       return 'Guide'
    case 'service_page': return 'Service'
  }
}

function typeBadgeClass(type: SearchResult['type']): string {
  switch (type) {
    case 'blog_post':    return 'bg-blue-100 text-blue-700'
    case 'case_study':   return 'bg-green-100 text-green-700'
    case 'guide':        return 'bg-purple-100 text-purple-700'
    case 'service_page': return 'bg-orange-100 text-orange-700'
  }
}

async function Results({ q }: { q: string }) {
  if (!q || q.length < 2) {
    return (
      <p className="text-muted-foreground text-center py-16">
        Enter at least 2 characters to search.
      </p>
    )
  }

  const results = await fetchResults(q)

  if (results.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-muted-foreground mb-6">No results found for &ldquo;{q}&rdquo;.</p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 bg-[var(--brand-primary)] text-white font-semibold px-6 py-3 rounded-xl hover:bg-[var(--brand-primary-dark)] transition-colors text-sm"
        >
          Ask us directly
        </Link>
      </div>
    )
  }

  return (
    <div>
      <p className="text-sm text-muted-foreground mb-6">
        {results.length} result{results.length !== 1 ? 's' : ''} for &ldquo;{q}&rdquo;
      </p>
      <ul className="divide-y divide-border">
        {results.map((result, i) => (
          <li key={`${result.type}-${result.slug}-${i}`}>
            <Link
              href={resultUrl(result)}
              className="group flex flex-col gap-2 py-5 hover:bg-[var(--brand-surface)] -mx-4 px-4 rounded-xl transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${typeBadgeClass(result.type)}`}>
                  {resultTypeLabel(result.type)}
                </span>
              </div>
              <h2 className="font-semibold text-foreground group-hover:text-[var(--brand-primary)] transition-colors">
                {result.title}
              </h2>
              {result.excerpt && (
                <p className="text-sm text-muted-foreground line-clamp-2">{result.excerpt}</p>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

interface Props {
  searchParams: Promise<{ q?: string }>
}

export default async function SearchPage({ searchParams }: Props) {
  const { q = '' } = await searchParams

  return (
    <>
      <Breadcrumb items={[{ label: 'Search' }]} />

      <section className="py-16 bg-background border-b border-border">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight mb-8">Search Buildera</h1>
          <Suspense>
            <SearchInput placeholder="Search services, blog posts, guides..." />
          </Suspense>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Suspense fallback={<p className="text-muted-foreground text-center py-16">Searching...</p>}>
            <Results q={q} />
          </Suspense>
        </div>
      </section>
    </>
  )
}
