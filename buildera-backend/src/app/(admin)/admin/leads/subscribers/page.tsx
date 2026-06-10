'use client'

import { useEffect, useState } from 'react'
import { Trash2 } from 'lucide-react'

interface Sub { id: number; email: string; name: string | null; source: string | null; status: string; subscribed_at: string }
interface Stats { active: number; unsubscribed: number; thisWeek: number }

const ROLE_ALLOWED = ['SUPER_ADMIN','ADMIN','MARKETING_MANAGER']

export default function SubscribersPage() {
  const [rows, setRows] = useState<Sub[]>([])
  const [stats, setStats] = useState<Stats>({ active: 0, unsubscribed: 0, thisWeek: 0 })
  const [loading, setLoading] = useState(true)
  const [status, setStatus] = useState('all')
  const [q, setQ] = useState('')

  async function load() {
    setLoading(true)
    const p = new URLSearchParams()
    if (status !== 'all') p.set('status', status)
    if (q) p.set('q', q)
    const r = await fetch(`/api/admin/leads/subscribers?${p}`)
    if (r.ok) { const d = await r.json(); setRows(d.rows); setStats(d.stats) }
    setLoading(false)
  }

  useEffect(() => { load() }, [status, q]) // eslint-disable-line react-hooks/exhaustive-deps

  async function toggleStatus(id: number, current: string) {
    const next = current === 'ACTIVE' ? 'UNSUBSCRIBED' : 'ACTIVE'
    await fetch(`/api/admin/leads/subscribers/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status: next }) })
    load()
  }

  async function remove(id: number) {
    if (!confirm('Delete this subscriber?')) return
    await fetch(`/api/admin/leads/subscribers/${id}`, { method: 'DELETE' }); load()
  }

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold text-gray-900">Newsletter Subscribers</h1>
      <div className="grid grid-cols-3 gap-4">
        {[['Active', stats.active, 'text-green-600'],['Unsubscribed', stats.unsubscribed, 'text-gray-500'],['This Week', stats.thisWeek, 'text-primary']].map(([l,v,c]) => (
          <div key={String(l)} className="bg-white rounded-xl border border-gray-200 p-4">
            <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">{l}</p>
            <p className={`text-2xl font-bold mt-1 ${c}`}>{v}</p>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="flex items-center justify-between px-4 pt-3 border-b border-gray-100">
          <div className="flex">
            {['all','ACTIVE','UNSUBSCRIBED'].map(s => (
              <button key={s} onClick={() => setStatus(s)}
                className={`px-4 py-2.5 text-sm font-medium border-b-2 capitalize transition-colors ${status === s ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-800'}`}>
                {s === 'all' ? 'All' : s.charAt(0) + s.slice(1).toLowerCase()}
              </button>
            ))}
          </div>
          <div className="pb-3">
            <input type="search" placeholder="Search…" value={q} onChange={e => setQ(e.target.value)}
              className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 w-48" />
          </div>
        </div>
        {loading ? <div className="p-10 text-center text-gray-400">Loading…</div> : (
          <table className="w-full text-sm">
            <thead><tr className="bg-gray-50">
              <th className="px-4 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Email</th>
              <th className="px-4 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide hidden md:table-cell">Source</th>
              <th className="px-4 py-2.5 text-center text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</th>
              <th className="px-4 py-2.5 text-right text-xs font-semibold text-gray-500 uppercase tracking-wide">Actions</th>
            </tr></thead>
            <tbody className="divide-y divide-gray-50">
              {rows.length === 0 && <tr><td colSpan={4} className="px-4 py-10 text-center text-gray-400">No subscribers</td></tr>}
              {rows.map(row => (
                <tr key={row.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <p className="font-medium text-gray-900">{row.email}</p>
                    {row.name && <p className="text-xs text-gray-400">{row.name}</p>}
                  </td>
                  <td className="px-4 py-3 text-gray-500 text-xs hidden md:table-cell">{row.source ?? '—'}</td>
                  <td className="px-4 py-3 text-center">
                    <button onClick={() => toggleStatus(row.id, row.status)}
                      className={`text-xs px-2 py-0.5 rounded-full font-medium cursor-pointer hover:opacity-80 transition-opacity ${row.status === 'ACTIVE' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                      {row.status}
                    </button>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button onClick={() => remove(row.id)} className="p-1.5 rounded hover:bg-red-50 text-gray-400 hover:text-red-600"><Trash2 size={15} /></button>
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
