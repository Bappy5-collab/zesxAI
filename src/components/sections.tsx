import React from 'react'
import type { CaseStudy, Client, GalleryTile, Product, Review, Service, SiteSetting } from '@/payload-types'
import { Arrow, Icon, Svg } from './Icon'
import { MotionHead, StaggerIn } from './motion'
import { icons } from '@/lib/icons'
import { bentoVisuals, caseMockups, productMockups, STAR } from '@/lib/visuals'
import { isVideo, mediaUrl, serviceImage, values } from '@/lib/payload'

type Head = { eyebrow?: string | null; title?: string | null; lead?: string | null } | null | undefined

export function SectionHead({ head, mb = 'var(--space-12)' }: { head: Head; mb?: string }) {
  if (!head) return null
  return <MotionHead eyebrow={head.eyebrow} title={head.title} lead={head.lead} mb={mb} />
}

export function PageHero({ head }: { head: Head }) {
  return (
    <section className="zx-section" style={{ paddingTop: 140, paddingBottom: 'var(--space-12)' }}>
      <div className="zx-wrap" style={{ display: 'grid', gap: 20 }}>
        {head?.eyebrow && <span className="zx-eyebrow">{head.eyebrow}</span>}
        <h1 className="zx-h-page" data-split style={{ maxWidth: '18ch' }}>
          {head?.title}
        </h1>
        {head?.lead && (
          <p className="zx-lead zx-reveal" style={{ ['--d' as string]: '300ms' }}>
            {head.lead}
          </p>
        )}
      </div>
    </section>
  )
}

/* ---------------- Hero gallery backdrop ---------------- */
function Tile({ t }: { t: GalleryTile }) {
  const src = mediaUrl(t.media)
  const poster = mediaUrl(t.poster) || undefined
  const ar = t.shape === 'wide' ? '16 / 12' : '4 / 5'
  return (
    <figure className="zx-tile" style={{ ['--ar' as string]: ar }}>
      {isVideo(t.media) ? (
        <>
          <video autoPlay muted loop playsInline preload="metadata" poster={poster} src={src || undefined} />
          <span className="zx-tile__play" aria-hidden="true">
            <Icon name="play" inline />
          </span>
        </>
      ) : (
        src && <img src={src} alt="" loading="lazy" />
      )}
      <figcaption>
        {t.title}
        <span>{t.isSample ? 'Sample' : t.tag}</span>
      </figcaption>
    </figure>
  )
}

export function Gallery({ tiles, images, id = 'gallery-home' }: { tiles: GalleryTile[]; images?: string[]; id?: string }) {
  if (images?.length) {
    const imageCols: string[][] = [[], [], [], []]
    images.forEach((src, i) => imageCols[i % imageCols.length].push(src))
    return (
      <div className="zx-gallery-wrap">
        <div className="zx-gallery" id={id} aria-hidden="true">
          {imageCols.map((col, i) => (
            <div className="zx-gallery__col" key={i}>
              {col.map((src, j) => (
                <figure className="zx-tile" style={{ ['--ar' as string]: (i + j) % 3 === 0 ? '16 / 12' : '4 / 5' }} key={src}>
                  <img src={src} alt="" loading={j > 0 ? 'lazy' : 'eager'} />
                </figure>
              ))}
            </div>
          ))}
        </div>
      </div>
    )
  }
  const cols: GalleryTile[][] = [[], [], [], []]
  tiles.forEach((t) => cols[Math.max(0, Math.min(3, Number(t.column || 1) - 1))].push(t))
  const used = cols.filter((c) => c.length)
  return (
    <div className="zx-gallery-wrap">
      <div className="zx-gallery" id={id} aria-label="Project gallery">
        {used.map((c, i) => (
          <div className="zx-gallery__col" key={i}>
            {c.map((t) => (
              <Tile t={t} key={t.id} />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

/* ---------------- Clients strip + dialog ---------------- */
type Listing = NonNullable<SiteSetting['listings']>[number]

export function Listings({ items }: { items?: Listing[] | null }) {
  if (!items?.length) return null
  return (
    <div className="zx-listings">
      <span className="zx-eyebrow">Find us on</span>
      {items.map((l, i) => {
        const badge = mediaUrl(l.badge)
        const inner = (
          <>
            <span className="zx-listing__mark" aria-hidden="true">
              {badge ? <img src={badge} alt="" /> : l.name.trim()[0]}
            </span>
            <span className="zx-listing__txt">
              <b>{l.name}</b>
              {l.note && <span>{l.note}</span>}
            </span>
            {l.url && <Arrow />}
          </>
        )
        return l.url ? (
          <a className="zx-listing" href={l.url} target="_blank" rel="noopener noreferrer" key={l.id || i}>
            {inner}
          </a>
        ) : (
          <div className="zx-listing" key={l.id || i}>
            {inner}
          </div>
        )
      })}
    </div>
  )
}

export function ClientLogos({ clients, eyebrow, listings }: { clients: Client[]; eyebrow?: string | null; listings?: Listing[] | null }) {
  if (!clients.length && !listings?.length) return null
  const industries = Array.from(new Set(clients.map((c) => c.industry).filter(Boolean))) as string[]
  const strip = clients.filter((c) => c.showInStrip)
  const Logo = ({ c, label }: { c: Client; label?: string }) => {
    const u = mediaUrl(c.logo)
    return u ? (
      <div className="zx-logo-slot zx-logo-slot--img">
        <img src={u} alt={c.name} />
      </div>
    ) : (
      <div className="zx-logo-slot" title="Upload a logo in the CMS">
        <i />
        {label ?? c.name}
      </div>
    )
  }
  return (
    <section className="zx-clients" id="clients-home">
      <div className="zx-wrap">
        <div className="zx-clients__head">
          <span className="zx-eyebrow">{eyebrow || 'Companies we have worked with'}</span>
          <button type="button" className="zx-btn zx-btn--ghost zx-btn--sm" data-open-clients>
            See all clients <Arrow />
          </button>
        </div>
        <div className="zx-logos">
          <div className="zx-logos__track">
            {strip.map((c) => (
              <Logo c={c} key={c.id} />
            ))}
          </div>
        </div>
        <Listings items={listings} />
        <dialog className="zx-dialog" aria-label="All clients">
          <div className="zx-dialog__head">
            <div style={{ display: 'grid', gap: 4 }}>
              <span className="zx-eyebrow">Clients</span>
              <h2 className="zx-h3" style={{ fontSize: 26 }}>
                {eyebrow || 'Companies we have worked with'}
              </h2>
            </div>
            <button type="button" className="zx-btn zx-btn--ghost zx-btn--icon zx-btn--sm" data-close aria-label="Close">
              <Icon name="close" inline />
            </button>
          </div>
          <div className="zx-dialog__body">
            <div className="zx-dialog__filters">
              {['All', ...industries].map((f, i) => (
                <button type="button" key={f} className={`zx-btn zx-btn--sm ${i === 0 ? 'zx-btn--primary' : 'zx-btn--ghost'}`} data-industry={f}>
                  {f}
                </button>
              ))}
            </div>
            <div className="zx-grid" style={{ gridTemplateColumns: 'repeat(auto-fill,minmax(210px,1fr))', gap: 14 }}>
              {clients.map((c) => (
                <article className="zx-client" data-industry={c.industry || ''} key={c.id}>
                  <Logo c={c} label="Logo" />
                  <b>{c.website ? <a href={c.website} target="_blank" rel="noopener noreferrer">{c.name}</a> : c.name}</b>
                  <p>{[c.industry, c.project].filter(Boolean).join(' · ')}</p>
                </article>
              ))}
            </div>
          </div>
        </dialog>
      </div>
    </section>
  )
}

/* ---------------- Services bento ---------------- */
export function ServiceBento({ services, cta = true }: { services: Service[]; cta?: boolean }) {
  return (
    <StaggerIn className="zx-bento">
      {services.map((s, i) => (
        <article className={`zx-bcard b-${(i % 6) + 1}`} data-technology={/ai|cloud|saas|erp/i.test(s.title) ? 'cool' : 'warm'} key={s.id}>
          <div className="zx-bcard__top">
            <div className="zx-bcard__icon">
              <Icon name={s.icon || 'stack'} inline />
            </div>
            {s.badge ? <span className="zx-bcard__badge">{s.badge}</span> : <span className="zx-bcard__num">{String(i + 1).padStart(2, '0')}</span>}
          </div>
          <h3>{s.slug ? <a href={`/services/${s.slug}`} className="zx-bcard__link">{s.title}</a> : s.title}</h3>
          <p>{s.summary}</p>
          <div className="zx-bcard__tags">
            {values(s.tags).slice(0, 4).map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
          <div className="zx-bcard__visual">
            {serviceImage(s) ? <img src={serviceImage(s)!} alt={s.title} loading="lazy" /> : <Svg html={bentoVisuals[s.visual || 'web'] || bentoVisuals.web} />}
          </div>
          {cta && (
            <a className="zx-bcard__more" href={s.slug ? `/services/${s.slug}` : '/contact'}>
              {s.slug ? 'Learn more' : 'Discuss your project'} <Arrow />
            </a>
          )}
        </article>
      ))}
    </StaggerIn>
  )
}

/* ---------------- Process stepper ---------------- */
export type Step = { title: string; when?: string | null; text?: string | null; deliverables?: { value: string }[] | null }
export function ProcessFlow({ steps, id }: { steps: Step[]; id: string }) {
  return (
    <div className="zx-flow" id={id} role="list">
      <div className="zx-flow__rail">
        <i />
      </div>
      {steps.map((s, i) => (
        <div className="zx-step" role="listitem" key={i}>
          <div className="zx-step__dot">{String(i + 1).padStart(2, '0')}</div>
          <div className="zx-step__body">
            <div className="zx-step__head">
              <h3 className="zx-h3">{s.title}</h3>
              {s.when && <span className="zx-chip zx-chip--plain">{s.when}</span>}
            </div>
            {s.text && (
              <p className="zx-muted" style={{ margin: 0 }}>
                {s.text}
              </p>
            )}
            <ul className="zx-step__out">
              {values(s.deliverables).map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  )
}

/* ---------------- React-Flow style canvas ---------------- */
export function FlowCanvas({ graph, id, label, height }: { graph: unknown; id: string; label: string; height?: number }) {
  return (
    <div
      className="zx-rf zx-reveal"
      id={id}
      aria-label={label}
      data-graph={JSON.stringify(graph)}
      style={height ? { ['--rf-h' as string]: `${height}px` } : undefined}
    />
  )
}

/* ---------------- Video review carousel ---------------- */
export function VideoReviews({ reviews, id }: { reviews: Review[]; id: string }) {
  if (!reviews.length) return null
  return (
    <div className="zx-reviews" id={id} tabIndex={0} aria-roledescription="carousel" aria-label="Client video reviews">
      <div className="zx-reviews__viewport">
        <div className="zx-reviews__track">
          {reviews.map((r) => {
            const poster = mediaUrl(r.poster)
            const who = [r.role, r.company].filter(Boolean).join(', ')
            return (
              <article className="zx-review" data-src={mediaUrl(r.video) || ''} key={r.id}>
                <div className="zx-review__frame" aria-label={`Play video review from ${r.name}${who ? ', ' + who : ''}`}>
                  {poster && <img className="zx-review__poster" src={poster} alt="" loading="lazy" />}
                  <div className="zx-review__shade" />
                  {r.isSample && (
                    <span className="zx-chip zx-chip--plain zx-review__tag" style={{ background: 'rgba(0,5,29,.76)', color: 'var(--color-primary-text)', borderColor: 'transparent' }}>
                      Sample
                    </span>
                  )}
                  {r.duration && <span className="zx-review__dur">{r.duration}</span>}
                  <span className="zx-review__play" aria-hidden="true">
                    <Icon name="play" inline />
                  </span>
                  <div className="zx-review__cap">
                    <b>{r.name}</b>
                    <span>{who}</span>
                  </div>
                </div>
                <div className="zx-review__stars" aria-label={`${r.rating || 5} out of 5`}>
                  {Array.from({ length: r.rating || 5 }).map((_, i) => (
                    <Icon name="star" inline key={i} />
                  ))}
                </div>
                <p className="zx-review__quote">“{r.quote}”</p>
              </article>
            )
          })}
        </div>
      </div>
      <div className="zx-reviews__ctrl">
        <div className="zx-reviews__dots" />
        <button className="zx-btn zx-btn--ghost zx-btn--icon" data-prev aria-label="Previous review">
          <Icon name="arrowL" inline />
        </button>
        <button className="zx-btn zx-btn--primary zx-btn--icon" data-next aria-label="Next review">
          <Icon name="arrow" inline />
        </button>
      </div>
      <div className="zx-modal" role="dialog" aria-modal="true" aria-label="Video review">
        <div className="zx-modal__box" />
      </div>
    </div>
  )
}

/* ---------------- Text reviews ---------------- */
const SOURCE_LABEL: Record<string, string> = { direct: 'Verified client', google: 'Google', trustpilot: 'Trustpilot', clutch: 'Clutch', upwork: 'Upwork' }

function Stars({ n, size }: { n: number; size?: number }) {
  return (
    <div className="zx-tr__stars" aria-label={`${n} out of 5`} style={size ? { ['--s' as string]: `${size}px` } : undefined}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} style={{ display: 'contents' }} dangerouslySetInnerHTML={{ __html: i < n ? STAR : STAR.replace('<svg ', '<svg class="off" ') }} />
      ))}
    </div>
  )
}

export function TextReviewCard({ r, featured }: { r: Review; featured?: boolean }) {
  const initials = (r.name || '?')
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase()
  const avatar = mediaUrl(r.avatar)
  const src = r.isSample ? 'sample' : r.source || 'direct'
  const srcLabel = r.isSample ? 'Placeholder' : SOURCE_LABEL[r.source || 'direct']
  const SrcTag = r.sourceUrl && !r.isSample ? 'a' : 'span'
  return (
    <figure className={`zx-tr${r.isSample ? ' zx-tr--sample' : ''}${featured ? ' zx-tr--featured' : ''}`} data-source={src}>
      <div className="zx-tr__head">
        <Stars n={r.rating || 5} />
        {r.isSample ? <span className="zx-chip zx-chip--plain">Sample</span> : <span className="zx-tr__verified"><Icon name="check" inline />Verified</span>}
      </div>
      <blockquote>{r.quote}</blockquote>
      <figcaption className="zx-tr__foot">
        <span className="zx-tr__avatar">{avatar ? <img src={avatar} alt="" /> : initials}</span>
        <span className="zx-tr__who">
          <b>{r.name}</b>
          <span>{[r.role, r.company].filter(Boolean).join(' · ')}</span>
        </span>
        <SrcTag className={`zx-tr__src zx-tr__src--${src}`} {...(SrcTag === 'a' ? { href: r.sourceUrl!, target: '_blank', rel: 'noopener noreferrer' } : {})}>
          <i />
          {srcLabel}
        </SrcTag>
      </figcaption>
    </figure>
  )
}

/** Average rating from real (non-sample) reviews only. */
export function RatingSummary({ reviews }: { reviews: Review[] }) {
  // Only real (non-sample) reviews count. With none published yet, no score is shown.
  const real = reviews.filter((r) => !r.isSample)
  const pool = real
  if (!pool.length) return null
  const avg = pool.reduce((a, r) => a + (r.rating || 5), 0) / pool.length
  const bySrc = Array.from(new Set(real.map((r) => r.source || 'direct')))
  return (
    <div className="zx-rsum zx-reveal">
      <div className="zx-rsum__score">
        <b>{avg.toFixed(1)}</b>
        <div>
          <Stars n={Math.round(avg)} />
          <span>
            {`from ${real.length} client review${real.length === 1 ? '' : 's'}`}
          </span>
        </div>
      </div>
      {bySrc.length > 0 && (
        <div className="zx-rsum__srcs">
          {bySrc.map((s) => (
            <span key={s} className={`zx-tr__src zx-tr__src--${s}`}>
              <i />
              {SOURCE_LABEL[s]}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

export function TextReviewRows({ reviews }: { reviews: Review[] }) {
  if (!reviews.length) return null
  const half = Math.ceil(reviews.length / 2)
  return (
    <div className="zx-tr-rows" id="tr-home" data-tr>
      <div className="zx-tr-row">{reviews.slice(0, half).map((r) => <TextReviewCard r={r} key={r.id} />)}</div>
      <div className="zx-tr-row rev">{reviews.slice(half).map((r) => <TextReviewCard r={r} key={r.id} />)}</div>
    </div>
  )
}

export function TextReviewWall({ reviews }: { reviews: Review[] }) {
  if (!reviews.length) return null
  const sources = Array.from(new Set(reviews.map((r) => (r.isSample ? 'sample' : r.source || 'direct'))))
  return (
    <div id="tr-page" data-tr>
      {sources.length > 1 && (
        <div className="zx-tr-filters">
          {['all', ...sources].map((s, i) => (
            <button key={s} type="button" className={`zx-btn zx-btn--sm ${i === 0 ? 'zx-btn--primary' : 'zx-btn--ghost'}`} data-src-filter={s}>
              {s === 'all' ? 'All' : s === 'sample' ? 'Samples' : SOURCE_LABEL[s]}
            </button>
          ))}
        </div>
      )}
      <div className="zx-tr-wall">
        {reviews.map((r, i) => (
          <TextReviewCard r={r} key={r.id} featured={i === 0 && !!r.featured} />
        ))}
      </div>
    </div>
  )
}

/* ---------------- Case studies ---------------- */
function CaseMedia({ c, meet }: { c: CaseStudy; meet?: boolean }) {
  const u = mediaUrl(c.cover)
  if (u) return isVideo(c.cover) ? <video src={u} autoPlay muted loop playsInline /> : <img src={u} alt="" loading="lazy" />
  let html = caseMockups[c.mockup || 'dashboard'] || caseMockups.dashboard
  if (meet) html = html.replace('xMidYMid slice', 'xMidYMid meet')
  return <Svg html={html} />
}

export function CaseShowcase({ cases, id = 'cases-home' }: { cases: CaseStudy[]; id?: string }) {
  if (!cases.length) return null
  return (
    <div className="zx-cases" id={id}>
      <div className="zx-cases__tabs" role="tablist" aria-label="Case studies">
        {cases.map((c, i) => (
          <button type="button" className="zx-cases__tab" role="tab" id={`${id}-t${i}`} aria-controls={`${id}-p${i}`} aria-selected={i === 0} key={c.id}>
            <span>
              {c.type}
              {c.isSample ? ' · Sample' : ''}
            </span>
            <b>{c.tabLabel}</b>
          </button>
        ))}
      </div>
      {cases.map((c, i) => (
        <div className={`zx-case-panel${i === 0 ? ' is-active' : ''}`} id={`${id}-p${i}`} role="tabpanel" aria-labelledby={`${id}-t${i}`} key={c.id}>
          <div className="zx-case-panel__media">
            {c.isSample && <span className="zx-chip zx-chip--plain">Sample case</span>}
            <CaseMedia c={c} meet />
          </div>
          <div className="zx-case-panel__body">
            <div className="zx-case__row">
              {c.industry && <span className="zx-chip zx-chip--done">{c.industry}</span>}
              <span className="zx-chip zx-chip--plain">{c.type}</span>
            </div>
            <h3>{c.title}</h3>
            <dl>
              <div>
                <dt>Challenge</dt>
                <dd>{c.challenge}</dd>
              </div>
              <div>
                <dt>What we built</dt>
                <dd>{c.built}</dd>
              </div>
              <div>
                <dt>Outcome</dt>
                <dd>{c.outcome}</dd>
              </div>
            </dl>
            <div className="zx-case__row">
              {values(c.stack).map((s) => (
                <span className="zx-chip zx-chip--plain" key={s}>
                  {s}
                </span>
              ))}
            </div>
            <a className="zx-btn zx-btn--ghost" href={c.slug ? `/work/${c.slug}` : '/work'} style={{ justifySelf: 'start' }}>
              {c.slug ? 'Read the case study' : 'See all work'} <Arrow />
            </a>
          </div>
        </div>
      ))}
    </div>
  )
}

export function CaseGrid({ cases, allLabel = 'All' }: { cases: CaseStudy[]; allLabel?: string }) {
  const types = Array.from(new Set(cases.map((c) => c.type)))
  return (
    <>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 'var(--space-8)' }} id="filters">
        {['All', ...types].map((f, i) => (
          <button key={f} className={`zx-btn zx-btn--sm ${i === 0 ? 'zx-btn--primary' : 'zx-btn--ghost'}`} data-f={f}>
            {i === 0 ? allLabel : f}
          </button>
        ))}
      </div>
      <StaggerIn className="zx-grid" id="work-grid">
        {cases.map((c) => (
          <article data-cat={c.type} className="zx-card zx-case" key={c.id}>
            <div className="zx-case__media">
              <CaseMedia c={c} />
            </div>
            <div className="zx-case__body">
              <div className="zx-case__row">
                {c.isSample && <span className="zx-chip zx-chip--plain">Sample case</span>}
                <span className="zx-chip zx-chip--done">{c.industry || 'Shipped'}</span>
              </div>
              <h3 className="zx-h3">{c.slug ? <a href={`/work/${c.slug}`} className="zx-card-link">{c.title}</a> : c.title}</h3>
              <p className="zx-muted" style={{ margin: 0 }}>
                {c.summary || c.challenge}
              </p>
              <div className="zx-case__row">
                {values(c.stack).map((s) => (
                  <span className="zx-chip zx-chip--plain" key={s}>
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </StaggerIn>
    </>
  )
}

/* ---------------- Products ---------------- */
const STATUS: Record<string, [string, string]> = {
  'coming-soon': ['Coming soon', 'zx-chip--review'],
  beta: ['Beta', 'zx-chip--live'],
  live: ['Live', 'zx-chip--done'],
}
export function Products({ products }: { products: Product[] }) {
  return (
    <StaggerIn className="zx-products" gap={0.12}>
      {products.map((p, i) => {
        const [label, chip] = STATUS[p.status] || STATUS['coming-soon']
        const img = mediaUrl(p.image)
        const live = p.status !== 'coming-soon' && p.url
        return (
          <article className="zx-product" key={p.id}>
            <div className="zx-product__stage">{img ? <img src={img} alt={p.name} loading="lazy" /> : <Svg html={productMockups[p.mockup || 'office']} />}</div>
            <div className="zx-product__body">
              <div className="zx-product__head">
                <div className="zx-product__name">
                  <span className="zx-product__mark">
                    <Icon name={p.icon || 'stack'} inline />
                  </span>
                  {p.name}
                </div>
                <span className={`zx-chip ${chip}`}>{label}</span>
              </div>
              <p>{p.description}</p>
              <ul>
                {values(p.features).map((f) => (
                  <li key={f}>
                    <Icon name="check" inline />
                    {f}
                  </li>
                ))}
              </ul>
              <div className="zx-product__cta">
                <a className="zx-btn zx-btn--ghost zx-btn--sm" href={live ? p.url! : '/contact'} {...(live ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                  {live ? `Open ${p.name}` : 'Get early access'} <Arrow />
                </a>
              </div>
            </div>
          </article>
        )
      })}
    </StaggerIn>
  )
}

/* ---------------- CTA band ---------------- */
export function CtaBand({ cta }: { cta?: { eyebrow?: string | null; title?: string | null; button?: string | null } | null }) {
  return (
    <section className="zx-section">
      <div className="zx-wrap">
        <div className="zx-cta zx-reveal">
          <div className="zx-cta__orb" aria-hidden="true" />
          <span className="zx-mono">{cta?.eyebrow || 'Now taking new projects'}</span>
          <h2 className="zx-h2">{cta?.title || "Have a system to build? Let's talk."}</h2>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <a className="zx-btn zx-btn--primary" href="/contact#book" data-mag>
              {cta?.button || 'Book a call'} <Arrow />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------------- Floating intro video ---------------- */
export function IntroFloat({ url, label, meta, thumb }: { url?: string | null; label?: string | null; meta?: string | null; thumb?: string | null }) {
  if (!url) return null
  return (
    <div className="zx-intro-float">
      <button type="button" className="zx-intro" data-intro data-src={url} data-title={label || 'Introduction video'} data-thumb={thumb || undefined}>
        <span className="zx-intro__dot" aria-hidden="true">
          <span dangerouslySetInnerHTML={{ __html: icons.play }} />
        </span>
        <span className="zx-intro__txt">
          {label || 'Watch our intro'}
          {meta && (
            <small>
              <i />
              {meta}
            </small>
          )}
        </span>
      </button>
    </div>
  )
}

/* ---------------- Review platform totals ---------------- */
type Platform = NonNullable<SiteSetting['reviewPlatforms']>[number]
const PLATFORM: Record<string, [string, string]> = {
  google: ['Google', 'var(--color-cyan-blue)'],
  trustpilot: ['Trustpilot', 'var(--color-electric-blue)'],
  clutch: ['Clutch', 'var(--color-coral-orange)'],
  upwork: ['Upwork', 'var(--color-amber-yellow)'],
  goodfirms: ['GoodFirms', 'var(--color-hot-pink)'],
  designrush: ['DesignRush', 'var(--color-magenta)'],
  other: ['', 'var(--color-solar-orange)'],
}

export function PlatformTotals({ items }: { items?: Platform[] | null }) {
  const list = (items || []).filter((p) => p.rating && p.count && p.url)
  if (!list.length) return null
  const total = list.reduce((a, p) => a + p.count, 0)
  const avg = list.reduce((a, p) => a + p.rating * p.count, 0) / total
  return (
    <div className="zx-platforms zx-reveal">
      {list.length > 1 && (
        <div className="zx-platform zx-platform--total">
          <span className="zx-platform__mark" aria-hidden="true">
            {avg.toFixed(1)}
          </span>
          <div className="zx-platform__body">
            <span className="zx-platform__name">All platforms</span>
            <div className="zx-platform__score">
              <Stars n={Math.round(avg)} />
            </div>
            <span className="zx-platform__count">{total} reviews in total</span>
          </div>
        </div>
      )}
      {list.map((p, i) => {
        const [label, color] = PLATFORM[p.platform] || PLATFORM.other
        const name = p.name || label
        const icon = mediaUrl(p.icon)
        return (
          <a className="zx-platform" href={p.url} target="_blank" rel="noopener noreferrer" style={{ ['--pc' as string]: color }} key={p.id || i}>
            <span className="zx-platform__mark" aria-hidden="true">
              {icon ? <img src={icon} alt="" /> : name[0]}
            </span>
            <div className="zx-platform__body">
              <span className="zx-platform__name">{name}</span>
              <div className="zx-platform__score">
                <b>{p.rating.toFixed(1)}</b>
                <Stars n={Math.round(p.rating)} />
              </div>
              <span className="zx-platform__count">
                {p.count} review{p.count === 1 ? '' : 's'}
              </span>
            </div>
            <span className="zx-platform__go">
              <Icon name="arrow" inline />
            </span>
          </a>
        )
      })}
    </div>
  )
}
