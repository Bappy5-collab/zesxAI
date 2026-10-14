import type { CollectionConfig } from 'payload'
import { publicRead } from './access'
import { isSampleField, orderField } from './shared'

export const reviewSources = [
  { label: 'Direct (collected by us)', value: 'direct' },
  { label: 'Google', value: 'google' },
  { label: 'Trustpilot', value: 'trustpilot' },
  { label: 'Clutch', value: 'clutch' },
  { label: 'Upwork', value: 'upwork' },
]

export const Reviews: CollectionConfig = {
  slug: 'reviews',
  admin: { useAsTitle: 'name', defaultColumns: ['name', 'kind', 'source', 'rating', 'published'], group: 'Content' },
  defaultSort: 'order',
  access: { read: publicRead },
  fields: [
    {
      name: 'kind',
      type: 'select',
      required: true,
      defaultValue: 'text',
      options: [
        { label: 'Written review', value: 'text' },
        { label: 'Video review', value: 'video' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      type: 'row',
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'role', type: 'text' },
        { name: 'company', type: 'text' },
      ],
    },
    { name: 'rating', type: 'number', min: 1, max: 5, defaultValue: 5 },
    { name: 'quote', type: 'textarea', required: true, admin: { description: "The client's own words. For video reviews, one line from the video." } },
    {
      type: 'row',
      fields: [
        { name: 'source', type: 'select', required: true, defaultValue: 'direct', options: reviewSources },
        {
          name: 'sourceUrl',
          label: 'Link to the original review',
          type: 'text',
          validate: (value: unknown, { siblingData }: { siblingData: { source?: string } }) => {
            if (siblingData?.source && siblingData.source !== 'direct' && !value) {
              return 'Platform reviews must link to the original review on that platform.'
            }
            return true
          },
        },
      ],
    },
    { name: 'avatar', type: 'upload', relationTo: 'media' },
    {
      name: 'video',
      type: 'upload',
      relationTo: 'media',
      admin: { condition: (_, s) => s?.kind === 'video' },
    },
    { name: 'poster', type: 'upload', relationTo: 'media', admin: { condition: (_, s) => s?.kind === 'video' } },
    { name: 'duration', type: 'text', admin: { condition: (_, s) => s?.kind === 'video', description: 'e.g. 2:14' } },
    { name: 'published', type: 'checkbox', defaultValue: true, admin: { position: 'sidebar' } },
    { name: 'featured', type: 'checkbox', defaultValue: true, admin: { position: 'sidebar', description: 'Show on the home page.' } },
    isSampleField,
    orderField,
  ],
}
