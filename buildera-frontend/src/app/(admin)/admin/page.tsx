import { redirect } from 'next/navigation'
import { verifySession } from '@/backend/auth/session'
import { getDashboardStats, getTopContent } from '@/db/admin/dashboard'

const SOURCE_LABELS: Record<string, string> = {
  CONTACT_FORM: 'Contact Form', ASSESSMENT_FORM: 'Assessment', BOOKING_FORM: 'Booking',
  BLOG_SIDEBAR: 'Blog Sidebar', BLOG_INLINE_50: 'Blog 50%', BLOG_INLINE_100: 'Blog 100%',
  CASE_STUDY: 'Case Study', LEAD_MAGNET: 'Lead Magnet', POPUP: 'Popup',
  NEWSLETTER: 'Newsletter', NUDGE: 'Nudge', MANUAL: 'Manual', FEEDBACK: 'Feedback',
}
const SOURCE_COLORS: Record<string, string> = {
  CONTACT_FORM: 'bg-blue-100 text-blue-700', ASSESSMENT_FORM: 'bg-purple-100 text-purple-700',
  BOOKING_FORM: 'bg-indigo-100 text-indigo-700', POPUP: 'bg-orange-100 text-orange-700',
  NEWSLETTER: 'bg-green-100 text-green-700', MANUAL: 'bg-gray-100 text-gray-700',
}
const STATUS_COLORS: Record<string, string> = {
  NEW: 'bg-blue-100 text-blue-700', CONTACTED: 'bg-yellow-100 text-yellow-700',
  MEETING_SCHEDULED: 'bg-purple-100 text-purple-700', CONVERTED: 'bg-green-100 text-green-700',
  CLOSED: 'bg-gray-100 text-gray-700', LOST: 'bg-red-100 text-red-700', JUNK: 'bg-gray-100 text-gray-400',
}

export default async function AdminDashboard() {
  const session = await verifySession()
  if (!session) redirect('/admin/login')

  const [stats, topContent] = await Promise.all([
    getDashboardStats().catch(() => null),
    getTopContent().catch(() => []),
  ])

  if (!stats) {
    return (
      <div className="text-center py-20 text-gray-500">
        <p className="text-lg font-medium">Database not connected</p>
        <p className="text-sm mt-2">Run <code className="bg-gray-100 px-1 rounded">node scripts/db-migrate.mjs</code> to set up the database.</p>
      </div>
    )
  }

  const funnelStatuses = ['NEW','CONTACTED','MEETING_SCHEDULED','CONVERTED','CLOSED','LOST','JUNK']
  const funnelTotal = stats.funnelData.reduce((s, r) => s + r.count, 0) || 1
  const funnelMap = Object.fromEntries(stats.funnelData.map(r => [r.status, r.count]))
  const sourceMax = Math.max(...stats.sourceBreakdown.map(s => s.count), 1)

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>

      {/* Stats cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Leads Today', value: stats.leadsToday },
          { label: 'Leads This Week', value: stats.leadsWeek },
          { label: 'Leads This Month', value: stats.leadsMonth },
          { label: 'Unread Leads', value: stats.unreadLeads, highlight: stats.unreadLeads > 0 },
          { label: 'Follow-up Due', value: stats.followUpDue, highlight: stats.followUpDue > 0 },
        ].map(card => (
          <div key={card.label} className={`bg-white rounded-xl border p-4 ${card.highlight ? 'border-red-200' : 'border-gray-200'}`}>
            <p className="text-sm text-gray-500">{card.label}</p>
            <p className={`text-3xl font-bold mt-1 ${card.highlight ? 'text-red-600' : 'text-gray-900'}`}>{card.value}</p>
          </div>
        ))}
      </div>

      {/* Content counts */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Published Blog Posts', value: stats.pubBlog },
          { label: 'Published Case Studies', value: stats.pubCaseStudies },
          { label: 'Published Guides', value: stats.pubGuides },
          { label: 'Testimonials', value: stats.testimonials },
        ].map(card => (
          <div key={card.label} className="bg-white rounded-xl border border-gray-200 p-4">
            <p className="text-sm text-gray-500">{card.label}</p>
            <p className="text-3xl font-bold mt-1 text-gray-900">{card.value}</p>
          </div>
        ))}
      </div>

      {/* Recent leads + source breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="px-5 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-900">Recent Leads</h2>
          </div>
          <div className="divide-y divide-gray-50">
            {stats.recentLeads.length === 0 && (
              <p className="text-sm text-gray-400 px-5 py-6 text-center">No leads yet</p>
            )}
            {stats.recentLeads.map(lead => (
              <div key={lead.id} className="flex items-center justify-between px-5 py-3 hover:bg-gray-50">
                <div>
                  <p className="text-sm font-medium text-gray-900">{lead.name}</p>
                  <p className="text-xs text-gray-400">{lead.company ?? lead.email}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${SOURCE_COLORS[lead.source] ?? 'bg-gray-100 text-gray-600'}`}>
                    {SOURCE_LABELS[lead.source] ?? lead.source}
                  </span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_COLORS[lead.status] ?? 'bg-gray-100 text-gray-600'}`}>
                    {lead.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200">
          <div className="px-5 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-900">Lead Sources (30 days)</h2>
          </div>
          <div className="px-5 py-4 space-y-3">
            {stats.sourceBreakdown.length === 0 && (
              <p className="text-sm text-gray-400 text-center py-4">No data</p>
            )}
            {stats.sourceBreakdown.map(s => (
              <div key={s.source}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">{SOURCE_LABELS[s.source] ?? s.source}</span>
                  <span className="font-medium text-gray-900">{s.count}</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#002BFF] rounded-full"
                    style={{ width: `${(s.count / sourceMax) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Funnel */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="px-5 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-900">Lead Funnel</h2>
        </div>
        <div className="px-5 py-4 space-y-2">
          {funnelStatuses.map(status => {
            const count = funnelMap[status] ?? 0
            const pct = Math.round((count / funnelTotal) * 100)
            return (
              <div key={status} className="flex items-center gap-4">
                <span className="w-40 text-sm text-gray-600 capitalize">{status.replace('_', ' ')}</span>
                <div className="flex-1 h-6 bg-gray-100 rounded overflow-hidden">
                  <div
                    className={`h-full rounded transition-all ${STATUS_COLORS[status]?.split(' ')[0] ?? 'bg-gray-200'}`}
                    style={{ width: `${pct}%`, minWidth: count > 0 ? '2px' : '0' }}
                  />
                </div>
                <span className="w-8 text-sm font-medium text-gray-700 text-right">{count}</span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Top content */}
      {topContent.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="px-5 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-900">Top Content by Views</h2>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-5 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Title</th>
                <th className="px-5 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Type</th>
                <th className="px-5 py-2.5 text-right text-xs font-semibold text-gray-500 uppercase tracking-wide">Views</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {topContent.map((c, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="px-5 py-3 text-gray-900 truncate max-w-xs">{c.title}</td>
                  <td className="px-5 py-3 text-gray-500 capitalize">{c.type.replace('_', ' ')}</td>
                  <td className="px-5 py-3 text-right font-medium text-gray-900">{c.view_count.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
