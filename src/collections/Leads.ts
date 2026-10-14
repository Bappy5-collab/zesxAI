import type { CollectionConfig } from 'payload'
import { loggedIn } from './access'

/** Submissions from the "Start a project" brief. Created by the site, read only by admins. */
export const Leads: CollectionConfig = {
  slug: 'leads',
  admin: { useAsTitle: 'name', defaultColumns: ['name', 'email', 'projectType', 'budget', 'createdAt'], group: 'Inbox' },
  access: { read: loggedIn, create: () => false, update: loggedIn, delete: loggedIn },
  timestamps: true,
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'email', type: 'email', required: true },
    { name: 'projectType', type: 'text' },
    { name: 'stage', type: 'text' },
    { name: 'budget', type: 'number' },
    { name: 'timeline', type: 'text' },
    { name: 'notes', type: 'textarea' },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      options: ['new', 'contacted', 'proposal', 'won', 'lost'],
      admin: { position: 'sidebar' },
    },
  ],
}
