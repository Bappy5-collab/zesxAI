import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site settings',
  admin: { group: 'Settings' },
  access: { read: () => true },
  fields: [
    { name: 'siteName', type: 'text', defaultValue: 'Zesxai' },
    {
      name: 'siteUrl',
      type: 'text',
      admin: { description: 'Live address with https, no trailing slash, e.g. https://zesxai.com. Used for canonical URLs, the sitemap and social previews. Falls back to NEXT_PUBLIC_SITE_URL.' },
    },
    {
      name: 'seo',
      label: 'SEO defaults',
      type: 'group',
      fields: [
        { name: 'titleTemplate', type: 'text', defaultValue: '%s | Zesxai', admin: { description: '%s is replaced by the page title.' } },
        { name: 'defaultTitle', type: 'text', defaultValue: 'Zesxai | Custom Software, ERP & SaaS Development Company' },
        { name: 'keywords', type: 'textarea', admin: { description: 'Comma separated site-wide keywords.' } },
        { name: 'ogImage', label: 'Default social image', type: 'upload', relationTo: 'media', admin: { description: '1200×630. Without it a branded image is generated for each page.' } },
        { name: 'twitterHandle', type: 'text', admin: { description: 'e.g. @zesxai' } },
        { name: 'googleVerification', type: 'text', admin: { description: 'Google Search Console verification code (content of the meta tag).' } },
        { name: 'bingVerification', type: 'text' },
        { name: 'noindex', label: 'Hide the whole site from search engines', type: 'checkbox', defaultValue: false, admin: { description: 'Only for a staging copy. Leave off in production.' } },
      ],
    },
    {
      name: 'organization',
      label: 'Company details (for Google)',
      type: 'group',
      admin: { description: 'Used in structured data so Google understands who you are. Fill only what is true.' },
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'legalName', type: 'text' },
            { name: 'foundingYear', type: 'text' },
          ],
        },
        {
          type: 'row',
          fields: [
            { name: 'email', type: 'email' },
            { name: 'phone', type: 'text' },
          ],
        },
        {
          type: 'row',
          fields: [
            { name: 'city', type: 'text' },
            { name: 'country', type: 'text' },
          ],
        },
        { name: 'areaServed', type: 'text', defaultValue: 'Worldwide', admin: { description: 'e.g. Worldwide, or United States, United Kingdom, Canada' } },
      ],
    },
    {
      name: 'nav',
      label: 'Main navigation',
      type: 'array',
      admin: { description: 'Links in the top bar, left to right.' },
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'label', type: 'text', required: true },
            { name: 'href', type: 'text', required: true, admin: { description: 'e.g. /pricing' } },
          ],
        },
      ],
    },
    { name: 'navCta', label: 'Navigation button', type: 'text', defaultValue: 'Book a call' },
    {
      name: 'contact',
      label: 'Contact details (shown in the footer and on the Contact page)',
      type: 'group',
      admin: { description: 'Leave a field empty to hide it everywhere.' },
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'email', type: 'email', admin: { description: 'e.g. hello@zesxai.com' } },
            { name: 'phone', type: 'text', admin: { description: 'With country code, e.g. +880 1712 345678' } },
          ],
        },
        {
          type: 'row',
          fields: [
            { name: 'whatsapp', label: 'WhatsApp number', type: 'text', admin: { description: 'With country code. Opens a chat at wa.me.' } },
            { name: 'whatsappMessage', label: 'WhatsApp first message', type: 'text', defaultValue: "Hi Zesxai, I'd like to talk about a project." },
          ],
        },
        {
          type: 'row',
          fields: [
            { name: 'address', type: 'text', defaultValue: 'Rajshahi, Bangladesh' },
            { name: 'hours', label: 'Working hours', type: 'text', defaultValue: 'Sun to Thu, 10am to 7pm GMT+6' },
          ],
        },
        { name: 'mapUrl', label: 'Map link (optional)', type: 'text', admin: { description: 'Google Maps link for the address.' } },
      ],
    },
    {
      name: 'footerColumns',
      type: 'array',
      maxRows: 4,
      fields: [
        { name: 'title', type: 'text', required: true },
        {
          name: 'links',
          type: 'array',
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'label', type: 'text', required: true },
                { name: 'href', type: 'text', required: true },
              ],
            },
          ],
        },
      ],
    },
    { name: 'logo', type: 'upload', relationTo: 'media', admin: { description: 'Optional wordmark for dark mode (light letters). Without it the built-in wordmark is used.' } },
    { name: 'logoLight', type: 'upload', relationTo: 'media', admin: { description: 'Optional wordmark for light mode (dark letters). Falls back to the dark-mode logo.' } },
    { name: 'metaDescription', type: 'textarea', defaultValue: 'Zesxai is a software development company building ERP systems, business apps, SaaS platforms, mobile apps and AI.' },
    { name: 'footerText', type: 'textarea', defaultValue: 'Software development company. ERP, business apps, SaaS, mobile and AI, built by an experienced team.' },
    { name: 'footerTagline', type: 'text', defaultValue: 'Software that runs your business' },
    { name: 'bookCallUrl', label: 'Calendly link', type: 'text', admin: { description: 'Optional override for the default Zesxai booking link. The selected event is embedded on the Contact page.' } },
    {
      name: 'social',
      label: 'Social links (footer)',
      type: 'array',
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'label', type: 'text', required: true, admin: { description: 'e.g. LinkedIn, X, GitHub' } },
            { name: 'url', type: 'text', required: true },
          ],
        },
        {
          name: 'icon',
          type: 'upload',
          relationTo: 'media',
          admin: { description: "Optional: the network's official icon (SVG/PNG from its brand kit). Without it a short text label is shown." },
        },
      ],
    },
    {
      name: 'reviewPlatforms',
      label: 'Review totals (Google, Trustpilot…)',
      type: 'array',
      admin: {
        description:
          'Rating and review count from each platform, shown above the reviews on Home and the Reviews page, with an "All platforms" total. Copy the numbers from your live profile and update them when they change.',
      },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'platform',
              type: 'select',
              required: true,
              defaultValue: 'google',
              options: [
                { label: 'Google', value: 'google' },
                { label: 'Trustpilot', value: 'trustpilot' },
                { label: 'Clutch', value: 'clutch' },
                { label: 'Upwork', value: 'upwork' },
                { label: 'GoodFirms', value: 'goodfirms' },
                { label: 'DesignRush', value: 'designrush' },
                { label: 'Other', value: 'other' },
              ],
            },
            { name: 'name', type: 'text', admin: { description: 'Only needed for "Other".' } },
          ],
        },
        {
          type: 'row',
          fields: [
            { name: 'rating', type: 'number', required: true, min: 1, max: 5, admin: { step: 0.1 } },
            { name: 'count', label: 'Number of reviews', type: 'number', required: true, min: 1 },
          ],
        },
        { name: 'url', label: 'Link to your profile / reviews page', type: 'text', required: true },
        { name: 'icon', type: 'upload', relationTo: 'media', admin: { description: "Optional: the platform's official icon." } },
      ],
    },
    {
      name: 'listings',
      label: 'Find us on (directory profiles)',
      type: 'array',
      admin: { description: 'GoodFirms, DesignRush, Clutch, Product Hunt, Upwork or any other site. Add, remove and drag to reorder. Shown under the clients strip. Only add profiles that exist.' },
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'name', type: 'text', required: true },
            { name: 'note', type: 'text', admin: { description: 'e.g. Company profile, Reviews & profile' } },
          ],
        },
        { name: 'url', type: 'text', admin: { description: 'Link to YOUR profile page on that site.' } },
        {
          name: 'badge',
          type: 'upload',
          relationTo: 'media',
          admin: { description: 'Optional: the official badge or icon the directory gives listed companies.' },
        },
      ],
    },
    {
      name: 'cta',
      label: 'CTA band',
      type: 'group',
      fields: [
        { name: 'eyebrow', type: 'text', defaultValue: 'Now taking new projects' },
        { name: 'title', type: 'text', defaultValue: "Have a system to build? Let's talk." },
        { name: 'button', type: 'text', defaultValue: 'Book a call' },
      ],
    },
  ],
}
