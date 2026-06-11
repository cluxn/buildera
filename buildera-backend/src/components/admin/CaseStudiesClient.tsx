'use client'

import { useState, useTransition } from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { Edit, Trash2, Plus, Star } from 'lucide-react'
import type { CaseStudy } from '@/db/admin/case-studies'
import { RichTextEditor } from './RichTextEditor'

const STATUS_TABS = ['all','DRAFT','PUBLISHED']
const STATUS_COLORS: Record<string, string> = {
  DRAFT: 'bg-gray-100 text-gray-600',
  PUBLISHED: 'bg-green-100 text-green-700',
  SCHEDULED: 'bg-blue-100 text-blue-700',
}
const INDUSTRIES = ['Manufacturing','Retail','Logistics','Finance','Healthcare','Technology','E-Commerce','Other']
const SERVICES = ['website-development','salesforce-dev','devops-dev','ai-agent-dev','software-dev','hire-a-developer']

function toDatetimeLocal(value: string): string {
  const d = new Date(value)
  if (isNaN(d.getTime())) return ''
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`
}

function isScheduled(row: { status: string; published_at: string | null }) {
  return row.status === 'PUBLISHED' && !!row.published_at && new Date(row.published_at) > new Date()
}

interface Props { rows: CaseStudy[]; total: number; perPage: number; page: number; status: string; q: string }

export function CaseStudiesClient({ rows, total, perPage, page, status, q }: Props) {
  const router = useRouter()
  const pathname = usePathname()
  const sp = useSearchParams()
  const [, startTransition] = useTransition()
  const [editing, setEditing] = useState<Partial<CaseStudy> | null>(null)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState<number | null>(null)

  function nav(params: Record<string, string>) {
    const p = new URLSearchParams(sp.toString())
    for (const [k, v] of Object.entries(params)) { if (v) p.set(k, v); else p.delete(k) }
    startTransition(() => router.push(`${pathname}?${p}`))
  }

  async function save() {
    if (!editing?.title) return
    setSaving(true)
    const published_at = editing.published_at
      ? editing.published_at
      : editing.status === 'PUBLISHED' ? new Date().toISOString() : null
    const payload = { ...editing, published_at }
    if (editing.id) {
      await fetch(`/api/admin/case-studies/${editing.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
    } else {
      await fetch('/api/admin/case-studies', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
    }
    setSaving(false)
    setEditing(null)
    router.refresh()
  }

  async function handleDelete(id: number) {
    if (!confirm('Delete this case study?')) return
    setDeleting(id)
    await fetch(`/api/admin/case-studies/${id}`, { method: 'DELETE' })
    setDeleting(null)
    router.refresh()
  }

  async function toggleStatus(id: number, current: CaseStudy['status']) {
    const next = current === 'PUBLISHED' ? 'DRAFT' : 'PUBLISHED'
    await fetch(`/api/admin/case-studies/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status: next, published_at: next === 'PUBLISHED' ? new Date().toISOString() : null }) })
    router.refresh()
  }

  const totalPages = Math.ceil(total / perPage)
  const blank: Partial<CaseStudy> = { title: '', client_name: '', industry: '', service_category: '', status: 'DRAFT', is_featured: 0 }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-900">Case Studies</h1>
        <button onClick={() => setEditing(blank)}
          className="flex items-center gap-1.5 px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:opacity-90 transition-opacity">
          <Plus size={15} /> New Case Study
        </button>
      </div>

      {editing !== null && (
        <div className="bg-white rounded-xl border border-gray-200 p-4 space-y-3">
          <p className="text-sm font-semibold text-gray-800">{editing.id ? 'Edit Case Study' : 'New Case Study'}</p>
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="sm:col-span-2">
              <label className="text-xs font-medium text-gray-600 mb-1 block">Title *</label>
              <input value={editing.title ?? ''} onChange={e => setEditing(p => ({ ...p, title: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder="How We Helped Acme Cut Costs 40%" />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-600 mb-1 block">Client Name</label>
              <input value={editing.client_name ?? ''} onChange={e => setEditing(p => ({ ...p, client_name: e.target.value || null }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder="Acme Corp" />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-600 mb-1 block">Status</label>
              <select value={editing.status ?? 'DRAFT'} onChange={e => setEditing(p => ({ ...p, status: e.target.value as CaseStudy['status'] }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30">
                <option value="DRAFT">Draft</option>
                <option value="PUBLISHED">Published</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-gray-600 mb-1 block">Publish Date</label>
              <input type="datetime-local" value={editing.published_at ? toDatetimeLocal(editing.published_at) : ''}
                onChange={e => setEditing(p => ({ ...p, published_at: e.target.value ? new Date(e.target.value).toISOString() : null }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-600 mb-1 block">Industry</label>
              <select value={editing.industry ?? ''} onChange={e => setEditing(p => ({ ...p, industry: e.target.value || null }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30">
                <option value="">— None —</option>
                {INDUSTRIES.map(i => <option key={i} value={i}>{i}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-gray-600 mb-1 block">Service</label>
              <select value={editing.service_category ?? ''} onChange={e => setEditing(p => ({ ...p, service_category: e.target.value || null }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30">
                <option value="">— None —</option>
                {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-gray-600 mb-1 block">Cover Image URL</label>
              <input value={editing.cover_image ?? ''} onChange={e => setEditing(p => ({ ...p, cover_image: e.target.value || null }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder="https://…" />
            </div>
            <div className="flex items-center gap-2 pt-5">
              <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                <input type="checkbox" checked={!!editing.is_featured} onChange={e => setEditing(p => ({ ...p, is_featured: e.target.checked ? 1 : 0 }))} className="rounded" />
                Featured
              </label>
            </div>
            <div className="sm:col-span-2">
              <label className="text-xs font-medium text-gray-600 mb-1 block">Challenge</label>
              <RichTextEditor content={editing.challenge ?? ''} onChange={html => setEditing(p => ({ ...p, challenge: html || null }))} placeholder="What problem the client faced…" />
            </div>
            <div className="sm:col-span-2">
              <label className="text-xs font-medium text-gray-600 mb-1 block">Solution</label>
              <RichTextEditor content={editing.solution ?? ''} onChange={html => setEditing(p => ({ ...p, solution: html || null }))} placeholder="What Buildera built…" />
            </div>
            <div className="sm:col-span-2">
              <label className="text-xs font-medium text-gray-600 mb-1 block">Outcome</label>
              <RichTextEditor content={editing.outcome ?? ''} onChange={html => setEditing(p => ({ ...p, outcome: html || null }))} placeholder="Results achieved…" />
            </div>
          </div>
          <div className="flex gap-2 justify-end">
            <button onClick={() => setEditing(null)} className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">Cancel</button>
            <button onClick={save} disabled={saving || !editing.title}
              className="px-4 py-1.5 bg-primary text-white text-sm rounded-lg hover:opacity-90 disabled:opacity-40 transition-opacity">
              {saving ? 'Saving…' : 'Save'}
            </button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl border border-gray-200">
        <div className="flex items-center justify-between px-4 pt-3 border-b border-gray-100">
          <div className="flex">
            {STATUS_TABS.map(s => (
              <button key={s} onClick={() => nav({ status: s === 'all' ? '' : s, page: '1' })}
                className={`px-4 py-2.5 text-sm font-medium border-b-2 capitalize transition-colors ${status === s || (s === 'all' && status === 'all') ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-800'}`}>
                {s}
              </button>
            ))}
          </div>
          <div className="pb-3">
            <input type="search" placeholder="Search…" defaultValue={q}
              onKeyDown={e => { if (e.key === 'Enter') nav({ q: (e.target as HTMLInputElement).value, page: '1' }) }}
              className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 w-48" />
          </div>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Title</th>
              <th className="px-4 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide hidden md:table-cell">Client</th>
              <th className="px-4 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide hidden lg:table-cell">Industry</th>
              <th className="px-4 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</th>
              <th className="px-4 py-2.5 text-right text-xs font-semibold text-gray-500 uppercase tracking-wide">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {rows.length === 0 && <tr><td colSpan={5} className="px-4 py-10 text-center text-gray-400">No case studies found</td></tr>}
            {rows.map(row => (
              <tr key={row.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <p className="font-medium text-gray-900 line-clamp-1">{row.title} {row.is_featured ? <Star size={12} className="inline text-amber-400" fill="currentColor" /> : null}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{row.slug}</p>
                </td>
                <td className="px-4 py-3 text-gray-500 hidden md:table-cell">{row.client_name ?? '—'}</td>
                <td className="px-4 py-3 text-gray-500 hidden lg:table-cell">{row.industry ?? '—'}</td>
                <td className="px-4 py-3">
                  <button onClick={() => toggleStatus(row.id, row.status)}
                    className={`text-xs px-2 py-0.5 rounded-full font-medium cursor-pointer hover:opacity-80 transition-opacity ${STATUS_COLORS[isScheduled(row) ? 'SCHEDULED' : row.status] ?? 'bg-gray-100 text-gray-600'}`}
                    title="Click to toggle">
                    {isScheduled(row) ? 'SCHEDULED' : row.status}
                  </button>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-1">
                    <button onClick={() => setEditing(row)} className="p-1.5 rounded hover:bg-gray-100 text-gray-400 hover:text-gray-700" title="Edit"><Edit size={15} /></button>
                    <button onClick={() => handleDelete(row.id)} disabled={deleting === row.id}
                      className="p-1.5 rounded hover:bg-red-50 text-gray-400 hover:text-red-600 disabled:opacity-40" title="Delete"><Trash2 size={15} /></button>
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
