import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { blogPosts, getBlogPost } from '@/lib/blog-posts'
import { breadcrumbLd, getSite, JsonLd, pageMetadata } from '@/lib/seo'

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return blogPosts.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPost(slug)
  if (!post) notFound()
  return pageMetadata({
    meta: null,
    path: `/blog/${post.slug}`,
    title: post.title,
    description: post.excerpt,
    eyebrow: post.category,
    type: 'article',
  })
}

export default async function BlogArticlePage({ params }: Props) {
  const { slug } = await params
  const post = getBlogPost(slug)
  if (!post) notFound()
  const { url } = await getSite()
  const canonical = `${url}/blog/${post.slug}`

  return (
    <>
      <JsonLd data={breadcrumbLd(url, [{ name: 'Blog', path: '/blog' }, { name: post.title, path: `/blog/${post.slug}` }])} />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: post.title,
          description: post.excerpt,
          articleSection: post.category,
          articleBody: post.body,
          image: `${url}${post.image}`,
          mainEntityOfPage: canonical,
          url: canonical,
          author: { '@type': 'Organization', name: 'Zesxai', '@id': `${url}/#organization` },
          publisher: { '@id': `${url}/#organization` },
        }}
      />
      <section className="zx-section zx-blog-article-section">
        <div className="zx-wrap">
          <article className="zx-blog-article">
            <Link className="zx-blog-article__back" href="/blog">← All articles</Link>
            <header className="zx-blog-article__head">
              <span className="zx-blog-kicker"><i /> {post.category}</span>
              <h1>{post.title}</h1>
              <p>{post.excerpt}</p>
              <span className="zx-blog-article__read">{post.read}</span>
            </header>
            <figure className="zx-blog-article__cover">
              <img src={post.image} alt={post.title} />
            </figure>
            <div className="zx-blog-article__body">
              {post.body.split('\n\n').map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
            <footer className="zx-blog-article__footer">
              <span>Want to apply this to your business?</span>
              <Link className="zx-btn zx-btn--primary" href="/contact">Talk to our team <span aria-hidden="true">↗</span></Link>
            </footer>
          </article>
        </div>
      </section>
    </>
  )
}
