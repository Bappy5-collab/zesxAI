import type { GlobalConfig } from 'payload'
import { pageHero, sectionHead } from './fields'

export const ServicesPage: GlobalConfig = {
  slug: 'services-page',
  label: 'Services page',
  admin: { group: 'Pages' },
  access: { read: () => true },
  fields: [
    pageHero({
      eyebrow: 'Services',
      title: 'Every kind of software your business runs on.',
      lead: 'ERP, business apps, SaaS, mobile and AI. Every project includes planning, design, development, testing, launch and support.',
    }),
    sectionHead('modelsHead', 'Engagement models heading', { eyebrow: 'Ways to work with us', title: 'Engagement models.' }),
    {
      name: 'models',
      label: 'Engagement models',
      type: 'array',
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'duration', type: 'text' },
        { name: 'text', type: 'textarea' },
        { name: 'points', type: 'array', fields: [{ name: 'value', type: 'text', required: true }] },
        { name: 'highlight', type: 'checkbox', defaultValue: false },
      ],
    },
    sectionHead('faqHead', 'FAQ heading', { eyebrow: 'FAQ', title: 'Questions we hear a lot' }),
    {
      name: 'faq',
      label: 'FAQ',
      type: 'array',
      fields: [
        { name: 'question', type: 'text', required: true },
        { name: 'answer', type: 'textarea', required: true },
      ],
    },
  ],
}
