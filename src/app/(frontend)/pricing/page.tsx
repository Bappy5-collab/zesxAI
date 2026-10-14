import { loadGlobal } from '@/lib/payload'
import { CtaBand, PageHero, SectionHead } from '@/components/sections'
import { PricingPlans, pricingLd } from '@/components/Pricing'
import { breadcrumbLd, faqLd, getSite, JsonLd, pageMetadata } from '@/lib/seo'

export async function generateMetadata() {
  const page = await loadGlobal('pricing-page')
  return pageMetadata({ meta: page.meta, path: '/pricing', title: page.hero?.title, description: page.hero?.lead, eyebrow: 'Pricing' })
}

export default async function PricingPage() {
  const [page, settings, site] = await Promise.all([loadGlobal('pricing-page'), loadGlobal('site-settings'), getSite()])
  const offers = pricingLd(page, site.url)
  const faq = faqLd(page.faq)
  return (
    <>
      <JsonLd data={breadcrumbLd(site.url, [{ name: 'Pricing', path: '/pricing' }])} />
      {offers && <JsonLd data={offers} />}
      {faq && <JsonLd data={faq} />}
      <PageHero head={page.hero} />
      <section className="zx-section" style={{ paddingTop: 0 }}>
        <div className="zx-wrap">
          <PricingPlans page={page} />
        </div>
      </section>
      {!!page.faq?.length && (
        <section className="zx-section" style={{ paddingTop: 0 }}>
          <div className="zx-wrap" style={{ maxWidth: 860 }}>
            <SectionHead head={page.faqHead} />
            <div style={{ display: 'grid', gap: 12 }}>
              {page.faq.map((f, i) => (
                <details className="zx-card zx-reveal" style={{ padding: '18px 24px' }} key={f.id || i}>
                  <summary style={{ cursor: 'pointer', fontWeight: 600, listStyle: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
                    {f.question}
                    <span className="zx-hl" aria-hidden="true">+</span>
                  </summary>
                  <p className="zx-muted" style={{ margin: '12px 0 0' }}>{f.answer}</p>
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
