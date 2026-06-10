import mysql from 'mysql2/promise'

const globalForMysql = global as unknown as { pool?: mysql.Pool }

function createPool() {
  const url = process.env.DATABASE_URL
  if (!url) throw new Error('DATABASE_URL env var is required')
  // Parse mysql://user:pass@host:port/dbname
  const parsed = new URL(url)
  return mysql.createPool({
    host: parsed.hostname,
    port: Number(parsed.port) || 3306,
    user: parsed.username,
    password: parsed.password,
    database: parsed.pathname.replace(/^\//, ''),
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    timezone: '+00:00',
  })
}

export const pool = globalForMysql.pool ?? createPool()

if (process.env.NODE_ENV !== 'production') {
  globalForMysql.pool = pool
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyValues = any[]

export async function query<T = unknown>(sql: string, values?: AnyValues): Promise<T[]> {
  const [rows] = await pool.execute(sql, values)
  return rows as T[]
}

export async function queryOne<T = unknown>(sql: string, values?: AnyValues): Promise<T | null> {
  const rows = await query<T>(sql, values)
  return (rows[0] as T) ?? null
}

export async function execute(sql: string, values?: AnyValues): Promise<{ affectedRows: number; insertId: number }> {
  const [result] = await pool.execute(sql, values)
  const r = result as { affectedRows: number; insertId: number }
  return { affectedRows: r.affectedRows, insertId: r.insertId }
}
