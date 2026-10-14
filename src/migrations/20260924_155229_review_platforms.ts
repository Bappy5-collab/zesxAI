import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_site_settings_review_platforms_platform" AS ENUM('google', 'trustpilot', 'clutch', 'upwork', 'goodfirms', 'designrush', 'other');
  CREATE TABLE "site_settings_review_platforms" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"platform" "enum_site_settings_review_platforms_platform" DEFAULT 'google' NOT NULL,
  	"name" varchar,
  	"rating" numeric NOT NULL,
  	"count" numeric NOT NULL,
  	"url" varchar NOT NULL,
  	"icon_id" integer
  );
  
  ALTER TABLE "site_settings_review_platforms" ADD CONSTRAINT "site_settings_review_platforms_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings_review_platforms" ADD CONSTRAINT "site_settings_review_platforms_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "site_settings_review_platforms_order_idx" ON "site_settings_review_platforms" USING btree ("_order");
  CREATE INDEX "site_settings_review_platforms_parent_id_idx" ON "site_settings_review_platforms" USING btree ("_parent_id");
  CREATE INDEX "site_settings_review_platforms_icon_idx" ON "site_settings_review_platforms" USING btree ("icon_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "site_settings_review_platforms" CASCADE;
  DROP TYPE "public"."enum_site_settings_review_platforms_platform";`)
}
