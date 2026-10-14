import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "services" ALTER COLUMN "icon" SET DATA TYPE text;
  ALTER TABLE "services" ALTER COLUMN "icon" SET DEFAULT 'stack'::text;
  DROP TYPE "public"."enum_services_icon";
  CREATE TYPE "public"."enum_services_icon" AS ENUM('mail', 'phone', 'pin', 'calendar', 'msg', 'arrow', 'arrowL', 'play', 'close', 'menu', 'star', 'brain', 'agent', 'stack', 'code', 'cloud', 'chart', 'shield', 'home', 'folder', 'chat', 'file', 'card', 'gear', 'sun', 'moon', 'check', 'lock');
  ALTER TABLE "services" ALTER COLUMN "icon" SET DEFAULT 'stack'::"public"."enum_services_icon";
  ALTER TABLE "services" ALTER COLUMN "icon" SET DATA TYPE "public"."enum_services_icon" USING "icon"::"public"."enum_services_icon";
  ALTER TABLE "products" ALTER COLUMN "icon" SET DATA TYPE text;
  ALTER TABLE "products" ALTER COLUMN "icon" SET DEFAULT 'stack'::text;
  DROP TYPE "public"."enum_products_icon";
  CREATE TYPE "public"."enum_products_icon" AS ENUM('mail', 'phone', 'pin', 'calendar', 'msg', 'arrow', 'arrowL', 'play', 'close', 'menu', 'star', 'brain', 'agent', 'stack', 'code', 'cloud', 'chart', 'shield', 'home', 'folder', 'chat', 'file', 'card', 'gear', 'sun', 'moon', 'check', 'lock');
  ALTER TABLE "products" ALTER COLUMN "icon" SET DEFAULT 'stack'::"public"."enum_products_icon";
  ALTER TABLE "products" ALTER COLUMN "icon" SET DATA TYPE "public"."enum_products_icon" USING "icon"::"public"."enum_products_icon";
  ALTER TABLE "process_page_steps" ALTER COLUMN "icon" SET DATA TYPE text;
  ALTER TABLE "process_page_steps" ALTER COLUMN "icon" SET DEFAULT 'code'::text;
  DROP TYPE "public"."enum_process_page_steps_icon";
  CREATE TYPE "public"."enum_process_page_steps_icon" AS ENUM('mail', 'phone', 'pin', 'calendar', 'msg', 'arrow', 'arrowL', 'play', 'close', 'menu', 'star', 'brain', 'agent', 'stack', 'code', 'cloud', 'chart', 'shield', 'home', 'folder', 'chat', 'file', 'card', 'gear', 'sun', 'moon', 'check', 'lock');
  ALTER TABLE "process_page_steps" ALTER COLUMN "icon" SET DEFAULT 'code'::"public"."enum_process_page_steps_icon";
  ALTER TABLE "process_page_steps" ALTER COLUMN "icon" SET DATA TYPE "public"."enum_process_page_steps_icon" USING "icon"::"public"."enum_process_page_steps_icon";
  ALTER TABLE "about_page_principles" ALTER COLUMN "icon" SET DATA TYPE text;
  ALTER TABLE "about_page_principles" ALTER COLUMN "icon" SET DEFAULT 'check'::text;
  DROP TYPE "public"."enum_about_page_principles_icon";
  CREATE TYPE "public"."enum_about_page_principles_icon" AS ENUM('mail', 'phone', 'pin', 'calendar', 'msg', 'arrow', 'arrowL', 'play', 'close', 'menu', 'star', 'brain', 'agent', 'stack', 'code', 'cloud', 'chart', 'shield', 'home', 'folder', 'chat', 'file', 'card', 'gear', 'sun', 'moon', 'check', 'lock');
  ALTER TABLE "about_page_principles" ALTER COLUMN "icon" SET DEFAULT 'check'::"public"."enum_about_page_principles_icon";
  ALTER TABLE "about_page_principles" ALTER COLUMN "icon" SET DATA TYPE "public"."enum_about_page_principles_icon" USING "icon"::"public"."enum_about_page_principles_icon";
  ALTER TABLE "home_page" ALTER COLUMN "hero_primary_label" SET DEFAULT 'Book a call';
  ALTER TABLE "contact_page" ALTER COLUMN "hero_eyebrow" SET DEFAULT 'Contact us';
  ALTER TABLE "contact_page" ALTER COLUMN "hero_title" SET DEFAULT 'Book a call, or tell us what you want to build.';
  ALTER TABLE "contact_page" ALTER COLUMN "hero_lead" SET DEFAULT 'Pick a 30-minute slot, message us on WhatsApp or email, or send a short brief. We reply within one business day.';
  ALTER TABLE "site_settings" ALTER COLUMN "nav_cta" SET DEFAULT 'Book a call';
  ALTER TABLE "site_settings" ALTER COLUMN "cta_button" SET DEFAULT 'Book a call';
  ALTER TABLE "contact_page" ADD COLUMN "book_eyebrow" varchar DEFAULT 'Book a call';
  ALTER TABLE "contact_page" ADD COLUMN "book_title" varchar DEFAULT 'Pick a 30-minute slot';
  ALTER TABLE "contact_page" ADD COLUMN "book_text" varchar DEFAULT 'A quick intro call with the team. Bring the problem; we bring questions and a rough plan.';
  ALTER TABLE "contact_page" ADD COLUMN "book_reach_title" varchar DEFAULT 'Other ways to reach us';
  ALTER TABLE "contact_page" ADD COLUMN "brief_head_eyebrow" varchar DEFAULT 'Project brief';
  ALTER TABLE "contact_page" ADD COLUMN "brief_head_title" varchar DEFAULT 'Prefer to write it down?';
  ALTER TABLE "contact_page" ADD COLUMN "brief_head_lead" varchar DEFAULT 'Four quick steps. We come back with a call slot and first questions.';
  ALTER TABLE "site_settings" ADD COLUMN "contact_email" varchar;
  ALTER TABLE "site_settings" ADD COLUMN "contact_phone" varchar;
  ALTER TABLE "site_settings" ADD COLUMN "contact_whatsapp" varchar;
  ALTER TABLE "site_settings" ADD COLUMN "contact_whatsapp_message" varchar DEFAULT 'Hi Zesxai, I''d like to talk about a project.';
  ALTER TABLE "site_settings" ADD COLUMN "contact_address" varchar DEFAULT 'Rajshahi, Bangladesh';
  ALTER TABLE "site_settings" ADD COLUMN "contact_hours" varchar DEFAULT 'Sun to Thu, 10am to 7pm GMT+6';
  ALTER TABLE "site_settings" ADD COLUMN "contact_map_url" varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
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
  ALTER TABLE "home_page" ALTER COLUMN "hero_primary_label" SET DEFAULT 'Start a project';
  ALTER TABLE "contact_page" ALTER COLUMN "hero_eyebrow" SET DEFAULT 'Start a project';
  ALTER TABLE "contact_page" ALTER COLUMN "hero_title" SET DEFAULT 'Tell us what you want to build.';
  ALTER TABLE "contact_page" ALTER COLUMN "hero_lead" SET DEFAULT 'Four quick steps. We reply within one business day with a call slot and first questions.';
  ALTER TABLE "site_settings" ALTER COLUMN "nav_cta" SET DEFAULT 'Start a project';
  ALTER TABLE "site_settings" ALTER COLUMN "cta_button" SET DEFAULT 'Start a project';
  ALTER TABLE "contact_page" DROP COLUMN "book_eyebrow";
  ALTER TABLE "contact_page" DROP COLUMN "book_title";
  ALTER TABLE "contact_page" DROP COLUMN "book_text";
  ALTER TABLE "contact_page" DROP COLUMN "book_reach_title";
  ALTER TABLE "contact_page" DROP COLUMN "brief_head_eyebrow";
  ALTER TABLE "contact_page" DROP COLUMN "brief_head_title";
  ALTER TABLE "contact_page" DROP COLUMN "brief_head_lead";
  ALTER TABLE "site_settings" DROP COLUMN "contact_email";
  ALTER TABLE "site_settings" DROP COLUMN "contact_phone";
  ALTER TABLE "site_settings" DROP COLUMN "contact_whatsapp";
  ALTER TABLE "site_settings" DROP COLUMN "contact_whatsapp_message";
  ALTER TABLE "site_settings" DROP COLUMN "contact_address";
  ALTER TABLE "site_settings" DROP COLUMN "contact_hours";
  ALTER TABLE "site_settings" DROP COLUMN "contact_map_url";`)
}
