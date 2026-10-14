'use client'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { useState } from 'react'
import { Icon } from './Icon'
import { Logo } from './Logo'

type Item = { label: string; href: string }

export function Nav({ siteName, items, cta, logo, logoLight }: { siteName: string; items: Item[]; cta: string; logo?: string | null; logoLight?: string | null }) {
  const path = usePathname()
  const [open, setOpen] = useState(false)
  const cur = (h: string) => ((h === '/' ? path === '/' : path === h || path.startsWith(h + '/')) ? 'page' : undefined)
  return (
    <header className="zx-nav" id="nav">
      <div className="zx-nav__bar">
        <Link className="zx-logo" href="/" aria-label={`${siteName} home`}>
          <Logo alt={siteName} logo={logo} logoLight={logoLight} />
        </Link>
        <nav className="zx-nav__links" aria-label="Main">
          {items.map(({ href, label }) => (
            <a href={href} aria-current={cur(href)} key={href}>
              {label}
            </a>
          ))}
        </nav>
        <div className="zx-nav__cta">
          <button className="zx-btn zx-btn--ghost zx-btn--icon zx-btn--sm zx-theme" type="button" aria-label="Switch theme" suppressHydrationWarning>
            <span className="zx-theme__sun"><Icon name="sun" inline /></span>
            <span className="zx-theme__moon"><Icon name="moon" inline /></span>
          </button>
          <a className="zx-btn zx-btn--primary zx-btn--sm" href="/contact#book">
            {cta}
          </a>
          <button className="zx-btn zx-btn--ghost zx-btn--icon zx-btn--sm zx-nav__menu" aria-label="Open menu" aria-expanded={open} onClick={() => setOpen(!open)}>
            <Icon name="menu" inline />
          </button>
        </div>
      </div>
      <div className={`zx-nav__sheet${open ? ' is-open' : ''}`} onClick={(e) => e.target === e.currentTarget && setOpen(false)}>
        <nav aria-label="Mobile">
          {[...items, { href: '/contact#book', label: cta }].map(({ href, label }) => (
            <a href={href} key={href} aria-current={cur(href)}>
              {label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}
