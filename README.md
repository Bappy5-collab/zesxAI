# Zesxai website (Next.js + Payload CMS)

The Zesxai site from the design system, with every section controlled from Payload CMS.

- Site: `http://localhost:3000`
- CMS admin: `http://localhost:3000/admin`

## Run it locally

```bash
cp .env.example .env          # set PAYLOAD_SECRET
docker compose up -d          # Postgres 16 (or use your own and set DATABASE_URL)
npm install
npm run seed                  # starter content (all placeholders are marked "Sample")
npm run dev
```

Open `/admin` and create the first user, or set `SEED_ADMIN_EMAIL` and `SEED_ADMIN_PASSWORD` before seeding. Run `SEED_FRESH=1 npm run seed` to wipe the seeded content and start again.

## What the CMS controls

| Admin section | Controls on the site |
|---|---|
| **Hero gallery** | Videos and screenshots scrolling behind the home hero (column 1–4, tall or wide) |
| **Clients** | Logo strip under the hero and the "See all clients" dialog with industry filters |
| **Services** | Bento cards on Home and Services (icon, tags, badge, mini illustration) |
| **Case studies** | Tabs on Home (featured) and the filterable grid on Work. Upload a cover to replace the drawn mockup |
| **Products** | Axzura, AI Voice Support, Opus Site Score. Status: Coming soon / Beta / Live, plus a URL when live |
| **Reviews** | Video reviews (carousel) and written reviews (marquee on Home, wall on Reviews) |
| **Team** | Everyone on the About page: name, role, department (filters), photo, short bio, LinkedIn/GitHub, order, and whether they appear in the photo grid at the top |
| **Leads** (Inbox) | Every project brief submitted on the Contact page |
| **Pricing page** | Monthly plans (name, price in USD or a label like "Custom", badge, highlight, features, button), notes under the plans and the pricing FAQ |
| **Home / Services / Process / About page** | Headlines, section copy, stats, engagement models, FAQ, process steps, stack, About stats, mission statement, founder spotlight and principles. Home page → Hero → **Intro video button**: paste a YouTube, Vimeo or Loom link and the floating "Watch our intro" button floats in the bottom-right corner of the home hero (optional round thumbnail) |
| **Site settings** | Site URL, SEO defaults (title template, keywords, social image, Search Console codes), company details for Google, main navigation, footer columns, |
| **Site settings → Contact details** | Email, phone, WhatsApp number (+ first message), address (default Rajshahi, Bangladesh), working hours and an optional map link. Shown in the footer Contact column and on the Contact page; empty fields are hidden |
| **Site settings → Calendly link** | Your Calendly event URL (e.g. `https://calendly.com/zesxai/30min`). It is embedded on the Contact page and matches the light or dark theme; without it the booking panel shows Email / WhatsApp buttons |
| **Contact page** | Hero, the Book a call panel copy, the brief heading, the four brief steps and "What happens next" |
| **Site settings (cont.)** | Name, dark-mode logo and light-mode logo, footer, navigation button (default "Book a call"), CTA band. **Social links** (footer round buttons; upload each network's official icon, otherwise a short label shows). **Review totals**: rating and review count per platform (Google, Trustpilot, Clutch, Upwork…) with a link to your profile; an "All platforms" total is calculated automatically. **Find us on**: directory profiles under the clients strip (GoodFirms, DesignRush, Clutch, Product Hunt, Upwork or any other); add, remove, reorder, set each profile URL and optionally upload the badge the site gives you |

## Light and dark mode

The site follows the visitor's device (light or dark) on the first visit. The sun/moon button in the nav switches it and remembers the choice. Colors for both themes live in `public/zesxai/tokens.css`; a tiny script in `src/app/(frontend)/layout.tsx` sets the theme before the first paint so there is no flash. Upload a light-mode logo in Site settings if you replace the built-in wordmark.

## Reviews policy

- The seeded reviews, case studies, gallery tiles and clients are **placeholders** and show a "Sample" chip. Replace them with real content, then untick **Sample / placeholder**.
- A review with source Google, Trustpilot, Clutch or Upwork **must** link to the original review (the CMS enforces this). Only copy reviews that really exist on that platform.
- The rating summary on the Reviews page only counts real, non-sample reviews. It stays hidden until you publish one.

## Deploy

1. Create a Postgres database (Neon, Supabase, RDS…) and set `DATABASE_URL` and `PAYLOAD_SECRET`.
2. `npm run build && npm start`. Migrations in `src/migrations` run automatically on first start in production.
3. Uploaded media is stored in `/media` on disk. On serverless hosts such as Vercel, add a storage adapter (`@payloadcms/storage-s3` or `@payloadcms/storage-vercel-blob`).

After changing collections or globals: `npm run generate:types` and `npx payload migrate:create <name>`.

### Booking and lead email

Set **Site settings → Contact details → Email** to the inbox that should receive enquiries. Project briefs are saved under **Admin → Inbox → Leads**. To also receive an email for each brief, verify a sending domain in Resend, then set `RESEND_API_KEY` and `RESEND_FROM_EMAIL` in the server environment (the sender must belong to the verified domain) and restart the app. The notification goes to the Contact details email, and replying goes to the lead. For bookings, set **Site settings → Calendly link**; manage booking notifications and calendar connection in Calendly so confirmed bookings reach your scheduling inbox.

## Where things live

- `src/collections`, `src/globals`: CMS schema
- `src/app/(frontend)`: site pages (server components that read from Payload)
- `src/components/sections.tsx`: all section components
- `src/components/Behaviors.tsx`: loads `/public/zesxai/bundle.js` (animations, carousel, flow canvas, wizard)
- `public/zesxai`: design system CSS, tokens and behaviors
- `src/app/actions/brief.ts`: saves the project brief into Leads

## SEO

- **Every page** has an SEO panel in the CMS (Meta: title, description, social image, keywords, hide from search). Empty fields fall back to the page headline and lead.
- **Service pages** (`/services/<slug>`) and **case study pages** (`/work/<slug>`) are landing pages, one keyword cluster each. Put the main keyword in the SEO title, the headline (H1) and the intro.
- **Sitemap** `/sitemap.xml` is built from the CMS on every request: all pages, services and case studies, skipping anything marked hidden.
- **robots.txt** allows everything except `/admin`, `/api` and `/og`, and points to the sitemap. "Hide the whole site" in Site settings → SEO defaults blocks all crawlers (for staging only).
- **Social images** are generated per page at `/og?title=…` unless you upload one.
- **Structured data (JSON-LD):** Organization and WebSite on every page, Service on service pages and pricing (with the monthly prices as offers), FAQPage where there is an FAQ, BreadcrumbList on inner pages, Article on case studies, Person for the founder. Reviews are deliberately not marked up: Google does not show stars for a company's own reviews of itself.
- **Before launch:** set Site settings → Site URL (or `NEXT_PUBLIC_SITE_URL`), fill Company details (city, country, email) only with true information, add the Google Search Console verification code, then submit `https://your-domain/sitemap.xml` in Search Console.
