'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Trash2, Plus, ShieldCheck } from 'lucide-react'

interface User { id: number; name: string; email: string; role: string; created_at: string }
interface Props { rows: User[]; currentUserId: number; roles: string[]; isAdmin: boolean }

export function AuthorsClient({ rows, currentUserId, roles, isAdmin }: Props) {
  const router = useRouter()
  const [creating, setCreating] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'CONTENT_EDITOR' })
  const [saving, setSaving] = useState(false)

  async function create() {
    if (!form.name || !form.email || !form.password) return
    setSaving(true)
    await fetch('/api/admin/authors', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
    setSaving(false)
    setCreating(false)
    setForm({ name: '', email: '', password: '', role: 'CONTENT_EDITOR' })
    router.refresh()
  }

  async function changeRole(id: number, role: string) {
    await fetch(`/api/admin/authors/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ role }) })
    router.refresh()
  }

  async function remove(id: number) {
    if (!confirm('Delete this user?')) return
    await fetch(`/api/admin/authors/${id}`, { method: 'DELETE' })
    router.refresh()
  }

  const ROLE_COLORS: Record<string, string> = {
    SUPER_ADMIN: 'bg-red-100 text-red-700', ADMIN: 'bg-orange-100 text-orange-700',
    CONTENT_EDITOR: 'bg-blue-100 text-blue-700', MARKETING_MANAGER: 'bg-purple-100 text-purple-700',
    SEO_MANAGER: 'bg-green-100 text-green-700',
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-900">Authors & Users</h1>
        {isAdmin && (
          <button onClick={() => setCreating(c => !c)}
            className="flex items-center gap-1.5 px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:opacity-90 transition-opacity">
            <Plus size={15} /> New User
          </button>
        )}
      </div>

      {creating && (
        <div className="bg-white rounded-xl border border-gray-200 p-4 space-y-3">
          <p className="text-sm font-semibold text-gray-800">New User</p>
          <div className="grid sm:grid-cols-2 gap-3">
            {(['name','email','password'] as const).map(f => (
              <div key={f}>
                <label className="text-xs font-medium text-gray-600 mb-1 block capitalize">{f} *</label>
                <input type={f === 'password' ? 'password' : 'text'} value={form[f]}
                  onChange={e => setForm(p => ({ ...p, [f]: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
              </div>
            ))}
            <div>
              <label className="text-xs font-medium text-gray-600 mb-1 block">Role</label>
              <select value={form.role} onChange={e => setForm(p => ({ ...p, role: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30">
                {roles.map(r => <option key={r} value={r}>{r.replace(/_/g, ' ')}</option>)}
              </select>
            </div>
          </div>
          <div className="flex gap-2 justify-end">
            <button onClick={() => setCreating(false)} className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">Cancel</button>
            <button onClick={create} disabled={saving || !form.name || !form.email || !form.password}
              className="px-4 py-1.5 bg-primary text-white text-sm rounded-lg hover:opacity-90 disabled:opacity-40">
              {saving ? 'Creating…' : 'Create'}
            </button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl border border-gray-200">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">User</th>
              <th className="px-4 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Role</th>
              <th className="px-4 py-2.5 text-right text-xs font-semibold text-gray-500 uppercase tracking-wide">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {rows.map(row => (
              <tr key={row.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <p className="font-medium text-gray-900 flex items-center gap-1.5">
                    {row.name} {row.id === currentUserId && <span className="text-xs text-gray-400">(you)</span>}
                  </p>
                  <p className="text-xs text-gray-400">{row.email}</p>
                </td>
                <td className="px-4 py-3">
                  {isAdmin && row.id !== currentUserId ? (
                    <select value={row.role} onChange={e => changeRole(row.id, e.target.value)}
                      className="text-xs px-2 py-1 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary/30">
                      {roles.map(r => <option key={r} value={r}>{r.replace(/_/g, ' ')}</option>)}
                    </select>
                  ) : (
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${ROLE_COLORS[row.role] ?? 'bg-gray-100 text-gray-600'}`}>
                      {row.role.replace(/_/g, ' ')}
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 text-right">
                  {isAdmin && row.id !== currentUserId && (
                    <button onClick={() => remove(row.id)} className="p-1.5 rounded hover:bg-red-50 text-gray-400 hover:text-red-600"><Trash2 size={15} /></button>
                  )}
                  {row.id === currentUserId && <ShieldCheck size={15} className="text-gray-300 ml-auto" />}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
