/** The wordmark in both themes: CSS shows the dark-ground or light-ground file based on data-theme. */
export function Logo({ alt, logo, logoLight }: { alt: string; logo?: string | null; logoLight?: string | null }) {
  const dark = logo || '/brand/zesxai-wordmark.svg'
  const light = logoLight || (logo ? logo : '/brand/zesxai-wordmark-dark.svg')
  // Keep uploaded wordmarks prominent in the navbar and footer while preserving
  // their original proportions. The navbar is 60px tall.
  const st = { height: 80, width: 'auto', maxWidth: 'min(420px, 48vw)', objectFit: 'contain' as const }
  return (
    <>
      <img className="zx-logo--dark" src={dark} alt={alt} width={90} height={28} style={st} />
      <img className="zx-logo--light" src={light} alt="" aria-hidden="true" width={90} height={28} style={st} />
    </>
  )
}
