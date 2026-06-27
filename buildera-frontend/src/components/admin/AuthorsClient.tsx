'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Trash2, Plus, ShieldCheck, Pencil, X, Check, AlertCircle } from 'lucide-react'
import { PERMISSION_GROUPS, parseUserAccess } from '@/lib/admin-permissions'

interface User { id: number; name: string; email: string; role: string; created_at: string }
interface Props { rows: User[]; currentUserId: number; isAdmin: boolean }

type AccessType = 'SUPER_ADMIN' | 'ADMIN' | 'custom'

function getAccessType(role: string): AccessType {
  const parts = role.split(',').map(r => r.trim())
  if (parts.includes('SUPER_ADMIN')) return 'SUPER_ADMIN'
  if (parts.includes('ADMIN')) return 'ADMIN'
  return 'custom'
}

function rolesToSubmit(accessType: AccessType, perms: string[]): string[] {
  if (accessType === 'SUPER_ADMIN') return ['SUPER_ADMIN']
  if (accessType === 'ADMIN') return ['ADMIN']
  return perms
}

const ACCESS_OPTIONS: { value: AccessType; label: string; desc: string }[] = [
  { value: 'SUPER_ADMIN', label: 'Super Admin',  desc: 'Full access + user management & deletion' },
  { value: 'ADMIN',       label: 'Admin',        desc: 'Full access to all sections' },
  { value: 'custom',      label: 'Custom Access', desc: 'Choose specific sections this user can see' },
]

const ROLE_BADGE: Record<string, string> = {
  SUPER_ADMIN:  'bg-red-100 text-red-700',
  ADMIN:        'bg-orange-100 text-orange-700',
}

const PERM_BADGE = 'bg-blue-100 text-blue-700'

function RoleBadges({ role }: { role: string }) {
  const { isSuperAdmin, isAdmin: _isAdmin, permissions } = parseUserAccess(role)
  if (isSuperAdmin) return <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-red-100 text-red-700">Super Admin</span>
  const parts = role.split(',').map(r => r.trim()).filter(Boolean)
  if (parts.includes('ADMIN')) return <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-orange-100 text-orange-700">Admin</span>
  if (permissions.length === 0) return <span className="text-xs text-gray-400">No access</span>
  return (
    <div className="flex flex-wrap gap-1">
      {permissions.map(p => {
        const label = PERMISSION_GROUPS.flatMap(g => g.keys).find(k => k.key === p)?.label ?? p
        return (
          <span key={p} className={`text-xs px-2 py-0.5 rounded-full font-medium ${PERM_BADGE}`}>
            {label}
          </span>
        )
      })}
    </div>
  )
}

function PermissionCheckboxes({
  accessType,
  selected,
  onToggle,
}: {
  accessType: AccessType
  selected: string[]
  onToggle: (key: string) => void
}) {
  if (accessType !== 'custom') return null
  return (
    <div className="space-y-4">
      {PERMISSION_GROUPS.map(group => (
        <div key={group.label}>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">{group.label}</p>
          <div className="grid grid-cols-2 gap-x-6 gap-y-2">
            {group.keys.map(({ key, label }) => (
              <label key={key} className="flex items-center gap-2 text-sm cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={selected.includes(key)}
                  onChange={() => onToggle(key)}
                  className="rounded border-gray-300 text-primary focus:ring-primary/30"
                />
                <span className="text-gray-700">{label}</span>
              </label>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export function AuthorsClient({ rows, currentUserId, isAdmin }: Props) {
  const router = useRouter()

  // ── Create form state ──────────────────────────────────────────
  const [creating, setCreating] = useState(false)
  const [form, setForm] = useState({
    name: '', email: '', password: '',
    accessType: 'custom' as AccessType,
    perms: [] as string[],
  })
  const [saving, setSaving] = useState(false)
  const [createError, setCreateError] = useState('')

  // ── Edit state ────────────────────────────────────────────────
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editAccess, setEditAccess] = useState<AccessType>('custom')
  const [editPerms, setEditPerms] = useState<string[]>([])
  const [editSaving, setEditSaving] = useState(false)

  function togglePerm(key: string, perms: string[], setPerms: (p: string[]) => void) {
    setPerms(perms.includes(key) ? perms.filter(p => p !== key) : [...perms, key])
  }

  function cancelCreate() {
    setCreating(false)
    setCreateError('')
    setForm({ name: '', email: '', password: '', accessType: 'custom', perms: [] })
  }

  async function handleCreate() {
    if (!form.name || !form.email || !form.password) return
    const roles = rolesToSubmit(form.accessType, form.perms)
    if (roles.length === 0) { setCreateError('Select at least one permission.'); return }
    setSaving(true)
    setCreateError('')
    try {
      const res = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name, email: form.email, password: form.password, roles }),
      })
      const data = await res.json()
      if (!res.ok) { setCreateError(data.error || 'Failed to create user'); return }
      cancelCreate()
      router.refresh()
    } catch {
      setCreateError('Something went wrong. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  function startEdit(row: User) {
    setEditingId(row.id)
    setEditAccess(getAccessType(row.role))
    setEditPerms(parseUserAccess(row.role).permissions)
  }

  async function handleSaveEdit(id: number) {
    const roles = rolesToSubmit(editAccess, editPerms)
    if (roles.length === 0) return
    setEditSaving(true)
    await fetch(`/api/admin/users/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ roles }),
    })
    setEditSaving(false)
    setEditingId(null)
    router.refresh()
  }

  async function handleDelete(id: number) {
    if (!confirm('Delete this user? This cannot be undone.')) return
    await fetch(`/api/admin/users/${id}`, { method: 'DELETE' })
    router.refresh()
  }

  const isSubmittable = form.name && form.email && form.password &&
    (form.accessType !== 'custom' || form.perms.length > 0)

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Users & Access</h1>
          <p className="text-sm text-gray-500 mt-0.5">Manage admin users and control which sections each person can access.</p>
        </div>
        {isAdmin && (
          <button
            onClick={() => setCreating(c => !c)}
            className="flex items-center gap-1.5 px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:opacity-90 transition-opacity"
          >
            <Plus size={15} /> New User
          </button>
        )}
      </div>

      {/* Create form */}
      {creating && (
        <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-5">
          <p className="text-sm font-semibold text-gray-800">Create New User</p>

          {/* Basic fields */}
          <div className="grid sm:grid-cols-3 gap-3">
            {(['name', 'email', 'password'] as const).map(f => (
              <div key={f}>
                <label className="text-xs font-medium text-gray-600 mb-1 block capitalize">{f} *</label>
                <input
                  type={f === 'password' ? 'password' : f === 'email' ? 'email' : 'text'}
                  value={form[f]}
                  onChange={e => setForm(p => ({ ...p, [f]: e.target.value }))}
                  placeholder={f === 'email' ? 'user@buildera.co' : ''}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>
            ))}
          </div>

          {/* Access level */}
          <div>
            <p className="text-xs font-medium text-gray-600 mb-2">Access Level *</p>
            <div className="grid sm:grid-cols-3 gap-2">
              {ACCESS_OPTIONS.map(opt => (
                <label
                  key={opt.value}
                  className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                    form.accessType === opt.value
                      ? 'border-primary bg-primary/5'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="accessType"
                    value={opt.value}
                    checked={form.accessType === opt.value}
                    onChange={() => setForm(p => ({ ...p, accessType: opt.value }))}
                    className="mt-0.5 text-primary focus:ring-primary/30"
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-800">{opt.label}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{opt.desc}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Permission checkboxes (custom only) */}
          {form.accessType === 'custom' && (
            <div className="border border-gray-100 rounded-lg p-4 bg-gray-50">
              <p className="text-xs font-medium text-gray-600 mb-3">Page Access — select what this user can see and manage</p>
              <PermissionCheckboxes
                accessType={form.accessType}
                selected={form.perms}
                onToggle={key => togglePerm(key, form.perms, perms => setForm(p => ({ ...p, perms })))}
              />
            </div>
          )}

          {createError && (
            <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">
              <AlertCircle size={14} /> {createError}
            </div>
          )}

          <div className="flex gap-2 justify-end pt-1">
            <button onClick={cancelCreate} className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
              Cancel
            </button>
            <button
              onClick={handleCreate}
              disabled={saving || !isSubmittable}
              className="px-5 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:opacity-90 disabled:opacity-40"
            >
              {saving ? 'Creating…' : 'Create User'}
            </button>
          </div>
        </div>
      )}

      {/* Users table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="px-4 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">User</th>
              <th className="px-4 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Access</th>
              <th className="px-4 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Added</th>
              <th className="px-4 py-2.5 text-right text-xs font-semibold text-gray-500 uppercase tracking-wide">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {rows.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-sm text-gray-400">No users yet</td>
              </tr>
            )}
            {rows.map(row => (
              <tr key={row.id} className="hover:bg-gray-50 align-top">
                {/* User info */}
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-semibold text-primary">
                        {row.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {row.name}
                        {row.id === currentUserId && <span className="ml-1.5 text-xs text-gray-400 font-normal">(you)</span>}
                      </p>
                      <p className="text-xs text-gray-400">{row.email}</p>
                    </div>
                  </div>
                </td>

                {/* Access / edit */}
                <td className="px-4 py-3 max-w-xs">
                  {isAdmin && row.id !== currentUserId && editingId === row.id ? (
                    <div className="space-y-3">
                      {/* Access type radio */}
                      <div className="flex flex-col gap-1.5">
                        {ACCESS_OPTIONS.map(opt => (
                          <label key={opt.value} className="flex items-center gap-2 text-xs cursor-pointer">
                            <input
                              type="radio"
                              name={`edit-access-${row.id}`}
                              checked={editAccess === opt.value}
                              onChange={() => setEditAccess(opt.value)}
                              className="text-primary focus:ring-primary/30"
                            />
                            <span className="font-medium">{opt.label}</span>
                            <span className="text-gray-400">— {opt.desc}</span>
                          </label>
                        ))}
                      </div>
                      {/* Permission checkboxes */}
                      {editAccess === 'custom' && (
                        <div className="border border-gray-100 rounded-lg p-3 bg-gray-50">
                          <PermissionCheckboxes
                            accessType="custom"
                            selected={editPerms}
                            onToggle={key => togglePerm(key, editPerms, setEditPerms)}
                          />
                        </div>
                      )}
                      {/* Save / Cancel */}
                      <div className="flex gap-1.5">
                        <button
                          onClick={() => handleSaveEdit(row.id)}
                          disabled={editSaving || (editAccess === 'custom' && editPerms.length === 0)}
                          className="flex items-center gap-1 px-3 py-1.5 text-xs bg-primary text-white rounded-lg hover:opacity-90 disabled:opacity-40"
                        >
                          <Check size={11} /> {editSaving ? 'Saving…' : 'Save'}
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                          className="flex items-center gap-1 px-3 py-1.5 text-xs border border-gray-300 rounded-lg hover:bg-gray-50"
                        >
                          <X size={11} /> Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <RoleBadges role={row.role} />
                  )}
                </td>

                {/* Date */}
                <td className="px-4 py-3 text-xs text-gray-400 whitespace-nowrap">
                  {new Date(row.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </td>

                {/* Actions */}
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-1">
                    {isAdmin && row.id !== currentUserId && editingId !== row.id && (
                      <button
                        onClick={() => startEdit(row)}
                        className="p-1.5 rounded hover:bg-blue-50 text-gray-400 hover:text-blue-600 transition-colors"
                        title="Edit access"
                      >
                        <Pencil size={14} />
                      </button>
                    )}
                    {isAdmin && row.id !== currentUserId && (
                      <button
                        onClick={() => handleDelete(row.id)}
                        className="p-1.5 rounded hover:bg-red-50 text-gray-400 hover:text-red-600 transition-colors"
                        title="Delete user"
                      >
                        <Trash2 size={14} />
                      </button>
                    )}
                    {row.id === currentUserId && (
                      <ShieldCheck size={15} className="text-gray-300" aria-label="Current user" />
                    )}
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
