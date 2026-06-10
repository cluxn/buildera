// Run: node scripts/setup-site-settings.mjs
// Requires: DATABASE_URL env var (or pass as first arg)
import { createConnection } from 'mysql2/promise'

const dbUrl = process.argv[2] || process.env.DATABASE_URL
if (!dbUrl) {
  console.error('Usage: node scripts/setup-site-settings.mjs <DATABASE_URL>')
  console.error('   or: DATABASE_URL=mysql://... node scripts/setup-site-settings.mjs')
  process.exit(1)
}

const parsed = new URL(dbUrl)
const conn = await createConnection({
  host: parsed.hostname, port: Number(parsed.port) || 3306,
  user: parsed.username, password: parsed.password,
  database: parsed.pathname.replace(/^\//, ''),
})

const [existing] = await conn.execute('SHOW TABLES LIKE "site_settings"')
if (existing.length === 0) {
  await conn.execute(`
    CREATE TABLE site_settings (
      id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
      \`key\` VARCHAR(100) NOT NULL UNIQUE,
      value TEXT,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `)
  console.log('site_settings table created')

  const defaults = [
    ['company_name', 'Buildera'], ['company_email', ''], ['company_phone', ''],
    ['company_address', ''], ['calendly_url', ''], ['whatsapp_number', ''],
    ['whatsapp_enabled', '0'], ['linkedin_url', ''], ['instagram_url', ''],
    ['twitter_url', ''], ['footer_tagline', 'Building technology that grows businesses.'],
    ['stat_projects', '800'], ['stat_clients', '500'], ['stat_years', '10'],
    ['stat_satisfaction', '98'],
    ['default_seo_title', 'Buildera — IT Services & Custom Software Development'],
    ['default_seo_description', 'Buildera builds custom software, Salesforce solutions, DevOps pipelines, and AI agents.'],
    ['og_image', ''], ['ga4_measurement_id', ''], ['clarity_project_id', ''],
    ['site_name', 'Buildera'], ['site_tagline', 'Building technology that grows businesses.'],
    ['logo_url', ''], ['favicon_url', ''],
    ['robots_txt', 'User-agent: *\nAllow: /\n\nSitemap: https://buildera.co/sitemap.xml'],
  ]
  for (const [k, v] of defaults) {
    await conn.execute('INSERT IGNORE INTO site_settings (`key`, value) VALUES (?, ?)', [k, v])
  }
  console.log('Defaults seeded')
} else {
  console.log('site_settings already exists — skipping')
}

await conn.end()
console.log('Done.')
