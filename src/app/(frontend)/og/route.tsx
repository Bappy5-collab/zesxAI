import { ImageResponse } from 'next/og'
import { readFile } from 'fs/promises'
import path from 'path'

export const runtime = 'nodejs'

const dir = path.join(process.cwd(), 'src/og-fonts')
let fonts: Promise<{ name: string; data: Buffer; weight: 400 | 500 | 700 | 800; style: 'normal' }[]> | null = null
const loadFonts = () =>
  (fonts ??= Promise.all([
    readFile(path.join(dir, 'bricolage-grotesque-latin-800-normal.woff')).then((data) => ({ name: 'Bricolage', data, weight: 800 as const, style: 'normal' as const })),
    readFile(path.join(dir, 'bricolage-grotesque-latin-700-normal.woff')).then((data) => ({ name: 'Bricolage', data, weight: 700 as const, style: 'normal' as const })),
    readFile(path.join(dir, 'geist-sans-latin-400-normal.woff')).then((data) => ({ name: 'Geist', data, weight: 400 as const, style: 'normal' as const })),
    readFile(path.join(dir, 'geist-sans-latin-500-normal.woff')).then((data) => ({ name: 'Geist', data, weight: 500 as const, style: 'normal' as const })),
  ]))

const C = { bg: '#01000E', bg1: '#00051D', bg2: '#000B33', bg3: '#10183B', line: '#263253', ink: '#FFFFFF', muted: '#CADCE8', brand: '#FF8A00', brandInk: '#FFC400', accent: '#FF1493', data: '#00D9FF' }

/** A small tilted UI card for the collage on the right. */
function UiCard({ x, y, w, h, rot, children, glow }: { x: number; y: number; w: number; h: number; rot: number; children: React.ReactNode; glow?: string }) {
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: w,
        height: h,
        display: 'flex',
        flexDirection: 'column',
        padding: 18,
        gap: 12,
        borderRadius: 22,
        background: C.bg1,
        border: `1px solid ${C.line}`,
        transform: `rotate(${rot}deg)`,
        boxShadow: `0 30px 60px rgba(0,0,0,0.55)${glow ? `, 0 0 0 1px ${glow}` : ''}`,
      }}
    >
      {children}
    </div>
  )
}
const Bar = ({ w, c = C.bg3, h = 10 }: { w: number; c?: string; h?: number }) => <div style={{ width: w, height: h, borderRadius: h, background: c, display: 'flex' }} />

/** Branded 1200×630 social image: /og?title=...&eyebrow=... */
let logoUri = ''
let LOGO_W = 403
let LOGO_H = 79

export async function GET(req: Request) {
  if (!logoUri) {
    const svg = await readFile(path.join(dir, 'zesxai-logo.svg'), 'utf8')
    const vb = svg.match(/viewBox="([^"]+)"/)?.[1].split(/\s+/).map(Number)
    if (vb) {
      LOGO_W = vb[2]
      LOGO_H = vb[3]
    }
    logoUri = `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`
  }
  const { searchParams } = new URL(req.url)
  const title = (searchParams.get('title') || 'Custom software, ERP & SaaS development').slice(0, 110)
  const eyebrow = (searchParams.get('eyebrow') || 'Zesxai').slice(0, 60)
  const size = title.length > 70 ? 52 : title.length > 44 ? 62 : 74
  const heights = [60, 96, 74, 120, 88, 140, 110]
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', position: 'relative', background: C.bg, color: C.ink, fontFamily: 'Geist', overflow: 'hidden' }}>
        {/* dot grid */}
        <div style={{ position: 'absolute', inset: 0, display: 'flex', backgroundImage: 'radial-gradient(rgba(255,255,255,0.07) 1.5px, transparent 1.5px)', backgroundSize: '28px 28px' }} />
        {/* glows */}
        <div style={{ position: 'absolute', right: -120, top: -180, width: 760, height: 760, display: 'flex', borderRadius: 760, background: 'radial-gradient(circle at center, rgba(255,20,147,0.34) 0%, rgba(208,0,255,0.12) 42%, rgba(1,0,14,0) 68%)' }} />
        <div style={{ position: 'absolute', left: -220, bottom: -320, width: 640, height: 640, display: 'flex', borderRadius: 640, background: 'radial-gradient(circle at center, rgba(0,217,255,0.18) 0%, rgba(6,27,154,0.1) 38%, rgba(1,0,14,0) 65%)' }} />

        {/* collage */}
        <UiCard x={700} y={70} w={430} h={250} rot={-6} glow="rgba(255,138,0,0.34)">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 26, height: 26, borderRadius: 8, background: C.brand, display: 'flex' }} />
            <Bar w={120} />
            <div style={{ marginLeft: 'auto', display: 'flex', gap: 6 }}>
              <Bar w={40} c={C.bg2} h={18} />
              <Bar w={40} c={C.bg2} h={18} />
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 14, height: 150, padding: '0 6px' }}>
            {heights.map((h, i) => (
              <div key={i} style={{ width: 34, height: h, borderRadius: 8, background: i === 5 ? C.brand : i === 3 ? C.data : C.bg3, display: 'flex' }} />
            ))}
          </div>
        </UiCard>
        <UiCard x={640} y={330} w={300} h={210} rot={5}>
          <Bar w={90} />
          <div style={{ display: 'flex', gap: 10 }}>
            <div style={{ flex: 1, height: 64, borderRadius: 12, background: C.bg2, display: 'flex' }} />
            <div style={{ flex: 1, height: 64, borderRadius: 12, background: C.brand, display: 'flex' }} />
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <div style={{ flex: 1, height: 44, borderRadius: 12, background: C.data, opacity: 0.9, display: 'flex' }} />
            <div style={{ flex: 1, height: 44, borderRadius: 12, background: C.bg2, display: 'flex' }} />
          </div>
        </UiCard>
        <UiCard x={960} y={360} w={210} h={200} rot={-3}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 10, height: 10, borderRadius: 10, background: C.accent, display: 'flex' }} />
            <Bar w={90} />
          </div>
          <div style={{ display: 'flex', padding: '10px 14px', borderRadius: 14, background: C.bg2, fontSize: 15, color: C.muted }}>Ask the ERP…</div>
          <div style={{ display: 'flex', padding: '10px 14px', borderRadius: 14, backgroundImage: 'linear-gradient(110deg, #FFC400 0%, #FF8A00 25%, #F35B3F 50%, #FF1493 75%, #8901AD 100%)', color: '#01000E', fontSize: 15, fontWeight: 600, alignSelf: 'flex-end' }}>Stock is up 12%</div>
        </UiCard>

        {/* copy */}
        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: 660, padding: '64px 0 60px 72px' }}>
          <div style={{ display: 'flex' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={logoUri} height={48} width={Math.round((48 * LOGO_W) / LOGO_H)} alt="" />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
            <div style={{ display: 'flex', alignSelf: 'flex-start', alignItems: 'center', gap: 10, padding: '9px 16px', borderRadius: 999, border: `1px solid ${C.line}`, background: 'rgba(21,18,16,0.8)', fontSize: 20, fontWeight: 500, color: C.brandInk, letterSpacing: 2, textTransform: 'uppercase' }}>
              <div style={{ width: 8, height: 8, borderRadius: 8, background: C.accent, display: 'flex' }} />
              {eyebrow}
            </div>
            <div style={{ display: 'flex', fontFamily: 'Bricolage', fontWeight: 800, fontSize: size, lineHeight: 1.02, letterSpacing: -2.5 }}>{title}</div>
          </div>
          <div style={{ display: 'flex', gap: 10, fontSize: 20, color: C.muted }}>
            {['ERP', 'Business apps', 'SaaS', 'Mobile', 'AI'].map((t) => (
              <div key={t} style={{ display: 'flex', padding: '6px 14px', borderRadius: 999, background: C.bg1, border: `1px solid ${C.line}` }}>
                {t}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630, fonts: await loadFonts() },
  )
}
