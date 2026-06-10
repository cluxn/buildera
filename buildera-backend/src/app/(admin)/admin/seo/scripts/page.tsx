'use client'

import { useEffect, useState } from 'react'
import { Trash2, Plus, ToggleLeft, ToggleRight, Edit } from 'lucide-react'

interface Script { id: number; name: string; content: string; location: 'HEAD'|'BODY_START'|'BODY_END'; enabled: number; created_at: string }
type Form = Partial<Script> & { name: string; content: string; location: Script['location'] }

export default function ScriptsPage() {
  const [rows, setRows] = useState<Script[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<Form | null>(null)
  const [saving, setSaving] = useState(false)

  async function load() { setLoading(true); const r = await fetch('/api/admin/seo/scripts'); setRows(r.ok ? await r.json() : []); setLoading(false) }
  useEffect(() => { load() }, [])

  async function save() {
    if (!editing?.name || !editing?.content) return
    setSaving(true)
    if (editing.id) await fetch(`/api/admin/seo/scripts/${editing.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(editing) })
    else await fetch('/api/admin/seo/scripts', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(editing) })
    setSaving(false); setEditing(null); load()
  }

  async function toggle(id: number, current: number) {
    await fetch(`/api/admin/seo/scripts/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ enabled: current ? 0 : 1 }) }); load()
  }

  async function remove(id: number) {
    if (!confirm('Delete this script?')) return
    await fetch(`/api/admin/seo/scripts/${id}`, { method: 'DELETE' }); load()
  }

  const blank: Form = { name: '', content: '', location: 'HEAD', enabled: 0 }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-900">Analytics & Scripts</h1>
        <button onClick={() => setEditing(blank)} className="flex items-center gap-1.5 px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:opacity-90"><Plus size={15} /> Add Script</button>
      </div>

      {editing && (
        <div className="bg-white rounded-xl border border-gray-200 p-4 space-y-3">
          <p className="text-sm font-semibold text-gray-800">{editing.id ? 'Edit' : 'New'} Script</p>
          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-gray-600 mb-1 block">Name *</label>
              <input value={editing.name} onChange={e => setEditing(p => p && ({ ...p, name: e.target.value }))} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder="Google Analytics" />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-600 mb-1 block">Location</label>
              <select value={editing.location} onChange={e => setEditing(p => p && ({ ...p, location: e.target.value as Script['location'] }))} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30">
                <option value="HEAD">Head</option><option value="BODY_START">Body Start</option><option value="BODY_END">Body End</option>
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className="text-xs font-medium text-gray-600 mb-1 block">Script Content *</label>
              <textarea value={editing.content} onChange={e => setEditing(p => p && ({ ...p, content: e.target.value }))} rows={6} className="w-full font-mono text-xs px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 resize-y" placeholder="<script>…</script>" />
            </div>
            <div className="flex items-center gap-2">
              <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                <input type="checkbox" checked={!!editing.enabled} onChange={e => setEditing(p => p && ({ ...p, enabled: e.target.checked ? 1 : 0 }))} className="rounded" /> Enabled
              </label>
            </div>
          </div>
          <div className="flex gap-2 justify-end">
            <button onClick={() => setEditing(null)} className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">Cancel</button>
            <button onClick={save} disabled={saving || !editing.name || !editing.content} className="px-4 py-1.5 bg-primary text-white text-sm rounded-lg hover:opacity-90 disabled:opacity-40">{saving ? 'Saving…' : 'Save'}</button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl border border-gray-200">
        {loading ? <div className="p-10 text-center text-gray-400">Loading…</div> : (
          <table className="w-full text-sm">
            <thead><tr className="bg-gray-50">
              <th className="px-4 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Name</th>
              <th className="px-4 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide hidden md:table-cell">Location</th>
              <th className="px-4 py-2.5 text-center text-xs font-semibold text-gray-500 uppercase tracking-wide">Live</th>
              <th className="px-4 py-2.5 text-right text-xs font-semibold text-gray-500 uppercase tracking-wide">Actions</th>
            </tr></thead>
            <tbody className="divide-y divide-gray-50">
              {rows.length === 0 && <tr><td colSpan={4} className="px-4 py-10 text-center text-gray-400">No scripts yet</td></tr>}
              {rows.map(row => (
                <tr key={row.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-900">{row.name}</td>
                  <td className="px-4 py-3 text-gray-500 hidden md:table-cell text-xs">{row.location}</td>
                  <td className="px-4 py-3 text-center">
                    <button onClick={() => toggle(row.id, row.enabled)}>{row.enabled ? <ToggleRight size={20} className="text-green-600" /> : <ToggleLeft size={20} className="text-gray-300" />}</button>
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
