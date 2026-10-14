/** Adds the stock photos to existing content:  npm run seed:images */
import { getPayload } from 'payload'
import config from '@payload-config'
import { attachImages } from './images'

const payload = await getPayload({ config })
await attachImages(payload)
payload.logger.info('Images attached.')
process.exit(0)
