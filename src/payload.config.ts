/* eslint-disable @typescript-eslint/no-explicit-any */
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { migrations } from './migrations'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { TeamMembers } from './collections/TeamMembers'
import { Services } from './collections/Services'
import { CaseStudies } from './collections/CaseStudies'
import { Products } from './collections/Products'
import { Clients } from './collections/Clients'
import { GalleryTiles } from './collections/GalleryTiles'
import { Reviews } from './collections/Reviews'
import { Leads } from './collections/Leads'
import { SiteSettings } from './globals/SiteSettings'
import { HomePage } from './globals/HomePage'
import { ServicesPage } from './globals/ServicesPage'
import { PricingPage } from './globals/PricingPage'
import { ProcessPage } from './globals/ProcessPage'
import { AboutPage } from './globals/AboutPage'
import { WorkPage } from './globals/WorkPage'
import { ReviewsPage } from './globals/ReviewsPage'
import { ContactPage } from './globals/ContactPage'
import { seoPlugin } from '@payloadcms/plugin-seo'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(dirname) },
    meta: { titleSuffix: ' · Zesxai CMS' },
  },
  collections: [Services, CaseStudies, Products, GalleryTiles, Clients, TeamMembers, Reviews, Leads, Media, Users],
  globals: [HomePage, ServicesPage, WorkPage, PricingPage, ProcessPage, ReviewsPage, AboutPage, ContactPage, SiteSettings],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: { outputFile: path.resolve(dirname, 'payload-types.ts') },
  db: postgresAdapter({
    pool: { connectionString: process.env.DATABASE_URL || '' },
    prodMigrations: migrations,
  }),
  sharp,
  plugins: [
    seoPlugin({
      collections: ['services', 'case-studies'],
      globals: ['home-page', 'services-page', 'work-page', 'pricing-page', 'process-page', 'reviews-page', 'about-page', 'contact-page'],
      uploadsCollection: 'media',
      tabbedUI: false,
      generateTitle: ({ doc }) => {
        const d = doc as Record<string, any>
        return d?.headline || d?.title || d?.hero?.title || 'Zesxai'
      },
      generateDescription: ({ doc }) => {
        const d = doc as Record<string, any>
        return (d?.intro || d?.summary || d?.challenge || d?.hero?.lead || '').slice(0, 158)
      },
      generateURL: ({ doc, collectionSlug, globalSlug }) => {
        const base = process.env.NEXT_PUBLIC_SITE_URL || ''
        const d = doc as Record<string, any>
        if (collectionSlug === 'services') return `${base}/services/${d?.slug || ''}`
        if (collectionSlug === 'case-studies') return `${base}/work/${d?.slug || ''}`
        const map: Record<string, string> = { 'home-page': '/', 'services-page': '/services', 'work-page': '/work', 'pricing-page': '/pricing', 'process-page': '/process', 'reviews-page': '/reviews', 'about-page': '/about', 'contact-page': '/contact' }
        return `${base}${map[globalSlug || ''] || '/'}`
      },
      fields: ({ defaultFields }) => [
        ...defaultFields,
        { name: 'keywords', type: 'text', admin: { description: 'Target keywords, comma separated. Use the main one in the title, the H1 and the first paragraph.' } },
        { name: 'noindex', label: 'Hide this page from search engines', type: 'checkbox', defaultValue: false },
      ],
    }),
  ],
})
