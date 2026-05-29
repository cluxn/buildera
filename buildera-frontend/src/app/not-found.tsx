import Link from "next/link"
import { NotFoundSearch } from "@/components/layout/NotFoundSearch"

const POPULAR_PAGES = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Solutions", href: "/solutions" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
]

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-8 px-4 text-center">
      <p className="text-xs font-medium uppercase tracking-widest text-[var(--brand-primary)]">
        404
      </p>
      <div className="space-y-3">
        <h1 className="text-4xl font-bold tracking-tight text-foreground">
          Page not found
        </h1>
        <p className="text-muted-foreground max-w-md">
          The page you&apos;re looking for doesn&apos;t exist or has been moved. Try searching below.
        </p>
      </div>

      <NotFoundSearch />

      <div className="space-y-3">
        <p className="text-sm font-semibold text-foreground">Popular pages</p>
        <nav aria-label="Popular pages" className="flex flex-wrap justify-center gap-3">
          {POPULAR_PAGES.map((page) => (
            <Link
              key={page.href}
              href={page.href}
              className="inline-flex items-center min-h-[48px] px-5 py-2 rounded-xl border border-border text-sm font-medium text-foreground hover:bg-[var(--brand-surface)] hover:border-[var(--brand-primary)] transition-colors"
            >
              {page.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  )
}
