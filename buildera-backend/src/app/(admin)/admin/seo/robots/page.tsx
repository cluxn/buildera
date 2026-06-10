'use client'

import { useEffect, useState } from 'react'

export default function RobotsPage() {
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    fetch('/api/admin/seo/robots').then(r => r.json()).then(d => { setContent(d.content ?? ''); setLoading(false) })
  }, [])

  async function save() {
    setSaving(true)
    await fetch('/api/admin/seo/robots', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ content }) })
    setSaving(false); setSaved(true); setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="space-y-4 max-w-3xl">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-900">Robots.txt</h1>
        <button onClick={save} disabled={saving || loading}
          className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:opacity-90 disabled:opacity-40 transition-opacity">
          {saving ? 'Saving…' : saved ? 'Saved!' : 'Save'}
        </button>
      </div>
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <p className="text-xs text-gray-500 mb-2">This file is served at <code className="bg-gray-100 px-1 rounded">/robots.txt</code></p>
        {loading ? <div className="h-64 flex items-center justify-center text-gray-400">Loading…</div> : (
          <textarea value={content} onChange={e => setContent(e.target.value)} rows={20}
            className="w-full font-mono text-xs px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 resize-y" />
        )}
      </div>
    </div>
  )
}
