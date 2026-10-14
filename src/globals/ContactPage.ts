import type { GlobalConfig } from 'payload'
import { pageHero } from './fields'

const options = (name: string, label: string, defaults: { value: string; title: string; text: string }[]) => ({
  name,
  label,
  type: 'array' as const,
  minRows: 2,
  fields: [
    { name: 'value', type: 'text' as const, required: true, admin: { description: 'Saved with the lead, e.g. "erp".' } },
    { name: 'title', type: 'text' as const, required: true },
    { name: 'text', type: 'text' as const },
  ],
  defaultValue: defaults,
})

export const ContactPage: GlobalConfig = {
  slug: 'contact-page',
  label: 'Contact page',
  admin: { group: 'Pages', description: 'Contact us: book a call (Calendly), ways to reach you, and the project brief. Brief submissions arrive in Inbox → Leads. Email, phone, WhatsApp, address and the Calendly link live in Site settings.' },
  access: { read: () => true },
  fields: [
    pageHero({
      eyebrow: 'Contact us',
      title: 'Book a call, or tell us what you want to build.',
      lead: 'Pick a 30-minute slot, message us on WhatsApp or email, or send a short brief. We reply within one business day.',
    }),
    {
      name: 'book',
      label: 'Book a call panel',
      type: 'group',
      fields: [
        { name: 'eyebrow', type: 'text', defaultValue: 'Book a call' },
        { name: 'title', type: 'text', defaultValue: 'Pick a 30-minute slot' },
        { name: 'text', type: 'textarea', defaultValue: 'A quick intro call with the team. Bring the problem; we bring questions and a rough plan.' },
        { name: 'reachTitle', label: 'Title above contact options', type: 'text', defaultValue: 'Other ways to reach us' },
      ],
    },
    {
      name: 'briefHead',
      label: 'Project brief heading',
      type: 'group',
      fields: [
        { name: 'eyebrow', type: 'text', defaultValue: 'Project brief' },
        { name: 'title', type: 'text', defaultValue: 'Prefer to write it down?' },
        { name: 'lead', type: 'textarea', defaultValue: 'Four quick steps. We come back with a call slot and first questions.' },
      ],
    },
    {
      name: 'steps',
      label: 'Step questions',
      type: 'group',
      fields: [
        { name: 'type', type: 'text', defaultValue: 'What are we building?' },
        { name: 'stage', type: 'text', defaultValue: 'Where are you today?' },
        { name: 'budget', type: 'text', defaultValue: 'Budget and timeline' },
        { name: 'contact', type: 'text', defaultValue: 'How do we reach you?' },
      ],
    },
    options('projectTypes', 'Project types (step 1)', [
      { value: 'erp', title: 'ERP system', text: 'Finance, inventory, HR, operations' },
      { value: 'biz', title: 'Business app', text: 'CRM, POS, booking, back office' },
      { value: 'saas', title: 'Web app / SaaS', text: 'Platform, portal or dashboard' },
      { value: 'mobile', title: 'Mobile app', text: 'iOS and Android' },
      { value: 'ai', title: 'AI & automation', text: 'Assistants, documents, workflows' },
      { value: 'other', title: 'Something else', text: 'Tell us in the last step' },
    ]),
    options('stages', 'Stages (step 2)', [
      { value: 'idea', title: 'New idea', text: 'Need scoping and a plan' },
      { value: 'replace', title: 'Replacing a system', text: 'Spreadsheets or old software today' },
      { value: 'live', title: 'Existing product', text: 'Need new features or a team' },
    ]),
    options('timelines', 'Timelines (step 3)', [
      { value: 'asap', title: 'ASAP', text: 'Start within 2 weeks' },
      { value: 'quarter', title: 'This quarter', text: 'Flexible start' },
      { value: 'explore', title: 'Exploring', text: 'Just scoping for now' },
    ]),
    {
      name: 'budget',
      type: 'group',
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'min', type: 'number', defaultValue: 3500 },
            { name: 'max', type: 'number', defaultValue: 150000 },
            { name: 'step', type: 'number', defaultValue: 500 },
            { name: 'start', type: 'number', defaultValue: 5500 },
          ],
        },
      ],
    },
    {
      name: 'done',
      label: 'After sending',
      type: 'group',
      fields: [
        { name: 'title', type: 'text', defaultValue: 'Brief received' },
        { name: 'text', type: 'textarea', defaultValue: 'We reply within one business day with a short call slot and first questions.' },
      ],
    },
    {
      name: 'nextSteps',
      label: 'What happens next',
      type: 'array',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'when', type: 'text' },
      ],
      defaultValue: [
        { title: 'We read your brief', when: 'Day 0' },
        { title: '30-min intro call', when: 'Day 1–2' },
        { title: 'Scope & fixed quote', when: 'Day 5' },
        { title: 'Kickoff', when: 'Week 2' },
      ],
    },
  ],
}
