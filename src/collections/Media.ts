import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  admin: { group: 'Content', description: 'Images, logos, posters and videos used across the site.' },
  access: { read: () => true },
  fields: [{ name: 'alt', type: 'text', required: true }],
  upload: {
    mimeTypes: ['image/*', 'video/mp4', 'video/webm'],
  },
}
