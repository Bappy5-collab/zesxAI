/**
 * Keyword-targeted starter copy. Each service is a landing page for one keyword cluster.
 * Edit freely in the CMS; keep the main keyword in the SEO title, the headline (H1) and the intro.
 */
type Q = { question: string; answer: string }
type Meta = { title: string; description: string; keywords: string }

export const serviceSeo: {
  slug: string
  headline: string
  intro: string
  features: { title: string; text: string }[]
  deliverables: string[]
  faq: Q[]
  meta: Meta
}[] = [
  {
    slug: 'custom-erp-development',
    headline: 'Custom ERP software development',
    intro:
      'We design and build custom ERP systems that bring finance, inventory, sales, purchasing, HR and payroll into one database. Built around how your business actually works, not around a generic template, and supported after launch.',
    features: [
      { title: 'Finance & accounting', text: 'Invoicing, ledger, receivables, payables, tax and month-end reports.' },
      { title: 'Inventory & warehouse', text: 'Multi-branch stock, transfers, barcodes, reorder levels and valuation.' },
      { title: 'Sales, CRM & POS', text: 'Quotes, orders, customers and point of sale connected to stock in real time.' },
      { title: 'Purchasing & suppliers', text: 'Purchase orders, approvals, supplier bills and landed cost.' },
      { title: 'HR & payroll', text: 'Staff records, attendance, leave and salary runs.' },
      { title: 'Dashboards & AI', text: 'Live reports for owners and an AI assistant that answers questions about your data.' },
    ],
    deliverables: ['Process mapping and ERP requirements', 'Data migration from spreadsheets or old software', 'Role-based access for every department', 'Staff training and documentation', 'Monthly support and new modules'],
    faq: [
      { question: 'How long does a custom ERP take to build?', answer: 'A first release with the core modules usually takes 3 to 6 months, delivered in two-week sprints so your team can use parts of it early.' },
      { question: 'Custom ERP or an off-the-shelf ERP like Odoo or SAP?', answer: 'Off-the-shelf works when your processes match the product. A custom ERP fits your exact workflow, has no per-user licence fees and can grow with you. We help you decide in the discovery sprint.' },
      { question: 'Can you migrate our data from Excel or our old system?', answer: 'Yes. Data migration, cleaning and validation are part of every ERP project.' },
    ],
    meta: {
      title: 'Custom ERP Software Development Company | Zesxai',
      description: 'Custom ERP development for growing businesses: finance, inventory, sales, HR and payroll in one system. Built, migrated and supported by an experienced team.',
      keywords: 'custom ERP development, ERP software development company, custom ERP software, ERP for small business, ERP development services, ERP implementation',
    },
  },
  {
    slug: 'business-software-development',
    headline: 'Custom business software for SMBs',
    intro:
      'CRM, POS, inventory, booking and back-office apps built for small and mid-size businesses. We replace spreadsheets and disconnected tools with one simple system your team actually enjoys using.',
    features: [
      { title: 'Custom CRM', text: 'Leads, pipeline, follow-ups and customer history in one place.' },
      { title: 'POS & retail software', text: 'Offline-first point of sale that syncs every shop with the back office.' },
      { title: 'Inventory management', text: 'Stock levels, suppliers and alerts across locations.' },
      { title: 'Booking & scheduling', text: 'Online bookings, calendars, reminders and payments.' },
      { title: 'Back-office automation', text: 'Approvals, documents and reports without copy-paste.' },
      { title: 'Integrations', text: 'Accounting, payments, email, WhatsApp and the tools you already use.' },
    ],
    deliverables: ['Workflow workshop with your team', 'Web app plus mobile access', 'Import of your existing data', 'Training and support'],
    faq: [
      { question: 'Is custom software affordable for a small business?', answer: 'Yes. Our monthly plans start at $3,500 with a full team, and you own the code. Many SMBs recover the cost in saved hours within the first year.' },
      { question: 'Will it work offline?', answer: 'POS and field apps can be built offline-first and sync automatically when the connection returns.' },
    ],
    meta: {
      title: 'Custom Business Software for SMBs: CRM, POS & Inventory | Zesxai',
      description: 'Custom CRM, POS, inventory and booking software for small and mid-size businesses. Replace spreadsheets with one system built by an experienced team.',
      keywords: 'custom business software, small business software development, custom CRM development, POS software development, inventory management software development, SMB software',
    },
  },
  {
    slug: 'saas-development',
    headline: 'SaaS & web application development',
    intro:
      'We build multi-tenant SaaS platforms, customer portals and dashboards with authentication, subscriptions, admin panels and analytics built in. From MVP to scale, on Next.js, TypeScript and Postgres.',
    features: [
      { title: 'SaaS MVP development', text: 'A launchable first version in weeks, with billing and onboarding.' },
      { title: 'Multi-tenant architecture', text: 'Organisations, roles, permissions and data isolation done right.' },
      { title: 'Subscriptions & billing', text: 'Stripe plans, trials, invoices and usage-based pricing.' },
      { title: 'Customer portals', text: 'Self-service portals and dashboards for your clients.' },
      { title: 'Admin & analytics', text: 'Internal tools, audit logs and product analytics.' },
      { title: 'Performance & SEO', text: 'Fast, accessible Next.js front ends that rank.' },
    ],
    deliverables: ['Product and architecture plan', 'Design system and UI', 'CI/CD and staging environments', 'Launch support and monitoring'],
    faq: [
      { question: 'Which tech stack do you use for SaaS?', answer: 'Mostly Next.js, React, TypeScript, Node.js, Supabase or Postgres, hosted on Vercel or AWS. We pick what fits your product and team.' },
      { question: 'Can you take over an existing SaaS codebase?', answer: 'Yes. We start with a code audit, fix what is urgent and then keep shipping features.' },
    ],
    meta: {
      title: 'SaaS & Web Application Development Company | Zesxai',
      description: 'SaaS development from MVP to scale: multi-tenant platforms, portals and dashboards with billing and admin, built on Next.js by an experienced team.',
      keywords: 'SaaS development company, SaaS application development, web application development company, custom web app development, Next.js development company, MVP development',
    },
  },
  {
    slug: 'mobile-app-development',
    headline: 'Mobile app development for iOS and Android',
    intro:
      'Cross-platform mobile apps for iOS and Android from one codebase, sharing the same backend as your web product. Customer apps, field-staff apps and companion apps for your ERP or SaaS.',
    features: [
      { title: 'Cross-platform apps', text: 'React Native apps for iOS and Android with a native feel.' },
      { title: 'Offline first', text: 'Works without signal and syncs when back online.' },
      { title: 'Push & real time', text: 'Notifications, chat and live updates.' },
      { title: 'Payments & maps', text: 'In-app payments, location and delivery tracking.' },
      { title: 'App Store & Play Store', text: 'Store listing, review and release management.' },
    ],
    deliverables: ['UX flows and UI design', 'iOS and Android builds', 'Store submission', 'Crash monitoring and updates'],
    faq: [
      { question: 'Native or cross-platform?', answer: 'For most business apps cross-platform with React Native is faster and cheaper to maintain. We recommend native only when the app needs it.' },
    ],
    meta: {
      title: 'Mobile App Development Company: iOS & Android | Zesxai',
      description: 'Cross-platform iOS and Android app development with React Native. Customer, field-staff and ERP companion apps, from design to App Store release.',
      keywords: 'mobile app development company, iOS and Android app development, React Native app development, cross-platform app development, business app development',
    },
  },
  {
    slug: 'ai-development',
    headline: 'AI development & automation services',
    intro:
      'We add AI where it actually saves time: assistants that answer from your documents, document processing, AI voice agents and workflow automation, integrated into the software you already use.',
    features: [
      { title: 'AI assistants & chatbots', text: 'Answers from your knowledge base with sources and human handoff.' },
      { title: 'Document processing', text: 'Read invoices, forms and contracts and push the data into your systems.' },
      { title: 'AI voice agents', text: 'Voice support that talks to customers on your website or phone line.' },
      { title: 'Workflow automation', text: 'Connect tools and remove repetitive manual steps.' },
      { title: 'AI inside your product', text: 'Search, summaries and recommendations for your SaaS or ERP.' },
    ],
    deliverables: ['Use-case and ROI workshop', 'Prototype on your real data', 'Evaluation and guardrails', 'Production integration and monitoring'],
    faq: [
      { question: 'Which AI models do you work with?', answer: 'Claude, OpenAI and open-source models, chosen per use case for quality, cost and data privacy.' },
      { question: 'Is our data safe?', answer: 'We keep data in your cloud where possible, use providers that do not train on your data, and add access controls and logging.' },
    ],
    meta: {
      title: 'AI Development & Automation Services | Zesxai',
      description: 'AI development company building assistants, document processing, voice agents and workflow automation inside your existing software.',
      keywords: 'AI development company, AI integration services, AI chatbot development, AI automation services, AI voice agent, generative AI development',
    },
  },
  {
    slug: 'devops-and-support',
    headline: 'Cloud, DevOps & software maintenance',
    intro:
      'Hosting, CI/CD, monitoring, security and long-term maintenance so your software keeps running. We also take over and stabilise existing applications built by other teams.',
    features: [
      { title: 'Cloud setup', text: 'AWS, Vercel and Supabase environments set up the right way.' },
      { title: 'CI/CD pipelines', text: 'Automated tests and deployments on every change.' },
      { title: 'Monitoring & uptime', text: 'Alerts, logs and performance tracking.' },
      { title: 'Security & backups', text: 'Updates, backups and access reviews.' },
      { title: 'Maintenance & support', text: 'Bug fixes, upgrades and small features every month.' },
    ],
    deliverables: ['Infrastructure audit', 'Monthly maintenance report', 'Agreed response times'],
    faq: [
      { question: 'Can you maintain software another company built?', answer: 'Yes. We start with an audit, document the system and then support it on a monthly plan.' },
    ],
    meta: {
      title: 'Cloud, DevOps & Software Maintenance Services | Zesxai',
      description: 'DevOps, cloud hosting, monitoring and monthly software maintenance and support. We also take over and stabilise existing applications.',
      keywords: 'software maintenance and support services, DevOps services, cloud hosting setup, application support, software maintenance company',
    },
  },
]

export const caseSeo = [
  { slug: 'erp-for-distribution-business', summary: 'A custom ERP that replaced eleven spreadsheets across three warehouses with one live system.', service: 0 },
  { slug: 'retail-pos-and-inventory', summary: 'An offline-first POS and central inventory for a growing retail chain.', service: 1 },
  { slug: 'ai-support-assistant', summary: 'An AI assistant that answers customers from the company docs and hands off to a person when unsure.', service: 4 },
]

export const pageSeo: Record<string, Meta> = {
  'home-page': {
    title: 'Zesxai | Custom Software, ERP & SaaS Development Company',
    description: 'Custom software development company building ERP systems, business apps, SaaS platforms, mobile apps and AI. One experienced team, 7+ years, monthly plans from $3,500.',
    keywords: 'custom software development company, software development company, custom ERP development, SaaS development company, mobile app development, AI development, hire dedicated development team',
  },
  'services-page': {
    title: 'Software Development Services: ERP, SaaS, Mobile & AI',
    description: 'Custom software development services: ERP systems, business apps for SMBs, SaaS and web apps, iOS and Android apps, AI and DevOps. Planned, built and supported by one team.',
    keywords: 'software development services, custom software development services, ERP development, SaaS development, mobile app development, AI development services',
  },
  'work-page': {
    title: 'Software Development Case Studies: ERP, SaaS & AI Projects',
    description: 'Case studies of custom ERP systems, business apps, SaaS platforms and AI projects: the challenge, what we built and what changed.',
    keywords: 'software development case studies, ERP case study, SaaS case study, software development portfolio',
  },
  'pricing-page': {
    title: 'Dedicated Development Team Pricing: From $3,500 / Month',
    description: 'Hire a dedicated software development team on a monthly plan: Basic $3,500, Growth $5,500 with marketing, or Custom. Developers, designer, QA and PM included.',
    keywords: 'dedicated development team pricing, hire dedicated development team, software development cost, monthly software development retainer, offshore development team',
  },
  'process-page': {
    title: 'Our Software Development Process: From Discovery to Launch',
    description: 'How we deliver: discovery, planning and design, two-week sprints, QA on every sprint, launch and ongoing support. Fixed scope and a demo every sprint.',
    keywords: 'software development process, agile software development, discovery sprint, software development lifecycle',
  },
  'reviews-page': {
    title: 'Client Reviews & Testimonials',
    description: 'What business owners and product teams say about working with Zesxai on ERP, SaaS, mobile and AI projects.',
    keywords: 'Zesxai reviews, software development company reviews, client testimonials',
  },
  'about-page': {
    title: 'About Zesxai: An Experienced Software Development Team',
    description: 'Meet the team behind Zesxai: developers, designers, QA, project managers and marketers shipping ERP, SaaS, mobile and AI software for 7+ years.',
    keywords: 'about Zesxai, software development team, software engineers, dedicated development team',
  },
  'contact-page': {
    title: 'Start a Software Project: Get a Quote in One Business Day',
    description: 'Tell us what you want to build in four quick steps. We reply within one business day with a call slot and first questions.',
    keywords: 'get a software development quote, hire software developers, start a software project',
  },
}
