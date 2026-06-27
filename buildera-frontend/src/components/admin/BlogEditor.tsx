'use client'

import { useState, useEffect, useCallback, useRef, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import type { BlogPost } from '@/db/admin/blog'
import type { Category } from '@/db/admin/categories'
import { RichTextEditor } from './RichTextEditor'
import { ImageUploadField } from './ImageUploadField'

interface Author { id: number; name: string; job_title: string | null }
interface Props {
  post?: BlogPost
  categories: Category[]
  authors: Author[]
}

const SERVICE_TYPES = ['Website Development','Salesforce Development','DevOps','AI Agent Development','Software Development','Hire a Developer']
const INDUSTRIES = ['Healthcare','Finance','Retail','Manufacturing','Education','Real Estate','Logistics','Technology','Other']

const STATUS_BADGES: Record<string, { label: string; className: string }> = {
  DRAFT: { label: 'Draft', className: 'bg-gray-100 text-gray-600' },
  SUBMITTED: { label: 'Submitted', className: 'bg-amber-100 text-amber-700' },
  PUBLISHED: { label: 'Published', className: 'bg-green-100 text-green-700' },
  SCHEDULED: { label: 'Scheduled', className: 'bg-blue-100 text-blue-700' },
}

function formatSavedTime(date: Date) {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

function slugify(t: string) { return t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') }

function toDatetimeLocal(value: string): string {
  const d = new Date(value)
  if (isNaN(d.getTime())) return ''
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`
}

const AUTOSAVE_KEY = (id: string) => `autosave_blog_${id}`

export function BlogEditor({ post, categories, authors }: Props) {
  const router = useRouter()
  const isNew = !post?.id
  const autoId = post?.id ? String(post.id) : 'new'

  const [title, setTitle] = useState(post?.title ?? '')
  const [slug, setSlug] = useState(post?.slug ?? '')
  const [excerpt, setExcerpt] = useState(post?.excerpt ?? '')
  const [content, setContent] = useState(post?.content ?? '')
  const [status, setStatus] = useState<string>(post?.status ?? 'DRAFT')
  const [authorId, setAuthorId] = useState<string>(post?.author_id ? String(post.author_id) : '')
  const [categoryId, setCategoryId] = useState<string>(() => {
    if (!post?.category) return ''
    const match = categories.find(c => c.name === post.category)
    return match ? String(match.id) : ''
  })
  const [serviceType, setServiceType] = useState(post?.service_type ?? '')
  const [industry, setIndustry] = useState(post?.industry ?? '')
  const [isFeatured, setIsFeatured] = useState(Boolean(post?.is_featured))
  const [coverImage, setCoverImage] = useState(post?.cover_image ?? '')
  const [coverImageAlt, setCoverImageAlt] = useState(post?.cover_image_alt ?? '')
  const [metaTitle, setMetaTitle] = useState(post?.meta_title ?? '')
  const [metaDescription, setMetaDescription] = useState(post?.meta_description ?? '')
  const [publishedAt, setPublishedAt] = useState(post?.published_at ? toDatetimeLocal(post.published_at) : '')
  const [saving, setSaving] = useState(false)
  const [dropOpen, setDropOpen] = useState(false)
  const [restoreBanner, setRestoreBanner] = useState(false)
  const [savedData, setSavedData] = useState<Record<string, unknown> | null>(null)
  const [lastSavedAt, setLastSavedAt] = useState<Date | null>(null)

  const wordCount = useMemo(
    () => content.replace(/<[^>]*>/g, ' ').split(/\s+/).filter(Boolean).length,
    [content]
  )

  // Autosave check on mount
  useEffect(() => {
    const key = AUTOSAVE_KEY(autoId)
    const raw = localStorage.getItem(key)
    if (!raw) return
    try {
      const parsed = JSON.parse(raw) as { savedAt: number; data: Record<string, unknown> }
      if (Date.now() - parsed.savedAt < 24 * 60 * 60 * 1000) {
        setSavedData(parsed.data)
        setRestoreBanner(true)
      } else {
        localStorage.removeItem(key)
      }
    } catch { localStorage.removeItem(key) }
  }, [autoId])

  // Autosave
  const autosaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const doAutosave = useCallback(() => {
    if (autosaveTimer.current) clearTimeout(autosaveTimer.current)
    autosaveTimer.current = setTimeout(() => {
      const data = { title, slug, excerpt, content, status, authorId, categoryId, serviceType, industry, isFeatured, coverImage, coverImageAlt, metaTitle, metaDescription, publishedAt }
      localStorage.setItem(AUTOSAVE_KEY(autoId), JSON.stringify({ savedAt: Date.now(), data }))
    }, 2000)
  }, [title, slug, excerpt, content, status, authorId, categoryId, serviceType, industry, isFeatured, coverImage, coverImageAlt, metaTitle, metaDescription, publishedAt, autoId])

  useEffect(() => { doAutosave() }, [doAutosave])

  function restoreAutosave() {
    if (!savedData) return
    setTitle(savedData.title as string ?? '')
    setSlug(savedData.slug as string ?? '')
    setExcerpt(savedData.excerpt as string ?? '')
    setContent(savedData.content as string ?? '')
    setStatus(savedData.status as string ?? 'DRAFT')
    setAuthorId(savedData.authorId as string ?? '')
    setCategoryId(savedData.categoryId as string ?? '')
    setPublishedAt(savedData.publishedAt as string ?? '')
    setRestoreBanner(false)
    localStorage.removeItem(AUTOSAVE_KEY(autoId))
  }

  async function handleSave(action: 'draft' | 'schedule' | 'publish') {
    if (action === 'schedule') {
      if (!publishedAt || new Date(publishedAt) <= new Date()) {
        alert('Set a future date/time in the Publish Date field to schedule.')
        return
      }
    }
    setSaving(true)
    const finalStatus = action === 'draft' ? 'DRAFT' : 'PUBLISHED'
    const published_at =
      action === 'publish' ? new Date().toISOString() :
      action === 'schedule' ? new Date(publishedAt).toISOString() :
      publishedAt ? new Date(publishedAt).toISOString() : null
    const payload = {
      title, slug, excerpt, content, status: finalStatus,
      author_id: authorId ? Number(authorId) : null,
      category: categoryId ? (categories.find(c => c.id === Number(categoryId))?.name ?? null) : null,
      service_type: serviceType || null, industry: industry || null,
      is_featured: isFeatured ? 1 : 0,
      cover_image: coverImage || null, cover_image_alt: coverImageAlt || null,
      meta_title: metaTitle || null, meta_description: metaDescription || null,
      published_at,
    }
    try {
      const url = isNew ? '/api/admin/blog' : `/api/admin/blog/${post!.id}`
      const method = isNew ? 'POST' : 'PUT'
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      const text = await res.text()
      const data = text ? JSON.parse(text) : {}
      if (res.ok) {
        localStorage.removeItem(AUTOSAVE_KEY(autoId))
        setLastSavedAt(new Date())
        if (isNew) router.push(`/admin/blog/${data.id}/edit`)
        else router.refresh()
      } else {
        alert(`Save failed: ${data.error ?? res.statusText}`)
      }
    } catch (err) {
      alert(`Save failed: ${err instanceof Error ? err.message : 'Unknown error'}`)
    } finally { setSaving(false) }
  }

  const inp = 'w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#002BFF]'
  const label = 'block text-sm font-medium text-gray-700 mb-1'

  const statusKey = status.toUpperCase()
  const isScheduled = statusKey === 'PUBLISHED' && !!publishedAt && new Date(publishedAt) > new Date()
  const statusBadge = isScheduled ? STATUS_BADGES.SCHEDULED : (STATUS_BADGES[statusKey] ?? STATUS_BADGES.DRAFT)

  return (
    <div className="space-y-4">
      <div className="sticky top-0 z-30 flex items-center justify-between gap-4 rounded-xl border border-gray-200 bg-white/90 backdrop-blur px-5 py-3 shadow-sm">
        <div className="min-w-0 flex-1">
          <h1 className="truncate text-sm font-semibold text-gray-900">{title || 'Untitled post'}</h1>
          <p className="mt-0.5 flex items-center gap-2 text-xs text-gray-400">
            <span className={`px-1.5 py-0.5 rounded font-medium ${statusBadge.className}`}>{statusBadge.label}</span>
            {isScheduled && <span>for {new Date(publishedAt).toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short' })}</span>}
            <span>{wordCount} words</span>
            {lastSavedAt && <span>· Saved {formatSavedTime(lastSavedAt)}</span>}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <button onClick={() => router.push('/admin/blog')} className="px-3 py-2 text-sm text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100">
            Cancel
          </button>
          {slug && (
            <a href={`/blog/${slug}`} target="_blank" rel="noopener" className="px-3 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50">
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
        {/* Editor column */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-4">
            <div>
              <label className={label}>Title</label>
              <input className={inp} value={title} onChange={e => { setTitle(e.target.value); if (!post?.slug) setSlug(slugify(e.target.value)) }} placeholder="Post title…" />
            </div>
            <div>
              <label className={label}>Slug</label>
              <input className={inp} value={slug} onChange={e => setSlug(e.target.value)} placeholder="post-slug" />
            </div>
            <div>
              <label className={label}>Excerpt</label>
              <textarea className={inp} rows={3} value={excerpt} onChange={e => setExcerpt(e.target.value)} placeholder="Short description…" />
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <label className={label}>Content</label>
            <RichTextEditor content={content} onChange={setContent} placeholder="Write your content here…" />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-4">
            <div>
              <label className={label}>Status</label>
              <select className={inp} value={status} onChange={e => setStatus(e.target.value)}>
                <option value="DRAFT">Draft</option>
                <option value="SUBMITTED">Submitted</option>
                <option value="PUBLISHED">Published</option>
                <option value="SCHEDULED">Scheduled</option>
              </select>
            </div>
            <div>
              <label className={label}>Schedule At</label>
              <input type="datetime-local" className={inp} value={publishedAt} onChange={e => setPublishedAt(e.target.value)} />
              <p className="mt-1 text-xs text-gray-400">Set a future date and click Schedule — post stays hidden until then.</p>
            </div>
            <div>
              <label className={label}>Author</label>
              <select className={inp} value={authorId} onChange={e => setAuthorId(e.target.value)}>
                <option value="">— Select author —</option>
                {authors.map(a => <option key={a.id} value={a.id}>{a.name}{a.job_title ? ` — ${a.job_title}` : ''}</option>)}
              </select>
            </div>
            <div>
              <label className={label}>Category</label>
              <select className={inp} value={categoryId} onChange={e => setCategoryId(e.target.value)}>
                <option value="">— Select category —</option>
                {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <label className={label}>Service Type</label>
              <select className={inp} value={serviceType} onChange={e => setServiceType(e.target.value)}>
                <option value="">— Select —</option>
                {SERVICE_TYPES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className={label}>Industry</label>
              <select className={inp} value={industry} onChange={e => setIndustry(e.target.value)}>
                <option value="">— Select —</option>
                {INDUSTRIES.map(i => <option key={i} value={i}>{i}</option>)}
              </select>
            </div>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={isFeatured} onChange={e => setIsFeatured(e.target.checked)} className="w-4 h-4 rounded accent-[#002BFF]" />
              <span className="text-gray-700">Featured post</span>
            </label>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-4">
            <ImageUploadField label="Cover Image" value={coverImage} onChange={setCoverImage} placeholder="/uploads/..." />
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
