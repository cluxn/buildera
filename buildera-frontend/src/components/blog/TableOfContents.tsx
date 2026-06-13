'use client'

import { useState } from 'react'
import type { TocItem } from '@/lib/toc'

interface Props {
  items: TocItem[]
}

export function TableOfContents({ items }: Props) {
  const [open, setOpen] = useState(true)

  if (items.length === 0) return null

  return (
    <nav className="rounded-xl border border-gray-200 bg-white p-5 text-sm">
      <button
        onClick={() => setOpen(v => !v)}
        className="flex w-full items-center justify-between font-semibold text-gray-900 mb-0"
      >
        <span>Table of Contents</span>
        <span className="text-gray-400 text-xs">{open ? '▲' : '▼'}</span>
      </button>

      {open && (
        <ol className="mt-4 space-y-1.5">
          {items.map((item) => (
            <li
              key={item.id}
              style={{ paddingLeft: `${(item.level - 2) * 12}px` }}
            >
              <a
                href={`#${item.id}`}
                className="text-gray-600 hover:text-[#002BFF] transition-colors leading-snug block"
              >
                {item.text}
              </a>
            </li>
          ))}
        </ol>
      )}
    </nav>
  )
}
