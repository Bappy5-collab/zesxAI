import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "services" ALTER COLUMN "icon" SET DATA TYPE text;
  ALTER TABLE "services" ALTER COLUMN "icon" SET DEFAULT 'stack'::text;
  DROP TYPE "public"."enum_services_icon";
  CREATE TYPE "public"."enum_services_icon" AS ENUM('sun', 'moon', 'arrow', 'arrowL', 'play', 'close', 'menu', 'star', 'brain', 'agent', 'stack', 'code', 'cloud', 'chart', 'shield', 'home', 'folder', 'chat', 'file', 'card', 'gear', 'check', 'lock');
  ALTER TABLE "services" ALTER COLUMN "icon" SET DEFAULT 'stack'::"public"."enum_services_icon";
  ALTER TABLE "services" ALTER COLUMN "icon" SET DATA TYPE "public"."enum_services_icon" USING "icon"::"public"."enum_services_icon";
  ALTER TABLE "products" ALTER COLUMN "icon" SET DATA TYPE text;
  ALTER TABLE "products" ALTER COLUMN "icon" SET DEFAULT 'stack'::text;
  DROP TYPE "public"."enum_products_icon";
  CREATE TYPE "public"."enum_products_icon" AS ENUM('sun', 'moon', 'arrow', 'arrowL', 'play', 'close', 'menu', 'star', 'brain', 'agent', 'stack', 'code', 'cloud', 'chart', 'shield', 'home', 'folder', 'chat', 'file', 'card', 'gear', 'check', 'lock');
  ALTER TABLE "products" ALTER COLUMN "icon" SET DEFAULT 'stack'::"public"."enum_products_icon";
  ALTER TABLE "products" ALTER COLUMN "icon" SET DATA TYPE "public"."enum_products_icon" USING "icon"::"public"."enum_products_icon";
  ALTER TABLE "process_page_steps" ALTER COLUMN "icon" SET DATA TYPE text;
  ALTER TABLE "process_page_steps" ALTER COLUMN "icon" SET DEFAULT 'code'::text;
  DROP TYPE "public"."enum_process_page_steps_icon";
  CREATE TYPE "public"."enum_process_page_steps_icon" AS ENUM('sun', 'moon', 'arrow', 'arrowL', 'play', 'close', 'menu', 'star', 'brain', 'agent', 'stack', 'code', 'cloud', 'chart', 'shield', 'home', 'folder', 'chat', 'file', 'card', 'gear', 'check', 'lock');
  ALTER TABLE "process_page_steps" ALTER COLUMN "icon" SET DEFAULT 'code'::"public"."enum_process_page_steps_icon";
  ALTER TABLE "process_page_steps" ALTER COLUMN "icon" SET DATA TYPE "public"."enum_process_page_steps_icon" USING "icon"::"public"."enum_process_page_steps_icon";
  ALTER TABLE "about_page_principles" ALTER COLUMN "icon" SET DATA TYPE text;
  ALTER TABLE "about_page_principles" ALTER COLUMN "icon" SET DEFAULT 'check'::text;
  DROP TYPE "public"."enum_about_page_principles_icon";
  CREATE TYPE "public"."enum_about_page_principles_icon" AS ENUM('sun', 'moon', 'arrow', 'arrowL', 'play', 'close', 'menu', 'star', 'brain', 'agent', 'stack', 'code', 'cloud', 'chart', 'shield', 'home', 'folder', 'chat', 'file', 'card', 'gear', 'check', 'lock');
  ALTER TABLE "about_page_principles" ALTER COLUMN "icon" SET DEFAULT 'check'::"public"."enum_about_page_principles_icon";
  ALTER TABLE "about_page_principles" ALTER COLUMN "icon" SET DATA TYPE "public"."enum_about_page_principles_icon" USING "icon"::"public"."enum_about_page_principles_icon";
  ALTER TABLE "site_settings" ADD COLUMN "logo_light_id" integer;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_logo_light_id_media_id_fk" FOREIGN KEY ("logo_light_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "site_settings_logo_light_idx" ON "site_settings" USING btree ("logo_light_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "site_settings" DROP CONSTRAINT "site_settings_logo_light_id_media_id_fk";
  
  ALTER TABLE "services" ALTER COLUMN "icon" SET DATA TYPE text;
  ALTER TABLE "services" ALTER COLUMN "icon" SET DEFAULT 'stack'::text;
  DROP TYPE "public"."enum_services_icon";
  CREATE TYPE "public"."enum_services_icon" AS ENUM('arrow', 'arrowL', 'play', 'close', 'menu', 'star', 'brain', 'agent', 'stack', 'code', 'cloud', 'chart', 'shield', 'home', 'folder', 'chat', 'file', 'card', 'gear', 'sun', 'moon', 'check', 'lock');
  ALTER TABLE "services" ALTER COLUMN "icon" SET DEFAULT 'stack'::"public"."enum_services_icon";
  ALTER TABLE "services" ALTER COLUMN "icon" SET DATA TYPE "public"."enum_services_icon" USING "icon"::"public"."enum_services_icon";
  ALTER TABLE "products" ALTER COLUMN "icon" SET DATA TYPE text;
  ALTER TABLE "products" ALTER COLUMN "icon" SET DEFAULT 'stack'::text;
  DROP TYPE "public"."enum_products_icon";
  CREATE TYPE "public"."enum_products_icon" AS ENUM('arrow', 'arrowL', 'play', 'close', 'menu', 'star', 'brain', 'agent', 'stack', 'code', 'cloud', 'chart', 'shield', 'home', 'folder', 'chat', 'file', 'card', 'gear', 'sun', 'moon', 'check', 'lock');
  ALTER TABLE "products" ALTER COLUMN "icon" SET DEFAULT 'stack'::"public"."enum_products_icon";
  ALTER TABLE "products" ALTER COLUMN "icon" SET DATA TYPE "public"."enum_products_icon" USING "icon"::"public"."enum_products_icon";
  ALTER TABLE "process_page_steps" ALTER COLUMN "icon" SET DATA TYPE text;
  ALTER TABLE "process_page_steps" ALTER COLUMN "icon" SET DEFAULT 'code'::text;
  DROP TYPE "public"."enum_process_page_steps_icon";
  CREATE TYPE "public"."enum_process_page_steps_icon" AS ENUM('arrow', 'arrowL', 'play', 'close', 'menu', 'star', 'brain', 'agent', 'stack', 'code', 'cloud', 'chart', 'shield', 'home', 'folder', 'chat', 'file', 'card', 'gear', 'sun', 'moon', 'check', 'lock');
  ALTER TABLE "process_page_steps" ALTER COLUMN "icon" SET DEFAULT 'code'::"public"."enum_process_page_steps_icon";
  ALTER TABLE "process_page_steps" ALTER COLUMN "icon" SET DATA TYPE "public"."enum_process_page_steps_icon" USING "icon"::"public"."enum_process_page_steps_icon";
  ALTER TABLE "about_page_principles" ALTER COLUMN "icon" SET DATA TYPE text;
  ALTER TABLE "about_page_principles" ALTER COLUMN "icon" SET DEFAULT 'check'::text;
  DROP TYPE "public"."enum_about_page_principles_icon";
  CREATE TYPE "public"."enum_about_page_principles_icon" AS ENUM('arrow', 'arrowL', 'play', 'close', 'menu', 'star', 'brain', 'agent', 'stack', 'code', 'cloud', 'chart', 'shield', 'home', 'folder', 'chat', 'file', 'card', 'gear', 'sun', 'moon', 'check', 'lock');
  ALTER TABLE "about_page_principles" ALTER COLUMN "icon" SET DEFAULT 'check'::"public"."enum_about_page_principles_icon";
  ALTER TABLE "about_page_principles" ALTER COLUMN "icon" SET DATA TYPE "public"."enum_about_page_principles_icon" USING "icon"::"public"."enum_about_page_principles_icon";
  DROP INDEX "site_settings_logo_light_idx";
  ALTER TABLE "site_settings" DROP COLUMN "logo_light_id";`)
}
