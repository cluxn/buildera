'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Edit, Trash2, Plus, Star } from 'lucide-react'
import type { Testimonial } from '@/db/admin/testimonials'

interface Props { rows: Testimonial[] }

const INDUSTRIES = ['Manufacturing','Retail','Logistics','Finance','Healthcare','Technology','E-Commerce','Other']
const SERVICES = ['website-development','salesforce-dev','devops-dev','ai-agent-dev','software-dev','hire-a-developer']

export function TestimonialsClient({ rows }: Props) {
  const router = useRouter()
  const [editing, setEditing] = useState<Partial<Testimonial> | null>(null)
  const [saving, setSaving] = useState(false)

  async function save() {
    if (!editing?.person_name || !editing?.quote) return
    setSaving(true)
    if (editing.id) {
      await fetch(`/api/admin/testimonials/${editing.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(editing) })
    } else {
      await fetch('/api/admin/testimonials', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(editing) })
    }
    setSaving(false)
    setEditing(null)
    router.refresh()
  }

  async function toggle(id: number, field: 'visible' | 'featured', current: number) {
    await fetch(`/api/admin/testimonials/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ [field]: current ? 0 : 1 }) })
    router.refresh()
  }

  async function remove(id: number) {
    if (!confirm('Delete this testimonial?')) return
    await fetch(`/api/admin/testimonials/${id}`, { method: 'DELETE' })
    router.refresh()
  }

  const blank: Partial<Testimonial> = { person_name: '', person_title: '', company: '', quote: '', rating: 5, visible: 1, featured: 0, sort_order: 0 }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-900">Testimonials</h1>
        <button onClick={() => setEditing(blank)}
          className="flex items-center gap-1.5 px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:opacity-90 transition-opacity">
          <Plus size={15} /> Add Testimonial
        </button>
      </div>

      {editing !== null && (
        <div className="bg-white rounded-xl border border-gray-200 p-4 space-y-3">
          <p className="text-sm font-semibold text-gray-800">{editing.id ? 'Edit Testimonial' : 'New Testimonial'}</p>
          <div className="grid sm:grid-cols-3 gap-3">
            <div>
              <label className="text-xs font-medium text-gray-600 mb-1 block">Person Name *</label>
              <input value={editing.person_name ?? ''} onChange={e => setEditing(p => ({ ...p, person_name: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder="Jane Smith" />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-600 mb-1 block">Title</label>
              <input value={editing.person_title ?? ''} onChange={e => setEditing(p => ({ ...p, person_title: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder="CEO" />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-600 mb-1 block">Company</label>
              <input value={editing.company ?? ''} onChange={e => setEditing(p => ({ ...p, company: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder="Acme Corp" />
            </div>
            <div className="sm:col-span-3">
              <label className="text-xs font-medium text-gray-600 mb-1 block">Quote *</label>
              <textarea value={editing.quote ?? ''} onChange={e => setEditing(p => ({ ...p, quote: e.target.value }))}
                rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none" placeholder="What the client said…" />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-600 mb-1 block">Rating</label>
              <select value={editing.rating ?? 5} onChange={e => setEditing(p => ({ ...p, rating: Number(e.target.value) }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30">
                {[5,4,3,2,1].map(n => <option key={n} value={n}>{n} Stars</option>)}
              </select>
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
              <label className="text-xs font-medium text-gray-600 mb-1 block">Logo URL</label>
              <input value={editing.logo_url ?? ''} onChange={e => setEditing(p => ({ ...p, logo_url: e.target.value || null }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder="https://…" />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-600 mb-1 block">Sort Order</label>
              <input type="number" value={editing.sort_order ?? 0} onChange={e => setEditing(p => ({ ...p, sort_order: Number(e.target.value) }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
            </div>
            <div className="flex items-center gap-4 pt-5">
              <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                <input type="checkbox" checked={!!editing.visible} onChange={e => setEditing(p => ({ ...p, visible: e.target.checked ? 1 : 0 }))} className="rounded" />
                Visible
              </label>
              <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                <input type="checkbox" checked={!!editing.featured} onChange={e => setEditing(p => ({ ...p, featured: e.target.checked ? 1 : 0 }))} className="rounded" />
                Featured
              </label>
            </div>
          </div>
          <div className="flex gap-2 justify-end">
            <button onClick={() => setEditing(null)} className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">Cancel</button>
            <button onClick={save} disabled={saving || !editing.person_name || !editing.quote}
              className="px-4 py-1.5 bg-primary text-white text-sm rounded-lg hover:opacity-90 disabled:opacity-40 transition-opacity">
              {saving ? 'Saving…' : 'Save'}
            </button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl border border-gray-200">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Person</th>
              <th className="px-4 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide hidden md:table-cell">Quote</th>
              <th className="px-4 py-2.5 text-center text-xs font-semibold text-gray-500 uppercase tracking-wide">Rating</th>
              <th className="px-4 py-2.5 text-center text-xs font-semibold text-gray-500 uppercase tracking-wide">Visible</th>
              <th className="px-4 py-2.5 text-center text-xs font-semibold text-gray-500 uppercase tracking-wide">Featured</th>
              <th className="px-4 py-2.5 text-right text-xs font-semibold text-gray-500 uppercase tracking-wide">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {rows.length === 0 && <tr><td colSpan={6} className="px-4 py-10 text-center text-gray-400">No testimonials yet</td></tr>}
            {rows.map(row => (
              <tr key={row.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <p className="font-medium text-gray-900">{row.person_name}</p>
                  <p className="text-xs text-gray-400">{[row.person_title, row.company].filter(Boolean).join(' · ')}</p>
                </td>
                <td className="px-4 py-3 text-gray-500 hidden md:table-cell max-w-xs">
                  <p className="line-clamp-2 text-xs">{row.quote}</p>
                </td>
                <td className="px-4 py-3 text-center">
                  <span className="inline-flex items-center gap-0.5 text-amber-500 text-xs font-medium">
                    <Star size={12} fill="currentColor" />{row.rating}
                  </span>
                </td>
                <td className="px-4 py-3 text-center">
                  <button onClick={() => toggle(row.id, 'visible', row.visible)}
                    className={`w-5 h-5 rounded border-2 transition-colors ${row.visible ? 'bg-green-500 border-green-500' : 'border-gray-300'}`}
                    title={row.visible ? 'Hide' : 'Show'} />
                </td>
                <td className="px-4 py-3 text-center">
                  <button onClick={() => toggle(row.id, 'featured', row.featured)}
                    className={`w-5 h-5 rounded border-2 transition-colors ${row.featured ? 'bg-primary border-primary' : 'border-gray-300'}`}
                    title={row.featured ? 'Unfeature' : 'Feature'} />
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-1">
                    <button onClick={() => setEditing(row)} className="p-1.5 rounded hover:bg-gray-100 text-gray-400 hover:text-gray-700"><Edit size={15} /></button>
                    <button onClick={() => remove(row.id)} className="p-1.5 rounded hover:bg-red-50 text-gray-400 hover:text-red-600"><Trash2 size={15} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
