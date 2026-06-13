// Run: node scripts/alter-blog-posts.mjs
// Adds missing columns to blog_posts table (Laravel-migrated DB lacks these)
import { createConnection } from 'mysql2/promise'

const dbUrl = process.argv[2] || process.env.DATABASE_URL
if (!dbUrl) {
  console.error('Usage: node scripts/alter-blog-posts.mjs <DATABASE_URL>')
  console.error('   or: DATABASE_URL=mysql://... node scripts/alter-blog-posts.mjs')
  process.exit(1)
}

const parsed = new URL(dbUrl)
const conn = await createConnection({
  host: parsed.hostname,
  port: Number(parsed.port) || 3306,
  user: parsed.username,
  password: parsed.password,
  database: parsed.pathname.replace(/^\//, ''),
})

const alters = [
  // Add columns that exist in code but not in original Laravel schema
  `ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS category VARCHAR(255) DEFAULT NULL`,
  `ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS service_type VARCHAR(100) DEFAULT NULL`,
  `ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS industry VARCHAR(100) DEFAULT NULL`,
  `ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS status VARCHAR(50) NOT NULL DEFAULT 'draft'`,
  `ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS is_featured TINYINT(1) NOT NULL DEFAULT 0`,
  // Sync status from is_published for existing rows
  `UPDATE blog_posts SET status = 'published' WHERE is_published = 1 AND status = 'draft'`,
]

for (const sql of alters) {
  try {
    await conn.execute(sql)
    console.log(`OK: ${sql.slice(0, 80)}...`)
  } catch (err) {
    console.warn(`SKIP: ${err.message.slice(0, 120)}`)
  }
}

console.log('Done.')
await conn.end()
