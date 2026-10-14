import type { SiteSetting } from '@/payload-types'
import { Icon } from './Icon'
import { CalendlyEmbed } from './CalendlyEmbed'

type C = NonNullable<SiteSetting['contact']>

export const waLink = (num?: string | null, msg?: string | null) => {
  const digits = (num || '').replace(/[^\d]/g, '')
  if (!digits) return ''
  return `https://wa.me/${digits}${msg ? `?text=${encodeURIComponent(msg)}` : ''}`
}
export const telLink = (num?: string | null) => (num ? `tel:${num.replace(/[^\d+]/g, '')}` : '')

function Method({ kind, icon, label, value, note, href, external }: { kind: string; icon: string; label: string; value: string; note?: string | null; href?: string; external?: boolean }) {
  const inner = (
    <>
      <i>
        <Icon name={icon} inline />
      </i>
      <div>
        <small>{label}</small>
        <b>{value}</b>
        {note && <em>{note}</em>}
      </div>
      {href && (
        <span className="zx-method__go">
          <Icon name="arrow" inline />
        </span>
      )}
    </>
  )
  return href ? (
    <a className={`zx-method zx-method--${kind}`} href={href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
      {inner}
    </a>
  ) : (
    <div className={`zx-method zx-method--${kind}`}>{inner}</div>
  )
}

/** Email, WhatsApp, phone and office, from Site settings → Contact details. Empty fields are hidden. */
export function ContactMethods({ c, title }: { c?: C | null; title?: string | null }) {
  const wa = waLink(c?.whatsapp, c?.whatsappMessage)
  return (
    <div className="zx-methods">
      {title && <h3 className="zx-h3">{title}</h3>}
      {c?.email && <Method kind="mail" icon="mail" label="Email" value={c.email} note="We reply within one business day" href={`mailto:${c.email}`} />}
      {wa && <Method kind="wa" icon="msg" label="WhatsApp" value={c?.whatsapp || ''} note="Chat with the team" href={wa} external />}
      {c?.phone && <Method kind="phone" icon="phone" label="Phone" value={c.phone} note={c.hours} href={telLink(c.phone)} />}
      {c?.address && <Method kind="pin" icon="pin" label="Office" value={c.address} note="Working with clients worldwide" href={c.mapUrl || undefined} external />}
    </div>
  )
}

/** The "Book a call" panel: a live Calendly embed, or email / WhatsApp buttons until a link is set. */
export function BookCall({ url, c, eyebrow, title, text }: { url?: string | null; c?: C | null; eyebrow?: string | null; title?: string | null; text?: string | null }) {
  const wa = waLink(c?.whatsapp, c?.whatsappMessage)
  return (
    <div className="zx-book">
      <div className="zx-book__head">
        <div>
          <span className="zx-eyebrow">{eyebrow || 'Book a call'}</span>
          <h2>{title || 'Pick a 30-minute slot'}</h2>
          {text && <p>{text}</p>}
        </div>
      </div>
      <div className="zx-book__frame" style={url ? undefined : { height: 'auto' }}>
        {url ? (
          <CalendlyEmbed url={url} />
        ) : (
          <div className="zx-book__fallback">
            <div className="zx-service__icon" style={{ background: 'var(--brand)', color: 'var(--on-brand)', borderColor: 'var(--brand)' }}>
              <Icon name="calendar" inline />
            </div>
            <p>Tell us two or three times that suit you and we will send a calendar invite.</p>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
              {c?.email && (
                <a className="zx-btn zx-btn--primary" href={`mailto:${c.email}?subject=${encodeURIComponent('Book a call')}`}>
                  Email to book <Icon name="arrow" inline />
                </a>
              )}
              {wa && (
                <a className="zx-btn zx-btn--ghost" href={wa} target="_blank" rel="noopener noreferrer">
                  WhatsApp us
                </a>
              )}
              {!c?.email && !wa && (
                <a className="zx-btn zx-btn--primary" href="#brief-section">
                  Send a short brief <Icon name="arrow" inline />
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
