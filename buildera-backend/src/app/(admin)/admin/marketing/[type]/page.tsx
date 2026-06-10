'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Edit, Trash2, Plus, ToggleLeft, ToggleRight } from 'lucide-react'

interface MarketingElement {
  id: number; name: string; type: string; content: Record<string, unknown>
  enabled: number; start_date: string | null; end_date: string | null
  target_pattern: string | null; delay_ms: number | null; created_at: string
}

const TYPE_MAP: Record<string, string> = {
  popup: 'POPUP', 'announcement-bar': 'ANNOUNCEMENT_BAR', nudge: 'NUDGE',
  'banner-ad': 'BANNER_AD', 'mini-cta': 'MINI_CTA', 'mini-lead-capture-form': 'MINI_LEAD_CAPTURE_FORM',
}
const LABEL_MAP: Record<string, string> = {
  popup: 'Popups', 'announcement-bar': 'Announcement Bars', nudge: 'Nudge Widgets',
  'banner-ad': 'Banner Ads', 'mini-cta': 'Mini CTAs', 'mini-lead-capture-form': 'Lead Capture Forms',
}

export default function MarketingTypePage() {
  const { type } = useParams<{ type: string }>()
  const router = useRouter()
  const dbType = TYPE_MAP[type] ?? type.toUpperCase()
  const label = LABEL_MAP[type] ?? type

  const [rows, setRows] = useState<MarketingElement[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<Partial<MarketingElement> | null>(null)
  const [saving, setSaving] = useState(false)

  async function load() {
    setLoading(true)
    const res = await fetch(`/api/admin/marketing?type=${dbType}`)
    setRows(res.ok ? await res.json() : [])
    setLoading(false)
  }

  useEffect(() => { load() }, [type]) // eslint-disable-line react-hooks/exhaustive-deps

  async function save() {
    if (!editing?.name) return
    setSaving(true)
    if (editing.id) {
      await fetch(`/api/admin/marketing/${editing.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(editing) })
    } else {
      await fetch('/api/admin/marketing', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...editing, type: dbType, content: {} }) })
    }
    setSaving(false)
    setEditing(null)
    load()
  }

  async function toggleEnabled(id: number, current: number) {
    await fetch(`/api/admin/marketing/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ enabled: current ? 0 : 1 }) })
    load()
  }

  async function remove(id: number) {
    if (!confirm('Delete this element?')) return
    await fetch(`/api/admin/marketing/${id}`, { method: 'DELETE' })
    load()
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-900">{label}</h1>
        <button onClick={() => setEditing({ name: '', enabled: 0, target_pattern: '/*' })}
          className="flex items-center gap-1.5 px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:opacity-90 transition-opacity">
          <Plus size={15} /> New
        </button>
      </div>

      {editing !== null && (
        <div className="bg-white rounded-xl border border-gray-200 p-4 space-y-3">
          <p className="text-sm font-semibold text-gray-800">{editing.id ? 'Edit' : 'New'} {label.replace(/s$/, '')}</p>
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="sm:col-span-2">
              <label className="text-xs font-medium text-gray-600 mb-1 block">Name *</label>
              <input value={editing.name ?? ''} onChange={e => setEditing(p => ({ ...p, name: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder="e.g. Exit popup — homepage" />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-600 mb-1 block">Target URL Pattern</label>
              <input value={editing.target_pattern ?? ''} onChange={e => setEditing(p => ({ ...p, target_pattern: e.target.value || null }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder="/* or /blog/*" />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-600 mb-1 block">Delay (ms)</label>
              <input type="number" value={editing.delay_ms ?? ''} onChange={e => setEditing(p => ({ ...p, delay_ms: e.target.value ? Number(e.target.value) : null }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder="0" />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-600 mb-1 block">Start Date</label>
              <input type="datetime-local" value={editing.start_date ?? ''} onChange={e => setEditing(p => ({ ...p, start_date: e.target.value || null }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-600 mb-1 block">End Date</label>
              <input type="datetime-local" value={editing.end_date ?? ''} onChange={e => setEditing(p => ({ ...p, end_date: e.target.value || null }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
            </div>
            <div className="flex items-center gap-2 pt-4">
              <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                <input type="checkbox" checked={!!editing.enabled} onChange={e => setEditing(p => ({ ...p, enabled: e.target.checked ? 1 : 0 }))} className="rounded" />
                Enabled on save
              </label>
            </div>
          </div>
          <div className="flex gap-2 justify-end">
            <button onClick={() => setEditing(null)} className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">Cancel</button>
            <button onClick={save} disabled={saving || !editing.name}
              className="px-4 py-1.5 bg-primary text-white text-sm rounded-lg hover:opacity-90 disabled:opacity-40">{saving ? 'Saving…' : 'Save'}</button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl border border-gray-200">
        {loading ? (
          <div className="p-10 text-center text-gray-400">Loading…</div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Name</th>
                <th className="px-4 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide hidden md:table-cell">Target</th>
                <th className="px-4 py-2.5 text-center text-xs font-semibold text-gray-500 uppercase tracking-wide">Live</th>
                <th className="px-4 py-2.5 text-right text-xs font-semibold text-gray-500 uppercase tracking-wide">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {rows.length === 0 && <tr><td colSpan={4} className="px-4 py-10 text-center text-gray-400">No {label.toLowerCase()} yet</td></tr>}
              {rows.map(row => (
                <tr key={row.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-900">{row.name}</td>
                  <td className="px-4 py-3 text-gray-400 text-xs hidden md:table-cell">{row.target_pattern ?? '/*'}</td>
                  <td className="px-4 py-3 text-center">
                    <button onClick={() => toggleEnabled(row.id, row.enabled)}>
                      {row.enabled ? <ToggleRight size={20} className="text-green-600" /> : <ToggleLeft size={20} className="text-gray-300" />}
                    </button>
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
        )}
      </div>
    </div>
  )
}
