import { loadAll, loadGlobal } from '@/lib/payload'
import { CtaBand, PageHero, PlatformTotals, RatingSummary, SectionHead, TextReviewWall, VideoReviews } from '@/components/sections'
import { breadcrumbLd, getSite, JsonLd, pageMetadata } from '@/lib/seo'

export async function generateMetadata() {
  const page = await loadGlobal('reviews-page')
  return pageMetadata({ meta: page.meta, path: '/reviews', title: page.hero?.title, description: page.hero?.lead, eyebrow: 'Client reviews' })
}

export default async function ReviewsPage() {
  const [page, settings, reviews, site] = await Promise.all([loadGlobal('reviews-page'), loadGlobal('site-settings'), loadAll('reviews', { published: { equals: true } }), getSite()])
  const video = reviews.filter((r) => r.kind === 'video')
  const text = reviews.filter((r) => r.kind === 'text')
  return (
    <>
      <JsonLd data={breadcrumbLd(site.url, [{ name: 'Reviews', path: '/reviews' }])} />
      <PageHero head={page.hero} />
      {!!settings.reviewPlatforms?.length && (
        <section className="zx-section" style={{ paddingTop: 0, paddingBottom: 0 }}>
          <div className="zx-wrap">
            <PlatformTotals items={settings.reviewPlatforms} />
          </div>
        </section>
      )}
      {video.length > 0 && (
        <section className="zx-section" style={{ paddingTop: 0, overflow: 'hidden' }}>
          <div className="zx-wrap">
            <VideoReviews reviews={video} id="reviews-page" />
          </div>
        </section>
      )}
      {text.length > 0 && (
        <section className="zx-section" style={{ paddingTop: 0 }}>
          <div className="zx-wrap">
            <SectionHead head={page.written} mb="var(--space-8)" />
            <RatingSummary reviews={text} />
            <TextReviewWall reviews={text} />
          </div>
        </section>
      )}
      <CtaBand cta={settings.cta} />
    </>
  )
}
