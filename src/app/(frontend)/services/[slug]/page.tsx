import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getClient, loadGlobal, serviceImage, values } from '@/lib/payload'
import { Arrow, Icon, Svg } from '@/components/Icon'
import { Check } from '@/components/Pricing'
import { CtaBand, SectionHead } from '@/components/sections'
import { StaggerIn } from '@/components/motion'
import { bentoVisuals } from '@/lib/visuals'
import { breadcrumbLd, faqLd, getSite, JsonLd, pageMetadata } from '@/lib/seo'

type Props = { params: Promise<{ slug: string }> }

async function getService(slug: string) {
  const payload = await getClient()
  const res = await payload.find({ collection: 'services', where: { slug: { equals: slug } }, limit: 1, depth: 1 })
  return res.docs[0]
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const s = await getService(slug)
  if (!s) return {}
  return pageMetadata({ meta: s.meta, path: `/services/${s.slug}`, title: s.headline || s.title, description: s.intro || s.summary, eyebrow: 'Service' })
}

export default async function ServiceDetail({ params }: Props) {
  const { slug } = await params
  const s = await getService(slug)
  if (!s) notFound()
  const payload = await getClient()
  const [settings, site, cases, others] = await Promise.all([
    loadGlobal('site-settings'),
    getSite(),
    payload.find({ collection: 'case-studies', where: { service: { equals: s.id } }, limit: 3, depth: 1 }),
    payload.find({ collection: 'services', where: { id: { not_equals: s.id } }, sort: 'order', limit: 6, depth: 0 }),
  ])
  const faq = faqLd(s.faq)
  const serviceLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: s.headline || s.title,
    serviceType: s.title,
    description: s.intro || s.summary,
    url: `${site.url}/services/${s.slug}`,
    provider: { '@id': `${site.url}/#organization` },
    areaServed: settings.organization?.areaServed || 'Worldwide',
  }
  return (
    <>
      <JsonLd data={serviceLd} />
      <JsonLd data={breadcrumbLd(site.url, [{ name: 'Services', path: '/services' }, { name: s.title, path: `/services/${s.slug}` }])} />
      {faq && <JsonLd data={faq} />}

      <section className="zx-section" style={{ paddingTop: 130, paddingBottom: 'var(--space-12)' }}>
        <div className="zx-wrap zx-detail-grid" style={{ alignItems: 'center' }}>
          <div style={{ display: 'grid', gap: 20 }}>
            <nav className="zx-crumbs" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span>/</span>
              <Link href="/services">Services</Link>
              <span>/</span>
              <span aria-current="page">{s.title}</span>
            </nav>
            <h1 className="zx-h-page" data-split style={{ maxWidth: '18ch' }}>
              {s.headline || s.title}
            </h1>
            <p className="zx-lead zx-reveal" style={{ ['--d' as string]: '300ms' }}>
              {s.intro || s.summary}
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }} className="zx-reveal">
              <a className="zx-btn zx-btn--primary" href="/contact#book" data-mag>
                Book a call <Arrow />
              </a>
              <a className="zx-btn zx-btn--ghost" href="/pricing">
                See pricing
              </a>
            </div>
          </div>
          <div className="zx-bcard zx-reveal" style={{ minHeight: 280 }}>
            <div className="zx-bcard__top">
              <div className="zx-bcard__icon">
                <Icon name={s.icon || 'stack'} inline />
              </div>
            </div>
            <div className="zx-bcard__tags">
              {values(s.tags).map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
            <div className="zx-bcard__visual">
              {serviceImage(s) ? <img src={serviceImage(s)!} alt={s.title} loading="lazy" /> : <Svg html={bentoVisuals[s.visual || 'web'] || bentoVisuals.web} />}
            </div>
          </div>
        </div>
      </section>

      <section className="zx-section" style={{ paddingTop: 0 }}>
        <div className="zx-wrap zx-detail-grid">
          <div style={{ display: 'grid', gap: 'var(--space-12)' }}>
            {!!s.features?.length && (
              <div>
                <SectionHead head={{ eyebrow: 'What we build', title: `${s.title}: what is included` }} mb="var(--space-8)" />
                <StaggerIn className="zx-feature-list" gap={0.06}>
                  {s.features.map((f, i) => (
                    <div className="zx-feature" key={f.id || i}>
                      <h3>{f.title}</h3>
                      {f.text && <p>{f.text}</p>}
                    </div>
                  ))}
                </StaggerIn>
              </div>
            )}
            {!!s.faq?.length && (
              <div>
                <SectionHead head={{ eyebrow: 'FAQ', title: `${s.title} questions` }} mb="var(--space-8)" />
                <div style={{ display: 'grid', gap: 12 }}>
                  {s.faq.map((f, i) => (
                    <details className="zx-card" style={{ padding: '18px 24px' }} key={f.id || i}>
                      <summary style={{ cursor: 'pointer', fontWeight: 600, listStyle: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
                        <h3 style={{ margin: 0, font: 'inherit' }}>{f.question}</h3>
                        <span className="zx-hl" aria-hidden="true">+</span>
                      </summary>
                      <p className="zx-muted" style={{ margin: '12px 0 0' }}>{f.answer}</p>
                    </details>
                  ))}
                </div>
              </div>
            )}
          </div>
          <aside className="zx-aside">
            <span className="zx-eyebrow">What you get</span>
            <ul>
              {(values(s.deliverables).length ? values(s.deliverables) : ['Full team: developers, designer, QA and a project manager', 'A demo every sprint', 'Your code, your cloud, your data']).map((d) => (
                <li key={d}>
                  <Check />
                  <span>{d}</span>
                </li>
              ))}
            </ul>
            <a className="zx-btn zx-btn--primary" href="/contact" style={{ justifyContent: 'center' }}>
              Get a quote <Arrow />
            </a>
          </aside>
        </div>
      </section>

      {cases.docs.length > 0 && (
        <section className="zx-section" style={{ paddingTop: 0 }}>
          <div className="zx-wrap">
            <SectionHead head={{ eyebrow: 'Case studies', title: `${s.title} we have shipped` }} />
            <div className="zx-grid">
              {cases.docs.map((c) => (
                <a className="zx-card" href={`/work/${c.slug}`} key={c.id} style={{ display: 'grid', gap: 8 }}>
                  <span className="zx-mono zx-muted" style={{ fontSize: 11 }}>
                    {c.type}
                    {c.isSample ? ' · Sample' : ''}
                  </span>
                  <b style={{ fontSize: 18 }}>{c.title}</b>
                  <span className="zx-muted">{c.summary || c.challenge}</span>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {others.docs.length > 0 && (
        <section className="zx-section" style={{ paddingTop: 0 }}>
          <div className="zx-wrap">
            <SectionHead head={{ eyebrow: 'More services', title: 'Other things we build' }} mb="var(--space-6)" />
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {others.docs.map((o) => (
                <a className="zx-btn zx-btn--ghost" href={`/services/${o.slug}`} key={o.id}>
                  {o.title} <Arrow />
                </a>
              ))}
            </div>
          </div>
        </section>
      )}
      <CtaBand cta={settings.cta} />
    </>
  )
}
