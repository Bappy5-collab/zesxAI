import { getPayload } from 'payload'
import config from '@payload-config'
import type { Media } from '@/payload-types'

export const getClient = async () => getPayload({ config })

/** Resolve an upload field (id or populated doc) to a URL, or null. */
export const mediaUrl = (m: unknown): string | null => {
  if (m && typeof m === 'object' && 'url' in m) return (m as Media).url || null
  return null
}
// Images in public/images that override the CMS image for a service, matched by title.
const serviceImages: Record<string, string> = {
  'ERP systems': '/images/ERP-System.png',
  'Business apps for SMBs': '/images/smbs-app.png',
  'Web apps & SaaS': '/images/web_apps%26saas.png',
  'Mobile apps': '/images/mobile_apps.png',
  'AI & automation': '/images/ai%26automation.png',
  'Cloud, DevOps & support': '/images/cloud_devOps.png',
}
export const serviceImage = (s: { title: string; image?: unknown }): string | null => serviceImages[s.title] || mediaUrl(s.image)
export const mediaMime = (m: unknown): string => {
  if (m && typeof m === 'object' && 'mimeType' in m) return (m as Media).mimeType || ''
  return ''
}
export const isVideo = (m: unknown) => mediaMime(m).startsWith('video/')
export const values = (arr?: { value: string }[] | null) => (arr || []).map((x) => x.value)

export async function loadAll<T extends 'services' | 'case-studies' | 'products' | 'clients' | 'gallery-tiles' | 'reviews' | 'team-members'>(
  collection: T,
  where: Record<string, unknown> = {},
) {
  const payload = await getClient()
  const res = await payload.find({ collection, where: where as never, sort: 'order', limit: 200, depth: 1 })
  return res.docs
}

export async function loadGlobal<T extends 'home-page' | 'services-page' | 'pricing-page' | 'work-page' | 'reviews-page' | 'contact-page' | 'process-page' | 'about-page' | 'site-settings'>(slug: T) {
  const payload = await getClient()
  return payload.findGlobal({ slug, depth: 1 })
}
