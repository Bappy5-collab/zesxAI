'use client'
import React, { useEffect, useRef } from 'react'
import { animate, motion, stagger, useInView, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react'

const ease = [0.16, 1, 0.3, 1] as const

/** Thin brand progress bar at the top of the page. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const x = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 })
  return <motion.div className="zx-progress" style={{ scaleX: x }} aria-hidden="true" />
}

/** Section heading: eyebrow slides in, title words rise one by one, lead fades up. */
export function MotionHead({
  eyebrow,
  title,
  lead,
  mb = 'var(--space-12)',
}: {
  eyebrow?: string | null
  title?: string | null
  lead?: string | null
  mb?: string
}) {
  const reduce = useReducedMotion()
  const words = (title || '').split(/(\s+)/)
  const container = { hidden: {}, show: { transition: { staggerChildren: 0.035, delayChildren: 0.08 } } }
  const word = { hidden: { y: '110%', opacity: 0 }, show: { y: '0%', opacity: 1, transition: { duration: 0.7, ease } } }
  return (
    <motion.div
      style={{ display: 'grid', gap: 16, marginBottom: mb, maxWidth: 760 }}
      initial={reduce ? false : 'hidden'}
      whileInView="show"
      viewport={{ once: true, margin: '-80px' }}
      variants={container}
    >
      {eyebrow && (
        <motion.span className="zx-eyebrow" variants={{ hidden: { opacity: 0, x: -16 }, show: { opacity: 1, x: 0, transition: { duration: 0.5, ease } } }}>
          {eyebrow}
        </motion.span>
      )}
      {title && (
        <h2 className="zx-h2" aria-label={title}>
          {words.map((w, i) =>
            /^\s+$/.test(w) ? (
              w
            ) : (
              <span key={i} aria-hidden="true" style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'top', paddingBottom: '0.08em' }}>
                <motion.span style={{ display: 'inline-block' }} variants={word}>
                  {w}
                </motion.span>
              </span>
            ),
          )}
        </h2>
      )}
      {lead && (
        <motion.p className="zx-lead" variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease, delay: 0.15 } } }}>
          {lead}
        </motion.p>
      )}
    </motion.div>
  )
}

/** Staggers its direct children in (rise + fade + slight scale) when scrolled into view. */
export function StaggerIn({ children, className, style, gap = 0.08, as = 'div', id }: { children: React.ReactNode; className?: string; style?: React.CSSProperties; gap?: number; as?: 'div' | 'ul'; id?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const reduce = useReducedMotion()
  const count = React.Children.count(children)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const kids = Array.from(el.children) as HTMLElement[]
    if (!kids.length) return
    if (reduce) {
      kids.forEach((k) => (k.style.opacity = '1'))
      return
    }
    if (!inView) return
    const c = animate(kids, { opacity: [0, 1], y: [36, 0], scale: [0.97, 1] }, { duration: 0.7, ease, delay: stagger(gap) })
    // hand transforms back to CSS so hover effects keep working
    c.then(() => kids.forEach((k) => (k.style.transform = '')))
    return () => c.stop()
  }, [inView, reduce, gap, count])
  const Tag = as as 'div'
  return (
    <Tag ref={ref} className={`${className || ''} zx-stagger`} style={style} id={id}>
      {children}
    </Tag>
  )
}

/** Hero: copy drifts up and fades, gallery zooms slightly as the page scrolls. */
export function HeroScroll({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, -90])
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0])
  return (
    <motion.div ref={ref} style={reduce ? undefined : { y, opacity }}>
      {children}
    </motion.div>
  )
}

/** Soft page enter on every navigation. */
export function PageEnter({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion()
  return (
    <motion.div initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, ease }}>
      {children}
    </motion.div>
  )
}

/** Spring lift + pointer tilt for a card. */
export function TiltCard({ children, className, style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  return (
    <motion.div className={className} style={style} whileHover={{ y: -6, rotateX: 2, rotateY: -2 }} transition={{ type: 'spring', stiffness: 300, damping: 22 }}>
      {children}
    </motion.div>
  )
}
