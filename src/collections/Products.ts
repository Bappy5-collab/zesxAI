import type { CollectionConfig } from 'payload'
import { publicRead } from './access'
import { iconField, orderField, stringList } from './shared'

export const Products: CollectionConfig = {
  slug: 'products',
  admin: { useAsTitle: 'name', defaultColumns: ['name', 'status', 'order'], group: 'Content' },
  defaultSort: 'order',
  access: { read: publicRead },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'description', type: 'textarea', required: true },
    iconField('stack'),
    stringList('features', 'Features (3 works best)'),
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'coming-soon',
      options: [
        { label: 'Coming soon', value: 'coming-soon' },
        { label: 'Beta', value: 'beta' },
        { label: 'Live', value: 'live' },
      ],
      admin: { position: 'sidebar' },
    },
    { name: 'url', type: 'text', admin: { description: 'Product website. Used by the button when the product is Live or in Beta.' } },
    { name: 'image', type: 'upload', relationTo: 'media', admin: { description: 'Screenshot for the card. Without one, the mockup below is drawn.' } },
    {
      name: 'mockup',
      type: 'select',
      defaultValue: 'office',
      options: [
        { label: 'Office dashboard', value: 'office' },
        { label: 'Voice widget', value: 'voice' },
        { label: 'Score ring', value: 'score' },
      ],
    },
    orderField,
  ],
}
