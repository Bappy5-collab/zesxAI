import type { CollectionConfig } from 'payload'
import { publicRead } from './access'
import { isSampleField, orderField } from './shared'

export const GalleryTiles: CollectionConfig = {
  slug: 'gallery-tiles',
  labels: { singular: 'Hero gallery tile', plural: 'Hero gallery' },
  admin: { useAsTitle: 'title', defaultColumns: ['title', 'column', 'shape', 'order'], group: 'Content', description: 'Project videos and screenshots that scroll behind the home hero.' },
  defaultSort: 'order',
  access: { read: publicRead },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'tag', type: 'text', admin: { description: 'Small label, e.g. client or project type.' } },
    { name: 'media', type: 'upload', relationTo: 'media', required: true, admin: { description: 'MP4/WebM (5 to 15 s, silent, under 2 MB) or an image.' } },
    { name: 'poster', type: 'upload', relationTo: 'media', admin: { description: 'Still image shown before a video plays.' } },
    {
      type: 'row',
      fields: [
        { name: 'column', type: 'select', required: true, defaultValue: '1', options: ['1', '2', '3', '4'] },
        {
          name: 'shape',
          type: 'select',
          defaultValue: 'tall',
          options: [
            { label: 'Tall (4:5)', value: 'tall' },
            { label: 'Wide (4:3)', value: 'wide' },
          ],
        },
      ],
    },
    isSampleField,
    orderField,
  ],
}
