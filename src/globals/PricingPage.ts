import type { GlobalConfig } from 'payload'
import { pageHero, sectionHead } from './fields'

export const PricingPage: GlobalConfig = {
  slug: 'pricing-page',
  label: 'Pricing page',
  admin: { group: 'Pages' },
  access: { read: () => true },
  fields: [
    pageHero({
      eyebrow: 'Pricing',
      title: 'Simple monthly plans, a full team on every one.',
      lead: 'Pick a plan, and the same experienced team builds, launches and supports your software every month.',
    }),
    {
      name: 'plans',
      type: 'array',
      maxRows: 4,
      admin: { description: 'Monthly plans, left to right. Leave the price empty for a "Custom" plan.' },
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'name', type: 'text', required: true },
            { name: 'price', label: 'Price (USD / month)', type: 'number', min: 0 },
            { name: 'priceLabel', type: 'text', admin: { description: 'Shown instead of a number, e.g. "Custom".' } },
          ],
        },
        {
          type: 'row',
          fields: [
            { name: 'period', type: 'text', defaultValue: '/ month' },
            { name: 'badge', type: 'text', admin: { description: 'e.g. "Most popular"' } },
            { name: 'highlight', type: 'checkbox', defaultValue: false },
          ],
        },
        {
          type: 'row',
          fields: [
            { name: 'subtitle', type: 'text', admin: { description: 'Short line in the plan list, e.g. "Software plus marketing".' } },
            {
              name: 'color',
              type: 'select',
              defaultValue: 'indigo',
              options: [
                { label: 'Sage', value: 'cyan' },
                { label: 'Amber', value: 'indigo' },
                { label: 'Coral', value: 'amber' },
                { label: 'Rose', value: 'coral' },
                { label: 'Gold', value: 'green' },
              ],
            },
          ],
        },
        { name: 'description', type: 'textarea' },
        {
          name: 'teamRoles',
          label: 'Your team (roles)',
          type: 'array',
          admin: { description: 'Roles included in this plan. Roles not in the previous plan get a "New" tag.' },
          fields: [{ name: 'value', type: 'text', required: true }],
        },
        { name: 'features', type: 'array', fields: [{ name: 'value', type: 'text', required: true }] },
        {
          type: 'row',
          fields: [
            { name: 'ctaLabel', type: 'text', defaultValue: 'Get started' },
            { name: 'ctaUrl', type: 'text', defaultValue: '/contact' },
          ],
        },
      ],
    },
    {
      name: 'help',
      label: '"Not sure" box',
      type: 'group',
      fields: [
        { name: 'title', type: 'text', defaultValue: 'Not sure which plan fits?' },
        { name: 'text', type: 'textarea', defaultValue: 'Tell us what you are building and we will recommend a plan on a 30-minute call.' },
        { name: 'button', type: 'text', defaultValue: 'Get a recommendation' },
      ],
    },
    { name: 'billingNote', type: 'text', defaultValue: 'Billed monthly · cancel with 30 days notice' },
    { name: 'notes', label: 'Notes under the plans', type: 'array', fields: [{ name: 'value', type: 'text', required: true }] },
    sectionHead('faqHead', 'FAQ heading', { eyebrow: 'Pricing FAQ', title: 'Questions about plans' }),
    {
      name: 'faq',
      label: 'Pricing FAQ',
      type: 'array',
      fields: [
        { name: 'question', type: 'text', required: true },
        { name: 'answer', type: 'textarea', required: true },
      ],
    },
  ],
}
