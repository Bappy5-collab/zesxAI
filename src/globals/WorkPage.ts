import type { GlobalConfig } from 'payload'
import { pageHero } from './fields'

export const WorkPage: GlobalConfig = {
  slug: 'work-page',
  label: 'Work page',
  admin: { group: 'Pages', description: 'Case studies themselves are in Content → Case studies.' },
  access: { read: () => true },
  fields: [
    pageHero({
      eyebrow: 'Work',
      title: 'Software we have designed, built and shipped.',
      lead: 'Custom ERP systems, business apps for SMBs, SaaS platforms, mobile apps and AI projects. Filter by type.',
    }),
    { name: 'allLabel', label: 'Label of the "All" filter', type: 'text', defaultValue: 'All' },
  ],
}
