import { icons } from '@/lib/icons'

/** Inline line icon. `inline` renders with display:contents so it sits inside buttons and links. */
export function Icon({ name, className, inline }: { name: string; className?: string; inline?: boolean }) {
  return (
    <span
      className={className}
      style={inline ? { display: 'contents' } : undefined}
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: icons[name] || icons.arrow }}
    />
  )
}

export const Arrow = () => <Icon name="arrow" inline />

export function Svg({ html, className }: { html: string; className?: string }) {
  return <div className={className} style={{ display: 'contents' }} dangerouslySetInnerHTML={{ __html: html }} />
}
