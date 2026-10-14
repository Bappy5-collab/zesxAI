import type { TeamMember } from '@/payload-types'
import { loadAll, loadGlobal, mediaUrl } from '@/lib/payload'
import { Arrow, Icon } from '@/components/Icon'
import { CtaBand, SectionHead } from '@/components/sections'
import { StaggerIn } from '@/components/motion'
import { breadcrumbLd, getSite, JsonLd, pageMetadata } from '@/lib/seo'

export async function generateMetadata() {
  const page = await loadGlobal('about-page')
  return pageMetadata({ meta: page.meta, path: '/about', title: page.hero?.title, description: page.hero?.lead, eyebrow: 'About Zesxai' })
}

const DEPT_COLOR: Record<string, string> = {
  Leadership: 'var(--color-amber-yellow)',
  Engineering: 'var(--color-cyan-blue)',
  Design: 'var(--color-hot-pink)',
  'Quality assurance': 'var(--color-electric-blue)',
  'Project management': 'var(--color-magenta)',
  Marketing: 'var(--color-coral-orange)',
  DevOps: 'var(--color-indigo-blue)',
}
const SILHOUETTE =
  '<svg viewBox="0 0 200 200" aria-hidden="true"><circle cx="100" cy="78" r="38" fill="currentColor"/><path d="M28 200c4-46 34-74 72-74s68 28 72 74z" fill="currentColor"/></svg>'

function Photo({ src, alt, sample, label = true, children }: { src?: string | null; alt: string; sample?: boolean | null; label?: boolean; children?: React.ReactNode }) {
  return (
    <div className="zx-member__photo">
      {sample && <span className="zx-chip zx-chip--plain">Sample</span>}
      {src ? (
        <img src={src} alt={alt} loading="lazy" />
      ) : (
        <div className="zx-member__ph">
          <span style={{ display: 'contents' }} dangerouslySetInnerHTML={{ __html: SILHOUETTE }} />
          {label && <small>Photo</small>}
        </div>
      )}
      {children}
    </div>
  )
}

function Links({ linkedin, github }: { linkedin?: string | null; github?: string | null }) {
  if (!linkedin && !github) return null
  return (
    <div className="zx-member__links">
      {linkedin && (
        <a href={linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
          in
        </a>
      )}
      {github && (
        <a href={github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
          GH
        </a>
      )}
    </div>
  )
}

function MemberCard({ m, i }: { m: TeamMember; i: number }) {
  return (
    <article className="zx-member" data-dept={m.department} style={{ ['--pc' as string]: DEPT_COLOR[m.department] || 'var(--color-solar-orange)' }}>
      <Photo src={mediaUrl(m.photo)} alt={m.name} sample={m.isSample}>
        {(m.bio || m.linkedin || m.github) && (
          <div className="zx-member__over">
            {m.bio && <p>{m.bio}</p>}
            <Links linkedin={m.linkedin} github={m.github} />
          </div>
        )}
      </Photo>
      <div className="zx-member__body">
        <b>{m.name}</b>
        <span>{m.role}</span>
        <span className="zx-member__dept">
          <i />
          {m.department}
        </span>
      </div>
    </article>
  )
}

export default async function AboutPage() {
  const [page, settings, team, site] = await Promise.all([loadGlobal('about-page'), loadGlobal('site-settings'), loadAll('team-members'), getSite()])
  const depts = Array.from(new Set(team.map((m) => m.department)))
  const faces = team.filter((m) => m.showInHero).slice(0, 6)
  const f = page.founder
  const mi = page.mission
  return (
    <>
      <JsonLd data={breadcrumbLd(site.url, [{ name: 'About', path: '/about' }])} />
      {f?.name && (
        <JsonLd
          data={{
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: f.name,
            jobTitle: f.role || undefined,
            worksFor: { '@id': `${site.url}/#organization` },
            sameAs: [f.linkedin, f.github].filter(Boolean),
          }}
        />
      )}
      <section className="zx-about-hero">
        <div className="zx-wrap zx-about-hero__grid">
          <div className="zx-about-hero__copy">
            {page.hero?.eyebrow && <span className="zx-eyebrow">{page.hero.eyebrow}</span>}
            <h1 className="zx-h-page" data-split style={{ maxWidth: '16ch' }}>
              {page.hero?.title}
            </h1>
            {page.hero?.lead && (
              <p className="zx-lead zx-reveal" style={{ ['--d' as string]: '300ms' }}>
                {page.hero.lead}
              </p>
            )}
            {!!page.stats?.length && (
              <div className="zx-about-stats zx-reveal" style={{ ['--d' as string]: '450ms' }}>
                {page.stats.map((s, i) => (
                  <div key={s.id || i}>
                    <b>{s.value}</b>
                    <span>{s.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          {faces.length > 0 && (
            <div className="zx-faces" aria-hidden="true">
              {faces.map((m) => (
                <div key={m.id} style={{ ['--pc' as string]: DEPT_COLOR[m.department] || 'var(--color-solar-orange)' }}>
                  <Photo src={mediaUrl(m.photo)} alt="" label={false} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {mi?.before && (
        <section className="zx-section" style={{ paddingTop: 'var(--space-8)' }}>
          <div className="zx-wrap">
            <figure className="zx-mission zx-reveal" style={{ margin: 0 }}>
              {mi.eyebrow && <span className="zx-eyebrow">{mi.eyebrow}</span>}
              <blockquote>
                {mi.before} {mi.highlight && <em>{mi.highlight}</em>}
                {mi.after}
              </blockquote>
              {mi.attribution && (
                <figcaption>
                  <i />
                  {mi.attribution}
                </figcaption>
              )}
            </figure>
          </div>
        </section>
      )}

      {f?.name && (
        <section className="zx-section" style={{ paddingTop: 0 }}>
          <div className="zx-wrap">
            <div className="zx-founder zx-reveal" style={{ ['--pc' as string]: 'var(--color-solar-orange)' }}>
              <Photo src={mediaUrl(f.photo)} alt={f.name} />
              <div className="zx-founder__txt">
                {f.role && <span className="zx-founder__role">{f.role}</span>}
                <h3>{f.name}</h3>
                {f.quote && <blockquote>{f.quote}</blockquote>}
                {f.bio && (
                  <p className="zx-muted" style={{ margin: 0 }}>
                    {f.bio}
                  </p>
                )}
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
                  <a className="zx-btn zx-btn--primary" href="/contact">
                    Work with us <Arrow />
                  </a>
                  <Links linkedin={f.linkedin} github={f.github} />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {team.length > 0 && (
        <section className="zx-section">
          <div className="zx-wrap">
            <SectionHead head={page.teamHead} />
            <div id="team" data-team>
              {depts.length > 1 && (
                <div className="zx-team-filters" role="group" aria-label="Filter by department">
                  <button type="button" className="zx-btn zx-btn--sm zx-btn--primary" data-dept-filter="all" aria-pressed="true">
                    All <b>{team.length}</b>
                  </button>
                  {depts.map((d) => (
                    <button type="button" className="zx-btn zx-btn--sm zx-btn--ghost" data-dept-filter={d} aria-pressed="false" key={d}>
                      {d} <b>{team.filter((m) => m.department === d).length}</b>
                    </button>
                  ))}
                </div>
              )}
              <StaggerIn className="zx-team" gap={0.06}>
                {team.map((m, i) => (
                  <MemberCard m={m} i={i} key={m.id} />
                ))}
              </StaggerIn>
            </div>
          </div>
        </section>
      )}

      {!!page.principles?.length && (
        <section className="zx-section" style={{ paddingTop: 0 }}>
          <div className="zx-wrap">
            <SectionHead head={page.principlesHead} />
            <StaggerIn className="zx-principles">
              {page.principles.map((p, i) => (
                <div className="zx-principle" key={p.id || i}>
                  <div className="zx-service__icon">
                    <Icon name={p.icon || 'check'} inline />
                  </div>
                  <h3>{p.title}</h3>
                  {p.text && <p>{p.text}</p>}
                </div>
              ))}
            </StaggerIn>
          </div>
        </section>
      )}
      <CtaBand cta={settings.cta} />
    </>
  )
}
