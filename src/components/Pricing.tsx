import type { PricingPage } from '@/payload-types'
import { values } from '@/lib/payload'
import { PricingSwitcher, type PlanData } from './PricingSwitcher'

const CHECK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12l5 5 9-10"/></svg>'
export const Check = () => <span style={{ display: 'contents' }} dangerouslySetInnerHTML={{ __html: CHECK }} />

export function PricingPlans({ page, id = 'pricer' }: { page: PricingPage; id?: string }) {
  const plans: PlanData[] = (page.plans || []).map((p) => ({
    name: p.name,
    price: p.price ?? null,
    priceLabel: p.priceLabel,
    period: p.period,
    subtitle: p.subtitle,
    badge: p.badge,
    highlight: p.highlight,
    color: p.color,
    description: p.description,
    roles: values(p.teamRoles),
    features: values(p.features),
    ctaLabel: p.ctaLabel,
    ctaUrl: p.ctaUrl,
  }))
  if (!plans.length) return null
  return <PricingSwitcher id={id} plans={plans} notes={values(page.notes)} help={page.help} billingNote={page.billingNote} />
}

/** Offer schema for the plans (prices in USD per month). */
export function pricingLd(page: PricingPage, url: string) {
  const offers = (page.plans || [])
    .filter((p) => p.price != null)
    .map((p) => ({
      '@type': 'Offer',
      name: `${p.name} plan`,
      description: p.description || undefined,
      price: p.price,
      priceCurrency: 'USD',
      url: `${url}/pricing`,
      priceSpecification: { '@type': 'UnitPriceSpecification', price: p.price, priceCurrency: 'USD', unitText: 'MONTH', referenceQuantity: { '@type': 'QuantitativeValue', value: 1, unitCode: 'MON' } },
    }))
  if (!offers.length) return null
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Dedicated software development team',
    serviceType: 'Custom software development',
    provider: { '@id': `${url}/#organization` },
    offers,
  }
}
