// Run: node scripts/create-admin.mjs <DATABASE_URL> <email> <password>
// Creates the first SUPER_ADMIN user
import { createConnection } from 'mysql2/promise'
import bcrypt from 'bcryptjs'

const [,, dbUrl, email, password] = process.argv
if (!dbUrl || !email || !password) {
  console.error('Usage: node scripts/create-admin.mjs <DATABASE_URL> <email> <password>')
  process.exit(1)
}

const parsed = new URL(dbUrl)
const conn = await createConnection({
  host: parsed.hostname, port: Number(parsed.port) || 3306,
  user: parsed.username, password: parsed.password,
  database: parsed.pathname.replace(/^\//, ''),
})

const hash = await bcrypt.hash(password, 12)
await conn.execute(
  'INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE password_hash = VALUES(password_hash), role = VALUES(role)',
  ['Admin', email, hash, 'SUPER_ADMIN'],
)
console.log(`Admin user created: ${email}`)
await conn.end()
