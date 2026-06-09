import { queryOne, query } from '@/db/pool'

interface CountRow { count: number }
interface StatusCountRow { status: string; count: number }
interface SourceCountRow { source: string; count: number }
interface ContentRow { title: string; type: string; view_count: number }
interface LeadRow {
  id: number; name: string; email: string; company: string | null
  source: string; status: string; created_at: string
}

export async function getDashboardStats() {
  const today = new Date(); today.setHours(0,0,0,0)
  const weekAgo = new Date(Date.now() - 7 * 86400000)
  const monthAgo = new Date(Date.now() - 30 * 86400000)

  const [
    leadsToday, leadsWeek, leadsMonth, unreadLeads, followUpDue,
    pubBlog, pubCaseStudies, pubGuides, testimonials,
    recentLeads, sourceBreakdown, funnelData,
  ] = await Promise.all([
    queryOne<CountRow>('SELECT COUNT(*) as count FROM leads WHERE created_at >= ?', [today]),
    queryOne<CountRow>('SELECT COUNT(*) as count FROM leads WHERE created_at >= ?', [weekAgo]),
    queryOne<CountRow>('SELECT COUNT(*) as count FROM leads WHERE created_at >= ?', [monthAgo]),
    // is_read was added; status values may be lowercase in DB
    queryOne<CountRow>('SELECT COUNT(*) as count FROM leads WHERE is_read = 0'),
    queryOne<CountRow>(`SELECT COUNT(*) as count FROM leads WHERE follow_up_date <= CURDATE() AND status NOT IN ('converted','closed','lost','junk','CONVERTED','CLOSED','LOST','JUNK')`),
    queryOne<CountRow>(`SELECT COUNT(*) as count FROM blog_posts WHERE status = 'published' OR is_published = 1`),
    queryOne<CountRow>(`SELECT COUNT(*) as count FROM case_studies WHERE is_published = 1`),
    queryOne<CountRow>(`SELECT COUNT(*) as count FROM lead_magnets WHERE status = 'PUBLISHED'`),
    queryOne<CountRow>('SELECT COUNT(*) as count FROM testimonials WHERE is_published = 1'),
    query<LeadRow>('SELECT id, name, email, company, COALESCE(source_form, source_page, "CONTACT_FORM") as source, status, created_at FROM leads ORDER BY created_at DESC LIMIT 5'),
    query<SourceCountRow>('SELECT COALESCE(source_form, "CONTACT_FORM") as source, COUNT(*) as count FROM leads WHERE created_at >= ? GROUP BY source_form ORDER BY count DESC', [monthAgo]),
    query<StatusCountRow>('SELECT status, COUNT(*) as count FROM leads GROUP BY status'),
  ])

  return {
    leadsToday: leadsToday?.count ?? 0,
    leadsWeek: leadsWeek?.count ?? 0,
    leadsMonth: leadsMonth?.count ?? 0,
    unreadLeads: unreadLeads?.count ?? 0,
    followUpDue: followUpDue?.count ?? 0,
    pubBlog: pubBlog?.count ?? 0,
    pubCaseStudies: pubCaseStudies?.count ?? 0,
    pubGuides: pubGuides?.count ?? 0,
    testimonials: testimonials?.count ?? 0,
    recentLeads,
    sourceBreakdown,
    funnelData,
  }
}

export async function getTopContent(): Promise<ContentRow[]> {
  const blog = await query<ContentRow>(
    `SELECT title, 'blog' as type, views as view_count FROM blog_posts WHERE status = 'published' OR is_published = 1 ORDER BY views DESC LIMIT 5`
  )
  const cs = await query<ContentRow>(
    `SELECT title, 'case_study' as type, view_count FROM case_studies WHERE is_published = 1 ORDER BY view_count DESC LIMIT 5`
  )
  return [...blog, ...cs].sort((a, b) => b.view_count - a.view_count).slice(0, 5)
}
