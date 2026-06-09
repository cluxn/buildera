'use client'

import { useEffect, useState } from 'react'
import { Trash2 } from 'lucide-react'

interface LogEntry { id: number; path: string; referrer: string | null; hit_count: number; first_seen: string; last_seen: string }

export default function NotFoundLogPage() {
  const [rows, setRows] = useState<LogEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [clearing, setClearing] = useState(false)

  async function load() { setLoading(true); const r = await fetch('/api/admin/seo/404-log'); setRows(r.ok ? await r.json() : []); setLoading(false) }
  useEffect(() => { load() }, [])

  async function clear() {
    if (!confirm('Clear all 404 log entries?')) return
    setClearing(true); await fetch('/api/admin/seo/404-log', { method: 'DELETE' }); setClearing(false); load()
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">404 Error Log</h1>
          <p className="text-sm text-gray-400 mt-0.5">{rows.length} unique paths</p>
        </div>
        <button onClick={clear} disabled={clearing || rows.length === 0}
          className="flex items-center gap-1.5 px-4 py-2 border border-red-200 text-red-600 text-sm font-medium rounded-lg hover:bg-red-50 disabled:opacity-40 transition-colors">
          <Trash2 size={15} /> {clearing ? 'Clearing…' : 'Clear Log'}
        </button>
      </div>
      <div className="bg-white rounded-xl border border-gray-200">
        {loading ? <div className="p-10 text-center text-gray-400">Loading…</div> : (
          <table className="w-full text-sm">
            <thead><tr className="bg-gray-50">
              <th className="px-4 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Path</th>
              <th className="px-4 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide hidden md:table-cell">Referrer</th>
              <th className="px-4 py-2.5 text-right text-xs font-semibold text-gray-500 uppercase tracking-wide">Hits</th>
              <th className="px-4 py-2.5 text-right text-xs font-semibold text-gray-500 uppercase tracking-wide hidden lg:table-cell">Last Seen</th>
            </tr></thead>
            <tbody className="divide-y divide-gray-50">
              {rows.length === 0 && <tr><td colSpan={4} className="px-4 py-10 text-center text-gray-400">No 404s logged</td></tr>}
              {rows.map(row => (
                <tr key={row.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-mono text-xs text-red-600">{row.path}</td>
                  <td className="px-4 py-3 text-xs text-gray-400 hidden md:table-cell line-clamp-1">{row.referrer ?? '—'}</td>
                  <td className="px-4 py-3 text-right font-semibold text-gray-900">{row.hit_count}</td>
                  <td className="px-4 py-3 text-right text-xs text-gray-400 hidden lg:table-cell">{new Date(row.last_seen).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
