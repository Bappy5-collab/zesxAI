import type { GlobalConfig } from 'payload'
import { pageHero, sectionHead } from './fields'

export const ReviewsPage: GlobalConfig = {
  slug: 'reviews-page',
  label: 'Reviews page',
  admin: { group: 'Pages', description: 'Reviews themselves are in Content → Reviews; platform totals in Site settings.' },
  access: { read: () => true },
  fields: [
    pageHero({
      eyebrow: 'Reviews',
      title: 'What our clients say.',
      lead: 'Video stories and written reviews from business owners and teams we have built software with.',
    }),
    sectionHead('written', 'Written reviews section', { eyebrow: 'Written reviews', title: 'In their own words.' }),
  ],
}
