'use client'

import Link from 'next/link'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { useState, useTransition } from 'react'
import { Edit, Trash2, Eye, Copy, X } from 'lucide-react'
import type { BlogPost } from '@/db/admin/blog'
import type { Category } from '@/db/admin/categories'

const STATUS_TABS = ['all', 'DRAFT', 'SUBMITTED', 'PUBLISHED', 'SCHEDULED']
const STATUS_COLORS: Record<string, string> = {
  draft: 'bg-gray-100 text-gray-600',
  submitted: 'bg-yellow-100 text-yellow-700',
  published: 'bg-green-100 text-green-700',
}
const SERVICE_TYPES = ['Website Development', 'Salesforce Development', 'DevOps', 'AI Agent Development', 'Software Development', 'Hire a Developer']
const INDUSTRIES = ['Healthcare', 'Finance', 'Retail', 'Manufacturing', 'Education', 'Real Estate', 'Logistics', 'Technology', 'Other']

function isScheduled(row: { status: string; published_at: string | null }) {
  return row.status.toLowerCase() === 'published' && !!row.published_at && new Date(row.published_at) > new Date()
}

function formatDateTime(value: string | null) {
  if (!value) return '—'
  const d = new Date(value)
  if (isNaN(d.getTime())) return '—'
  return d.toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short' })
}

interface Props {
  rows: BlogPost[]; total: number; perPage: number; page: number; status: string; q: string
  categories: Category[]
  category: string; service: string; industry: string; dateFrom: string; dateTo: string
}

export function BlogListClient({ rows, total, perPage, page, status, q, categories, category, service, industry, dateFrom, dateTo }: Props) {
  const router = useRouter()
  const pathname = usePathname()
  const sp = useSearchParams()
  const [, startTransition] = useTransition()
  const [deleting, setDeleting] = useState<number | null>(null)

  function nav(params: Record<string, string>) {
    const p = new URLSearchParams(sp.toString())
    for (const [k, v] of Object.entries(params)) { if (v) p.set(k, v); else p.delete(k) }
    startTransition(() => router.push(`${pathname}?${p}`))
  }

  function clearFilters() {
    const p = new URLSearchParams(sp.toString())
    for (const k of ['category', 'service', 'industry', 'dateFrom', 'dateTo']) p.delete(k)
    p.set('page', '1')
    startTransition(() => router.push(`${pathname}?${p}`))
  }

  async function handleDelete(id: number) {
    if (!confirm('Delete this post? This cannot be undone.')) return
    setDeleting(id)
    await fetch(`/api/admin/blog/${id}`, { method: 'DELETE' })
    setDeleting(null)
    router.refresh()
  }

  async function handleDuplicate(id: number) {
    await fetch(`/api/admin/blog/${id}`, { method: 'POST' })
    router.refresh()
  }

  const totalPages = Math.ceil(total / perPage)
  const hasFilters = !!(category || service || industry || dateFrom || dateTo)

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-xl border border-gray-200">
        {/* Status tabs + search */}
        <div className="flex items-center justify-between px-4 pt-3 border-b border-gray-100">
          <div className="flex">
            {STATUS_TABS.map(s => (
              <button key={s} onClick={() => nav({ status: s === 'all' ? '' : s, page: '1' })}
                className={`px-4 py-2.5 text-sm font-medium border-b-2 capitalize transition-colors ${status === s || (s === 'all' && status === 'all') ? 'border-[#002BFF] text-[#002BFF]' : 'border-transparent text-gray-500 hover:text-gray-800'}`}>
                {s.toLowerCase()}
              </button>
            ))}
          </div>
          <div className="pb-3">
            <input
              type="search"
              placeholder="Search posts…"
              defaultValue={q}
              onKeyDown={e => { if (e.key === 'Enter') nav({ q: (e.target as HTMLInputElement).value, page: '1' }) }}
              className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002BFF] w-56"
            />
          </div>
        </div>

        {/* Filter bar */}
        <div className="flex flex-wrap items-center gap-2 px-4 py-3 bg-gray-50 border-b border-gray-100">
          <select
            value={category}
            onChange={e => nav({ category: e.target.value, page: '1' })}
            className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#002BFF]">
            <option value="">All Categories</option>
            {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
          </select>

          <select
            value={service}
            onChange={e => nav({ service: e.target.value, page: '1' })}
            className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#002BFF]">
            <option value="">All Services</option>
            {SERVICE_TYPES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>

          <select
            value={industry}
            onChange={e => nav({ industry: e.target.value, page: '1' })}
            className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#002BFF]">
            <option value="">All Industries</option>
            {INDUSTRIES.map(i => <option key={i} value={i}>{i}</option>)}
          </select>

          <div className="flex items-center gap-1.5 text-sm text-gray-500">
            <span className="text-xs font-medium">Published from</span>
            <input
              type="date"
              value={dateFrom}
              onChange={e => nav({ dateFrom: e.target.value, page: '1' })}
              className="px-2 py-1.5 text-sm border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#002BFF]"
            />
            <span className="text-xs font-medium">to</span>
            <input
              type="date"
              value={dateTo}
              onChange={e => nav({ dateTo: e.target.value, page: '1' })}
              className="px-2 py-1.5 text-sm border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#002BFF]"
            />
          </div>

          {hasFilters && (
            <button onClick={clearFilters} className="flex items-center gap-1 px-2.5 py-1.5 text-xs text-gray-500 hover:text-gray-800 border border-gray-300 rounded-lg bg-white hover:bg-gray-100 transition-colors">
              <X size={12} /> Clear
            </button>
          )}
        </div>

        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Title</th>
              <th className="px-4 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide hidden md:table-cell">Category</th>
              <th className="px-4 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide hidden lg:table-cell">Service</th>
              <th className="px-4 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide hidden lg:table-cell">Industry</th>
              <th className="px-4 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide hidden md:table-cell">Author</th>
              <th className="px-4 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</th>
              <th className="px-4 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide hidden xl:table-cell">Scheduled At</th>
              <th className="px-4 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide hidden xl:table-cell">Published At</th>
              <th className="px-4 py-2.5 text-right text-xs font-semibold text-gray-500 uppercase tracking-wide hidden lg:table-cell">Views</th>
              <th className="px-4 py-2.5 text-right text-xs font-semibold text-gray-500 uppercase tracking-wide">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {rows.length === 0 && (
              <tr><td colSpan={10} className="px-4 py-10 text-center text-gray-400">No posts found</td></tr>
            )}
            {rows.map(post => (
              <tr key={post.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <Link href={`/admin/blog/${post.id}/edit`} className="font-medium text-gray-900 hover:text-[#002BFF] line-clamp-1">
                    {post.title}
                  </Link>
                  <p className="text-xs text-gray-400 mt-0.5">{post.slug}</p>
                </td>
                <td className="px-4 py-3 text-gray-500 hidden md:table-cell">{post.category ?? '—'}</td>
                <td className="px-4 py-3 text-gray-500 hidden lg:table-cell">{post.service_type ?? '—'}</td>
                <td className="px-4 py-3 text-gray-500 hidden lg:table-cell">{post.industry ?? '—'}</td>
                <td className="px-4 py-3 text-gray-500 hidden md:table-cell">{post.author_name ?? '—'}</td>
                <td className="px-4 py-3">
                  {isScheduled(post)
                    ? <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-blue-100 text-blue-700">SCHEDULED</span>
                    : <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_COLORS[post.status] ?? 'bg-gray-100 text-gray-600'}`}>{post.status.toUpperCase()}</span>
                  }
                </td>
                <td className="px-4 py-3 text-gray-500 hidden xl:table-cell">{isScheduled(post) ? formatDateTime(post.published_at) : '—'}</td>
                <td className="px-4 py-3 text-gray-500 hidden xl:table-cell">{!isScheduled(post) && post.status.toLowerCase() === 'published' ? formatDateTime(post.published_at) : '—'}</td>
                <td className="px-4 py-3 text-right text-gray-500 hidden lg:table-cell">{post.view_count.toLocaleString()}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-1">
                    <Link href={`/admin/blog/${post.id}/edit`} className="p-1.5 rounded hover:bg-gray-100 text-gray-400 hover:text-gray-700" title="Edit"><Edit size={15} /></Link>
                    {post.status === 'published' && (
                      <a href={`/blog/${post.slug}`} target="_blank" rel="noopener" className="p-1.5 rounded hover:bg-gray-100 text-gray-400 hover:text-gray-700" title="Preview"><Eye size={15} /></a>
                    )}
                    <button onClick={() => handleDuplicate(post.id)} className="p-1.5 rounded hover:bg-gray-100 text-gray-400 hover:text-gray-700" title="Duplicate"><Copy size={15} /></button>
                    <button onClick={() => handleDelete(post.id)} disabled={deleting === post.id} className="p-1.5 rounded hover:bg-red-50 text-gray-400 hover:text-red-600 disabled:opacity-40" title="Delete"><Trash2 size={15} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
            <p className="text-sm text-gray-500">Page {page} of {totalPages} ({total} total)</p>
            <div className="flex gap-2">
              <button disabled={page <= 1} onClick={() => nav({ page: String(page - 1) })} className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg disabled:opacity-40 hover:bg-gray-50">Prev</button>
              <button disabled={page >= totalPages} onClick={() => nav({ page: String(page + 1) })} className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg disabled:opacity-40 hover:bg-gray-50">Next</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
