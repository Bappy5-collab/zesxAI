import { loadGlobal } from '@/lib/payload'
import { PIPE_GRAPH } from '@/lib/visuals'
import { CtaBand, FlowCanvas, PageHero, ProcessFlow, SectionHead } from '@/components/sections'
import { breadcrumbLd, getSite, JsonLd, pageMetadata } from '@/lib/seo'

export async function generateMetadata() {
  const page = await loadGlobal('process-page')
  return pageMetadata({ meta: page.meta, path: '/process', title: page.hero?.title, description: page.hero?.lead, eyebrow: 'Process' })
}

export default async function ProcessPage() {
  const [page, settings, site] = await Promise.all([loadGlobal('process-page'), loadGlobal('site-settings'), getSite()])
  return (
    <>
      <JsonLd data={breadcrumbLd(site.url, [{ name: 'Process', path: '/process' }])} />
      <PageHero head={page.hero} />
      <section className="zx-section" style={{ paddingTop: 0 }}>
        <div className="zx-wrap">
          <FlowCanvas graph={page.pipelineGraph || PIPE_GRAPH} id="rf-pipe" label="Diagram: our delivery pipeline" height={440} />
        </div>
      </section>
      <section className="zx-section" style={{ paddingTop: 0 }}>
        <div className="zx-wrap" style={{ maxWidth: 860 }}>
          <SectionHead head={page.stepsHead} />
          <ProcessFlow steps={page.steps || []} id="flow-process" />
        </div>
      </section>
      {!!page.stack?.length && (
        <section className="zx-section" style={{ paddingTop: 0 }}>
          <div className="zx-wrap">
            <SectionHead head={page.stackHead} />
            <div className="zx-grid" style={{ gridTemplateColumns: 'repeat(auto-fit,minmax(150px,1fr))' }}>
              {page.stack.map((s, i) => (
                <div className="zx-card zx-reveal" style={{ ['--d' as string]: `${(i % 6) * 60}ms`, padding: 18, display: 'grid', gap: 4 }} key={s.id || i}>
                  <span className="zx-mono zx-muted" style={{ fontSize: 10 }}>
                    {s.category}
                  </span>
                  <b>{s.name}</b>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
      <CtaBand cta={settings.cta} />
    </>
  )
}
