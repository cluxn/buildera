// Fire-and-forget n8n webhook — never blocks the request, never throws
export async function fireN8nWebhook(url: string | undefined, payload: Record<string, unknown>): Promise<void> {
  if (!url) return
  // Non-blocking — kick off but don't await in the request path
  void fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  }).catch(() => {
    // Silently ignore webhook failures — DB is source of truth
  })
}
