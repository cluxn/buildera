'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Plus, Pencil, Trash2, X, Check, User } from 'lucide-react'
import { IconBrandTwitter, IconBrandLinkedin } from '@tabler/icons-react'

interface Author {
  id: number
  name: string
  bio: string | null
  avatar_url: string | null
  job_title: string | null
  twitter_url: string | null
  linkedin_url: string | null
  created_at: string
}

interface Props { authors: Author[] }

const EMPTY_FORM = { name: '', bio: '', avatar_url: '', job_title: '', twitter_url: '', linkedin_url: '' }

function Avatar({ author }: { author: Pick<Author, 'name' | 'avatar_url'> }) {
  if (author.avatar_url) {
    return <img src={author.avatar_url} alt={author.name} className="w-9 h-9 rounded-full object-cover flex-shrink-0" />
  }
  return (
    <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
      <span className="text-sm font-semibold text-primary">{author.name.charAt(0).toUpperCase()}</span>
    </div>
  )
}

function Field({ label, value, onChange, type = 'text', placeholder = '', textarea = false }: {
  label: string; value: string; onChange: (v: string) => void
  type?: string; placeholder?: string; textarea?: boolean
}) {
  const cls = 'w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30'
  return (
    <div>
      <label className="block text-xs font-medium text-gray-600 mb-1">{label}</label>
      {textarea
        ? <textarea rows={3} className={cls} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} />
        : <input type={type} className={cls} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} />
      }
    </div>
  )
}

export function AuthorsMgmtClient({ authors }: Props) {
  const router = useRouter()
  const [creating, setCreating] = useState(false)
  const [form, setForm] = useState(EMPTY_FORM)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editForm, setEditForm] = useState(EMPTY_FORM)

  function set(key: keyof typeof EMPTY_FORM) {
    return (v: string) => setForm(f => ({ ...f, [key]: v }))
  }
  function setEdit(key: keyof typeof EMPTY_FORM) {
    return (v: string) => setEditForm(f => ({ ...f, [key]: v }))
  }

  function cancelCreate() {
    setCreating(false)
    setForm(EMPTY_FORM)
    setError('')
  }

  async function handleCreate() {
    if (!form.name.trim()) { setError('Name is required'); return }
    setSaving(true)
    setError('')
    try {
      const res = await fetch('/api/admin/authors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error || 'Failed to create author'); return }
      cancelCreate()
      router.refresh()
    } catch {
      setError('Something went wrong.')
    } finally {
      setSaving(false)
    }
  }

  function startEdit(a: Author) {
    setEditingId(a.id)
    setEditForm({
      name: a.name,
      bio: a.bio ?? '',
      avatar_url: a.avatar_url ?? '',
      job_title: a.job_title ?? '',
      twitter_url: a.twitter_url ?? '',
      linkedin_url: a.linkedin_url ?? '',
    })
  }

  async function handleSaveEdit(id: number) {
    if (!editForm.name.trim()) return
    setSaving(true)
    await fetch(`/api/admin/authors/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editForm),
    })
    setSaving(false)
    setEditingId(null)
    router.refresh()
  }

  async function handleDelete(id: number) {
    if (!confirm('Delete this author? Blog posts using them will have no author assigned.')) return
    await fetch(`/api/admin/authors/${id}`, { method: 'DELETE' })
    router.refresh()
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Authors</h1>
          <p className="text-sm text-gray-500 mt-0.5">Manage blog content writers. Authors are assigned to blog posts.</p>
        </div>
        <button
          onClick={() => setCreating(c => !c)}
          className="flex items-center gap-1.5 px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:opacity-90 transition-opacity"
        >
          <Plus size={15} /> New Author
        </button>
      </div>

      {/* Create form */}
      {creating && (
        <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-4">
          <p className="text-sm font-semibold text-gray-800">Add New Author</p>
          <div className="grid sm:grid-cols-2 gap-3">
            <Field label="Name *" value={form.name} onChange={set('name')} placeholder="Jane Doe" />
            <Field label="Job Title" value={form.job_title} onChange={set('job_title')} placeholder="Content Writer" />
          </div>
          <Field label="Bio" value={form.bio} onChange={set('bio')} placeholder="Short bio about the author…" textarea />
          <div className="grid sm:grid-cols-3 gap-3">
            <Field label="Avatar URL" value={form.avatar_url} onChange={set('avatar_url')} placeholder="https://…" />
            <Field label="Twitter URL" value={form.twitter_url} onChange={set('twitter_url')} placeholder="https://x.com/…" />
            <Field label="LinkedIn URL" value={form.linkedin_url} onChange={set('linkedin_url')} placeholder="https://linkedin.com/…" />
          </div>
          {error && <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">{error}</p>}
          <div className="flex gap-2 justify-end">
            <button onClick={cancelCreate} className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">Cancel</button>
            <button
              onClick={handleCreate}
              disabled={saving || !form.name.trim()}
              className="px-5 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:opacity-90 disabled:opacity-40"
            >
              {saving ? 'Saving…' : 'Add Author'}
            </button>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {authors.length === 0 ? (
          <div className="py-16 text-center">
            <User className="mx-auto mb-3 text-gray-300" size={36} />
            <p className="text-sm text-gray-400">No authors yet. Add one to assign to blog posts.</p>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-4 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Author</th>
                <th className="px-4 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Bio</th>
                <th className="px-4 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Links</th>
                <th className="px-4 py-2.5 text-right text-xs font-semibold text-gray-500 uppercase tracking-wide">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {authors.map(a => (
                <tr key={a.id} className="hover:bg-gray-50 align-top">
                  <td className="px-4 py-3">
                    {editingId === a.id ? (
                      <div className="space-y-2 min-w-[280px]">
                        <div className="grid grid-cols-2 gap-2">
                          <Field label="Name *" value={editForm.name} onChange={setEdit('name')} />
                          <Field label="Job Title" value={editForm.job_title} onChange={setEdit('job_title')} />
                        </div>
                        <Field label="Bio" value={editForm.bio} onChange={setEdit('bio')} textarea />
                        <Field label="Avatar URL" value={editForm.avatar_url} onChange={setEdit('avatar_url')} />
                        <Field label="Twitter URL" value={editForm.twitter_url} onChange={setEdit('twitter_url')} />
                        <Field label="LinkedIn URL" value={editForm.linkedin_url} onChange={setEdit('linkedin_url')} />
                        <div className="flex gap-1.5 pt-1">
                          <button
                            onClick={() => handleSaveEdit(a.id)}
                            disabled={saving || !editForm.name.trim()}
                            className="flex items-center gap-1 px-3 py-1.5 text-xs bg-primary text-white rounded-lg hover:opacity-90 disabled:opacity-40"
                          >
                            <Check size={11} /> {saving ? 'Saving…' : 'Save'}
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
                      <div className="flex items-center gap-2.5">
                        <Avatar author={a} />
                        <div>
                          <p className="font-medium text-gray-900">{a.name}</p>
                          {a.job_title && <p className="text-xs text-gray-400">{a.job_title}</p>}
                        </div>
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3 max-w-xs">
                    {editingId !== a.id && (
                      <p className="text-xs text-gray-500 line-clamp-2">{a.bio || <span className="text-gray-300 italic">No bio</span>}</p>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {editingId !== a.id && (
                      <div className="flex gap-2">
                        {a.twitter_url && (
                          <a href={a.twitter_url} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500 transition-colors" title="Twitter">
                            <IconBrandTwitter size={14} />
                          </a>
                        )}
                        {a.linkedin_url && (
                          <a href={a.linkedin_url} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-700 transition-colors" title="LinkedIn">
                            <IconBrandLinkedin size={14} />
                          </a>
                        )}
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right">
                    {editingId !== a.id && (
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => startEdit(a)}
                          className="p-1.5 rounded hover:bg-blue-50 text-gray-400 hover:text-blue-600 transition-colors"
                          title="Edit author"
                        >
                          <Pencil size={14} />
                        </button>
                        <button
                          onClick={() => handleDelete(a.id)}
                          className="p-1.5 rounded hover:bg-red-50 text-gray-400 hover:text-red-600 transition-colors"
                          title="Delete author"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    )}
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
