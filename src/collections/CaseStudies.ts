import type { CollectionConfig } from 'payload'
import { publicRead } from './access'
import { isSampleField, orderField, stringList, slugField } from './shared'

export const CaseStudies: CollectionConfig = {
  slug: 'case-studies',
  admin: { useAsTitle: 'title', defaultColumns: ['title', 'type', 'featured', 'isSample'], group: 'Content' },
  defaultSort: 'order',
  access: { read: publicRead },
  fields: [
    { name: 'title', type: 'text', required: true, admin: { description: 'Headline, e.g. "One ERP instead of eleven spreadsheets".' } },
    { name: 'tabLabel', type: 'text', required: true, admin: { description: 'Short name on the tab, e.g. "ERP for a distribution business".' } },
    {
      type: 'row',
      fields: [
        {
          name: 'type',
          type: 'select',
          required: true,
          defaultValue: 'ERP',
          options: ['ERP', 'Business apps', 'Web & SaaS', 'Mobile', 'AI', 'Other'],
        },
        { name: 'industry', type: 'text' },
      ],
    },
    { name: 'challenge', type: 'textarea', required: true },
    { name: 'built', label: 'What we built', type: 'textarea', required: true },
    { name: 'outcome', type: 'textarea', required: true, admin: { description: 'Use real, client-approved results only.' } },
    stringList('stack', 'Stack'),
    { name: 'cover', type: 'upload', relationTo: 'media', admin: { description: 'Screenshot or video. Without one, a mockup is drawn.' } },
    {
      name: 'mockup',
      type: 'select',
      defaultValue: 'dashboard',
      options: [
        { label: 'Dashboard', value: 'dashboard' },
        { label: 'POS', value: 'pos' },
        { label: 'Chat', value: 'chat' },
      ],
    },
    { name: 'featured', type: 'checkbox', defaultValue: true, admin: { position: 'sidebar', description: 'Show on the home page.' } },
    { name: 'summary', type: 'textarea', admin: { description: 'One or two sentences for cards, search results and social shares.' } },
    {
      name: 'results',
      label: 'Key results',
      type: 'array',
      maxRows: 4,
      admin: { description: 'Real, client-approved numbers only, e.g. "3 days → 2 hours" / "month-end closing".' },
      fields: [
        { name: 'value', type: 'text', required: true },
        { name: 'label', type: 'text', required: true },
      ],
    },
    { name: 'service', type: 'relationship', relationTo: 'services', admin: { description: 'Links the case study from that service page.' } },
    slugField('title'),
    isSampleField,
    orderField,
  ],
}
