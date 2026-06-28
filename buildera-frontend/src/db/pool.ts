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

function getPool(): mysql.Pool {
  if (!globalForMysql.pool) {
    globalForMysql.pool = createPool()
  }
  return globalForMysql.pool
}

export const pool = new Proxy({} as mysql.Pool, {
  get(_target, prop) {
    return (getPool() as unknown as Record<string | symbol, unknown>)[prop]
  },
})

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

// MySQL DATETIME/TIMESTAMP columns reject ISO 8601 strings (e.g. "2026-06-15T08:22:35.143Z")
export function toMysqlDatetime(value: string | null | undefined): string | null {
  if (!value) return null
  const d = new Date(value)
  if (isNaN(d.getTime())) return null
  return d.toISOString().slice(0, 19).replace('T', ' ')
}

export async function execute(sql: string, values?: AnyValues): Promise<{ affectedRows: number; insertId: number }> {
  const [result] = await pool.execute(sql, values)
  const r = result as { affectedRows: number; insertId: number }
  return { affectedRows: r.affectedRows, insertId: r.insertId }
}
