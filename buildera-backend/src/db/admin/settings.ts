import { query, execute } from '@/db/pool'

interface SettingRow { key: string; value: string | null }

export async function getAllSettings(): Promise<Record<string, string>> {
  const rows = await query<SettingRow>('SELECT `key`, value FROM site_settings')
  return Object.fromEntries(rows.map(r => [r.key, r.value ?? '']))
}

export async function getSetting(key: string): Promise<string | null> {
  const rows = await query<SettingRow>('SELECT value FROM site_settings WHERE `key` = ?', [key])
  return rows[0]?.value ?? null
}

export async function upsertSetting(key: string, value: string): Promise<void> {
  await execute(
    'INSERT INTO site_settings (`key`, value) VALUES (?, ?) ON DUPLICATE KEY UPDATE value = VALUES(value)',
    [key, value],
  )
}

export async function upsertSettings(settings: Record<string, string>): Promise<void> {
  for (const [key, value] of Object.entries(settings)) {
    await upsertSetting(key, value)
  }
}
