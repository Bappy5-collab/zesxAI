import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Service } from '@/payload-types'
import { getClient, isVideo, loadGlobal, mediaUrl, values } from '@/lib/payload'
import { Arrow, Svg } from '@/components/Icon'
import { CtaBand } from '@/components/sections'
import { caseMockups } from '@/lib/visuals'
import { breadcrumbLd, getSite, JsonLd, pageMetadata } from '@/lib/seo'

type Props = { params: Promise<{ slug: string }> }

async function getCase(slug: string) {
  const payload = await getClient()
  const res = await payload.find({ collection: 'case-studies', where: { slug: { equals: slug } }, limit: 1, depth: 1 })
  return res.docs[0]
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const c = await getCase(slug)
  if (!c) return {}
  return pageMetadata({ meta: c.meta, path: `/work/${c.slug}`, title: `${c.title}: ${c.tabLabel}`, description: c.summary || c.challenge, eyebrow: `Case study · ${c.type}`, type: 'article' })
}

export default async function CaseDetail({ params }: Props) {
  const { slug } = await params
  const c = await getCase(slug)
  if (!c) notFound()
  const [settings, site] = await Promise.all([loadGlobal('site-settings'), getSite()])
  const cover = mediaUrl(c.cover)
  const service = c.service && typeof c.service === 'object' ? (c.service as Service) : null
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: c.title,
    about: c.tabLabel,
    description: c.summary || c.challenge,
    url: `${site.url}/work/${c.slug}`,
    image: cover ? `${site.url}${cover}` : `${site.url}/og?title=${encodeURIComponent(c.title)}&eyebrow=Case%20study`,
    datePublished: c.createdAt,
    dateModified: c.updatedAt,
    author: { '@id': `${site.url}/#organization` },
    publisher: { '@id': `${site.url}/#organization` },
  }
  return (
    <>
      <JsonLd data={ld} />
      <JsonLd data={breadcrumbLd(site.url, [{ name: 'Work', path: '/work' }, { name: c.title, path: `/work/${c.slug}` }])} />
      <section className="zx-section" style={{ paddingTop: 130, paddingBottom: 'var(--space-8)' }}>
        <div className="zx-wrap" style={{ display: 'grid', gap: 20 }}>
          <nav className="zx-crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href="/work">Work</Link>
            <span>/</span>
            <span aria-current="page">{c.tabLabel}</span>
          </nav>
          <div className="zx-case__row">
            {c.isSample && <span className="zx-chip zx-chip--plain">Sample case</span>}
            {c.industry && <span className="zx-chip zx-chip--done">{c.industry}</span>}
            <span className="zx-chip zx-chip--plain">{c.type}</span>
          </div>
          <h1 className="zx-h-page" data-split style={{ maxWidth: '20ch' }}>
            {c.title}
          </h1>
          {(c.summary || c.tabLabel) && <p className="zx-lead zx-reveal">{c.summary || c.tabLabel}</p>}
        </div>
      </section>
      <section className="zx-section" style={{ paddingTop: 0 }}>
        <div className="zx-wrap" style={{ display: 'grid', gap: 'var(--space-12)' }}>
          <div className="zx-cover zx-reveal">
            {cover ? isVideo(c.cover) ? <video src={cover} autoPlay muted loop playsInline /> : <img src={cover} alt={c.title} /> : <Svg html={(caseMockups[c.mockup || 'dashboard'] || caseMockups.dashboard).replace('xMidYMid slice', 'xMidYMid meet')} />}
          </div>
          {!!c.results?.length && (
            <div className="zx-results">
              {c.results.map((r, i) => (
                <div key={r.id || i}>
                  <b>{r.value}</b>
                  <span>{r.label}</span>
                </div>
              ))}
            </div>
          )}
          <div className="zx-detail-grid">
            <article className="zx-prose">
              <section>
                <h2>The challenge</h2>
                <p>{c.challenge}</p>
              </section>
              <section>
                <h2>What we built</h2>
                <p>{c.built}</p>
              </section>
              <section>
                <h2>The outcome</h2>
                <p>{c.outcome}</p>
              </section>
            </article>
            <aside className="zx-aside">
              <span className="zx-eyebrow">Project</span>
              <dl style={{ margin: 0, display: 'grid', gap: 12 }}>
                {c.industry && (
                  <div>
                    <dt className="zx-mono zx-muted" style={{ fontSize: 11 }}>Industry</dt>
                    <dd style={{ margin: 0 }}>{c.industry}</dd>
                  </div>
                )}
                <div>
                  <dt className="zx-mono zx-muted" style={{ fontSize: 11 }}>Type</dt>
                  <dd style={{ margin: 0 }}>{service ? <a href={`/services/${service.slug}`}>{service.title}</a> : c.type}</dd>
                </div>
                {!!values(c.stack).length && (
                  <div>
                    <dt className="zx-mono zx-muted" style={{ fontSize: 11 }}>Stack</dt>
                    <dd style={{ margin: '6px 0 0' }} className="zx-case__row">
                      {values(c.stack).map((t) => (
                        <span className="zx-chip zx-chip--plain" key={t}>{t}</span>
                      ))}
                    </dd>
                  </div>
                )}
              </dl>
              <a className="zx-btn zx-btn--primary" href="/contact" style={{ justifyContent: 'center' }}>
                Build something similar <Arrow />
              </a>
            </aside>
          </div>
        </div>
      </section>
      <CtaBand cta={settings.cta} />
    </>
  )
}
