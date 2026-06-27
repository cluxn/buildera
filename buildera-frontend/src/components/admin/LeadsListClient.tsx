'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { ChevronDown, ChevronUp, Download, Plus, X, FileSpreadsheet, FileText } from 'lucide-react'
import type { Lead } from '@/db/admin/leads'

const STATUS_TABS = ['all','NEW','CONTACTED','MEETING_SCHEDULED','CONVERTED','CLOSED','LOST','JUNK','follow_up']
const SOURCES = ['all','CONTACT_FORM','ASSESSMENT_FORM','BOOKING_FORM','BLOG_SIDEBAR','POPUP','NEWSLETTER','MANUAL','FEEDBACK']
const SOURCE_LABELS: Record<string, string> = { CONTACT_FORM:'Contact Form',ASSESSMENT_FORM:'Assessment',BOOKING_FORM:'Booking',BLOG_SIDEBAR:'Blog Sidebar',BLOG_INLINE_50:'Blog 50%',BLOG_INLINE_100:'Blog 100%',CASE_STUDY:'Case Study',LEAD_MAGNET:'Lead Magnet',POPUP:'Popup',NEWSLETTER:'Newsletter',NUDGE:'Nudge',MANUAL:'Manual',FEEDBACK:'Feedback' }
const SOURCE_COLORS: Record<string, string> = { CONTACT_FORM:'bg-blue-100 text-blue-700',ASSESSMENT_FORM:'bg-purple-100 text-purple-700',BOOKING_FORM:'bg-indigo-100 text-indigo-700',POPUP:'bg-orange-100 text-orange-700',NEWSLETTER:'bg-green-100 text-green-700',MANUAL:'bg-gray-100 text-gray-600' }
const STATUS_COLORS: Record<string, string> = { NEW:'bg-blue-100 text-blue-700',CONTACTED:'bg-yellow-100 text-yellow-700',MEETING_SCHEDULED:'bg-purple-100 text-purple-700',CONVERTED:'bg-green-100 text-green-700',CLOSED:'bg-gray-100 text-gray-600',LOST:'bg-red-100 text-red-700',JUNK:'bg-gray-100 text-gray-400' }

interface Stats { total: number; week: number; followUp: number; conversionRate: string }
interface Filters { status: string; source: string; q: string; dateFrom: string; dateTo: string }
interface Props { rows: Lead[]; total: number; perPage: number; page: number; stats: Stats; filters: Filters }

export function LeadsListClient({ rows, total, perPage, page, stats, filters }: Props) {
  const router = useRouter()
  const pathname = usePathname()
  const sp = useSearchParams()
  const [selected, setSelected] = useState<Lead | null>(null)
  const [adminNotes, setAdminNotes] = useState('')
  const [savingNote, setSavingNote] = useState(false)
  const [exportOpen, setExportOpen] = useState(false)
  const exportRef = useRef<HTMLDivElement>(null)

  function buildExportUrl(format: 'csv' | 'excel' | 'sample') {
    const p = new URLSearchParams()
    p.set('format', format)
    if (filters.status && filters.status !== 'all') p.set('status', filters.status)
    if (filters.source && filters.source !== 'all') p.set('source', filters.source)
    if (filters.q) p.set('q', filters.q)
    if (filters.dateFrom) p.set('date_from', filters.dateFrom)
    if (filters.dateTo) p.set('date_to', filters.dateTo)
    return `/api/admin/leads/export?${p}`
  }

  function nav(params: Record<string, string>) {
    const p = new URLSearchParams(sp.toString())
    for (const [k, v] of Object.entries(params)) { if (v) p.set(k, v); else p.delete(k) }
    router.push(`${pathname}?${p}`)
  }

  function openLead(lead: Lead) {
    setSelected(lead)
    setAdminNotes(lead.admin_notes ?? '')
    // Mark as read
    if (!lead.is_read) fetch(`/api/admin/leads/${lead.id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ is_read: 1 }) })
  }

  async function saveStatus(id: number, newStatus: string) {
    await fetch(`/api/admin/leads/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status: newStatus }) })
    router.refresh()
    if (selected?.id === id) setSelected(s => s ? { ...s, status: newStatus } : null)
  }

  async function saveNotes(id: number) {
    setSavingNote(true)
    await fetch(`/api/admin/leads/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ admin_notes: adminNotes }) })
    setSavingNote(false)
    router.refresh()
  }

  const totalPages = Math.ceil(total / perPage)
  const today = new Date().toISOString().slice(0, 10)

  return (
    <>
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Leads', value: stats.total },
          { label: 'This Week', value: stats.week },
          { label: 'Follow-up Due', value: stats.followUp, highlight: stats.followUp > 0 },
          { label: 'Conversion Rate', value: `${stats.conversionRate}%` },
        ].map(c => (
          <div key={c.label} className={`bg-white rounded-xl border p-4 ${c.highlight ? 'border-red-200' : 'border-gray-200'}`}>
            <p className="text-sm text-gray-500">{c.label}</p>
            <p className={`text-2xl font-bold mt-1 ${c.highlight ? 'text-red-600' : 'text-gray-900'}`}>{c.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-200">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 border-b border-gray-100">
          <div className="flex gap-2 flex-wrap">
            <input type="search" placeholder="Search name, email, company…" defaultValue={filters.q}
              onKeyDown={e => { if (e.key === 'Enter') nav({ q: (e.target as HTMLInputElement).value, page: '1' }) }}
              className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002BFF] w-52" />
            <select value={filters.source} onChange={e => nav({ source: e.target.value, page: '1' })} className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002BFF]">
              {SOURCES.map(s => <option key={s} value={s}>{s === 'all' ? 'All Sources' : SOURCE_LABELS[s] ?? s}</option>)}
            </select>
            <input type="date" value={filters.dateFrom} onChange={e => nav({ dateFrom: e.target.value, page: '1' })} className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002BFF]" />
            <input type="date" value={filters.dateTo} onChange={e => nav({ dateTo: e.target.value, page: '1' })} className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002BFF]" />
          </div>
          <div className="flex gap-2">
            <div ref={exportRef} className="relative">
              <button
                onClick={() => setExportOpen(v => !v)}
                onBlur={() => setTimeout(() => setExportOpen(false), 150)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                <Download size={14} /> Export <ChevronDown size={12} className="opacity-60" />
              </button>
              {exportOpen && (
                <div className="absolute right-0 top-full mt-1 z-30 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden min-w-[180px]">
                  <a
                    href={buildExportUrl('csv')}
                    onMouseDown={() => setExportOpen(false)}
                    className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    <FileText size={14} className="text-gray-400" /> Export as CSV
                  </a>
                  <a
                    href={buildExportUrl('excel')}
                    onMouseDown={() => setExportOpen(false)}
                    className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    <FileSpreadsheet size={14} className="text-green-600" /> Export as Excel
                  </a>
                  <div className="border-t border-gray-100" />
                  <a
                    href={buildExportUrl('sample')}
                    onMouseDown={() => setExportOpen(false)}
                    className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-500 hover:bg-gray-50"
                  >
                    <Download size={14} className="text-gray-400" /> Download Sample Template
                  </a>
                </div>
              )}
            </div>
            <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm bg-[#002BFF] text-white rounded-lg hover:bg-blue-700">
              <Plus size={14} /> Add Lead
            </button>
          </div>
        </div>

        {/* Status tabs */}
        <div className="flex overflow-x-auto border-b border-gray-100">
          {STATUS_TABS.map(s => (
            <button key={s} onClick={() => nav({ status: s, page: '1' })}
              className={`px-4 py-2.5 text-sm whitespace-nowrap font-medium border-b-2 capitalize transition-colors ${filters.status === s ? 'border-[#002BFF] text-[#002BFF]' : 'border-transparent text-gray-500 hover:text-gray-800'}`}>
              {s === 'follow_up' ? 'Follow-up' : s === 'all' ? 'All' : s.replace('_', ' ')}
            </button>
          ))}
        </div>

        {/* Table */}
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Name</th>
              <th className="px-4 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide hidden md:table-cell">Company</th>
              <th className="px-4 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Source</th>
              <th className="px-4 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</th>
              <th className="px-4 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide hidden lg:table-cell">Follow-up</th>
              <th className="px-4 py-2.5 text-right text-xs font-semibold text-gray-500 uppercase tracking-wide hidden lg:table-cell">Age</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {rows.length === 0 && <tr><td colSpan={6} className="px-4 py-10 text-center text-gray-400">No leads found</td></tr>}
            {rows.map(lead => {
              const age = Math.floor((Date.now() - new Date(lead.created_at).getTime()) / 86400000)
              const overdue = lead.follow_up_date && lead.follow_up_date < today
              return (
                <tr key={lead.id} onClick={() => openLead(lead)} className={`hover:bg-gray-50 cursor-pointer ${!lead.is_read ? 'font-semibold' : ''}`}>
                  <td className="px-4 py-3">
                    <p className="text-gray-900">{lead.name}</p>
                    <p className="text-xs text-gray-400">{lead.email}</p>
                  </td>
                  <td className="px-4 py-3 text-gray-500 hidden md:table-cell">{lead.company ?? '—'}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${SOURCE_COLORS[lead.source ?? ''] ?? 'bg-gray-100 text-gray-600'}`}>{SOURCE_LABELS[lead.source ?? ''] ?? lead.source}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_COLORS[lead.status] ?? 'bg-gray-100 text-gray-600'}`}>{lead.status.replace('_', ' ')}</span>
                  </td>
                  <td className={`px-4 py-3 text-xs hidden lg:table-cell ${overdue ? 'text-red-600 font-medium' : 'text-gray-500'}`}>
                    {lead.follow_up_date ? (overdue ? `${lead.follow_up_date} OVERDUE` : lead.follow_up_date) : '—'}
                  </td>
                  <td className="px-4 py-3 text-right text-gray-400 text-xs hidden lg:table-cell">{age}d</td>
                </tr>
              )
            })}
          </tbody>
        </table>

        {totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
            <p className="text-sm text-gray-500">Page {page} of {totalPages} ({total} total)</p>
            <div className="flex gap-2">
              <button disabled={page <= 1} onClick={() => nav({ page: String(page - 1) })} className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg disabled:opacity-40 hover:bg-gray-50">Prev</button>
              <button disabled={page >= totalPages} onClick={() => nav({ page: String(page + 1) })} className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg disabled:opacity-40 hover:bg-gray-50">Next</button>
            </div>
          </div>
        )}
      </div>

      {/* Lead slide-over */}
      {selected && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/30" onClick={() => setSelected(null)} />
          <div className="relative bg-white w-full max-w-md h-full overflow-y-auto shadow-xl p-6 space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">{selected.name}</h2>
              <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
            </div>

            {/* Read-only info */}
            <div className="space-y-2 text-sm">
              {[['Email', selected.email], ['Phone', selected.phone], ['Company', selected.company], ['Role', selected.role], ['Source', SOURCE_LABELS[selected.source ?? ''] ?? selected.source], ['IP', selected.ip_address], ['Created', new Date(selected.created_at).toLocaleString()]].map(([k, v]) => v && (
                <div key={k as string} className="flex gap-2"><span className="text-gray-400 w-20 shrink-0">{k}</span><span className="text-gray-900">{v as string}</span></div>
              ))}
            </div>

            <hr />

            {/* Editable */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#002BFF]"
                  value={selected.status} onChange={e => saveStatus(selected.id, e.target.value)}>
                  {['NEW','CONTACTED','MEETING_SCHEDULED','CONVERTED','CLOSED','LOST','JUNK'].map(s => <option key={s} value={s}>{s.replace('_', ' ')}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Admin Notes</label>
                <textarea className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#002BFF]" rows={4}
                  value={adminNotes} onChange={e => setAdminNotes(e.target.value)}
                  onBlur={() => saveNotes(selected.id)} placeholder="Add internal notes…" />
                {savingNote && <p className="text-xs text-gray-400 mt-1">Saving…</p>}
              </div>
            </div>

            {/* Metadata */}
            {selected.metadata && (
              <>
                <hr />
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Form Data</p>
                  <pre className="text-xs bg-gray-50 rounded-lg p-3 overflow-auto max-h-48">{JSON.stringify(selected.metadata, null, 2)}</pre>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}
