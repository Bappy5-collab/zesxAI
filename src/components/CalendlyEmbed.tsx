'use client'
import { useEffect, useRef, useState } from 'react'

const COLORS = {
  dark: { background_color: '151210', text_color: 'f4efe9', primary_color: 'ffa26b' },
  light: { background_color: 'ffffff', text_color: '1a1512', primary_color: 'c2551a' },
}

/** Calendly inline embed that matches the site theme (and follows the theme toggle). */
export function CalendlyEmbed({ url }: { url: string }) {
  const [theme, setTheme] = useState<'dark' | 'light' | null>(null)
  const [scheduled, setScheduled] = useState(false)
  const iframeRef = useRef<HTMLIFrameElement>(null)
  useEffect(() => {
    const read = () => setTheme(document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark')
    read()
    document.addEventListener('zx:theme', read)
    return () => document.removeEventListener('zx:theme', read)
  }, [])
  useEffect(() => {
    let origin: string
    try {
      origin = new URL(url).origin
    } catch {
      return
    }
    const onMessage = (event: MessageEvent) => {
      if (event.origin !== origin) return
      if (event.data?.event === 'calendly.event_scheduled') setScheduled(true)
      if (event.data?.event === 'calendly.page_height') {
        const height = Number.parseInt(String(event.data.payload?.height || ''), 10)
        if (Number.isFinite(height) && height >= 320 && height <= 900 && iframeRef.current?.parentElement) {
          iframeRef.current.parentElement.style.height = `${height}px`
        }
      }
    }
    window.addEventListener('message', onMessage)
    return () => window.removeEventListener('message', onMessage)
  }, [url])
  if (!theme) return null
  if (scheduled) {
    return (
      <div className="zx-book__scheduled" role="status" aria-live="polite">
        <h3>You’re scheduled!</h3>
        <p>Your booking is confirmed. Check your email for the calendar invitation.</p>
      </div>
    )
  }
  let src = url
  try {
    const u = new URL(url)
    u.searchParams.set('hide_gdpr_banner', '1')
    u.searchParams.set('hide_event_type_details', '1')
    u.searchParams.set('hide_landing_page_details', '1')
    u.searchParams.set('embed_type', 'Inline')
    Object.entries(COLORS[theme]).forEach(([k, v]) => u.searchParams.set(k, v))
    src = u.toString()
  } catch {}
  return <iframe ref={iframeRef} key={theme} src={src} title="Book a call with Zesxai" loading="lazy" />
}
