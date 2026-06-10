// Run: node scripts/db-migrate.mjs
// Requires: DATABASE_URL in env (or pass as first arg)
import { createConnection } from 'mysql2/promise'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const schemaPath = join(__dirname, '../src/db/schema.sql')

const dbUrl = process.argv[2] || process.env.DATABASE_URL
if (!dbUrl) {
  console.error('Usage: node scripts/db-migrate.mjs <DATABASE_URL>')
  console.error('   or: DATABASE_URL=mysql://... node scripts/db-migrate.mjs')
  process.exit(1)
}

const parsed = new URL(dbUrl)
const conn = await createConnection({
  host: parsed.hostname,
  port: Number(parsed.port) || 3306,
  user: parsed.username,
  password: parsed.password,
  database: parsed.pathname.replace(/^\//, ''),
  multipleStatements: true,
})

const schema = readFileSync(schemaPath, 'utf8')
const statements = schema.split(';').map(s => s.trim()).filter(Boolean)

let ok = 0
for (const stmt of statements) {
  try {
    await conn.execute(stmt)
    ok++
  } catch (err) {
    if (!err.message.includes('already exists') && !err.message.includes('Duplicate entry')) {
      console.warn(`WARN: ${err.message.slice(0, 120)}`)
    }
  }
}

console.log(`Migration complete — ${ok} statements executed.`)
await conn.end()
