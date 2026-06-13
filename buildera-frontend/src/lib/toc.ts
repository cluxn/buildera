export interface TocItem {
  id: string
  text: string
  level: number
}

function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/<[^>]*>/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

export function extractTocAndInjectIds(html: string): { items: TocItem[]; html: string } {
  const items: TocItem[] = []
  const seenIds = new Map<string, number>()

  const result = html.replace(/<h([2-4])([^>]*)>([\s\S]*?)<\/h\1>/gi, (match, levelStr, attrs, inner) => {
    const level = Number(levelStr)
    const text = inner.replace(/<[^>]*>/g, '').trim()
    if (!text) return match

    const base = slugifyHeading(text)
    const count = seenIds.get(base) ?? 0
    seenIds.set(base, count + 1)
    const id = count === 0 ? base : `${base}-${count}`

    items.push({ id, text, level })
    return `<h${level}${attrs} id="${id}">${inner}</h${level}>`
  })

  return { items, html: result }
}
