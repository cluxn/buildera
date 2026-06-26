import { query, queryOne, execute } from '@/db/pool'

export interface AdminUser {
  id: number; name: string; email: string; password_hash: string
  role: string; must_change_password: number; created_at: string
}

export async function getUserByEmail(email: string): Promise<AdminUser | null> {
  return queryOne<AdminUser>('SELECT * FROM users WHERE email = ?', [email])
}

export async function getUserById(id: number): Promise<AdminUser | null> {
  return queryOne<AdminUser>('SELECT * FROM users WHERE id = ?', [id])
}

export async function listUsers(): Promise<Omit<AdminUser, 'password_hash'>[]> {
  return query('SELECT id, name, email, role, must_change_password, created_at FROM users ORDER BY created_at DESC')
}

export async function createUser(data: {
  name: string; email: string; passwordHash: string; role: string
}): Promise<number> {
  const result = await execute(
    'INSERT INTO users (name, email, password_hash, role, must_change_password) VALUES (?,?,?,?,1)',
    [data.name, data.email, data.passwordHash, data.role],
  )
  return result.insertId
}

export async function updateUserRole(id: number, role: string): Promise<void> {
  await execute('UPDATE users SET role = ? WHERE id = ?', [role, id])
}

export async function updateUserPassword(id: number, passwordHash: string): Promise<void> {
  await execute('UPDATE users SET password_hash = ?, must_change_password = 0 WHERE id = ?', [passwordHash, id])
}

export async function deleteUser(id: number): Promise<void> {
  await execute('DELETE FROM users WHERE id = ?', [id])
}

export { ALLOWED_ROLE_VALUES as ALLOWED_ROLES } from '@/lib/admin-permissions'
