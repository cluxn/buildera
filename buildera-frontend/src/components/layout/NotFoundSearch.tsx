"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export function NotFoundSearch() {
  const router = useRouter()
  const [query, setQuery] = useState("")

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const trimmed = query.trim()
    if (!trimmed) return
    router.push(`/search?q=${encodeURIComponent(trimmed)}`)
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 w-full max-w-md mx-auto">
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for pages, services, solutions…"
        aria-label="Search the site"
        className="flex-1 px-4 py-3 min-h-[48px] rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)] focus:ring-offset-1"
      />
      <button
        type="submit"
        className="px-5 min-h-[48px] bg-[var(--brand-primary)] text-white font-semibold rounded-xl hover:bg-[var(--brand-primary-dark)] transition-colors"
        aria-label="Search"
      >
        Search
      </button>
    </form>
  )
}
