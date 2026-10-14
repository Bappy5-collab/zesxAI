'use server'
import { getClient } from '@/lib/payload'

const clean = (v: FormDataEntryValue | null, max = 2000) => (typeof v === 'string' ? v.trim().slice(0, max) : '')

/** Saves a "Start a project" brief into the Leads collection (visible in the CMS under Inbox). */
export async function submitBrief(fd: FormData): Promise<{ ok: boolean; error?: string }> {
  const name = clean(fd.get('name'), 200)
  const email = clean(fd.get('email'), 200)
  if (clean(fd.get('company_site'))) return { ok: true } // honeypot
  if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { ok: false, error: 'Please add your name and a valid email.' }
  try {
    const payload = await getClient()
    await payload.create({
      collection: 'leads',
      overrideAccess: true,
      data: {
        name,
        email,
        projectType: clean(fd.get('type'), 100),
        stage: clean(fd.get('stage'), 100),
        budget: Number(fd.get('budget')) || undefined,
        timeline: clean(fd.get('time'), 100),
        notes: clean(fd.get('notes'), 5000),
        status: 'new',
      },
    })
    // Keep the CMS inbox as the source of truth and notify the contact inbox
    // when Resend is configured in the server environment.
    const { contact } = await payload.findGlobal({ slug: 'site-settings', depth: 0 })
    const recipient = contact?.email?.trim()
    const apiKey = process.env.RESEND_API_KEY
    const from = process.env.RESEND_FROM_EMAIL
    if (recipient && apiKey && from) {
      const message = [
        `New project brief from ${name}`,
        `Email: ${email}`,
        `Project type: ${clean(fd.get('type'), 100) || 'Not provided'}`,
        `Stage: ${clean(fd.get('stage'), 100) || 'Not provided'}`,
        `Budget: ${clean(fd.get('budget'), 100) || 'Not provided'}`,
        `Timeline: ${clean(fd.get('time'), 100) || 'Not provided'}`,
        '',
        clean(fd.get('notes'), 5000) || 'No additional notes.',
      ].join('\n')
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ from, to: [recipient], reply_to: email, subject: `New project brief from ${name}`, text: message }),
      })
      if (!response.ok) console.error('Project brief email notification failed', response.status, await response.text())
    } else {
      console.warn('Project brief saved to Leads, but email notification is not configured.')
    }
    return { ok: true }
  } catch (e) {
    console.error('submitBrief failed', e)
    return { ok: false, error: 'Something went wrong. Please email us instead.' }
  }
}
