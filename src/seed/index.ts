/**
 * Seeds the CMS with the starter content from the Zesxai design system.
 * Run once:  npm run seed        (SEED_FRESH=1 npm run seed wipes seeded content first)
 * Everything marked "Sample" is placeholder content: replace it in the admin with real, approved content.
 */
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'
import { getPayload } from 'payload'
import config from '@payload-config'
import { caseSeo, pageSeo, serviceSeo } from './seo-content'
import { attachImages } from './images'

const dir = path.dirname(fileURLToPath(import.meta.url))
const C = JSON.parse(fs.readFileSync(path.join(dir, 'content.json'), 'utf8'))
const list = (a: string[]) => a.map((value) => ({ value }))

const payload = await getPayload({ config })
const fresh = process.argv.includes('--fresh') || process.env.SEED_FRESH === '1'
const collections = ['services', 'case-studies', 'products', 'clients', 'gallery-tiles', 'reviews', 'team-members'] as const

if (fresh) {
  for (const c of [...collections, 'media' as const]) await payload.delete({ collection: c, where: { id: { exists: true } } })
} else {
  const { totalDocs } = await payload.count({ collection: 'services' })
  if (totalDocs) {
    payload.logger.info('Content already exists. Run with SEED_FRESH=1 to reseed.')
    process.exit(0)
  }
}

// ---- Admin user (optional, from env) ----
if (process.env.SEED_ADMIN_EMAIL && process.env.SEED_ADMIN_PASSWORD) {
  const { totalDocs } = await payload.count({ collection: 'users' })
  if (!totalDocs)
    await payload.create({ collection: 'users', data: { email: process.env.SEED_ADMIN_EMAIL, password: process.env.SEED_ADMIN_PASSWORD, name: 'Admin' } })
}

// ---- Media ----
const up = (file: string, alt: string) => payload.create({ collection: 'media', data: { alt }, filePath: path.join(dir, 'assets', file) })
const [aVid, aPos, sVid, sPos] = await Promise.all([
  up('hero-assembly.mp4', 'Software interface assembling in 3D (sample)'),
  up('hero-assembly-poster.jpg', 'Software interface (sample still)'),
  up('studio-loop.mp4', 'Development studio at night (sample)'),
  up('studio-loop-poster.jpg', 'Development studio (sample still)'),
])

// ---- Services ----
const visuals = ['erp', 'biz', 'web', 'mobile', 'ai', 'cloud'] as const
const serviceIds: (string | number)[] = []
for (const [i, [icon, title, summary, tags]] of (C.services as [string, string, string, string[]][]).entries()) {
  const x = serviceSeo[i]
  const doc = await payload.create({
    collection: 'services',
    data: {
      title, summary, icon: icon as never, tags: list(tags), visual: visuals[i], badge: i === 0 ? 'Most requested' : undefined, order: i,
      slug: x.slug, headline: x.headline, intro: x.intro, features: x.features, deliverables: list(x.deliverables), faq: x.faq, meta: x.meta,
    },
  })
  serviceIds.push(doc.id)
}

// ---- Hero gallery ----
const tiles: [string, 'v' | 'i', 'a' | 's', 'tall' | 'wide', string][] = [
  ['Product UI', 'v', 'a', 'tall', '1'], ['ERP dashboard', 'i', 'a', 'wide', '1'], ['Dev studio', 'i', 's', 'tall', '1'],
  ['Team at work', 'v', 's', 'wide', '2'], ['POS & inventory', 'i', 'a', 'tall', '2'], ['AI assistant', 'i', 's', 'wide', '2'],
  ['SaaS platform', 'i', 'a', 'wide', '3'], ['Build pipeline', 'v', 'a', 'tall', '3'], ['Reports', 'i', 's', 'wide', '3'],
  ['Support desk', 'i', 's', 'wide', '4'], ['Code review', 'v', 's', 'tall', '4'], ['Inventory', 'i', 'a', 'wide', '4'],
]
for (const [i, [title, kind, src, shape, column]] of tiles.entries()) {
  const media = kind === 'v' ? (src === 'a' ? aVid : sVid) : src === 'a' ? aPos : sPos
  const poster = kind === 'v' ? (src === 'a' ? aPos : sPos) : undefined
  await payload.create({ collection: 'gallery-tiles', data: { title, tag: 'Sample', media: media.id, poster: poster?.id, shape, column: column as never, isSample: true, order: i } })
}

// ---- Clients (placeholders) ----
for (const [i, [name, industry, project]] of (C.clients as string[][]).entries()) {
  await payload.create({ collection: 'clients', data: { name, industry, project, showInStrip: i < 10, order: i } })
}

// ---- Case studies (samples) ----
const mock: Record<number, 'dashboard' | 'pos' | 'chat'> = { 2: 'dashboard', 0: 'pos', 1: 'chat' }
for (const [i, c] of (C.cases as Record<string, never>[]).entries()) {
  await payload.create({
    collection: 'case-studies',
    data: {
      title: c.title, tabLabel: c.tab, type: (c.tag === 'Business app' ? 'Business apps' : c.tag) as never, industry: c.industry,
      challenge: c.challenge, built: c.built, outcome: c.outcome, stack: list(c.stack), mockup: mock[c.media as number],
      featured: true, isSample: true, order: i,
      slug: caseSeo[i]?.slug, summary: caseSeo[i]?.summary, service: serviceIds[caseSeo[i]?.service ?? 0] as never,
    },
  })
}

// ---- Products ----
const pm = ['office', 'voice', 'score'] as const
for (const [i, [name, icon, description, features]] of (C.products as [string, string, string, string[]][]).entries()) {
  await payload.create({ collection: 'products', data: { name, icon: icon as never, description, features: list(features), status: 'coming-soon', mockup: pm[i], order: i } })
}

// ---- Reviews: clearly marked samples only. Never add platform reviews without a link to the original. ----
for (const [i, [role, company, rating, quote]] of (C.text_reviews as [string, string, number, string][]).entries()) {
  await payload.create({
    collection: 'reviews',
    data: { kind: 'text', name: role, company, rating, quote, source: 'direct', published: true, featured: true, isSample: true, order: i },
  })
}
for (const [i, [role, company, duration, quote]] of (C.video_reviews as string[][]).entries()) {
  await payload.create({
    collection: 'reviews',
    data: { kind: 'video', name: role, company, rating: 5, quote, duration, source: 'direct', published: true, featured: true, isSample: true, order: 100 + i },
  })
}

// ---- Globals ----
const stepIcons = ['chat', 'file', 'code', 'shield', 'cloud', 'gear']
await payload.updateGlobal({
  slug: 'process-page',
  data: {
    steps: (C.flow as [string, string, string, string[]][]).map(([title, when, text, outs], i) => ({ title, when, text, icon: stepIcons[i] as never, deliverables: list(outs) })),
    stack: [['Frontend', 'Next.js'], ['Frontend', 'React'], ['Language', 'TypeScript'], ['Backend', 'Node.js'], ['Backend', 'Supabase'], ['Database', 'Postgres'], ['Cloud', 'AWS'], ['Cloud', 'Vercel'], ['Language', 'Python'], ['AI', 'Claude'], ['AI', 'OpenAI'], ['Payments', 'Stripe']].map(([category, name]) => ({ category, name })),
  },
})
await payload.updateGlobal({
  slug: 'services-page',
  data: {
    models: (C.models as [string, string, string, string[]][]).map(([name, duration, text, pts], i) => ({ name, duration, text, points: list(pts), highlight: i === 1 })),
    faq: (C.faq as string[][]).map(([question, answer]) => ({ question, answer })),
  },
})
await payload.updateGlobal({
  slug: 'about-page',
  data: {
    stats: [
      { value: '7+', label: 'Years shipping software' },
      { value: '6', label: 'Disciplines in one team' },
      { value: '1 team', label: 'From first call to support' },
    ],
    founder: {
      name: 'Md Abdullah Al Safi',
      role: 'Founder & CEO',
      quote: 'Every client gets the whole team: developers, design, QA and a project manager who answers the same day.',
      bio: 'Full-stack developer for 7+ years, leading the team across ERP, business software, SaaS, mobile and AI projects.',
    },
    principles: (C.values as string[][]).map(([title, text], i) => ({ title, text, icon: (['agent', 'chart', 'shield', 'lock'][i] || 'check') as never })),
  },
})

// ---- Team (placeholders except the founder). Replace in Content → Team. ----
const team: [string, string, string, string, boolean][] = [
  ['Md Abdullah Al Safi', 'Founder & CEO', 'Leadership', 'Full-stack developer for 7+ years. Leads architecture and delivery across ERP, SaaS, mobile and AI.', false],
  ['Alex Morgan', 'Tech Lead', 'Engineering', 'Owns architecture, code reviews and releases on client projects.', true],
  ['Priya Shah', 'Senior Full-stack Developer', 'Engineering', 'Next.js, Node.js and Postgres. Builds dashboards, portals and APIs.', true],
  ['Jordan Lee', 'Mobile Developer', 'Engineering', 'React Native apps for iOS and Android, offline first.', true],
  ['Maya Chen', 'UI/UX Designer', 'Design', 'Research, flows and interfaces that real users understand.', true],
  ['Sam Taylor', 'QA Engineer', 'Quality assurance', 'Manual and automated testing on every sprint.', true],
  ['Chris Rivera', 'Project Manager', 'Project management', 'Your single point of contact, weekly updates and clear timelines.', true],
  ['Taylor Brooks', 'Marketing Lead', 'Marketing', 'SEO, content, social and ads for Growth plan clients.', true],
]
for (const [i, [name, role, department, bio, isSample]] of team.entries()) {
  await payload.create({ collection: 'team-members', data: { name, role, department: department as never, bio, isSample, showInHero: i < 6, order: i } })
}
await payload.updateGlobal({
  slug: 'pricing-page',
  data: {
    plans: [
      {
        name: 'Basic', price: 3500, period: '/ month', subtitle: 'Your software, built and run', color: 'cyan',
        teamRoles: list(['Developers', 'UI/UX designer', 'QA engineer', 'Project manager']), ctaLabel: 'Start with Basic', ctaUrl: '/contact',
        description: 'For businesses that need their software built and run by a full team.',
        features: list(['Full team: developers, designer, QA and a project manager', 'Web app, portal or business system', 'Two-week sprints with a live demo', 'Hosting, monitoring and maintenance', 'Bug fixes and small improvements', 'Monthly progress report']),
      },
      {
        name: 'Growth', price: 5500, period: '/ month', subtitle: 'Software plus marketing', color: 'indigo',
        teamRoles: list(['Developers', 'UI/UX designer', 'QA engineer', 'Project manager', 'Marketing team']), highlight: true, badge: 'Most popular', ctaLabel: 'Start with Growth', ctaUrl: '/contact',
        description: 'For companies that want the software built and the marketing handled by one team.',
        features: list(['Everything in Basic', 'Web, mobile and AI features', 'Marketing: SEO, content and landing pages', 'Social media and ad campaign management', 'Analytics, tracking and a monthly growth report', 'Priority support, same-day response']),
      },
      {
        name: 'Custom', priceLabel: 'Custom', period: "Let's scope it", subtitle: 'ERP, many products, bigger team', color: 'amber',
        teamRoles: list(['Developers', 'UI/UX designer', 'QA engineer', 'Project manager', 'Marketing team', 'Solution architect', 'Tech lead']), ctaLabel: 'Talk to us', ctaUrl: '/contact',
        description: 'For ERP systems, multiple products or a larger engagement.',
        features: list(['Full team sized to your roadmap', 'Solution architect and tech lead', 'ERP, integrations and data migration', 'Full marketing and growth plan', 'SLA with agreed response times']),
      },
    ],
    notes: list(['You own the code', 'Prices in USD', 'Switch plans any month']),
    faq: [
      { question: 'What does a month include?', answer: 'Your full team: developers, a designer, QA and a project manager working on your roadmap, from planning and design to testing, deployment and support, with a demo every sprint.' },
      { question: 'What marketing is included in Growth?', answer: 'SEO, content and landing pages, social media and ad campaign management, and analytics with a monthly growth report, run by the same team that builds your software.' },
      { question: 'Can we change plans later?', answer: 'Yes. Move up or down between plans at the start of any month as your needs change.' },
      { question: 'Is there a minimum contract?', answer: 'Monthly plans run month to month with 30 days notice. Custom engagements can be monthly or fixed scope.' },
      { question: 'Do you also do fixed-price projects?', answer: 'Yes. For a well defined scope we can quote a fixed price after a short discovery sprint.' },
    ],
  },
})
const homeNow = await payload.findGlobal({ slug: 'home-page', depth: 0 })
await payload.updateGlobal({
  slug: 'home-page',
  data: {
    hero: {
      ...homeNow.hero,
      eyebrow: 'Custom software development company',
      lead: 'Custom software for growing businesses: ERP systems, business apps, SaaS platforms, mobile apps and AI. Designed, built and supported by an experienced team, shipping for 7+ years.',
    },
    meta: pageSeo['home-page'],
  } as never,
})
for (const slug of ['services-page', 'work-page', 'pricing-page', 'process-page', 'reviews-page', 'about-page', 'contact-page'] as const) {
  await payload.updateGlobal({ slug, data: { meta: pageSeo[slug] } as never })
}
await payload.updateGlobal({
  slug: 'site-settings',
  data: {
    metaDescription: pageSeo['home-page'].description,
    seo: {
      titleTemplate: '%s | Zesxai',
      defaultTitle: pageSeo['home-page'].title,
      keywords: 'custom software development company, ERP development, SaaS development, mobile app development, AI development, dedicated development team',
    },
    organization: { areaServed: 'Worldwide', city: 'Rajshahi', country: 'Bangladesh' },
    navCta: 'Book a call',
    // Add your real email, phone, WhatsApp number and Calendly link in the admin (Site settings).
    contact: { address: 'Rajshahi, Bangladesh', hours: 'Sun to Thu, 10am to 7pm GMT+6' },
    nav: [
      { label: 'Home', href: '/' },
      { label: 'Services', href: '/services' },
      { label: 'Work', href: '/work' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'Process', href: '/process' },
      { label: 'Reviews', href: '/reviews' },
      { label: 'About', href: '/about' },
    ],
    footerColumns: [
      {
        title: 'Services',
        links: serviceSeo.map((x, i) => ({ label: (C.services as string[][])[i][1], href: `/services/${x.slug}` })),
      },
      {
        title: 'Company',
        links: [
          { label: 'Work', href: '/work' },
          { label: 'Pricing', href: '/pricing' },
          { label: 'Process', href: '/process' },
          { label: 'About', href: '/about' },
        ],
      },
      {
        title: 'Clients',
        links: [
          { label: 'Reviews', href: '/reviews' },
          { label: 'Contact us', href: '/contact' },
        ],
      },
    ],
    // Replace these with your real profile URLs in the admin.
    social: [
      { label: 'LinkedIn', url: 'https://www.linkedin.com/' },
      { label: 'X', url: 'https://x.com/' },
      { label: 'GitHub', url: 'https://github.com/' },
    ],
    // Directory profiles. Add each profile URL in the admin; entries without a URL show but are not clickable.
    listings: [
      { name: 'GoodFirms', note: 'Company profile' },
      { name: 'DesignRush', note: 'Agency listing' },
      { name: 'Clutch', note: 'Reviews & profile' },
      { name: 'Product Hunt', note: 'Our products' },
      { name: 'Upwork', note: 'Agency profile' },
    ],
  },
})

await attachImages(payload)
payload.logger.info('Seed complete.')
process.exit(0)
