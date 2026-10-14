import type { SiteSetting } from '@/payload-types'
import Link from 'next/link'
import { Logo } from './Logo'
import { Icon } from './Icon'
import { telLink, waLink } from './Contact'
import { mediaUrl } from '@/lib/payload'

const SHORT: Record<string, string> = { linkedin: 'in', x: 'X', twitter: 'X', github: 'GH', facebook: 'fb', instagram: 'IG', youtube: 'YT', dribbble: 'Dr', behance: 'Be' }
const short = (label: string) => SHORT[label.trim().toLowerCase()] || label.trim().slice(0, 2)

type Col = { id?: string | null; title: string; links?: { id?: string | null; label: string; href: string }[] | null }

export function Footer({ settings: s, nav }: { settings: SiteSetting; nav: { label: string; href: string }[] }) {
  const cols: Col[] = s.footerColumns?.length
    ? s.footerColumns
    : [
        { title: 'Company', links: nav.filter((n) => n.href !== '/') },
        { title: 'Clients', links: [{ label: 'Contact us', href: '/contact' }] },
      ]
  const logo = mediaUrl(s.logo)
  const social = s.social?.length ? s.social : []
  const c = s.contact
  const wa = waLink(c?.whatsapp, c?.whatsappMessage)
  return (
    <footer className="zx-wrap" id="footer" style={{ position: 'relative', zIndex: 1 }}>
      <div className="zx-footer">
        <div className="zx-footer__cols">
          <div style={{ display: 'grid', gap: 12, alignContent: 'start' }}>
            <Link className="zx-logo" href="/" aria-label={`${s.siteName || 'Zesxai'} home`}>
              <Logo alt={s.siteName || 'Zesxai'} logo={logo} logoLight={mediaUrl(s.logoLight)} />
            </Link>
            <p className="zx-muted" style={{ margin: 0, fontSize: 14, maxWidth: '32ch' }}>
              {s.footerText}
            </p>
          </div>
          {cols.map((c, ci) => (
            <div key={c.id || ci}>
              <h4>{c.title}</h4>
              {(c.links || []).map((l, li) => (
                <a href={l.href} key={l.id || li}>
                  {l.label}
                </a>
              ))}
            </div>
          ))}
          {(c?.email || c?.phone || wa || c?.address) && (
            <div>
              <h4>Contact</h4>
              <div className="zx-footer__contact">
                {c?.email && (
                  <a href={`mailto:${c.email}`}>
                    <Icon name="mail" inline />
                    {c.email}
                  </a>
                )}
                {c?.phone && (
                  <a href={telLink(c.phone)}>
                    <Icon name="phone" inline />
                    {c.phone}
                  </a>
                )}
                {wa && (
                  <a href={wa} target="_blank" rel="noopener noreferrer">
                    <Icon name="msg" inline />
                    WhatsApp
                  </a>
                )}
                {c?.address &&
                  (c.mapUrl ? (
                    <a href={c.mapUrl} target="_blank" rel="noopener noreferrer">
                      <Icon name="pin" inline />
                      {c.address}
                    </a>
                  ) : (
                    <span>
                      <Icon name="pin" inline />
                      {c.address}
                    </span>
                  ))}
              </div>
            </div>
          )}
          {social.length > 0 && (
            <div>
              <h4>Follow us</h4>
              <div className="zx-social">
                {social.map((x) => {
                  const icon = mediaUrl(x.icon)
                  return (
                    <a href={x.url} key={x.id || x.url} target="_blank" rel="noopener noreferrer" aria-label={x.label} title={x.label}>
                      {icon ? <img src={icon} alt="" /> : short(x.label)}
                    </a>
                  )
                })}
              </div>
            </div>
          )}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }} className="zx-muted">
          <span style={{ fontSize: 13 }}>
            © {new Date().getFullYear()} {s.siteName || 'Zesxai'}
          </span>
          <span className="zx-mono" style={{ fontSize: 11 }}>
            {s.footerTagline}
          </span>
        </div>
      </div>
    </footer>
  )
}
