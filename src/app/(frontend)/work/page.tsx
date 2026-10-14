import { loadAll, loadGlobal } from '@/lib/payload'
import { CaseGrid, CtaBand, PageHero } from '@/components/sections'
import { breadcrumbLd, getSite, JsonLd, pageMetadata } from '@/lib/seo'

export async function generateMetadata() {
  const page = await loadGlobal('work-page')
  return pageMetadata({ meta: page.meta, path: '/work', title: page.hero?.title, description: page.hero?.lead, eyebrow: 'Case studies' })
}

export default async function WorkPage() {
  const [page, settings, cases, site] = await Promise.all([loadGlobal('work-page'), loadGlobal('site-settings'), loadAll('case-studies'), getSite()])
  return (
    <>
      <JsonLd data={breadcrumbLd(site.url, [{ name: 'Work', path: '/work' }])} />
      <PageHero head={page.hero} />
      <section className="zx-section" style={{ paddingTop: 0 }}>
        <div className="zx-wrap">
          <CaseGrid cases={cases} allLabel={page.allLabel || 'All'} />
        </div>
      </section>
      <CtaBand cta={settings.cta} />
    </>
  )
}
