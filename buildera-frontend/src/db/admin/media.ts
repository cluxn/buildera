import { query, queryOne, execute } from '@/db/pool'

export interface MediaFile {
  id: number; filename: string; original_name: string; mime_type: string
  size_bytes: number; url: string; alt_text: string | null; created_at: string
}

export async function listMedia(filter?: 'images' | 'pdfs' | 'other', q?: string): Promise<MediaFile[]> {
  const wheres: string[] = []
  const vals: unknown[] = []
  if (filter === 'images') { wheres.push("mime_type LIKE 'image/%'") }
  else if (filter === 'pdfs') { wheres.push("mime_type = 'application/pdf'") }
  else if (filter === 'other') { wheres.push("mime_type NOT LIKE 'image/%' AND mime_type != 'application/pdf'") }
  if (q) { wheres.push('(original_name LIKE ? OR filename LIKE ?)'); vals.push(`%${q}%`, `%${q}%`) }
  const where = wheres.length ? `WHERE ${wheres.join(' AND ')}` : ''
  return query<MediaFile>(`SELECT * FROM media_files ${where} ORDER BY created_at DESC`, vals)
}

export async function getMedia(id: number): Promise<MediaFile | null> {
  return queryOne<MediaFile>('SELECT * FROM media_files WHERE id = ?', [id])
}

export async function createMedia(data: {
  filename: string; originalName: string; mimeType: string
  sizeBytes: number; url: string; altText?: string
}): Promise<number> {
  const result = await execute(
    'INSERT INTO media_files (filename, original_name, mime_type, size_bytes, url, alt_text) VALUES (?,?,?,?,?,?)',
    [data.filename, data.originalName, data.mimeType, data.sizeBytes, data.url, data.altText ?? null],
  )
  return result.insertId
}

export async function updateAltText(id: number, altText: string): Promise<void> {
  await execute('UPDATE media_files SET alt_text = ? WHERE id = ?', [altText, id])
}

export async function deleteMedia(id: number): Promise<string | null> {
  const file = await getMedia(id)
  if (!file) return null
  await execute('DELETE FROM media_files WHERE id = ?', [id])
  return file.filename
}
