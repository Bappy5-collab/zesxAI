import type { MetadataRoute } from 'next'
import { getClient } from '@/lib/payload'
import { getSite } from '@/lib/seo'

export const dynamic = 'force-dynamic'

/** Built on every request from the CMS: static pages, every service page and every case study. Hidden (noindex) pages are left out. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { url } = await getSite()
  const payload = await getClient()
  const pages: [string, string, number, MetadataRoute.Sitemap[number]['changeFrequency']][] = [
    ['/', 'home-page', 1, 'weekly'],
    ['/services', 'services-page', 0.9, 'monthly'],
    ['/pricing', 'pricing-page', 0.9, 'monthly'],
    ['/work', 'work-page', 0.8, 'weekly'],
    ['/process', 'process-page', 0.6, 'monthly'],
    ['/reviews', 'reviews-page', 0.7, 'weekly'],
    ['/about', 'about-page', 0.7, 'monthly'],
    ['/contact', 'contact-page', 0.8, 'yearly'],
  ]
  const out: MetadataRoute.Sitemap = []
  for (const [path, slug, priority, changeFrequency] of pages) {
    const g = (await payload.findGlobal({ slug: slug as 'home-page', depth: 0 })) as { updatedAt?: string; meta?: { noindex?: boolean | null } }
    if (g.meta?.noindex) continue
    out.push({ url: `${url}${path === '/' ? '' : path}` || url, lastModified: g.updatedAt ? new Date(g.updatedAt) : new Date(), changeFrequency, priority })
  }
  out.push({ url: `${url}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 })
  const [services, cases] = await Promise.all([
    payload.find({ collection: 'services', limit: 500, depth: 0, pagination: false }),
    payload.find({ collection: 'case-studies', limit: 500, depth: 0, pagination: false }),
  ])
  for (const s of services.docs) if (s.slug && !s.meta?.noindex) out.push({ url: `${url}/services/${s.slug}`, lastModified: new Date(s.updatedAt), changeFrequency: 'monthly', priority: 0.9 })
  for (const c of cases.docs) if (c.slug && !c.meta?.noindex) out.push({ url: `${url}/work/${c.slug}`, lastModified: new Date(c.updatedAt), changeFrequency: 'monthly', priority: 0.7 })
  return out
}
