function getEmbedUrl(url: string): string | null {
  try {
    const parsed = new URL(url)
    const host = parsed.hostname.replace('www.', '')

    if (host === 'youtube.com' && parsed.searchParams.get('v')) {
      return `https://www.youtube.com/embed/${parsed.searchParams.get('v')}`
    }
    if (host === 'youtu.be') {
      const id = parsed.pathname.slice(1)
      if (id) return `https://www.youtube.com/embed/${id}`
    }
    if (host === 'vimeo.com') {
      const id = parsed.pathname.split('/').filter(Boolean)[0]
      if (id) return `https://player.vimeo.com/video/${id}`
    }
    return null
  } catch {
    return null
  }
}

interface Props {
  url: string
}

export function VideoEmbed({ url }: Props) {
  const embedUrl = getEmbedUrl(url)
  if (!embedUrl) return null

  return (
    <section className="py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="aspect-video rounded-xl overflow-hidden shadow-lg">
          <iframe
            src={embedUrl}
            loading="lazy"
            allowFullScreen
            title="Service explainer video"
            className="w-full h-full"
          />
        </div>
      </div>
    </section>
  )
}
