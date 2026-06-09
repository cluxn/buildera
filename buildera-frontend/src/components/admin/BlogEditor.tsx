'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useRouter } from 'next/navigation'
import type { BlogPost } from '@/db/admin/blog'
import type { Category } from '@/db/admin/categories'

interface User { id: number; name: string; email: string; role: string }
interface Props {
  post?: BlogPost
  categories: Category[]
  users: User[]
}

const SERVICE_TYPES = ['Website Development','Salesforce Development','DevOps','AI Agent Development','Software Development','Hire a Developer']
const INDUSTRIES = ['Healthcare','Finance','Retail','Manufacturing','Education','Real Estate','Logistics','Technology','Other']

function slugify(t: string) { return t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') }

const AUTOSAVE_KEY = (id: string) => `autosave_blog_${id}`

export function BlogEditor({ post, categories, users }: Props) {
  const router = useRouter()
  const isNew = !post?.id
  const autoId = post?.id ? String(post.id) : 'new'

  const [title, setTitle] = useState(post?.title ?? '')
  const [slug, setSlug] = useState(post?.slug ?? '')
  const [excerpt, setExcerpt] = useState(post?.excerpt ?? '')
  const [content, setContent] = useState(post?.content ?? '')
  const [status, setStatus] = useState<string>(post?.status ?? 'DRAFT')
  const [authorId, setAuthorId] = useState<string>(post?.author_id ? String(post.author_id) : '')
  const [categoryId, setCategoryId] = useState<string>(post?.category_id ? String(post.category_id) : '')
  const [serviceType, setServiceType] = useState(post?.service_type ?? '')
  const [industry, setIndustry] = useState(post?.industry ?? '')
  const [isFeatured, setIsFeatured] = useState(Boolean(post?.is_featured))
  const [coverImage, setCoverImage] = useState(post?.cover_image ?? '')
  const [coverImageAlt, setCoverImageAlt] = useState(post?.cover_image_alt ?? '')
  const [metaTitle, setMetaTitle] = useState(post?.meta_title ?? '')
  const [metaDescription, setMetaDescription] = useState(post?.meta_description ?? '')
  const [saving, setSaving] = useState(false)
  const [restoreBanner, setRestoreBanner] = useState(false)
  const [savedData, setSavedData] = useState<Record<string, unknown> | null>(null)

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
      const data = { title, slug, excerpt, content, status, authorId, categoryId, serviceType, industry, isFeatured, coverImage, coverImageAlt, metaTitle, metaDescription }
      localStorage.setItem(AUTOSAVE_KEY(autoId), JSON.stringify({ savedAt: Date.now(), data }))
    }, 2000)
  }, [title, slug, excerpt, content, status, authorId, categoryId, serviceType, industry, isFeatured, coverImage, coverImageAlt, metaTitle, metaDescription, autoId])

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
    setRestoreBanner(false)
    localStorage.removeItem(AUTOSAVE_KEY(autoId))
  }

  async function handleSave(publishStatus?: string) {
    setSaving(true)
    const payload = {
      title, slug, excerpt, content, status: publishStatus ?? status,
      author_id: authorId ? Number(authorId) : null,
      category_id: categoryId ? Number(categoryId) : null,
      service_type: serviceType || null, industry: industry || null,
      is_featured: isFeatured ? 1 : 0,
      cover_image: coverImage || null, cover_image_alt: coverImageAlt || null,
      meta_title: metaTitle || null, meta_description: metaDescription || null,
    }
    try {
      const url = isNew ? '/api/admin/blog' : `/api/admin/blog/${post!.id}`
      const method = isNew ? 'POST' : 'PUT'
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      const data = await res.json()
      if (res.ok) {
        localStorage.removeItem(AUTOSAVE_KEY(autoId))
        if (isNew) router.push(`/admin/blog/${data.id}/edit`)
        else router.refresh()
      }
    } finally { setSaving(false) }
  }

  const inp = 'w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#002BFF]'
  const label = 'block text-sm font-medium text-gray-700 mb-1'

  return (
    <div className="space-y-4">
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
            <textarea
              className={`${inp} font-mono text-xs`}
              rows={20}
              value={content}
              onChange={e => setContent(e.target.value)}
              placeholder="Write your content here (HTML supported)…"
            />
            <p className="mt-2 text-xs text-gray-400 text-right">{content.split(/\s+/).filter(Boolean).length} words</p>
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
              </select>
            </div>
            <div>
              <label className={label}>Author</label>
              <select className={inp} value={authorId} onChange={e => setAuthorId(e.target.value)}>
                <option value="">— Select author —</option>
                {users.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
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
            <div>
              <label className={label}>Cover Image URL</label>
              <input className={inp} value={coverImage} onChange={e => setCoverImage(e.target.value)} placeholder="/uploads/..." />
              {coverImage && <img src={coverImage} alt="Cover" className="mt-2 w-full h-24 object-cover rounded-lg" />}
            </div>
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

          <div className="flex gap-3">
            <button onClick={() => handleSave('DRAFT')} disabled={saving} className="flex-1 py-2.5 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 disabled:opacity-60">
              Save Draft
            </button>
            <button onClick={() => handleSave('PUBLISHED')} disabled={saving} className="flex-1 py-2.5 bg-[#002BFF] text-white text-sm font-medium rounded-lg hover:bg-blue-700 disabled:opacity-60">
              {saving ? 'Saving…' : 'Publish'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
