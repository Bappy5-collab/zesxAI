import type { CollectionConfig } from 'payload'
import { publicRead } from './access'
import { orderField } from './shared'

export const Clients: CollectionConfig = {
  slug: 'clients',
  admin: { useAsTitle: 'name', defaultColumns: ['name', 'industry', 'showInStrip'], group: 'Content' },
  defaultSort: 'order',
  access: { read: publicRead },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'logo', type: 'upload', relationTo: 'media', admin: { description: 'SVG or PNG on a transparent background.' } },
    { name: 'industry', type: 'text', admin: { description: 'Used for the filters in "See all clients".' } },
    { name: 'project', type: 'text', admin: { description: 'What we built, e.g. "ERP system".' } },
    { name: 'website', type: 'text' },
    { name: 'showInStrip', type: 'checkbox', defaultValue: true, admin: { position: 'sidebar', description: 'Show in the scrolling logo strip.' } },
    orderField,
  ],
}
