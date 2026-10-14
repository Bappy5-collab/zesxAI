import type { MetadataRoute } from 'next'
import { getSite } from '@/lib/seo'

export const dynamic = 'force-dynamic'

export default async function robots(): Promise<MetadataRoute.Robots> {
  const { s, url } = await getSite()
  if (s.seo?.noindex) return { rules: [{ userAgent: '*', disallow: '/' }] }
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/admin', '/api/', '/og'] }],
    sitemap: `${url}/sitemap.xml`,
  }
}
