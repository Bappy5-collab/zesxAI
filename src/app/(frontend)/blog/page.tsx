import type { Metadata } from 'next'
import { breadcrumbLd, getSite, JsonLd, pageMetadata } from '@/lib/seo'
import { blogPosts } from '@/lib/blog-posts'

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata({
    meta: null,
    path: '/blog',
    title: 'Ideas for building better software',
    description: 'Practical notes on AI, ERP, SaaS products, and software delivery from the Zesxai team.',
    eyebrow: 'Field notes',
  })
}

export default async function BlogPage() {
  const { url } = await getSite()
  return (
    <>
      <JsonLd data={breadcrumbLd(url, [{ name: 'Blog', path: '/blog' }])} />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          name: 'Zesxai blog articles',
          itemListElement: blogPosts.map((post, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            item: {
              '@type': 'BlogPosting',
              headline: post.title,
              description: post.excerpt,
              articleSection: post.category,
              image: `${url}${post.image}`,
              url: `${url}/blog#post-${index + 1}`,
              author: { '@type': 'Organization', name: 'Zesxai' },
              publisher: { '@id': `${url}/#organization` },
            },
          })),
        }}
      />
      <section className="zx-blog-hero">
        <div className="zx-wrap zx-blog-hero__inner">
          <div className="zx-blog-hero__copy">
            <span className="zx-blog-kicker"><i /> Field notes from Zesxai</span>
            <h1>Ideas for building <span>better software.</span></h1>
            <p>Practical perspectives on AI, business systems, product thinking, and the craft of shipping software that works for people.</p>
            <a className="zx-blog-scroll" href="#latest">Explore the latest <span aria-hidden="true">↓</span></a>
          </div>
          <div className="zx-blog-orbit" aria-hidden="true">
            <div className="zx-blog-orbit__ring zx-blog-orbit__ring--one" />
            <div className="zx-blog-orbit__ring zx-blog-orbit__ring--two" />
            <div className="zx-blog-orbit__core"><b>Z</b><span>IDEAS IN MOTION</span></div>
            <i className="zx-blog-orbit__dot zx-blog-orbit__dot--a" />
            <i className="zx-blog-orbit__dot zx-blog-orbit__dot--b" />
            <i className="zx-blog-orbit__dot zx-blog-orbit__dot--c" />
          </div>
          <div className="zx-blog-hero__foot"><span>01 / THINK</span><span>02 / BUILD</span><span>03 / IMPROVE</span></div>
        </div>
      </section>

      <section className="zx-section zx-blog-list" id="latest">
        <div className="zx-wrap">
          <div className="zx-blog-section-head">
            <div><span className="zx-blog-kicker"><i /> The journal</span><h2>Ideas worth <span className="zx-hl">putting to work.</span></h2></div>
            <p>Clear thinking for the people shaping what comes next.</p>
          </div>
          <div className="zx-blog-grid">
            {blogPosts.map((post, index) => (
              <details className={`zx-blog-card zx-blog-card--${post.tone}`} id={`post-${index + 1}`} key={post.slug}>
                <summary>
                  <div className="zx-blog-card__image"><img src={post.image} alt="" /><span className="zx-blog-card__number">0{index + 1}</span><span className="zx-blog-card__arrow" aria-hidden="true">↗</span></div>
                  <div className="zx-blog-card__content">
                    <div className="zx-blog-card__meta"><span>{post.category}</span><span>{post.read}</span></div>
                    <h3>{post.title}</h3>
                    <p>{post.excerpt}</p>
                    <span className="zx-blog-card__read">Read the note <b aria-hidden="true">+</b></span>
                  </div>
                </summary>
                <div className="zx-blog-card__body"><p>{post.body}</p><a className="zx-blog-card__full-link" href={`/blog/${post.slug}`}>Read the full article <b aria-hidden="true">↗</b></a></div>
              </details>
            ))}
          </div>
          <div className="zx-blog-endnote"><span>More ideas are on the way.</span><a href="/contact">Have a question? Let’s talk <b aria-hidden="true">↗</b></a></div>
        </div>
      </section>
    </>
  )
}
