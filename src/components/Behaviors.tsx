'use client'
import Script from 'next/script'
import { submitBrief } from '@/app/actions/brief'

/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  interface Window {
    Zesxai?: any
    __zxInit?: boolean
  }
}

const $$ = (s: string, r: ParentNode = document) => Array.from(r.querySelectorAll<HTMLElement>(s))

/** Wires the vanilla design-system behaviors (window.Zesxai from /zesxai/bundle.js) onto server-rendered markup. */
function init() {
  const Z = window.Zesxai
  if (!Z || window.__zxInit) return
  window.__zxInit = true

  if (Z.theme) Z.theme(document)
  Z.glow(document.getElementById('glow'))
  $$('[data-split]').forEach(Z.split)
  $$('.zx-gallery').forEach((g) => Z.gallery(g))
  $$('.zx-clients').forEach((c) => Z.clients(c))
  Z.tilt($$('.zx-service'), 7)
  Z.spotlight($$('.zx-bcard, .zx-product, .zx-tr'))
  $$('.zx-cases').forEach((c) => Z.tabs(c, { auto: 9000 }))
  $$('[data-tr]').forEach((r) => Z.reviews(r))
  Z.magnetic($$('[data-mag]'), 0.25)
  Z.intro($$('[data-intro]'))
  $$('.zx-flow').forEach((f) => Z.flow(f))
  $$('.zx-rf[data-graph]').forEach((el) => {
    try {
      Z.flowgraph(el, JSON.parse(el.dataset.graph || 'null'))
    } catch (e) {
      console.warn(e)
    }
  })
  $$('.zx-reviews').forEach((r) => Z.carousel(r))
  $$('.zx-hero__meta').forEach((m) => Z.counters(m))
  $$('[data-team]').forEach((t) => Z.team(t))

  // Work page filters
  const fb = $$('#filters [data-f]')
  fb.forEach((b) =>
    b.addEventListener('click', () => {
      fb.forEach((x) => {
        x.classList.toggle('zx-btn--primary', x === b)
        x.classList.toggle('zx-btn--ghost', x !== b)
      })
      $$('#work-grid article').forEach((a) => a.classList.toggle('is-out', b.dataset.f !== 'All' && a.dataset.cat !== b.dataset.f))
    }),
  )

  // Project brief wizard -> Leads collection
  const brief = document.getElementById('brief') as HTMLFormElement | null
  if (brief) {
    Z.wizard(brief, {
      onSubmit: async (fd: FormData) => {
        const next = brief.querySelector<HTMLButtonElement>('[data-next]')
        const err = brief.querySelector<HTMLElement>('.zx-wizard__error')
        if (next) next.disabled = true
        const res = await submitBrief(fd)
        if (next) next.disabled = false
        if (!res.ok) {
          if (err) err.textContent = res.error || 'Could not send.'
          return
        }
        $$('.zx-wizard__pane, .zx-wizard__nav, .zx-wizard__steps, .zx-wizard__error', brief).forEach((e) => (e.style.display = 'none'))
        const done = brief.querySelector<HTMLElement>('.zx-wizard__done')
        if (done) done.style.display = 'grid'
      },
    })
  }

  Z.reveal(document)
  setTimeout(() => window.dispatchEvent(new Event('resize')), 60)
}

export function Behaviors() {
  return <Script src="/zesxai/bundle.js" strategy="afterInteractive" onReady={init} />
}
