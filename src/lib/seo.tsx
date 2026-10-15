import type { Metadata } from 'next'
import type { SiteSetting } from '@/payload-types'
import { loadGlobal, mediaUrl } from './payload'

type Meta = { title?: string | null; description?: string | null; image?: unknown; keywords?: string | null; noindex?: boolean | null } | null | undefined

export async function getSite() {
  const s = await loadGlobal('site-settings')
  const configuredUrl = (s.siteUrl || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').trim()
  // Accept host-only values such as "example.com" from the CMS or env file.
  // URL() requires an absolute URL, so normalize before using it for metadata.
  const withProtocol = /^https?:\/\//i.test(configuredUrl) ? configuredUrl : `https://${configuredUrl}`
  let url = 'https://zesxai.com'
  try {
    const parsed = new URL(withProtocol)
    if (parsed.protocol === 'http:' || parsed.protocol === 'https:') {
      url = parsed.toString().replace(/\/+$/, '')
    }
  } catch {
    // Keep the local fallback when the CMS or environment contains an invalid URL.
  }
  return { s, url }
}

export const abs = (base: string, u?: string | null) => (!u ? undefined : /^https?:\/\//.test(u) ? u : `${base}${u.startsWith('/') ? '' : '/'}${u}`)

const ogText = (t: string) => t.split('|').map((x) => x.trim()).sort((a, b) => b.length - a.length)[0] || t

/** Page metadata from the CMS SEO fields, with sensible fallbacks. */
export async function pageMetadata(opts: { meta: Meta; path: string; title?: string | null; description?: string | null; eyebrow?: string; type?: 'website' | 'article' }): Promise<Metadata> {
  const { s, url } = await getSite()
  const title = opts.meta?.title || opts.title || s.seo?.defaultTitle || s.siteName || 'Zesxai'
  const siteName = s.siteName || 'Zesxai'
  const fallbackDescription = `${title}. ${s.metaDescription || `${siteName} builds custom software, ERP systems, business apps, SaaS platforms, and AI solutions.`}`
  const description = (opts.meta?.description || opts.description || fallbackDescription).trim().slice(0, 300) || undefined
  const canonical = `${url}${opts.path === '/' ? '' : opts.path}` || url
  const img =
    mediaUrl(opts.meta?.image) ||
    mediaUrl(s.seo?.ogImage) ||
    `/og?title=${encodeURIComponent(ogText(title))}&eyebrow=${encodeURIComponent(opts.eyebrow || s.siteName || 'Zesxai')}`
  const keywords = [opts.meta?.keywords, s.seo?.keywords]
    .filter(Boolean)
    .join(',')
    .split(',')
    .map((k) => k.trim())
    .filter(Boolean)
  const hidden = !!(s.seo?.noindex || opts.meta?.noindex)
  return {
    title: opts.path === '/' || title.toLowerCase().includes((s.siteName || 'zesxai').toLowerCase()) ? { absolute: title } : title,
    description,
    keywords: keywords.length ? Array.from(new Set(keywords)) : undefined,
    alternates: { canonical },
    robots: hidden ? { index: false, follow: false } : { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
    openGraph: {
      type: opts.type || 'website',
      url: canonical,
      siteName: s.siteName || 'Zesxai',
      title,
      description,
      images: [{ url: abs(url, img)!, width: 1200, height: 630, alt: title }],
      locale: 'en_US',
    },
    twitter: { card: 'summary_large_image', title, description, images: [abs(url, img)!], site: s.seo?.twitterHandle || undefined },
  }
}

export function JsonLd({ data }: { data: unknown }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }} />
}

export function organizationLd(s: SiteSetting, url: string) {
  const o = s.organization || {}
  const sameAs = [...(s.social || []).map((x) => x.url), ...(s.listings || []).map((l) => l.url)].filter((u): u is string => !!u && /^https?:\/\//.test(u) && !/^https?:\/\/(www\.)?[^/]+\/?$/.test(u))
  const logo = mediaUrl(s.logo)
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${url}/#organization`,
    name: s.siteName || 'Zesxai',
    legalName: o.legalName || undefined,
    url,
    logo: abs(url, logo || '/brand/zesxai-app-icon.png'),
    description: s.metaDescription || undefined,
    email: o.email || s.contact?.email || undefined,
    telephone: o.phone || s.contact?.phone || undefined,
    foundingDate: o.foundingYear || undefined,
    address: o.city || o.country ? { '@type': 'PostalAddress', addressLocality: o.city || undefined, addressCountry: o.country || undefined } : undefined,
    areaServed: o.areaServed || undefined,
    sameAs: sameAs.length ? sameAs : undefined,
  }
}

export function websiteLd(s: SiteSetting, url: string) {
  return { '@context': 'https://schema.org', '@type': 'WebSite', '@id': `${url}/#website`, url, name: s.siteName || 'Zesxai', publisher: { '@id': `${url}/#organization` } }
}

export function breadcrumbLd(url: string, items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [{ name: 'Home', path: '/' }, ...items].map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: `${url}${it.path === '/' ? '' : it.path}` || url })),
  }
}

export function faqLd(items?: { question: string; answer: string }[] | null) {
  if (!items?.length) return null
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((f) => ({ '@type': 'Question', name: f.question, acceptedAnswer: { '@type': 'Answer', text: f.answer } })),
  }
}
