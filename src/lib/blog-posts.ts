export const blogPosts = [
  {
    slug: 'where-ai-fits-business-workflow',
    category: 'AI & automation',
    title: 'Where AI fits in a real business workflow',
    excerpt: 'A practical way to spot repetitive work, choose a useful first use case, and keep people in control of the outcome.',
    read: '6 min read',
    image: '/images/ai%26automation.png',
    tone: 'violet',
    body: 'Start with the work, not the model. Map the steps people repeat, the information they need, and the decisions that still require judgement. Then choose one narrow task where better search, drafting, or classification can save time without hiding how the result was produced.\n\nKeep a person in the loop for exceptions and important decisions. A small pilot with clear measures—time saved, fewer handoffs, or fewer errors—will tell you more than a broad AI rollout.',
  },
  {
    slug: 'calmer-path-spreadsheets-to-erp',
    category: 'ERP & operations',
    title: 'A calmer path from spreadsheets to ERP',
    excerpt: 'How to move business operations into one system without turning the migration into a risky big-bang project.',
    read: '8 min read',
    image: '/images/ERP-System.png',
    tone: 'amber',
    body: 'The safest ERP projects begin by understanding the workarounds people already depend on. Document the core records, approvals, reports, and exceptions before deciding what to replace.\n\nMove one workflow at a time, validate real data with the people who use it, and keep a clear rollback plan. That makes the new system easier to trust and gives the team room to learn as it goes.',
  },
  {
    slug: 'build-smallest-useful-saas',
    category: 'Product & SaaS',
    title: 'Build the smallest useful version of your SaaS',
    excerpt: 'A focused product scope helps teams learn from customers sooner and avoid spending months polishing the wrong thing.',
    read: '5 min read',
    image: '/images/web_apps%26saas.png',
    tone: 'cyan',
    body: 'Define the first version around one user and one valuable job. Keep the workflow complete enough to solve that job, while leaving secondary roles, automation, and edge cases for later.\n\nBefore adding more features, watch a few users try the product. Their questions and workarounds reveal where the product needs clarity and which improvements will make the biggest difference.',
  },
  {
    slug: 'effortless-software-handoff',
    category: 'Engineering',
    title: 'What makes a software handoff feel effortless',
    excerpt: 'Good documentation, clear ownership, and a reliable release process turn delivery into a foundation for the next improvement.',
    read: '4 min read',
    image: '/images/cloud_devOps.png',
    tone: 'pink',
    body: 'A useful handoff gives the next person a working map: how to run the project, where configuration lives, how releases happen, and what to check when something fails. Pair that with a short walkthrough and a named owner for open questions.\n\nThe goal is for the team to make its next change confidently. A clean release process and practical documentation are part of the product, not chores to leave until the end.',
  },
] as const

export type BlogPost = (typeof blogPosts)[number]

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug)
}
