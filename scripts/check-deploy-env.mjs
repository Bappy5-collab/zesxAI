import 'dotenv/config'

const missing = ['DATABASE_URL', 'PAYLOAD_SECRET'].filter((name) => !process.env[name]?.trim())

if (missing.length) {
  console.error(`Build cannot continue: set these required environment variables: ${missing.join(', ')}`)
  process.exit(1)
}

if (process.env.VERCEL) {
  try {
    const databaseUrl = new URL(process.env.DATABASE_URL)
    if (!['postgres:', 'postgresql:'].includes(databaseUrl.protocol)) {
      console.error('Build cannot continue: DATABASE_URL must use the postgres:// or postgresql:// protocol.')
      process.exit(1)
    }

    const databaseHost = databaseUrl.hostname.toLowerCase()
    if (['localhost', '127.0.0.1', '::1'].includes(databaseHost)) {
      console.error('Build cannot continue: DATABASE_URL points to localhost, which Vercel Functions cannot reach. Use a hosted PostgreSQL connection string.')
      process.exit(1)
    }
  } catch {
    console.error('Build cannot continue: DATABASE_URL must be a valid PostgreSQL connection URL.')
    process.exit(1)
  }
}
