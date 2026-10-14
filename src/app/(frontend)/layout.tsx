import React from 'react'
import type { Metadata } from 'next'
import Script from 'next/script'
import './styles.css'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import { Behaviors } from '@/components/Behaviors'
import { ScrollProgress } from '@/components/motion'
import { getSite, JsonLd, organizationLd, websiteLd } from '@/lib/seo'
import { mediaUrl } from '@/lib/payload'

export const dynamic = 'force-dynamic'

/** Sets data-theme before first paint: the visitor's saved choice, else the device setting. */
const THEME_SCRIPT = `(function(){var t=null;try{t=localStorage.getItem('zx-theme')}catch(e){}if(!t)t=window.matchMedia&&matchMedia('(prefers-color-scheme: light)').matches?'light':'dark';document.documentElement.setAttribute('data-theme',t)})()`

const DEFAULT_NAV = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Work', href: '/work' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Process', href: '/process' },
  { label: 'Reviews', href: '/reviews' },
  { label: 'About', href: '/about' },
]

export async function generateMetadata(): Promise<Metadata> {
  const { s, url } = await getSite()
  return {
    metadataBase: new URL(url),
    title: { default: s.seo?.defaultTitle || s.siteName || 'Zesxai', template: s.seo?.titleTemplate || `%s | ${s.siteName || 'Zesxai'}` },
    description: s.metaDescription || undefined,
    applicationName: s.siteName || 'Zesxai',
    verification: {
      google: s.seo?.googleVerification || undefined,
      other: s.seo?.bingVerification ? { 'msvalidate.01': s.seo.bingVerification } : undefined,
    },
    formatDetection: { telephone: false },
    icons: { icon: [{ url: '/images/favicon.png', type: 'image/png' }], apple: '/apple-touch-icon.png' },
  }
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { s, url } = await getSite()
  const configuredNav = s.nav?.length ? s.nav.map((n) => ({ label: n.label, href: n.href })) : DEFAULT_NAV
  const nav = configuredNav.some((item) => item.href === '/blog')
    ? configuredNav
    : [...configuredNav, { label: 'Blog', href: '/blog' }]
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400..800&family=Geist:wght@400..700&family=JetBrains+Mono:wght@400;500&display=swap"
        />
        <link rel="stylesheet" href="/zesxai/tokens.css" />
        <link rel="stylesheet" href="/zesxai/bundle.css" />
        <Script id="theme-script" strategy="beforeInteractive">
          {THEME_SCRIPT}
        </Script>
        <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#01000E" />
        <meta name="theme-color" media="(prefers-color-scheme: light)" content="#F6F7FC" />
        <JsonLd data={organizationLd(s, url)} />
        <JsonLd data={websiteLd(s, url)} />
      </head>
      <body>
        <ScrollProgress />
        <div className="zx-glow" id="glow" aria-hidden="true" />
        <Nav siteName={s.siteName || 'Zesxai'} items={nav} cta={s.navCta || 'Book a call'} logo={mediaUrl(s.logo)} logoLight={mediaUrl(s.logoLight)} />
        <main>{children}</main>
        <Footer settings={s} nav={nav} />
        <Behaviors />
      </body>
    </html>
  )
}
