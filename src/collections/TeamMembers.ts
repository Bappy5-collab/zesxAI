import type { CollectionConfig } from 'payload'
import { publicRead } from './access'
import { isSampleField, orderField } from './shared'

export const departments = ['Leadership', 'Engineering', 'Design', 'Quality assurance', 'Project management', 'Marketing', 'DevOps']

export const TeamMembers: CollectionConfig = {
  slug: 'team-members',
  labels: { singular: 'Team member', plural: 'Team' },
  admin: { useAsTitle: 'name', defaultColumns: ['name', 'role', 'department', 'order', 'isSample'], group: 'Content', description: 'Everyone shown on the About page. Drag order with the Order field.' },
  defaultSort: 'order',
  access: { read: publicRead },
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'role', type: 'text', required: true, admin: { description: 'e.g. Senior Full-stack Developer' } },
      ],
    },
    { name: 'department', type: 'select', required: true, defaultValue: 'Engineering', options: departments, admin: { description: 'Used for the filters and the colored dot.' } },
    { name: 'photo', type: 'upload', relationTo: 'media', admin: { description: 'Portrait, 4:5, face in the upper half. Without one a placeholder is drawn.' } },
    { name: 'bio', type: 'textarea', admin: { description: 'One or two lines, shown on hover.' } },
    {
      type: 'row',
      fields: [
        { name: 'linkedin', type: 'text' },
        { name: 'github', type: 'text' },
      ],
    },
    { name: 'showInHero', type: 'checkbox', defaultValue: true, admin: { position: 'sidebar', description: 'Show in the photo grid at the top of About (first 6).' } },
    isSampleField,
    orderField,
  ],
}
