import type { CollectionConfig } from 'payload'
import { publicRead } from './access'
import { iconField, orderField, slugField, stringList } from './shared'

export const Services: CollectionConfig = {
  slug: 'services',
  admin: { useAsTitle: 'title', defaultColumns: ['title', 'visual', 'order'], group: 'Content' },
  defaultSort: 'order',
  access: { read: publicRead },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'summary', type: 'textarea', required: true, admin: { description: 'One or two sentences.' } },
    iconField('stack'),
    stringList('tags', 'Tags (max 4)'),
    { name: 'badge', type: 'text', admin: { description: 'Optional, e.g. "Most requested". Shows instead of the number.' } },
    { name: 'image', type: 'upload', relationTo: 'media', admin: { description: 'Photo or screenshot for the card. Without one, the illustration below is drawn.' } },
    {
      name: 'visual',
      type: 'select',
      defaultValue: 'web',
      options: [
        { label: 'ERP dashboard', value: 'erp' },
        { label: 'POS / business app', value: 'biz' },
        { label: 'Browser / SaaS', value: 'web' },
        { label: 'Phone', value: 'mobile' },
        { label: 'AI chat', value: 'ai' },
        { label: 'Uptime bars', value: 'cloud' },
      ],
      admin: { description: 'Mini UI illustration on the card.' },
    },
    {
      type: 'collapsible',
      label: 'Service page (/services/slug)',
      admin: { initCollapsed: false },
      fields: [
        { name: 'headline', type: 'text', admin: { description: 'H1 on the service page. Put the main keyword in it, e.g. "Custom ERP software development".' } },
        { name: 'intro', type: 'textarea', admin: { description: 'Opening paragraph (2 to 4 sentences).' } },
        {
          name: 'features',
          label: 'What we build',
          type: 'array',
          fields: [
            { name: 'title', type: 'text', required: true },
            { name: 'text', type: 'textarea' },
          ],
        },
        stringList('deliverables', 'What you get'),
        {
          name: 'faq',
          label: 'FAQ',
          type: 'array',
          fields: [
            { name: 'question', type: 'text', required: true },
            { name: 'answer', type: 'textarea', required: true },
          ],
        },
      ],
    },
    slugField('title'),
    orderField,
  ],
}
