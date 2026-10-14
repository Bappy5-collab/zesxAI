import type { Metadata } from 'next'
import { breadcrumbLd, getSite, JsonLd, pageMetadata } from '@/lib/seo'

const posts = [
  {
    category: 'AI & automation',
    title: 'Where AI fits in a real business workflow',
    excerpt: 'A practical way to spot repetitive work, choose a useful first use case, and keep people in control of the outcome.',
    read: '6 min read',
    image: '/images/ai%26automation.png',
    tone: 'violet',
    body: 'Start with the work, not the model. Map the steps people repeat, the information they need, and the decisions that still require judgement. Then choose one narrow task where better search, drafting, or classification can save time without hiding how the result was produced.\n\nKeep a person in the loop for exceptions and important decisions. A small pilot with clear measures—time saved, fewer handoffs, or fewer errors—will tell you more than a broad AI rollout.',
  },
  {
    category: 'ERP & operations',
    title: 'A calmer path from spreadsheets to ERP',
    excerpt: 'How to move business operations into one system without turning the migration into a risky big-bang project.',
    read: '8 min read',
    image: '/images/ERP-System.png',
    tone: 'amber',
    body: 'The safest ERP projects begin by understanding the workarounds people already depend on. Document the core records, approvals, reports, and exceptions before deciding what to replace.\n\nMove one workflow at a time, validate real data with the people who use it, and keep a clear rollback plan. That makes the new system easier to trust and gives the team room to learn as it goes.',
  },
  {
    category: 'Product & SaaS',
    title: 'Build the smallest useful version of your SaaS',
    excerpt: 'A focused product scope helps teams learn from customers sooner and avoid spending months polishing the wrong thing.',
    read: '5 min read',
    image: '/images/web_apps%26saas.png',
    tone: 'cyan',
    body: 'Define the first version around one user and one valuable job. Keep the workflow complete enough to solve that job, while leaving secondary roles, automation, and edge cases for later.\n\nBefore adding more features, watch a few users try the product. Their questions and workarounds reveal where the product needs clarity and which improvements will make the biggest difference.',
  },
  {
    category: 'Engineering',
    title: 'What makes a software handoff feel effortless',
    excerpt: 'Good documentation, clear ownership, and a reliable release process turn delivery into a foundation for the next improvement.',
    read: '4 min read',
    image: '/images/cloud_devOps.png',
    tone: 'pink',
    body: 'A useful handoff gives the next person a working map: how to run the project, where configuration lives, how releases happen, and what to check when something fails. Pair that with a short walkthrough and a named owner for open questions.\n\nThe goal is for the team to make its next change confidently. A clean release process and practical documentation are part of the product, not chores to leave until the end.',
  },
]

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
            {posts.map((post, index) => (
              <details className={`zx-blog-card zx-blog-card--${post.tone}`} key={post.title}>
                <summary>
                  <div className="zx-blog-card__image"><img src={post.image} alt="" /><span className="zx-blog-card__number">0{index + 1}</span><span className="zx-blog-card__arrow" aria-hidden="true">↗</span></div>
                  <div className="zx-blog-card__content">
                    <div className="zx-blog-card__meta"><span>{post.category}</span><span>{post.read}</span></div>
                    <h3>{post.title}</h3>
                    <p>{post.excerpt}</p>
                    <span className="zx-blog-card__read">Read the note <b aria-hidden="true">+</b></span>
                  </div>
                </summary>
                <div className="zx-blog-card__body"><p>{post.body}</p></div>
              </details>
            ))}
          </div>
          <div className="zx-blog-endnote"><span>More ideas are on the way.</span><a href="/contact">Have a question? Let’s talk <b aria-hidden="true">↗</b></a></div>
        </div>
      </section>
    </>
  )
}
