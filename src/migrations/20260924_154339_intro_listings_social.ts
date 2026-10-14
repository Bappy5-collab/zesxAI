import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "site_settings_listings" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"note" varchar,
  	"url" varchar,
  	"badge_id" integer
  );
  
  ALTER TABLE "home_page" ADD COLUMN "hero_intro_video_url" varchar;
  ALTER TABLE "home_page" ADD COLUMN "hero_intro_label" varchar DEFAULT 'Watch our intro';
  ALTER TABLE "home_page" ADD COLUMN "hero_intro_meta" varchar DEFAULT '1 min video';
  ALTER TABLE "site_settings_social" ADD COLUMN "icon_id" integer;
  ALTER TABLE "site_settings_listings" ADD CONSTRAINT "site_settings_listings_badge_id_media_id_fk" FOREIGN KEY ("badge_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings_listings" ADD CONSTRAINT "site_settings_listings_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "site_settings_listings_order_idx" ON "site_settings_listings" USING btree ("_order");
  CREATE INDEX "site_settings_listings_parent_id_idx" ON "site_settings_listings" USING btree ("_parent_id");
  CREATE INDEX "site_settings_listings_badge_idx" ON "site_settings_listings" USING btree ("badge_id");
  ALTER TABLE "site_settings_social" ADD CONSTRAINT "site_settings_social_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "site_settings_social_icon_idx" ON "site_settings_social" USING btree ("icon_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "site_settings_listings" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "site_settings_listings" CASCADE;
  ALTER TABLE "site_settings_social" DROP CONSTRAINT "site_settings_social_icon_id_media_id_fk";
  
  DROP INDEX "site_settings_social_icon_idx";
  ALTER TABLE "home_page" DROP COLUMN "hero_intro_video_url";
  ALTER TABLE "home_page" DROP COLUMN "hero_intro_label";
  ALTER TABLE "home_page" DROP COLUMN "hero_intro_meta";
  ALTER TABLE "site_settings_social" DROP COLUMN "icon_id";`)
}
