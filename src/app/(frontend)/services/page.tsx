import { loadAll, loadGlobal, values } from '@/lib/payload'
import { CtaBand, PageHero, SectionHead, ServiceBento } from '@/components/sections'
import { breadcrumbLd, faqLd, getSite, JsonLd, pageMetadata } from '@/lib/seo'

export async function generateMetadata() {
  const page = await loadGlobal('services-page')
  return pageMetadata({ meta: page.meta, path: '/services', title: page.hero?.title, description: page.hero?.lead, eyebrow: 'Services' })
}

export default async function ServicesPage() {
  const [page, settings, services, site] = await Promise.all([loadGlobal('services-page'), loadGlobal('site-settings'), loadAll('services'), getSite()])
  const faq = faqLd(page.faq)
  return (
    <>
      <JsonLd data={breadcrumbLd(site.url, [{ name: 'Services', path: '/services' }])} />
      {faq && <JsonLd data={faq} />}
      <PageHero head={page.hero} />
      <section className="zx-section" style={{ paddingTop: 0 }}>
        <div className="zx-wrap">
          <ServiceBento services={services} />
        </div>
      </section>
      {!!page.models?.length && (
        <section className="zx-section" style={{ paddingTop: 0 }}>
          <div className="zx-wrap">
            <SectionHead head={page.modelsHead} />
            <div className="zx-grid">
              {page.models.map((m, i) => (
                <article
                  key={m.id || i}
                  className="zx-card zx-reveal"
                  style={{ display: 'grid', gap: 14, alignContent: 'start', ['--d' as string]: `${i * 100}ms`, ...(m.highlight ? { borderColor: 'var(--brand-ink)' } : {}) }}
                >
                  <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
                    <h3 className="zx-h3">{m.name}</h3>
                    {m.duration && <span className={`zx-chip ${m.highlight ? 'zx-chip--live' : 'zx-chip--plain'}`}>{m.highlight ? `Most chosen · ${m.duration}` : m.duration}</span>}
                  </div>
                  <p className="zx-muted" style={{ margin: 0 }}>
                    {m.text}
                  </p>
                  <ul className="zx-step__out" style={{ gridTemplateColumns: '1fr' }}>
                    {values(m.points).map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                  <a className={`zx-btn ${m.highlight ? 'zx-btn--primary' : 'zx-btn--ghost'}`} href="/contact" style={{ justifySelf: 'start' }}>
                    Talk to us
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
      {!!page.faq?.length && (
        <section className="zx-section" style={{ paddingTop: 0 }}>
          <div className="zx-wrap" style={{ maxWidth: 860 }}>
            <SectionHead head={page.faqHead} />
            <div style={{ display: 'grid', gap: 12 }}>
              {page.faq.map((f, i) => (
                <details className="zx-card zx-reveal" style={{ padding: '18px 24px' }} key={f.id || i}>
                  <summary style={{ cursor: 'pointer', fontWeight: 600, listStyle: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
                    {f.question}
                    <span className="zx-hl" aria-hidden="true">
                      +
                    </span>
                  </summary>
                  <p className="zx-muted" style={{ margin: '12px 0 0' }}>
                    {f.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}
      <CtaBand cta={settings.cta} />
    </>
  )
}
