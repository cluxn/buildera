'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Edit, Trash2, Plus, Eye, EyeOff } from 'lucide-react'
import type { ClientLogo } from '@/db/admin/client-logos'
import { ImageUploadField } from './ImageUploadField'

interface Props { rows: ClientLogo[] }

export function ClientLogosClient({ rows }: Props) {
  const router = useRouter()
  const [editing, setEditing] = useState<Partial<ClientLogo> | null>(null)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  async function save() {
    if (!editing?.name || !editing?.logo_url) return
    setSaving(true)
    setError('')
    const res = editing.id
      ? await fetch(`/api/admin/client-logos/${editing.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(editing) })
      : await fetch('/api/admin/client-logos', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(editing) })
    setSaving(false)
    if (!res.ok) {
      const data = await res.json().catch(() => ({}))
      setError(data.error || 'Save failed')
      return
    }
    setEditing(null)
    router.refresh()
  }

  async function toggleVisible(id: number, visible: number) {
    setError('')
    const res = await fetch(`/api/admin/client-logos/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ visible: visible ? 0 : 1 }) })
    if (!res.ok) {
      const data = await res.json().catch(() => ({}))
      setError(data.error || 'Update failed')
      return
    }
    router.refresh()
  }

  async function remove(id: number) {
    if (!confirm('Delete this logo?')) return
    setError('')
    const res = await fetch(`/api/admin/client-logos/${id}`, { method: 'DELETE' })
    if (!res.ok) {
      const data = await res.json().catch(() => ({}))
      setError(data.error || 'Delete failed')
      return
    }
    router.refresh()
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-900">Client Logos</h1>
        <button onClick={() => setEditing({ name: '', logo_url: '', industry: '', visible: 1, sort_order: 0 })}
          className="flex items-center gap-1.5 px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:opacity-90 transition-opacity">
          <Plus size={15} /> Add Logo
        </button>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      {editing !== null && (
        <div className="bg-white rounded-xl border border-gray-200 p-4 space-y-3">
          <p className="text-sm font-semibold text-gray-800">{editing.id ? 'Edit Logo' : 'Add Logo'}</p>
          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-gray-600 mb-1 block">Company Name *</label>
              <input value={editing.name ?? ''} onChange={e => setEditing(p => ({ ...p, name: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder="Acme Corp" />
            </div>
            <ImageUploadField label="Logo URL *" value={editing.logo_url ?? ''} onChange={url => setEditing(p => ({ ...p, logo_url: url }))} placeholder="https://…/logo.svg" />
            <div>
              <label className="text-xs font-medium text-gray-600 mb-1 block">Industry</label>
              <input value={editing.industry ?? ''} onChange={e => setEditing(p => ({ ...p, industry: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder="e.g. Retail" />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-600 mb-1 block">Sort Order</label>
              <input type="number" value={editing.sort_order ?? 0} onChange={e => setEditing(p => ({ ...p, sort_order: Number(e.target.value) }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
            </div>
          </div>
          <div className="flex gap-2 justify-end">
            <button onClick={() => setEditing(null)} className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">Cancel</button>
            <button onClick={save} disabled={saving || !editing.name || !editing.logo_url}
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
              <th className="px-4 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Logo</th>
              <th className="px-4 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Name</th>
              <th className="px-4 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide hidden md:table-cell">Industry</th>
              <th className="px-4 py-2.5 text-center text-xs font-semibold text-gray-500 uppercase tracking-wide">Visible</th>
              <th className="px-4 py-2.5 text-right text-xs font-semibold text-gray-500 uppercase tracking-wide">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {rows.length === 0 && <tr><td colSpan={5} className="px-4 py-10 text-center text-gray-400">No logos yet</td></tr>}
            {rows.map(row => (
              <tr key={row.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  {row.logo_url
                    ? <img src={row.logo_url} alt={row.name} className="h-8 w-auto object-contain max-w-[80px]" />
                    : <span className="text-gray-300 text-xs">No image</span>}
                </td>
                <td className="px-4 py-3 font-medium text-gray-900">{row.name}</td>
                <td className="px-4 py-3 text-gray-500 hidden md:table-cell">{row.industry ?? '—'}</td>
                <td className="px-4 py-3 text-center">
                  <button onClick={() => toggleVisible(row.id, row.visible)} className="p-1.5 rounded hover:bg-gray-100 transition-colors" title={row.visible ? 'Hide' : 'Show'}>
                    {row.visible ? <Eye size={15} className="text-green-600" /> : <EyeOff size={15} className="text-gray-400" />}
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
      </div>
    </div>
  )
}
