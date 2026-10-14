'use client'
import { useEffect, useState } from 'react'
import { AnimatePresence, animate, motion, useMotionValue, useReducedMotion, useTransform } from 'motion/react'
import { icons } from '@/lib/icons'

export type PlanData = {
  name: string
  price: number | null
  priceLabel?: string | null
  period?: string | null
  subtitle?: string | null
  badge?: string | null
  highlight?: boolean | null
  color?: string | null
  description?: string | null
  roles: string[]
  features: string[]
  ctaLabel?: string | null
  ctaUrl?: string | null
}

const HUE: Record<string, string> = { cyan: 'var(--color-cyan-blue)', indigo: 'var(--color-electric-blue)', amber: 'var(--color-amber-yellow)', coral: 'var(--color-coral-orange)', green: 'var(--color-magenta)' }
const ROLE_ICON: [string, string][] = [['develop', 'code'], ['design', 'card'], ['qa', 'shield'], ['project', 'chat'], ['market', 'chart'], ['architect', 'stack'], ['lead', 'agent']]
const roleIcon = (r: string) => icons[ROLE_ICON.find(([k]) => r.toLowerCase().includes(k))?.[1] || 'check']
const CHECK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12l5 5 9-10"/></svg>'
const ease = [0.16, 1, 0.3, 1] as const

function Price({ to, from }: { to: number; from: number }) {
  const reduce = useReducedMotion()
  const mv = useMotionValue(from)
  const text = useTransform(mv, (v) => `$${Math.round(v).toLocaleString('en-US')}`)
  useEffect(() => {
    if (reduce) return mv.set(to)
    const c = animate(mv, to, { duration: 0.8, ease })
    return () => c.stop()
  }, [to, mv, reduce])
  return <motion.b>{text}</motion.b>
}

export function PricingSwitcher({
  plans,
  notes,
  help,
  billingNote,
  id,
}: {
  plans: PlanData[]
  notes: string[]
  help?: { title?: string | null; text?: string | null; button?: string | null } | null
  billingNote?: string | null
  id: string
}) {
  const start = Math.max(0, plans.findIndex((p) => p.highlight))
  const [i, setI] = useState(start)
  const [prevPrice, setPrevPrice] = useState(0)
  const reduce = useReducedMotion()
  const p = plans[i]
  const hue = HUE[p.color || 'indigo'] || HUE.indigo
  const go = (k: number) => {
    setPrevPrice(plans[i].price ?? Math.round((plans[k].price || 0) * 0.7))
    setI(k)
  }
  const prevRoles = i > 0 ? plans[i - 1].roles : []
  return (
    <div className="zx-pricer is-motion" style={{ ['--pc' as string]: hue }}>
      <div className="zx-pricer__list" role="tablist" aria-label="Pricing plans">
        {plans.map((pl, k) => {
          const on = k === i
          const c = HUE[pl.color || 'indigo'] || HUE.indigo
          return (
            <motion.button
              type="button"
              role="tab"
              id={`${id}-t${k}`}
              aria-controls={`${id}-panel`}
              aria-selected={on}
              tabIndex={on ? 0 : -1}
              key={pl.name}
              className="zx-pricer__opt"
              style={{ ['--oc' as string]: c }}
              onClick={() => go(k)}
              onKeyDown={(e) => {
                const d = e.key === 'ArrowDown' || e.key === 'ArrowRight' ? 1 : e.key === 'ArrowUp' || e.key === 'ArrowLeft' ? -1 : 0
                if (d) {
                  e.preventDefault()
                  const n = (k + d + plans.length) % plans.length
                  go(n)
                  document.getElementById(`${id}-t${n}`)?.focus()
                }
              }}
              initial={reduce ? false : { opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, ease, delay: k * 0.08 }}
              whileHover={on ? undefined : { x: 4 }}
              whileTap={{ scale: 0.985 }}
            >
              {on && <motion.span layoutId={`${id}-glow`} className="zx-pricer__glow" transition={{ type: 'spring', stiffness: 380, damping: 34 }} />}
              <span className="zx-pricer__radio" aria-hidden="true" />
              <span className="zx-pricer__name">
                {pl.name}
                {pl.badge && <em>{pl.badge}</em>}
              </span>
              {pl.subtitle && <span className="zx-pricer__sub">{pl.subtitle}</span>}
              <span className="zx-pricer__amt">
                {pl.price != null ? `$${pl.price.toLocaleString('en-US')}` : pl.priceLabel || 'Custom'}
                <small>{pl.period}</small>
              </span>
            </motion.button>
          )
        })}
        {notes.length > 0 && (
          <ul className="zx-pricer__notes">
            {notes.map((n) => (
              <li key={n}>
                <span style={{ display: 'contents' }} dangerouslySetInnerHTML={{ __html: CHECK }} />
                {n}
              </li>
            ))}
          </ul>
        )}
        {help?.title && (
          <div className="zx-pricer__help">
            <b>{help.title}</b>
            {help.text && <p>{help.text}</p>}
            <a className="zx-btn zx-btn--ghost zx-btn--sm" href="/contact">
              {help.button || 'Get a recommendation'} <span style={{ display: 'contents' }} dangerouslySetInnerHTML={{ __html: icons.arrow }} />
            </a>
          </div>
        )}
      </div>

      <div className="zx-pricer__stage">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={p.name}
            id={`${id}-panel`}
            role="tabpanel"
            aria-labelledby={`${id}-t${i}`}
            className="zx-pricer__panel is-active"
            style={{ ['--pc' as string]: hue }}
            initial={reduce ? false : { opacity: 0, y: 18, scale: 0.985, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            exit={reduce ? undefined : { opacity: 0, y: -10, scale: 0.99, filter: 'blur(4px)' }}
            transition={{ duration: 0.45, ease }}
          >
            <div className="zx-pricer__top">
              <div>
                <span className="zx-pricer__label">{p.name} plan</span>
                <div className="zx-pricer__price">
                  {p.price != null ? <Price to={p.price} from={prevPrice} /> : <b>{p.priceLabel || 'Custom'}</b>}
                  <span>{p.period}</span>
                </div>
              </div>
            </div>
            {p.description && <p className="zx-pricer__desc">{p.description}</p>}
            {p.roles.length > 0 && (
              <div className="zx-pricer__team">
                <span className="zx-eyebrow">Your team</span>
                <ul>
                  {p.roles.map((r, k) => (
                    <motion.li
                      key={r}
                      className={`zx-pricer__role${i > 0 && !prevRoles.includes(r) ? ' is-new' : ''}`}
                      initial={reduce ? false : { opacity: 0, y: 10, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ type: 'spring', stiffness: 420, damping: 28, delay: 0.1 + k * 0.05 }}
                    >
                      <i dangerouslySetInnerHTML={{ __html: roleIcon(r) }} />
                      {r}
                    </motion.li>
                  ))}
                </ul>
              </div>
            )}
            <ul className="zx-pricer__feats">
              {p.features.map((f, k) => (
                <motion.li
                  key={f}
                  initial={reduce ? false : { opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, ease, delay: 0.22 + k * 0.04 }}
                >
                  <span style={{ display: 'contents' }} dangerouslySetInnerHTML={{ __html: CHECK }} />
                  <span>{f}</span>
                </motion.li>
              ))}
            </ul>
            <div className="zx-pricer__cta">
              <motion.a className="zx-btn zx-btn--primary" href={p.ctaUrl || '/contact'} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                {p.ctaLabel || 'Get started'} <span style={{ display: 'contents' }} dangerouslySetInnerHTML={{ __html: icons.arrow }} />
              </motion.a>
              {billingNote && <small>{billingNote}</small>}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
