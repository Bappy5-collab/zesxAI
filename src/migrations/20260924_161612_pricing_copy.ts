import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pricing_page" ALTER COLUMN "hero_title" SET DEFAULT 'Simple monthly plans, a full team on every one.';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pricing_page" ALTER COLUMN "hero_title" SET DEFAULT 'Simple monthly plans for a dedicated team.';`)
}
