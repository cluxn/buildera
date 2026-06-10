'use client'

import { useState } from 'react'

interface Props { settings: Record<string, string> }

const TABS = ['General', 'Social', 'Email (SMTP)', 'Appearance', 'Cookie Consent'] as const
type Tab = (typeof TABS)[number]

export function SettingsForm({ settings: initial }: Props) {
  const [tab, setTab] = useState<Tab>('General')
  const [values, setValues] = useState<Record<string, string>>(initial)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [showSmtpPass, setShowSmtpPass] = useState(false)

  function set(key: string, value: string) { setValues(v => ({ ...v, [key]: value })) }

  async function save(keys: string[]) {
    setSaving(true); setSaved(false)
    const payload = Object.fromEntries(keys.map(k => [k, values[k] ?? '']))
    try {
      await fetch('/api/admin/settings', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      setSaved(true); setTimeout(() => setSaved(false), 2000)
    } finally { setSaving(false) }
  }

  const inp = 'w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#002BFF] focus:border-transparent'
  const label = 'block text-sm font-medium text-gray-700 mb-1'
  const row = 'space-y-1'

  return (
    <div className="bg-white rounded-xl border border-gray-200">
      {/* Tabs */}
      <div className="flex border-b border-gray-200 overflow-x-auto">
        {TABS.map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-5 py-3 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${tab === t ? 'border-[#002BFF] text-[#002BFF]' : 'border-transparent text-gray-500 hover:text-gray-800'}`}>
            {t}
          </button>
        ))}
      </div>

      <div className="p-6 space-y-5">
        {tab === 'General' && (
          <>
            <div className={row}><label className={label}>WhatsApp Number</label><input className={inp} value={values.whatsapp_number ?? ''} onChange={e => set('whatsapp_number', e.target.value)} placeholder="+1234567890" /></div>
            <div className={row}><label className={label}>Calendly URL</label><input className={inp} value={values.calendly_url ?? ''} onChange={e => set('calendly_url', e.target.value)} placeholder="https://calendly.com/..." /></div>
            <div className={row}><label className={label}>Company Email</label><input className={inp} type="email" value={values.company_email ?? ''} onChange={e => set('company_email', e.target.value)} /></div>
            <div className={row}><label className={label}>Company Phone</label><input className={inp} value={values.company_phone ?? ''} onChange={e => set('company_phone', e.target.value)} /></div>
            <div className={row}><label className={label}>Company Address</label><input className={inp} value={values.company_address ?? ''} onChange={e => set('company_address', e.target.value)} /></div>
            <button onClick={() => save(['whatsapp_number','calendly_url','company_email','company_phone','company_address'])} disabled={saving} className="px-4 py-2 bg-[#002BFF] text-white text-sm font-medium rounded-lg hover:bg-blue-700 disabled:opacity-60">
              {saving ? 'Saving…' : saved ? 'Saved!' : 'Save General'}
            </button>
          </>
        )}

        {tab === 'Social' && (
          <>
            {[['linkedin_url','LinkedIn URL'],['twitter_url','Twitter/X URL'],['facebook_url','Facebook URL'],['instagram_url','Instagram URL'],['youtube_url','YouTube URL']].map(([k,l]) => (
              <div key={k} className={row}><label className={label}>{l}</label><input className={inp} value={values[k] ?? ''} onChange={e => set(k, e.target.value)} placeholder="https://..." /></div>
            ))}
            <button onClick={() => save(['linkedin_url','twitter_url','facebook_url','instagram_url','youtube_url'])} disabled={saving} className="px-4 py-2 bg-[#002BFF] text-white text-sm font-medium rounded-lg hover:bg-blue-700 disabled:opacity-60">
              {saving ? 'Saving…' : saved ? 'Saved!' : 'Save Social'}
            </button>
          </>
        )}

        {tab === 'Email (SMTP)' && (
          <>
            <div className={row}><label className={label}>SMTP Host</label><input className={inp} value={values.smtp_host ?? ''} onChange={e => set('smtp_host', e.target.value)} /></div>
            <div className={row}><label className={label}>Port</label><input className={inp} type="number" value={values.smtp_port ?? '587'} onChange={e => set('smtp_port', e.target.value)} /></div>
            <div className={row}><label className={label}>Username</label><input className={inp} value={values.smtp_user ?? ''} onChange={e => set('smtp_user', e.target.value)} /></div>
            <div className={row}><label className={label}>From Address</label><input className={inp} value={values.smtp_from ?? ''} onChange={e => set('smtp_from', e.target.value)} /></div>
            <div className={row}>
              <label className={label}>Password</label>
              <div className="relative">
                <input className={inp} type={showSmtpPass ? 'text' : 'password'} value={values.smtp_pass ?? ''} onChange={e => set('smtp_pass', e.target.value)} placeholder={values.smtp_pass ? '•••• saved' : 'Enter password'} />
                <button type="button" onClick={() => setShowSmtpPass(s => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">
                  {showSmtpPass ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>
            <button onClick={() => save(['smtp_host','smtp_port','smtp_user','smtp_from','smtp_pass'])} disabled={saving} className="px-4 py-2 bg-[#002BFF] text-white text-sm font-medium rounded-lg hover:bg-blue-700 disabled:opacity-60">
              {saving ? 'Saving…' : saved ? 'Saved!' : 'Save SMTP'}
            </button>
          </>
        )}

        {tab === 'Appearance' && (
          <>
            <div className={row}><label className={label}>Site Name</label><input className={inp} value={values.site_name ?? ''} onChange={e => set('site_name', e.target.value)} /></div>
            <div className={row}><label className={label}>Tagline</label><input className={inp} value={values.site_tagline ?? ''} onChange={e => set('site_tagline', e.target.value)} /></div>
            <div className={row}><label className={label}>Logo URL</label><input className={inp} value={values.logo_url ?? ''} onChange={e => set('logo_url', e.target.value)} placeholder="/uploads/logo.png" />
              {values.logo_url && <img src={values.logo_url} alt="Logo preview" className="mt-2 h-10 object-contain" />}
            </div>
            <div className={row}><label className={label}>Favicon URL</label><input className={inp} value={values.favicon_url ?? ''} onChange={e => set('favicon_url', e.target.value)} />
              {values.favicon_url && <img src={values.favicon_url} alt="Favicon preview" className="mt-2 h-8 object-contain" />}
            </div>
            <button onClick={() => save(['site_name','site_tagline','logo_url','favicon_url'])} disabled={saving} className="px-4 py-2 bg-[#002BFF] text-white text-sm font-medium rounded-lg hover:bg-blue-700 disabled:opacity-60">
              {saving ? 'Saving…' : saved ? 'Saved!' : 'Save Appearance'}
            </button>
          </>
        )}

        {tab === 'Cookie Consent' && (
          <>
            <div className={row}><label className={label}>Heading</label><input className={inp} value={values.cookie_consent_heading ?? ''} onChange={e => set('cookie_consent_heading', e.target.value)} /></div>
            <div className={row}><label className={label}>Body text</label><textarea className={inp} rows={3} value={values.cookie_consent_body ?? ''} onChange={e => set('cookie_consent_body', e.target.value)} /></div>
            {[['cookie_consent_analytics','Analytics consent'],['cookie_consent_marketing','Marketing consent'],['cookie_consent_preferences','Preferences consent']].map(([k,l]) => (
              <label key={k} className="flex items-center gap-3 text-sm">
                <input type="checkbox" checked={values[k] === '1'} onChange={e => set(k, e.target.checked ? '1' : '0')} className="w-4 h-4 rounded border-gray-300 accent-[#002BFF]" />
                <span className="text-gray-700">Enable {l}</span>
              </label>
            ))}
            <button onClick={() => save(['cookie_consent_heading','cookie_consent_body','cookie_consent_analytics','cookie_consent_marketing','cookie_consent_preferences'])} disabled={saving} className="px-4 py-2 bg-[#002BFF] text-white text-sm font-medium rounded-lg hover:bg-blue-700 disabled:opacity-60">
              {saving ? 'Saving…' : saved ? 'Saved!' : 'Save Cookie Settings'}
            </button>
          </>
        )}
      </div>
    </div>
  )
}
