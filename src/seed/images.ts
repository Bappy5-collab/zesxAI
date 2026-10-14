/**
 * Stock photos (Unsplash License, free for commercial use) for the gallery, case studies and products.
 * Matched by title, so it can run on a fresh seed or on existing content. Skips items that already have their own image.
 */
import path from 'path'
import { fileURLToPath } from 'url'
import type { Payload } from 'payload'

const dir = path.join(path.dirname(fileURLToPath(import.meta.url)), 'assets')

const tiles: Record<string, [string, string]> = {
  'ERP dashboard': ['tile-erp-dashboard.jpg', 'Analytics dashboard with charts on a laptop'],
  'Dev studio': ['tile-dev-studio.jpg', 'Code editor open on a laptop in a dark studio'],
  'POS & inventory': ['tile-pos.jpg', 'Customer paying at a point of sale counter'],
  'AI assistant': ['tile-ai-assistant.jpg', 'Abstract AI illustration with neural connections'],
  'SaaS platform': ['tile-saas.jpg', 'SaaS dashboard on a laptop screen'],
  Reports: ['tile-reports.jpg', 'Business metrics and KPI reports on screen'],
  'Support desk': ['tile-support-desk.jpg', 'Support team working at their desks'],
  Inventory: ['tile-inventory.jpg', 'Warehouse with organised inventory shelves'],
}

const cases: Record<string, [string, string]> = {
  'One ERP instead of eleven spreadsheets': ['case-erp.jpg', 'ERP dashboard with sales and stock charts on a laptop'],
  'Point of sale that keeps working offline': ['case-pos.jpg', 'Retail checkout with a tablet point of sale'],
  'An assistant that answers from the docs': ['case-ai.jpg', 'AI assistant robot'],
}

const products: Record<string, [string, string]> = {
  Axzura: ['product-axzura.jpg', 'Team reviewing an office management dashboard'],
  'AI Voice Support': ['product-voice.jpg', 'AI voice assistant robot'],
  'Opus Site Score': ['product-site-score.jpg', 'Website score chart with growth trend'],
}

const services: Record<string, [string, string]> = {
  'ERP systems': ['service-erp.jpg', 'Warehouse aisles with stock managed by an ERP system'],
  'Business apps for SMBs': ['service-business-apps.jpg', 'Small business team celebrating at their desk'],
  'Web apps & SaaS': ['service-web-saas.jpg', 'Team working on laptops around a table'],
  'Mobile apps': ['service-mobile.jpg', 'Hand holding a phone with a mobile app dashboard'],
  'AI & automation': ['service-ai.jpg', 'Friendly humanoid AI robot'],
  'Cloud, DevOps & support': ['service-cloud.jpg', 'Server racks in a cloud data center'],
}

// Demo portraits, only for entries marked Sample. Replace with real photos before launch.
const team: Record<string, string> = {
  'Tech Lead': 'team-tech-lead.jpg',
  'Senior Full-stack Developer': 'team-fullstack.jpg',
  'Mobile Developer': 'team-mobile.jpg',
  'UI/UX Designer': 'team-designer.jpg',
  'QA Engineer': 'team-qa.jpg',
  'Project Manager': 'team-pm.jpg',
  'Marketing Lead': 'team-marketing.jpg',
}
// Sample reviews in order; video review i shows the same person as text review i.
const reviewers = Array.from({ length: 8 }, (_, i) => `client-${i + 1}.jpg`)

export async function attachImages(payload: Payload) {
  const upload = async ([file, alt]: [string, string]) => (await payload.create({ collection: 'media', data: { alt }, filePath: path.join(dir, file) })).id

  for (const s of (await payload.find({ collection: 'services', limit: 100, depth: 0 })).docs) {
    if (services[s.title] && !s.image) await payload.update({ collection: 'services', id: s.id, data: { image: await upload(services[s.title]) } })
  }
  for (const t of (await payload.find({ collection: 'gallery-tiles', limit: 100, depth: 1 })).docs) {
    const img = tiles[t.title]
    const cur = t.media as { mimeType?: string; filename?: string } | null
    // Replace only the shared sample stills, never videos or images someone uploaded.
    if (img && (!cur || cur.filename?.startsWith('hero-assembly-poster') || cur.filename?.startsWith('studio-loop-poster')))
      await payload.update({ collection: 'gallery-tiles', id: t.id, data: { media: await upload(img), poster: null } })
  }
  for (const c of (await payload.find({ collection: 'case-studies', limit: 100, depth: 0 })).docs) {
    if (cases[c.title] && !c.cover) await payload.update({ collection: 'case-studies', id: c.id, data: { cover: await upload(cases[c.title]) } })
  }
  for (const p of (await payload.find({ collection: 'products', limit: 100, depth: 0 })).docs) {
    if (products[p.name] && !p.image) await payload.update({ collection: 'products', id: p.id, data: { image: await upload(products[p.name]) } })
  }
  for (const m of (await payload.find({ collection: 'team-members', where: { isSample: { equals: true } }, limit: 100, depth: 0 })).docs) {
    if (team[m.role] && !m.photo) await payload.update({ collection: 'team-members', id: m.id, data: { photo: await upload([team[m.role], `${m.role} (sample portrait)`]) } })
  }
  const portraits = new Map<string, Awaited<ReturnType<typeof upload>>>()
  const portrait = async (file: string) => portraits.get(file) ?? portraits.set(file, await upload([file, 'Client portrait (sample)'])).get(file)!
  const sampleReviews = (await payload.find({ collection: 'reviews', where: { isSample: { equals: true } }, sort: 'order', limit: 100, depth: 0 })).docs
  for (const [i, r] of sampleReviews.filter((r) => r.kind === 'text').entries()) {
    if (reviewers[i] && !r.avatar) await payload.update({ collection: 'reviews', id: r.id, data: { avatar: await portrait(reviewers[i]) } })
  }
  for (const [i, r] of sampleReviews.filter((r) => r.kind === 'video').entries()) {
    if (reviewers[i] && !r.poster) await payload.update({ collection: 'reviews', id: r.id, data: { poster: await portrait(reviewers[i]) } })
  }
}
