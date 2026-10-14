import { loadAll, loadGlobal, mediaUrl } from '@/lib/payload'
import { ERP_GRAPH } from '@/lib/visuals'
import { Arrow } from '@/components/Icon'
import { PricingPlans, pricingLd } from '@/components/Pricing'
import { getSite, JsonLd, pageMetadata } from '@/lib/seo'
import { HeroScroll } from '@/components/motion'
import {
  CaseShowcase, ClientLogos, IntroFloat, PlatformTotals, CtaBand, FlowCanvas, Gallery, ProcessFlow, Products, SectionHead, ServiceBento, TextReviewRows, VideoReviews,
} from '@/components/sections'

export async function generateMetadata() {
  const home = await loadGlobal('home-page')
  const h = home.hero
  return pageMetadata({ meta: home.meta, path: '/', title: null, description: h?.lead, eyebrow: h?.eyebrow || undefined })
}

export default async function Home() {
  const [home, settings, proc, tiles, clients, services, reviews, cases, products, pricing, site] = await Promise.all([
    loadGlobal('home-page'),
    loadGlobal('site-settings'),
    loadGlobal('process-page'),
    loadAll('gallery-tiles'),
    loadAll('clients'),
    loadAll('services'),
    loadAll('reviews', { published: { equals: true }, featured: { equals: true } }),
    loadAll('case-studies', { featured: { equals: true } }),
    loadAll('products'),
    loadGlobal('pricing-page'),
    getSite(),
  ])
  const b = home.buttons
  const h = home.hero
  const video = reviews.filter((r) => r.kind === 'video')
  const text = reviews.filter((r) => r.kind === 'text')
  const stat = (v: string) => {
    const m = v.match(/^(\d+(?:\.\d+)?)(\D*)$/)
    return m ? { count: m[1], suffix: m[2] } : null
  }
  return (
    <>
      <section className="zx-hero zx-hero--backdrop" style={{ marginTop: -72 }}>
        {tiles.length > 0 && <Gallery tiles={tiles} />}
        <div className="zx-wrap">
          <HeroScroll>
          <div className="zx-hero__content">
            {h?.eyebrow && <span className="zx-eyebrow zx-reveal">{h.eyebrow}</span>}
            <h1 className="zx-h-display" data-split>
              {h?.titleBefore} {h?.titleHighlight && <span className="zx-hl">{h.titleHighlight}</span>} {h?.titleAfter}
            </h1>
            {h?.lead && (
              <p className="zx-lead zx-reveal" style={{ ['--d' as string]: '500ms' }}>
                {h.lead}
              </p>
            )}
            <div className="zx-hero__actions zx-reveal" style={{ ['--d' as string]: '650ms' }}>
              <a className="zx-btn zx-btn--primary" href="/contact#book" data-mag>
                {h?.primaryLabel || 'Book a call'} <Arrow />
              </a>
              <a className="zx-btn zx-btn--ghost" href="/work">
                {h?.secondaryLabel || 'See our work'}
              </a>
            </div>
            {!!h?.stats?.length && (
              <div className="zx-hero__meta zx-reveal" style={{ ['--d' as string]: '800ms' }}>
                {h.stats.map((s) => {
                  const c = stat(s.value)
                  return (
                    <div key={s.id || s.label}>
                      {c ? (
                        <b data-count={c.count} data-suffix={c.suffix}>
                          {s.value}
                        </b>
                      ) : (
                        <b>{s.value}</b>
                      )}
                      <span>{s.label}</span>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
          </HeroScroll>
        </div>
        <IntroFloat url={h?.intro?.videoUrl} label={h?.intro?.label} meta={h?.intro?.meta} thumb={mediaUrl(h?.intro?.thumbnail)} />
      </section>

      <ClientLogos clients={clients} eyebrow={home.clientsEyebrow} listings={settings.listings} />

      <section className="zx-section">
        <div className="zx-wrap">
          <SectionHead head={home.services} />
          <ServiceBento services={services} />
          <div style={{ marginTop: 32 }}>
            <a className="zx-btn zx-btn--ghost" href="/services">
              {b?.services || 'Explore our services'} <Arrow />
            </a>
          </div>
        </div>
      </section>

      <section className="zx-section" style={{ paddingTop: 0 }}>
        <div className="zx-wrap">
          <SectionHead head={home.system} />
          <FlowCanvas graph={home.erpGraph || ERP_GRAPH} id="rf-erp" label="Diagram: how an ERP connects your departments" />
        </div>
      </section>

      <section className="zx-section zx-glass-band">
        <div className="zx-wrap" style={{ display: 'grid', gap: 48, gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,420px),1fr))', alignItems: 'start' }}>
          <div style={{ position: 'sticky', top: 120, display: 'grid', gap: 16 }}>
            <SectionHead head={home.process} mb="0" />
            <a className="zx-btn zx-btn--ghost" href="/process" style={{ justifySelf: 'start' }}>
              {b?.process || 'See the full process'}
            </a>
          </div>
          <ProcessFlow steps={proc.steps || []} id="flow-home" />
        </div>
      </section>

      {(video.length > 0 || text.length > 0) && (
        <section className="zx-section" style={{ overflow: 'hidden' }}>
          <div className="zx-wrap">
            <SectionHead head={home.reviews} />
            <PlatformTotals items={settings.reviewPlatforms} />
            <VideoReviews reviews={video} id="reviews-home" />
          </div>
          {text.length > 0 && (
            <div style={{ marginTop: 'var(--space-12)' }}>
              <TextReviewRows reviews={text} />
            </div>
          )}
          <div className="zx-wrap" style={{ marginTop: 32 }}>
            <a className="zx-btn zx-btn--ghost" href="/reviews">
              {b?.reviews || 'Read all reviews'} <Arrow />
            </a>
          </div>
        </section>
      )}

      {cases.length > 0 && (
        <section className="zx-section">
          <div className="zx-wrap">
            <SectionHead head={home.cases} />
            <CaseShowcase cases={cases} />
          </div>
        </section>
      )}

      {home.showPricing !== false && !!pricing.plans?.length && (
        <section className="zx-section" id="pricing">
          <div className="zx-wrap">
            <SectionHead head={home.pricing} />
            <PricingPlans page={pricing} id="pricer-home" />
            <div style={{ marginTop: 24, display: 'flex', justifyContent: 'center' }}>
              <a className="zx-btn zx-btn--ghost" href="/pricing">
                {b?.pricing || 'Compare plans and FAQ'} <Arrow />
              </a>
            </div>
          </div>
          {pricingLd(pricing, site.url) && <JsonLd data={pricingLd(pricing, site.url)} />}
        </section>
      )}

      {products.length > 0 && (
        <section className="zx-section zx-glass-band">
          <div className="zx-wrap">
            <SectionHead head={home.products} />
            <Products products={products} />
          </div>
        </section>
      )}

      <CtaBand cta={settings.cta} />
    </>
  )
}
