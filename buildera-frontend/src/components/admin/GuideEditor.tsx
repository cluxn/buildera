'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useRouter } from 'next/navigation'
import type { LeadMagnet } from '@/db/admin/lead-magnets'
import { RichTextEditor } from './RichTextEditor'
import { ImageUploadField } from './ImageUploadField'

interface Props { guide?: LeadMagnet }

const RESOURCE_TYPES = ['article', 'template', 'checklist', 'video']

const STATUS_BADGES: Record<string, { label: string; className: string }> = {
  DRAFT: { label: 'Draft', className: 'bg-gray-100 text-gray-600' },
  PUBLISHED: { label: 'Published', className: 'bg-green-100 text-green-700' },
  SCHEDULED: { label: 'Scheduled', className: 'bg-blue-100 text-blue-700' },
}

function slugify(t: string) { return t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') }

function toDatetimeLocal(value: string): string {
  const d = new Date(value)
  if (isNaN(d.getTime())) return ''
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`
}

const AUTOSAVE_KEY = (id: string) => `autosave_guide_${id}`

export function GuideEditor({ guide }: Props) {
  const router = useRouter()
  const isNew = !guide?.id
  const autoId = guide?.id ? String(guide.id) : 'new'

  const [title, setTitle] = useState(guide?.title ?? '')
  const [slug, setSlug] = useState(guide?.slug ?? '')
  const [excerpt, setExcerpt] = useState(guide?.excerpt ?? '')
  const [content, setContent] = useState(guide?.content ?? '')
  const [status, setStatus] = useState<string>(guide?.status ?? 'DRAFT')
  const [scheduledAt, setScheduledAt] = useState(
    guide?.published_at && new Date(guide.published_at) > new Date() ? toDatetimeLocal(guide.published_at) : ''
  )
  const [resourceType, setResourceType] = useState(guide?.resource_type ?? 'article')
  const [category, setCategory] = useState(guide?.category ?? '')
  const [pdfUrl, setPdfUrl] = useState(guide?.pdf_url ?? '')
  const [ctaText, setCtaText] = useState(guide?.cta_text ?? 'Download Free Guide')
  const [readTime, setReadTime] = useState<string>(guide?.read_time_minutes ? String(guide.read_time_minutes) : '')
  const [coverImage, setCoverImage] = useState(guide?.cover_image ?? '')
  const [coverImageAlt, setCoverImageAlt] = useState(guide?.cover_image_alt ?? '')
  const [metaTitle, setMetaTitle] = useState(guide?.meta_title ?? '')
  const [metaDescription, setMetaDescription] = useState(guide?.meta_description ?? '')
  const [saving, setSaving] = useState(false)
  const [lastSavedAt, setLastSavedAt] = useState<Date | null>(null)
  const [dropOpen, setDropOpen] = useState(false)
  const [restoreBanner, setRestoreBanner] = useState(false)
  const [savedData, setSavedData] = useState<Record<string, unknown> | null>(null)

  useEffect(() => {
    const key = AUTOSAVE_KEY(autoId)
    const raw = localStorage.getItem(key)
    if (!raw) return
    try {
      const parsed = JSON.parse(raw) as { savedAt: number; data: Record<string, unknown> }
      if (Date.now() - parsed.savedAt < 24 * 60 * 60 * 1000) {
        setSavedData(parsed.data); setRestoreBanner(true)
      } else { localStorage.removeItem(key) }
    } catch { localStorage.removeItem(key) }
  }, [autoId])

  const autosaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const doAutosave = useCallback(() => {
    if (autosaveTimer.current) clearTimeout(autosaveTimer.current)
    autosaveTimer.current = setTimeout(() => {
      const data = { title, slug, excerpt, content, status, scheduledAt, resourceType, category, pdfUrl, ctaText, readTime, coverImage, coverImageAlt, metaTitle, metaDescription }
      localStorage.setItem(AUTOSAVE_KEY(autoId), JSON.stringify({ savedAt: Date.now(), data }))
    }, 2000)
  }, [title, slug, excerpt, content, status, scheduledAt, resourceType, category, pdfUrl, ctaText, readTime, coverImage, coverImageAlt, metaTitle, metaDescription, autoId])
  useEffect(() => { doAutosave() }, [doAutosave])

  function restoreAutosave() {
    if (!savedData) return
    setTitle(savedData.title as string ?? '')
    setSlug(savedData.slug as string ?? '')
    setExcerpt(savedData.excerpt as string ?? '')
    setContent(savedData.content as string ?? '')
    setStatus(savedData.status as string ?? 'DRAFT')
    setScheduledAt(savedData.scheduledAt as string ?? '')
    setRestoreBanner(false)
    localStorage.removeItem(AUTOSAVE_KEY(autoId))
  }

  async function handleSave(action: 'draft' | 'schedule' | 'publish') {
    if (action === 'schedule') {
      if (!scheduledAt || new Date(scheduledAt) <= new Date()) {
        alert('Set a future date/time in the Schedule At field to schedule.')
        return
      }
    }
    setSaving(true)
    const finalStatus = action === 'draft' ? 'DRAFT' : 'PUBLISHED'
    const published_at =
      action === 'publish' ? new Date().toISOString() :
      action === 'schedule' ? new Date(scheduledAt).toISOString() :
      null
    const payload = {
      title, slug,
      excerpt: excerpt || null,
      content: content || null,
      status: finalStatus,
      published_at,
      resource_type: resourceType,
      category: category || null,
      pdf_url: pdfUrl || null,
      cta_text: ctaText || null,
      read_time_minutes: readTime ? Number(readTime) : null,
      cover_image: coverImage || null,
      cover_image_alt: coverImageAlt || null,
      meta_title: metaTitle || null,
      meta_description: metaDescription || null,
    }
    try {
      const url = isNew ? '/api/admin/lead-magnets' : `/api/admin/lead-magnets/${guide!.id}`
      const method = isNew ? 'POST' : 'PUT'
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      const data = await res.json()
      if (res.ok) {
        localStorage.removeItem(AUTOSAVE_KEY(autoId))
        setLastSavedAt(new Date())
        if (action !== 'draft') setStatus(finalStatus)
        if (isNew) router.push(`/admin/lead-magnets/${data.id}/edit`)
        else router.refresh()
      }
    } finally { setSaving(false) }
  }

  const inp = 'w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#002BFF]'
  const label = 'block text-sm font-medium text-gray-700 mb-1'

  const isScheduledPost = status === 'PUBLISHED' && !!scheduledAt && new Date(scheduledAt) > new Date()
  const badgeKey = isScheduledPost ? 'SCHEDULED' : status.toUpperCase()
  const statusBadge = STATUS_BADGES[badgeKey] ?? STATUS_BADGES.DRAFT

  return (
    <div className="space-y-4">
      {/* Sticky header */}
      <div className="sticky top-0 z-30 flex items-center justify-between gap-4 rounded-xl border border-gray-200 bg-white/90 backdrop-blur px-5 py-3 shadow-sm">
        <div className="min-w-0 flex-1">
          <h1 className="truncate text-sm font-semibold text-gray-900">{title || 'Untitled guide'}</h1>
          <p className="mt-0.5 flex items-center gap-2 text-xs text-gray-400">
            <span className={`px-1.5 py-0.5 rounded font-medium ${statusBadge.className}`}>{statusBadge.label}</span>
            {isScheduledPost && <span>for {new Date(scheduledAt).toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short' })}</span>}
            {lastSavedAt && <span>· Saved {lastSavedAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <button onClick={() => router.push('/admin/lead-magnets')} className="px-3 py-2 text-sm text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100">
            Cancel
          </button>
          {slug && (
            <a href={`/guides/${slug}`} target="_blank" rel="noopener" className="px-3 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50">
              Preview
            </a>
          )}
          <div className="relative">
            <button
              onClick={() => setDropOpen(v => !v)}
              onBlur={() => setTimeout(() => setDropOpen(false), 150)}
              disabled={saving}
              className="flex items-center gap-1.5 px-4 py-2 bg-[#002BFF] text-white text-sm font-medium rounded-lg hover:bg-blue-700 disabled:opacity-60"
            >
              {saving ? 'Saving…' : 'Save'} <span className="text-xs opacity-80">▾</span>
            </button>
            {dropOpen && (
              <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden z-50 min-w-[140px]">
                <button onMouseDown={() => handleSave('draft')} className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50">Save Draft</button>
                <button onMouseDown={() => handleSave('schedule')} className="w-full text-left px-4 py-2.5 text-sm text-blue-600 hover:bg-blue-50">Schedule</button>
                <button onMouseDown={() => handleSave('publish')} className="w-full text-left px-4 py-2.5 text-sm text-[#002BFF] font-medium hover:bg-blue-50">Publish</button>
              </div>
            )}
          </div>
        </div>
      </div>

      {restoreBanner && (
        <div className="flex items-center gap-4 bg-yellow-50 border border-yellow-200 rounded-lg px-4 py-3">
          <p className="text-sm text-yellow-800 flex-1">You have unsaved changes from a previous session.</p>
          <button onClick={restoreAutosave} className="text-sm font-medium text-yellow-800 hover:underline">Restore</button>
          <button onClick={() => { setRestoreBanner(false); localStorage.removeItem(AUTOSAVE_KEY(autoId)) }} className="text-sm text-yellow-600 hover:underline">Dismiss</button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Content column */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-4">
            <div>
              <label className={label}>Title</label>
              <input className={inp} value={title} onChange={e => { setTitle(e.target.value); if (!guide?.slug) setSlug(slugify(e.target.value)) }} placeholder="Guide title…" />
            </div>
            <div>
              <label className={label}>Slug</label>
              <input className={inp} value={slug} onChange={e => setSlug(e.target.value)} placeholder="guide-slug" />
            </div>
            <div>
              <label className={label}>Excerpt</label>
              <textarea className={inp} rows={3} value={excerpt} onChange={e => setExcerpt(e.target.value)} placeholder="Short description…" />
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <label className={label}>Content</label>
            <RichTextEditor content={content} onChange={setContent} placeholder="Write the guide content…" />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-4">
            <div>
              <label className={label}>Status</label>
              <select className={inp} value={status} onChange={e => setStatus(e.target.value)}>
                <option value="DRAFT">Draft</option>
                <option value="SCHEDULED">Scheduled</option>
                <option value="PUBLISHED">Published</option>
              </select>
            </div>
            <div>
              <label className={label}>Schedule At</label>
              <input type="datetime-local" className={inp} value={scheduledAt} onChange={e => setScheduledAt(e.target.value)} />
              <p className="mt-1 text-xs text-gray-400">Set a future date and click Schedule — post stays hidden until then.</p>
            </div>
            <div>
              <label className={label}>Resource Type</label>
              <select className={inp} value={resourceType} onChange={e => setResourceType(e.target.value)}>
                {RESOURCE_TYPES.map(t => <option key={t} value={t} className="capitalize">{t}</option>)}
              </select>
            </div>
            <div>
              <label className={label}>Category</label>
              <input className={inp} value={category} onChange={e => setCategory(e.target.value)} placeholder="devops" />
            </div>
            <div>
              <label className={label}>Read Time (min)</label>
              <input type="number" className={inp} value={readTime} onChange={e => setReadTime(e.target.value)} placeholder="5" />
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-4">
            <div>
              <label className={label}>PDF URL</label>
              <input className={inp} value={pdfUrl} onChange={e => setPdfUrl(e.target.value)} placeholder="https://…/guide.pdf" />
            </div>
            <div>
              <label className={label}>CTA Text</label>
              <input className={inp} value={ctaText} onChange={e => setCtaText(e.target.value)} />
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-4">
            <ImageUploadField label="Cover Image" value={coverImage} onChange={setCoverImage} />
            {coverImage && <img src={coverImage} alt="Cover" className="w-full h-24 object-cover rounded-lg" />}
            <div>
              <label className={label}>Cover Image Alt</label>
              <input className={inp} value={coverImageAlt} onChange={e => setCoverImageAlt(e.target.value)} />
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-4">
            <div>
              <label className={label}>Meta Title <span className="text-gray-400 font-normal">({metaTitle.length}/60)</span></label>
              <input className={inp} maxLength={60} value={metaTitle} onChange={e => setMetaTitle(e.target.value)} />
            </div>
            <div>
              <label className={label}>Meta Description <span className="text-gray-400 font-normal">({metaDescription.length}/160)</span></label>
              <textarea className={inp} maxLength={160} rows={3} value={metaDescription} onChange={e => setMetaDescription(e.target.value)} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
