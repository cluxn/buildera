'use client'

import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Trash2, Copy, Upload, Image } from 'lucide-react'

interface MediaFile {
  id: number; filename: string; original_name: string; mime_type: string
  size_bytes: number; url: string; alt_text: string | null; created_at: string
}

function fmtSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`
}

export default function MediaPage() {
  const router = useRouter()
  const [files, setFiles] = useState<MediaFile[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [filter, setFilter] = useState('')
  const [q, setQ] = useState('')
  const [copied, setCopied] = useState<number | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  async function load() {
    setLoading(true)
    const params = new URLSearchParams()
    if (filter) params.set('filter', filter)
    if (q) params.set('q', q)
    const res = await fetch(`/api/admin/media?${params}`)
    setFiles(res.ok ? await res.json() : [])
    setLoading(false)
  }

  useEffect(() => { load() }, [filter, q]) // eslint-disable-line react-hooks/exhaustive-deps

  async function upload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    const fd = new FormData(); fd.append('file', file)
    await fetch('/api/admin/media', { method: 'POST', body: fd })
    setUploading(false)
    if (inputRef.current) inputRef.current.value = ''
    load()
  }

  async function remove(id: number) {
    if (!confirm('Delete this file?')) return
    await fetch(`/api/admin/media/${id}`, { method: 'DELETE' })
    load()
  }

  async function copy(url: string, id: number) {
    await navigator.clipboard.writeText(url)
    setCopied(id)
    setTimeout(() => setCopied(null), 1500)
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-xl font-semibold text-gray-900">Media Library</h1>
        <div className="flex items-center gap-2">
          <input type="search" placeholder="Search files…" value={q} onChange={e => setQ(e.target.value)}
            className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 w-40" />
          <select value={filter} onChange={e => setFilter(e.target.value)}
            className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30">
            <option value="">All types</option>
            <option value="images">Images</option>
            <option value="pdfs">PDFs</option>
            <option value="other">Other</option>
          </select>
          <label className="flex items-center gap-1.5 px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:opacity-90 cursor-pointer transition-opacity">
            <Upload size={15} /> {uploading ? 'Uploading…' : 'Upload'}
            <input ref={inputRef} type="file" className="sr-only" onChange={upload} disabled={uploading} />
          </label>
        </div>
      </div>

      {loading ? (
        <div className="bg-white rounded-xl border border-gray-200 p-10 text-center text-gray-400">Loading…</div>
      ) : files.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-10 text-center text-gray-400">No files found</div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">File</th>
                <th className="px-4 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide hidden md:table-cell">Type</th>
                <th className="px-4 py-2.5 text-right text-xs font-semibold text-gray-500 uppercase tracking-wide hidden md:table-cell">Size</th>
                <th className="px-4 py-2.5 text-right text-xs font-semibold text-gray-500 uppercase tracking-wide">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {files.map(f => (
                <tr key={f.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {f.mime_type.startsWith('image/')
                        ? <img src={f.url} alt={f.alt_text ?? f.original_name} className="w-10 h-10 object-cover rounded border border-gray-100 flex-shrink-0" />
                        : <div className="w-10 h-10 bg-gray-100 rounded border border-gray-100 flex items-center justify-center flex-shrink-0"><Image size={18} className="text-gray-400" /></div>}
                      <div>
                        <p className="font-medium text-gray-900 text-xs line-clamp-1">{f.original_name}</p>
                        <p className="text-xs text-gray-400 line-clamp-1 mt-0.5">{f.url}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-400 text-xs hidden md:table-cell">{f.mime_type}</td>
                  <td className="px-4 py-3 text-right text-gray-500 hidden md:table-cell">{fmtSize(f.size_bytes)}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => copy(f.url, f.id)} className="p-1.5 rounded hover:bg-gray-100 text-gray-400 hover:text-gray-700" title="Copy URL">
                        <Copy size={15} className={copied === f.id ? 'text-green-600' : ''} />
                      </button>
                      <button onClick={() => remove(f.id)} className="p-1.5 rounded hover:bg-red-50 text-gray-400 hover:text-red-600"><Trash2 size={15} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
