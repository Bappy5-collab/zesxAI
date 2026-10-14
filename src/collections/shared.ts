import type { Field } from 'payload'
import { iconOptions } from '../lib/icons'

export const orderField: Field = {
  name: 'order',
  type: 'number',
  defaultValue: 0,
  admin: { position: 'sidebar', description: 'Lower numbers show first.' },
}

export const iconField = (defaultValue = 'stack'): Field => ({
  name: 'icon',
  type: 'select',
  defaultValue,
  options: iconOptions,
  admin: { description: 'Line icon from the Zesxai icon set.' },
})

export const isSampleField: Field = {
  name: 'isSample',
  type: 'checkbox',
  defaultValue: false,
  label: 'Sample / placeholder',
  admin: {
    position: 'sidebar',
    description: 'Shows a "Sample" chip on the site. Untick only for real, approved content.',
  },
}

export const stringList = (name: string, label: string): Field => ({
  name,
  label,
  type: 'array',
  labels: { singular: 'Item', plural: 'Items' },
  fields: [{ name: 'value', type: 'text', required: true }],
})

export const slugify = (v: string) =>
  v
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)

/** URL slug, filled from `from` when left empty. */
export const slugField = (from: string): Field => ({
  name: 'slug',
  type: 'text',
  unique: true,
  index: true,
  admin: { position: 'sidebar', description: 'Page URL. Leave empty to create it from the title. Changing it changes the URL.' },
  hooks: {
    beforeValidate: [
      ({ value, siblingData }) => {
        const src = typeof value === 'string' && value.trim() ? value : (siblingData?.[from] as string) || ''
        return src ? slugify(src) : value
      },
    ],
  },
})
