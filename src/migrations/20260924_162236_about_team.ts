import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_team_members_department" AS ENUM('Leadership', 'Engineering', 'Design', 'Quality assurance', 'Project management', 'Marketing', 'DevOps');
  CREATE TYPE "public"."enum_about_page_principles_icon" AS ENUM('arrow', 'arrowL', 'play', 'close', 'menu', 'star', 'brain', 'agent', 'stack', 'code', 'cloud', 'chart', 'shield', 'home', 'folder', 'chat', 'file', 'card', 'gear', 'sun', 'moon', 'check', 'lock');
  CREATE TABLE "team_members" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"role" varchar NOT NULL,
  	"department" "enum_team_members_department" DEFAULT 'Engineering' NOT NULL,
  	"photo_id" integer,
  	"bio" varchar,
  	"linkedin" varchar,
  	"github" varchar,
  	"show_in_hero" boolean DEFAULT true,
  	"is_sample" boolean DEFAULT false,
  	"order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "about_page_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL,
  	"label" varchar NOT NULL
  );
  
  ALTER TABLE "about_page_team" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "about_page_team" CASCADE;
  ALTER TABLE "about_page" ALTER COLUMN "hero_lead" SET DEFAULT 'Zesxai is a software development company with 7+ years of shipping ERP systems, business apps, SaaS platforms, mobile apps and AI. Engineering, design, QA, project management and marketing, under one roof.';
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "team_members_id" integer;
  ALTER TABLE "about_page_principles" ADD COLUMN "icon" "enum_about_page_principles_icon" DEFAULT 'check';
  ALTER TABLE "about_page" ADD COLUMN "mission_eyebrow" varchar DEFAULT 'Why we exist';
  ALTER TABLE "about_page" ADD COLUMN "mission_before" varchar DEFAULT 'We build the software a business';
  ALTER TABLE "about_page" ADD COLUMN "mission_highlight" varchar DEFAULT 'runs on every day';
  ALTER TABLE "about_page" ADD COLUMN "mission_after" varchar DEFAULT ', and we stay after launch to keep it running and growing.';
  ALTER TABLE "about_page" ADD COLUMN "mission_attribution" varchar DEFAULT 'Md Abdullah Al Safi, Founder & CEO';
  ALTER TABLE "about_page" ADD COLUMN "founder_quote" varchar;
  ALTER TABLE "about_page" ADD COLUMN "founder_linkedin" varchar;
  ALTER TABLE "about_page" ADD COLUMN "founder_github" varchar;
  ALTER TABLE "about_page" ADD COLUMN "team_head_eyebrow" varchar DEFAULT 'Our team';
  ALTER TABLE "about_page" ADD COLUMN "team_head_title" varchar DEFAULT 'The people who build your software';
  ALTER TABLE "about_page" ADD COLUMN "team_head_lead" varchar DEFAULT 'Developers, designers, QA, project managers and marketers. Hover a card to read more.';
  ALTER TABLE "team_members" ADD CONSTRAINT "team_members_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "about_page_stats" ADD CONSTRAINT "about_page_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "team_members_photo_idx" ON "team_members" USING btree ("photo_id");
  CREATE INDEX "team_members_updated_at_idx" ON "team_members" USING btree ("updated_at");
  CREATE INDEX "team_members_created_at_idx" ON "team_members" USING btree ("created_at");
  CREATE INDEX "about_page_stats_order_idx" ON "about_page_stats" USING btree ("_order");
  CREATE INDEX "about_page_stats_parent_id_idx" ON "about_page_stats" USING btree ("_parent_id");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_team_members_fk" FOREIGN KEY ("team_members_id") REFERENCES "public"."team_members"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_team_members_id_idx" ON "payload_locked_documents_rels" USING btree ("team_members_id");
  DROP TYPE "public"."enum_about_page_team_icon";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_about_page_team_icon" AS ENUM('arrow', 'arrowL', 'play', 'close', 'menu', 'star', 'brain', 'agent', 'stack', 'code', 'cloud', 'chart', 'shield', 'home', 'folder', 'chat', 'file', 'card', 'gear', 'sun', 'moon', 'check', 'lock');
  CREATE TABLE "about_page_team" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_about_page_team_icon" DEFAULT 'code',
  	"title" varchar NOT NULL,
  	"text" varchar
  );
  
  ALTER TABLE "team_members" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "about_page_stats" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "team_members" CASCADE;
  DROP TABLE "about_page_stats" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_team_members_fk";
  
  DROP INDEX "payload_locked_documents_rels_team_members_id_idx";
  ALTER TABLE "about_page" ALTER COLUMN "hero_lead" SET DEFAULT 'Zesxai is a software development company with 7+ years of shipping ERP systems, business apps, SaaS platforms, mobile apps and AI.';
  ALTER TABLE "about_page_team" ADD CONSTRAINT "about_page_team_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "about_page_team_order_idx" ON "about_page_team" USING btree ("_order");
  CREATE INDEX "about_page_team_parent_id_idx" ON "about_page_team" USING btree ("_parent_id");
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "team_members_id";
  ALTER TABLE "about_page_principles" DROP COLUMN "icon";
  ALTER TABLE "about_page" DROP COLUMN "mission_eyebrow";
  ALTER TABLE "about_page" DROP COLUMN "mission_before";
  ALTER TABLE "about_page" DROP COLUMN "mission_highlight";
  ALTER TABLE "about_page" DROP COLUMN "mission_after";
  ALTER TABLE "about_page" DROP COLUMN "mission_attribution";
  ALTER TABLE "about_page" DROP COLUMN "founder_quote";
  ALTER TABLE "about_page" DROP COLUMN "founder_linkedin";
  ALTER TABLE "about_page" DROP COLUMN "founder_github";
  ALTER TABLE "about_page" DROP COLUMN "team_head_eyebrow";
  ALTER TABLE "about_page" DROP COLUMN "team_head_title";
  ALTER TABLE "about_page" DROP COLUMN "team_head_lead";
  DROP TYPE "public"."enum_team_members_department";
  DROP TYPE "public"."enum_about_page_principles_icon";`)
}
