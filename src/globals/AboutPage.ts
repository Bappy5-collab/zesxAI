import type { GlobalConfig } from 'payload'
import { pageHero, sectionHead } from './fields'
import { iconField } from '../collections/shared'

export const AboutPage: GlobalConfig = {
  slug: 'about-page',
  label: 'About page',
  admin: { group: 'Pages', description: 'Team members are managed in Content → Team.' },
  access: { read: () => true },
  fields: [
    pageHero({
      eyebrow: 'About',
      title: 'An experienced team that builds software businesses run on.',
      lead: 'Zesxai is a software development company with 7+ years of shipping ERP systems, business apps, SaaS platforms, mobile apps and AI. Engineering, design, QA, project management and marketing, under one roof.',
    }),
    {
      name: 'stats',
      type: 'array',
      maxRows: 4,
      fields: [
        { name: 'value', type: 'text', required: true },
        { name: 'label', type: 'text', required: true },
      ],
    },
    {
      name: 'mission',
      type: 'group',
      fields: [
        { name: 'eyebrow', type: 'text', defaultValue: 'Why we exist' },
        { name: 'before', type: 'text', defaultValue: 'We build the software a business' },
        { name: 'highlight', type: 'text', defaultValue: 'runs on every day', admin: { description: 'Shown in the brand color.' } },
        { name: 'after', type: 'text', defaultValue: ', and we stay after launch to keep it running and growing.' },
        { name: 'attribution', type: 'text', defaultValue: 'Md Abdullah Al Safi, Founder & CEO' },
      ],
    },
    {
      name: 'founder',
      type: 'group',
      fields: [
        { name: 'name', type: 'text', defaultValue: 'Md Abdullah Al Safi' },
        { name: 'role', type: 'text', defaultValue: 'Founder & CEO' },
        { name: 'quote', type: 'textarea' },
        { name: 'bio', type: 'textarea' },
        { name: 'photo', type: 'upload', relationTo: 'media' },
        {
          type: 'row',
          fields: [
            { name: 'linkedin', type: 'text' },
            { name: 'github', type: 'text' },
          ],
        },
      ],
    },
    {
      name: 'teamHead',
      label: 'Team section',
      type: 'group',
      fields: [
        { name: 'eyebrow', type: 'text', defaultValue: 'Our team' },
        { name: 'title', type: 'text', defaultValue: 'The people who build your software' },
        { name: 'lead', type: 'textarea', defaultValue: 'Developers, designers, QA, project managers and marketers. Hover a card to read more.' },
      ],
    },
    sectionHead('principlesHead', 'Principles heading', { eyebrow: 'Principles', title: 'How we operate' }),
    {
      name: 'principles',
      type: 'array',
      fields: [iconField('check'), { name: 'title', type: 'text', required: true }, { name: 'text', type: 'textarea' }],
    },
  ],
}
