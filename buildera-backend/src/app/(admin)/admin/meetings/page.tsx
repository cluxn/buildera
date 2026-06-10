import { redirect } from 'next/navigation'
import { verifySession } from '@/backend/auth/session'
import { listLeads } from '@/db/admin/leads'
import Link from 'next/link'

const ROLE_LEADS = ['SUPER_ADMIN','ADMIN','MARKETING_MANAGER']

export default async function MeetingsPage() {
  const session = await verifySession()
  if (!session) redirect('/admin/login')
  if (!ROLE_LEADS.includes(session.role)) redirect('/admin')

  const { rows } = await listLeads({ status: 'meeting_scheduled', perPage: 100 }).catch(() => ({ rows: [] }))

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold text-gray-900">Meetings Scheduled</h1>
      <div className="bg-white rounded-xl border border-gray-200">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Name</th>
              <th className="px-4 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide hidden md:table-cell">Company</th>
              <th className="px-4 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide hidden md:table-cell">Source</th>
              <th className="px-4 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Follow-up</th>
              <th className="px-4 py-2.5 text-right text-xs font-semibold text-gray-500 uppercase tracking-wide">Lead</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {rows.length === 0 && (
              <tr><td colSpan={5} className="px-4 py-10 text-center text-gray-400">No meetings scheduled</td></tr>
            )}
            {rows.map(row => (
              <tr key={row.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <p className="font-medium text-gray-900">{row.name}</p>
                  <p className="text-xs text-gray-400">{row.email}</p>
                </td>
                <td className="px-4 py-3 text-gray-500 hidden md:table-cell">{row.company ?? '—'}</td>
                <td className="px-4 py-3 text-gray-500 hidden md:table-cell">{row.source}</td>
                <td className="px-4 py-3 text-gray-500">{row.follow_up_date ?? '—'}</td>
                <td className="px-4 py-3 text-right">
                  <Link href={`/admin/leads?q=${row.email}`} className="text-xs text-primary hover:underline">View</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
