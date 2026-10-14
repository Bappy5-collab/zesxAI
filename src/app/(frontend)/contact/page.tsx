import { loadGlobal } from '@/lib/payload'
import { Icon } from '@/components/Icon'
import { PageHero, SectionHead } from '@/components/sections'
import { BookCall } from '@/components/Contact'
import { breadcrumbLd, getSite, JsonLd, pageMetadata } from '@/lib/seo'

export async function generateMetadata() {
  const page = await loadGlobal('contact-page')
  return pageMetadata({ meta: page.meta, path: '/contact', title: page.hero?.title, description: page.hero?.lead, eyebrow: 'Contact us' })
}

type Opt = { value: string; title: string; text?: string | null; id?: string | null }
const toItems = (o?: Opt[] | null) => (o || []).map((x) => [x.value, x.title, x.text || ''])
const pane = { border: 0, padding: 0, margin: 0 }
const legend = { marginBottom: 'var(--space-4)' }

function Options({ name, items }: { name: string; items: string[][] }) {
  return (
    <div className="zx-options">
      {items.map(([v, t, d], i) => (
        <label className="zx-option" key={v}>
          <input type="radio" name={name} value={v} required={i === 0} />
          <b>{t}</b>
          <span>{d}</span>
        </label>
      ))}
    </div>
  )
}

export default async function ContactPage() {
  const [s, page, site] = await Promise.all([loadGlobal('site-settings'), loadGlobal('contact-page'), getSite()])
  const st = page.steps
  const bud = page.budget
  const next = page.nextSteps || []
  return (
    <>
      <JsonLd data={breadcrumbLd(site.url, [{ name: 'Contact us', path: '/contact' }])} />
      <PageHero head={page.hero} />
      <section className="zx-section" style={{ paddingTop: 0 }} id="book">
        <div className="zx-wrap zx-reach">
          <BookCall url={s.bookCallUrl || 'https://calendly.com/hello-zesxai/30min'} c={s.contact} eyebrow={page.book?.eyebrow} title={page.book?.title} text={page.book?.text} />
        </div>
      </section>
      <section className="zx-section" style={{ paddingTop: 0 }} id="brief-section">
        <div className="zx-wrap">
          <SectionHead head={{ eyebrow: page.briefHead?.eyebrow || 'Project brief', title: page.briefHead?.title || 'Prefer to write it down?', lead: page.briefHead?.lead }} />
        </div>
        <div className="zx-wrap zx-contact">
          <form className="zx-card zx-wizard" id="brief" noValidate style={{ padding: 'var(--space-8)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
              <span className="zx-eyebrow">Project brief</span>
              <span className="zx-mono zx-muted" data-step-label />
            </div>
            <div className="zx-wizard__steps">
              <i />
              <i />
              <i />
              <i />
            </div>
            <fieldset className="zx-wizard__pane" style={pane}>
              <legend className="zx-h3" style={legend}>{st?.type || 'What are we building?'}</legend>
              <Options name="type" items={toItems(page.projectTypes)} />
            </fieldset>
            <fieldset className="zx-wizard__pane" style={pane}>
              <legend className="zx-h3" style={legend}>{st?.stage || 'Where are you today?'}</legend>
              <Options name="stage" items={toItems(page.stages)} />
            </fieldset>
            <fieldset className="zx-wizard__pane" style={pane}>
              <legend className="zx-h3" style={legend}>{st?.budget || 'Budget and timeline'}</legend>
              <div className="zx-field">
                <label htmlFor="bud">
                  Budget <span className="zx-hl" data-out="budget" />
                </label>
                <input className="zx-range" id="bud" type="range" name="budget" min={bud?.min ?? 3500} max={bud?.max ?? 150000} step={bud?.step ?? 500} defaultValue={bud?.start ?? 5500} data-prefix="$" data-suffix="+" />
              </div>
              <Options name="time" items={toItems(page.timelines)} />
            </fieldset>
            <fieldset className="zx-wizard__pane" style={pane}>
              <legend className="zx-h3" style={legend}>{st?.contact || 'How do we reach you?'}</legend>
              <div className="zx-options" style={{ gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,220px),1fr))' }}>
                <div className="zx-field">
                  <label htmlFor="nm">Name</label>
                  <input className="zx-input" id="nm" name="name" required placeholder="Your name" autoComplete="name" />
                </div>
                <div className="zx-field">
                  <label htmlFor="em">Work email</label>
                  <input className="zx-input" id="em" type="email" name="email" required placeholder="you@company.com" autoComplete="email" />
                </div>
              </div>
              <div className="zx-field">
                <label htmlFor="nt">Anything else?</label>
                <textarea className="zx-input" id="nt" name="notes" placeholder="What the software should do, who uses it, your current tools" />
              </div>
              <input type="text" name="company_site" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: 'absolute', left: -9999 }} />
            </fieldset>
            <p className="zx-wizard__error" role="alert" />
            <div className="zx-wizard__done" style={{ textAlign: 'center', display: 'none', gap: 12, justifyItems: 'center', padding: '24px 0' }}>
              <div className="zx-service__icon" style={{ background: 'var(--brand)', color: 'var(--on-brand)', borderColor: 'var(--brand)' }}>
                <Icon name="check" inline />
              </div>
              <h3 className="zx-h3">{page.done?.title || 'Brief received'}</h3>
              <p className="zx-muted" style={{ margin: 0, maxWidth: '40ch' }}>
                {page.done?.text}
              </p>
            </div>
            <div className="zx-wizard__nav">
              <button type="button" className="zx-btn zx-btn--ghost" data-back>
                Back
              </button>
              <button type="button" className="zx-btn zx-btn--primary" data-next>
                Continue
              </button>
            </div>
          </form>
          <aside style={{ display: 'grid', gap: 16 }}>
            <div className="zx-card" style={{ display: 'grid', gap: 12 }}>
              <h3 className="zx-h3" style={{ fontSize: 18 }}>What happens next</h3>
              <ol className="zx-tl">
                {next.map(({ title: a, when: b }, i) => (
                  <li className={i === 0 ? 'is-now' : undefined} key={a}>
                    <span>{a}</span>
                    <span className="zx-muted" style={{ fontSize: 13 }}>{b}</span>
                  </li>
                ))}
              </ol>
            </div>
          </aside>
        </div>
      </section>
    </>
  )
}
