import { NextResponse } from 'next/server'
import { listCategories } from '@/db/admin/categories'

export async function GET() {
  const cats = await listCategories().catch(() => [])
  return NextResponse.json(cats, { headers: { 'Cache-Control': 's-maxage=86400, stale-while-revalidate=86400' } })
}
