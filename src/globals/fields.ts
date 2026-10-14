import type { Field } from 'payload'
import { iconField } from '../collections/shared'

export const sectionHead = (name: string, label: string, d: { eyebrow: string; title: string; lead?: string }): Field => ({
  name,
  label,
  type: 'group',
  fields: [
    { name: 'eyebrow', type: 'text', defaultValue: d.eyebrow },
    { name: 'title', type: 'text', defaultValue: d.title },
    { name: 'lead', type: 'textarea', defaultValue: d.lead || '' },
  ],
})

export const pageHero = (d: { eyebrow: string; title: string; lead: string }): Field =>
  sectionHead('hero', 'Page hero', d)

export const iconCards = (name: string, label: string): Field => ({
  name,
  label,
  type: 'array',
  fields: [iconField('code'), { name: 'title', type: 'text', required: true }, { name: 'text', type: 'textarea' }],
})
