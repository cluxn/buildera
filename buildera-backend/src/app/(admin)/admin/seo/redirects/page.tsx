'use client'

import { useEffect, useState } from 'react'
import { Trash2, Plus, Edit } from 'lucide-react'

interface Redirect { id: number; from_path: string; to_path: string; redirect_type: '301'|'302'; active: number; hit_count: number }
type Form = Partial<Redirect> & { from_path: string; to_path: string; redirect_type: '301'|'302' }

export default function RedirectsPage() {
  const [rows, setRows] = useState<Redirect[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<Form | null>(null)
  const [saving, setSaving] = useState(false)

  async function load() { setLoading(true); const r = await fetch('/api/admin/seo/redirects'); setRows(r.ok ? await r.json() : []); setLoading(false) }
  useEffect(() => { load() }, [])

  async function save() {
    if (!editing?.from_path || !editing?.to_path) return
    setSaving(true)
    if (editing.id) await fetch(`/api/admin/seo/redirects/${editing.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(editing) })
    else await fetch('/api/admin/seo/redirects', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(editing) })
    setSaving(false); setEditing(null); load()
  }

  async function toggle(id: number, current: number) {
    await fetch(`/api/admin/seo/redirects/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ active: current ? 0 : 1 }) }); load()
  }

  async function remove(id: number) {
    if (!confirm('Delete this redirect?')) return
    await fetch(`/api/admin/seo/redirects/${id}`, { method: 'DELETE' }); load()
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-900">Redirects</h1>
        <button onClick={() => setEditing({ from_path: '', to_path: '', redirect_type: '301' })}
          className="flex items-center gap-1.5 px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:opacity-90"><Plus size={15} /> Add Redirect</button>
      </div>

      {editing && (
        <div className="bg-white rounded-xl border border-gray-200 p-4 space-y-3">
          <p className="text-sm font-semibold text-gray-800">{editing.id ? 'Edit' : 'New'} Redirect</p>
          <div className="grid sm:grid-cols-3 gap-3">
            <div>
              <label className="text-xs font-medium text-gray-600 mb-1 block">From Path *</label>
              <input value={editing.from_path} onChange={e => setEditing(p => p && ({ ...p, from_path: e.target.value }))} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder="/old-page" />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-600 mb-1 block">To Path *</label>
              <input value={editing.to_path} onChange={e => setEditing(p => p && ({ ...p, to_path: e.target.value }))} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder="/new-page" />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-600 mb-1 block">Type</label>
              <select value={editing.redirect_type} onChange={e => setEditing(p => p && ({ ...p, redirect_type: e.target.value as '301'|'302' }))} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30">
                <option value="301">301 Permanent</option><option value="302">302 Temporary</option>
              </select>
            </div>
          </div>
          <div className="flex gap-2 justify-end">
            <button onClick={() => setEditing(null)} className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">Cancel</button>
            <button onClick={save} disabled={saving || !editing.from_path || !editing.to_path} className="px-4 py-1.5 bg-primary text-white text-sm rounded-lg hover:opacity-90 disabled:opacity-40">{saving ? 'Saving…' : 'Save'}</button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl border border-gray-200">
        {loading ? <div className="p-10 text-center text-gray-400">Loading…</div> : (
          <table className="w-full text-sm">
            <thead><tr className="bg-gray-50">
              <th className="px-4 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">From</th>
              <th className="px-4 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">To</th>
              <th className="px-4 py-2.5 text-center text-xs font-semibold text-gray-500 uppercase tracking-wide hidden md:table-cell">Type</th>
              <th className="px-4 py-2.5 text-center text-xs font-semibold text-gray-500 uppercase tracking-wide hidden md:table-cell">Hits</th>
              <th className="px-4 py-2.5 text-center text-xs font-semibold text-gray-500 uppercase tracking-wide">Active</th>
              <th className="px-4 py-2.5 text-right text-xs font-semibold text-gray-500 uppercase tracking-wide">Actions</th>
            </tr></thead>
            <tbody className="divide-y divide-gray-50">
              {rows.length === 0 && <tr><td colSpan={6} className="px-4 py-10 text-center text-gray-400">No redirects</td></tr>}
              {rows.map(row => (
                <tr key={row.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-mono text-xs text-gray-900">{row.from_path}</td>
                  <td className="px-4 py-3 font-mono text-xs text-gray-500">{row.to_path}</td>
                  <td className="px-4 py-3 text-center hidden md:table-cell"><span className="text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">{row.redirect_type}</span></td>
                  <td className="px-4 py-3 text-center text-gray-500 hidden md:table-cell">{row.hit_count}</td>
                  <td className="px-4 py-3 text-center">
                    <button onClick={() => toggle(row.id, row.active)} className={`w-4 h-4 rounded-full border-2 transition-colors ${row.active ? 'bg-green-500 border-green-500' : 'border-gray-300'}`} />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => setEditing(row as Form)} className="p-1.5 rounded hover:bg-gray-100 text-gray-400 hover:text-gray-700"><Edit size={15} /></button>
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
