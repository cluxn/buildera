'use client'

import { useEffect, useState } from 'react'
import { Edit, Plus } from 'lucide-react'

interface SeoMeta { id: number; page_path: string; meta_title: string | null; meta_description: string | null; og_title: string | null; og_image: string | null; noindex: number; updated_at: string }
type Form = Partial<SeoMeta> & { page_path: string }

export default function SeoMetaPage() {
  const [rows, setRows] = useState<SeoMeta[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<Form | null>(null)
  const [saving, setSaving] = useState(false)

  async function load() { setLoading(true); const r = await fetch('/api/admin/seo/meta'); setRows(r.ok ? await r.json() : []); setLoading(false) }
  useEffect(() => { load() }, [])

  async function save() {
    if (!editing?.page_path) return
    setSaving(true)
    await fetch('/api/admin/seo/meta', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(editing) })
    setSaving(false); setEditing(null); load()
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-900">SEO Meta & OG Tags</h1>
        <button onClick={() => setEditing({ page_path: '' })}
          className="flex items-center gap-1.5 px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:opacity-90">
          <Plus size={15} /> Add Page
        </button>
      </div>

      {editing && (
        <div className="bg-white rounded-xl border border-gray-200 p-4 space-y-3">
          <p className="text-sm font-semibold text-gray-800">{editing.id ? 'Edit' : 'New'} SEO Entry</p>
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="sm:col-span-2">
              <label className="text-xs font-medium text-gray-600 mb-1 block">Page Path *</label>
              <input value={editing.page_path} onChange={e => setEditing(p => p && ({ ...p, page_path: e.target.value }))}
                disabled={!!editing.id} placeholder="/about" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 disabled:bg-gray-50" />
            </div>
            {[['meta_title','Meta Title'],['meta_description','Meta Description'],['og_title','OG Title'],['og_image','OG Image URL']] .map(([k,l]) => (
              <div key={k} className={k.includes('description') ? 'sm:col-span-2' : ''}>
                <label className="text-xs font-medium text-gray-600 mb-1 block">{l}</label>
                {k.includes('description')
                  ? <textarea value={(editing as Record<string,string>)[k] ?? ''} onChange={e => setEditing(p => p && ({ ...p, [k]: e.target.value || null }))} rows={2} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none" />
                  : <input value={(editing as Record<string,string>)[k] ?? ''} onChange={e => setEditing(p => p && ({ ...p, [k]: e.target.value || null }))} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />}
              </div>
            ))}
            <div className="flex items-center gap-2">
              <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                <input type="checkbox" checked={!!editing.noindex} onChange={e => setEditing(p => p && ({ ...p, noindex: e.target.checked ? 1 : 0 }))} className="rounded" />
                Noindex (hide from search engines)
              </label>
            </div>
          </div>
          <div className="flex gap-2 justify-end">
            <button onClick={() => setEditing(null)} className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">Cancel</button>
            <button onClick={save} disabled={saving || !editing.page_path} className="px-4 py-1.5 bg-primary text-white text-sm rounded-lg hover:opacity-90 disabled:opacity-40">{saving ? 'Saving…' : 'Save'}</button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl border border-gray-200">
        {loading ? <div className="p-10 text-center text-gray-400">Loading…</div> : (
          <table className="w-full text-sm">
            <thead><tr className="bg-gray-50">
              <th className="px-4 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Page Path</th>
              <th className="px-4 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide hidden md:table-cell">Meta Title</th>
              <th className="px-4 py-2.5 text-center text-xs font-semibold text-gray-500 uppercase tracking-wide">Noindex</th>
              <th className="px-4 py-2.5 text-right text-xs font-semibold text-gray-500 uppercase tracking-wide">Edit</th>
            </tr></thead>
            <tbody className="divide-y divide-gray-50">
              {rows.length === 0 && <tr><td colSpan={4} className="px-4 py-10 text-center text-gray-400">No SEO entries yet</td></tr>}
              {rows.map(row => (
                <tr key={row.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-mono text-xs text-gray-900">{row.page_path}</td>
                  <td className="px-4 py-3 text-gray-500 text-xs hidden md:table-cell line-clamp-1">{row.meta_title ?? '—'}</td>
                  <td className="px-4 py-3 text-center">{row.noindex ? <span className="text-xs text-red-500 font-medium">Yes</span> : <span className="text-xs text-gray-400">No</span>}</td>
                  <td className="px-4 py-3 text-right">
                    <button onClick={() => setEditing(row)} className="p-1.5 rounded hover:bg-gray-100 text-gray-400 hover:text-gray-700"><Edit size={15} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
