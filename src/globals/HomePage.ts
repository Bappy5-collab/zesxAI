import type { GlobalConfig } from 'payload'
import { sectionHead } from './fields'
import { ERP_GRAPH } from '../lib/visuals'

export const HomePage: GlobalConfig = {
  slug: 'home-page',
  label: 'Home page',
  admin: { group: 'Pages' },
  access: { read: () => true },
  fields: [
    {
      name: 'hero',
      type: 'group',
      fields: [
        { name: 'eyebrow', type: 'text', defaultValue: 'Software development company' },
        { name: 'titleBefore', type: 'text', defaultValue: 'We build' },
        { name: 'titleHighlight', type: 'text', defaultValue: 'software', admin: { description: 'Shown in the brand color.' } },
        { name: 'titleAfter', type: 'text', defaultValue: 'that runs your business.' },
        {
          name: 'lead',
          type: 'textarea',
          defaultValue:
            'ERP systems, business apps, SaaS platforms, mobile apps and AI. Designed, built and supported by an experienced team of developers, shipping for 7+ years.',
        },
        { name: 'primaryLabel', type: 'text', defaultValue: 'Book a call' },
        {
          name: 'intro',
          label: 'Intro video button',
          type: 'group',
          admin: { description: 'Floating "Watch our intro" button in the bottom-right corner of the home hero. It only shows once a video link is set.' },
          fields: [
            {
              name: 'videoUrl',
              type: 'text',
              admin: { description: 'YouTube, Vimeo or Loom link (normal share link is fine), or any embeddable iframe URL.' },
            },
            { name: 'label', type: 'text', defaultValue: 'Watch our intro' },
            { name: 'meta', type: 'text', defaultValue: '1 min video', admin: { description: 'Small blinking line under the label.' } },
            { name: 'thumbnail', type: 'upload', relationTo: 'media', admin: { description: 'Optional still for the round thumbnail (e.g. your face or the first frame).' } },
          ],
        },
        { name: 'secondaryLabel', type: 'text', defaultValue: 'See our work' },
        {
          name: 'stats',
          type: 'array',
          maxRows: 4,
          fields: [
            { name: 'value', type: 'text', required: true },
            { name: 'label', type: 'text', required: true },
          ],
          defaultValue: [
            { value: '7+', label: 'Years building software' },
            { value: 'ERP · SaaS', label: 'Business systems' },
            { value: 'Web · Mobile', label: 'Apps and AI' },
          ],
        },
      ],
    },
    { name: 'clientsEyebrow', type: 'text', defaultValue: 'Companies we have worked with' },
    sectionHead('services', 'Services section', {
      eyebrow: 'What we do',
      title: 'One experienced team for every kind of software.',
      lead: 'From a full ERP to a small business app, we plan, design, build, launch and support it, with AI where it actually helps.',
    }),
    sectionHead('system', 'ERP diagram section', {
      eyebrow: 'How your system connects',
      title: 'Every department on one connected system.',
      lead: 'A typical ERP we build: sales, shops, purchasing and HR feed one core; finance, inventory, reports and the mobile app read from it in real time. Drag the modules around.',
    }),
    {
      name: 'erpGraph',
      label: 'ERP diagram (JSON)',
      type: 'json',
      defaultValue: ERP_GRAPH,
      admin: { description: 'Modules and connections of the ERP diagram. Edit titles and texts; keep ids and positions.' },
    },
    sectionHead('process', 'How we work section', {
      eyebrow: 'How we work',
      title: 'A clear process from first call to go-live.',
      lead: 'Six steps, each with a timeframe and a deliverable you can hold us to.',
    }),
    sectionHead('reviews', 'Reviews section', { eyebrow: 'What clients say', title: 'Hear it from the businesses we build for.' }),
    sectionHead('cases', 'Case studies section', { eyebrow: 'Case studies', title: 'Real problems, the systems we built, and what changed.' }),
    sectionHead('pricing', 'Pricing section', {
      eyebrow: 'Pricing',
      title: 'Simple monthly plans, a full team on every one.',
      lead: 'Every plan includes developers, a designer, QA and a project manager. Growth adds marketing.',
    }),
    { name: 'showPricing', label: 'Show pricing on the home page', type: 'checkbox', defaultValue: true },
    sectionHead('products', 'Products section', {
      eyebrow: 'Our products',
      title: 'Software we build and run ourselves.',
      lead: 'Beyond client work, our team builds its own products. The same people, the same standards.',
    }),
    {
      name: 'buttons',
      label: 'Section button labels',
      type: 'group',
      fields: [
        { name: 'services', type: 'text', defaultValue: 'Explore our services' },
        { name: 'process', type: 'text', defaultValue: 'See the full process' },
        { name: 'reviews', type: 'text', defaultValue: 'Read all reviews' },
        { name: 'pricing', type: 'text', defaultValue: 'Compare plans and FAQ' },
      ],
    },
  ],
}
