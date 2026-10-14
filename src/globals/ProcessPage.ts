import type { GlobalConfig } from 'payload'
import { pageHero, sectionHead } from './fields'
import { PIPE_GRAPH } from '../lib/visuals'
import { iconField } from '../collections/shared'

export const ProcessPage: GlobalConfig = {
  slug: 'process-page',
  label: 'Process',
  admin: { group: 'Pages', description: 'The six steps are used on Home ("How we work") and on the Process page.' },
  access: { read: () => true },
  fields: [
    pageHero({
      eyebrow: 'Process',
      title: 'A clear path from first call to go-live.',
      lead: 'Fixed scope, sprint demos, testing on every sprint and support after launch.',
    }),
    {
      name: 'pipelineGraph',
      label: 'Pipeline diagram (JSON)',
      type: 'json',
      defaultValue: PIPE_GRAPH,
      admin: { description: 'Nodes and edges of the delivery pipeline diagram. Edit titles and texts; keep ids and positions (p for desktop, m for mobile).' },
    },
    sectionHead('stepsHead', 'Steps heading', { eyebrow: 'Step by step', title: 'What happens at each stage' }),
    {
      name: 'steps',
      type: 'array',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'when', type: 'text' },
        { name: 'text', type: 'textarea' },
        iconField('code'),
        { name: 'deliverables', type: 'array', fields: [{ name: 'value', type: 'text', required: true }] },
      ],
    },
    sectionHead('stackHead', 'Stack heading', { eyebrow: 'Stack', title: 'Tools we know deeply' }),
    {
      name: 'stack',
      type: 'array',
      fields: [
        { name: 'category', type: 'text' },
        { name: 'name', type: 'text', required: true },
      ],
    },
  ],
}
