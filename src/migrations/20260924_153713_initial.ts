import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_services_icon" AS ENUM('arrow', 'arrowL', 'play', 'close', 'menu', 'star', 'brain', 'agent', 'stack', 'code', 'cloud', 'chart', 'shield', 'home', 'folder', 'chat', 'file', 'card', 'gear', 'sun', 'moon', 'check', 'lock');
  CREATE TYPE "public"."enum_services_visual" AS ENUM('erp', 'biz', 'web', 'mobile', 'ai', 'cloud');
  CREATE TYPE "public"."enum_case_studies_type" AS ENUM('ERP', 'Business apps', 'Web & SaaS', 'Mobile', 'AI', 'Other');
  CREATE TYPE "public"."enum_case_studies_mockup" AS ENUM('dashboard', 'pos', 'chat');
  CREATE TYPE "public"."enum_products_icon" AS ENUM('arrow', 'arrowL', 'play', 'close', 'menu', 'star', 'brain', 'agent', 'stack', 'code', 'cloud', 'chart', 'shield', 'home', 'folder', 'chat', 'file', 'card', 'gear', 'sun', 'moon', 'check', 'lock');
  CREATE TYPE "public"."enum_products_status" AS ENUM('coming-soon', 'beta', 'live');
  CREATE TYPE "public"."enum_products_mockup" AS ENUM('office', 'voice', 'score');
  CREATE TYPE "public"."enum_gallery_tiles_column" AS ENUM('1', '2', '3', '4');
  CREATE TYPE "public"."enum_gallery_tiles_shape" AS ENUM('tall', 'wide');
  CREATE TYPE "public"."enum_reviews_kind" AS ENUM('text', 'video');
  CREATE TYPE "public"."enum_reviews_source" AS ENUM('direct', 'google', 'trustpilot', 'clutch', 'upwork');
  CREATE TYPE "public"."enum_leads_status" AS ENUM('new', 'contacted', 'proposal', 'won', 'lost');
  CREATE TYPE "public"."enum_process_page_steps_icon" AS ENUM('arrow', 'arrowL', 'play', 'close', 'menu', 'star', 'brain', 'agent', 'stack', 'code', 'cloud', 'chart', 'shield', 'home', 'folder', 'chat', 'file', 'card', 'gear', 'sun', 'moon', 'check', 'lock');
  CREATE TYPE "public"."enum_about_page_team_icon" AS ENUM('arrow', 'arrowL', 'play', 'close', 'menu', 'star', 'brain', 'agent', 'stack', 'code', 'cloud', 'chart', 'shield', 'home', 'folder', 'chat', 'file', 'card', 'gear', 'sun', 'moon', 'check', 'lock');
  CREATE TABLE "services_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "services" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"summary" varchar NOT NULL,
  	"icon" "enum_services_icon" DEFAULT 'stack',
  	"badge" varchar,
  	"visual" "enum_services_visual" DEFAULT 'web',
  	"order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "case_studies_stack" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "case_studies" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"tab_label" varchar NOT NULL,
  	"type" "enum_case_studies_type" DEFAULT 'ERP' NOT NULL,
  	"industry" varchar,
  	"challenge" varchar NOT NULL,
  	"built" varchar NOT NULL,
  	"outcome" varchar NOT NULL,
  	"cover_id" integer,
  	"mockup" "enum_case_studies_mockup" DEFAULT 'dashboard',
  	"featured" boolean DEFAULT true,
  	"is_sample" boolean DEFAULT false,
  	"order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "products_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "products" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"icon" "enum_products_icon" DEFAULT 'stack',
  	"status" "enum_products_status" DEFAULT 'coming-soon' NOT NULL,
  	"url" varchar,
  	"image_id" integer,
  	"mockup" "enum_products_mockup" DEFAULT 'office',
  	"order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "gallery_tiles" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"tag" varchar,
  	"media_id" integer NOT NULL,
  	"poster_id" integer,
  	"column" "enum_gallery_tiles_column" DEFAULT '1' NOT NULL,
  	"shape" "enum_gallery_tiles_shape" DEFAULT 'tall',
  	"is_sample" boolean DEFAULT false,
  	"order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "clients" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"logo_id" integer,
  	"industry" varchar,
  	"project" varchar,
  	"website" varchar,
  	"show_in_strip" boolean DEFAULT true,
  	"order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "reviews" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"kind" "enum_reviews_kind" DEFAULT 'text' NOT NULL,
  	"name" varchar NOT NULL,
  	"role" varchar,
  	"company" varchar,
  	"rating" numeric DEFAULT 5,
  	"quote" varchar NOT NULL,
  	"source" "enum_reviews_source" DEFAULT 'direct' NOT NULL,
  	"source_url" varchar,
  	"avatar_id" integer,
  	"video_id" integer,
  	"poster_id" integer,
  	"duration" varchar,
  	"published" boolean DEFAULT true,
  	"featured" boolean DEFAULT true,
  	"is_sample" boolean DEFAULT false,
  	"order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "leads" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"email" varchar NOT NULL,
  	"project_type" varchar,
  	"stage" varchar,
  	"budget" numeric,
  	"timeline" varchar,
  	"notes" varchar,
  	"status" "enum_leads_status" DEFAULT 'new',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"reset_password_requested_at" timestamp(3) with time zone,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"services_id" integer,
  	"case_studies_id" integer,
  	"products_id" integer,
  	"gallery_tiles_id" integer,
  	"clients_id" integer,
  	"reviews_id" integer,
  	"leads_id" integer,
  	"media_id" integer,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "home_page_hero_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "home_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_eyebrow" varchar DEFAULT 'Software development company',
  	"hero_title_before" varchar DEFAULT 'We build',
  	"hero_title_highlight" varchar DEFAULT 'software',
  	"hero_title_after" varchar DEFAULT 'that runs your business.',
  	"hero_lead" varchar DEFAULT 'ERP systems, business apps, SaaS platforms, mobile apps and AI. Designed, built and supported by an experienced team of developers, shipping for 7+ years.',
  	"hero_primary_label" varchar DEFAULT 'Start a project',
  	"hero_secondary_label" varchar DEFAULT 'See our work',
  	"clients_eyebrow" varchar DEFAULT 'Companies we have worked with',
  	"services_eyebrow" varchar DEFAULT 'What we do',
  	"services_title" varchar DEFAULT 'One experienced team for every kind of software.',
  	"services_lead" varchar DEFAULT 'From a full ERP to a small business app, we plan, design, build, launch and support it, with AI where it actually helps.',
  	"system_eyebrow" varchar DEFAULT 'How your system connects',
  	"system_title" varchar DEFAULT 'Every department on one connected system.',
  	"system_lead" varchar DEFAULT 'A typical ERP we build: sales, shops, purchasing and HR feed one core; finance, inventory, reports and the mobile app read from it in real time. Drag the modules around.',
  	"process_eyebrow" varchar DEFAULT 'How we work',
  	"process_title" varchar DEFAULT 'A clear process from first call to go-live.',
  	"process_lead" varchar DEFAULT 'Six steps, each with a timeframe and a deliverable you can hold us to.',
  	"reviews_eyebrow" varchar DEFAULT 'What clients say',
  	"reviews_title" varchar DEFAULT 'Hear it from the businesses we build for.',
  	"reviews_lead" varchar DEFAULT '',
  	"cases_eyebrow" varchar DEFAULT 'Case studies',
  	"cases_title" varchar DEFAULT 'Real problems, the systems we built, and what changed.',
  	"cases_lead" varchar DEFAULT '',
  	"products_eyebrow" varchar DEFAULT 'Our products',
  	"products_title" varchar DEFAULT 'Software we build and run ourselves.',
  	"products_lead" varchar DEFAULT 'Beyond client work, our team builds its own products. The same people, the same standards.',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "services_page_models_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "services_page_models" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"duration" varchar,
  	"text" varchar,
  	"highlight" boolean DEFAULT false
  );
  
  CREATE TABLE "services_page_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar NOT NULL,
  	"answer" varchar NOT NULL
  );
  
  CREATE TABLE "services_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_eyebrow" varchar DEFAULT 'Services',
  	"hero_title" varchar DEFAULT 'Every kind of software your business runs on.',
  	"hero_lead" varchar DEFAULT 'ERP, business apps, SaaS, mobile and AI. Every project includes planning, design, development, testing, launch and support.',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "process_page_steps_deliverables" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "process_page_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"when" varchar,
  	"text" varchar,
  	"icon" "enum_process_page_steps_icon" DEFAULT 'code'
  );
  
  CREATE TABLE "process_page_stack" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"category" varchar,
  	"name" varchar NOT NULL
  );
  
  CREATE TABLE "process_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_eyebrow" varchar DEFAULT 'Process',
  	"hero_title" varchar DEFAULT 'A clear path from first call to go-live.',
  	"hero_lead" varchar DEFAULT 'Fixed scope, sprint demos, testing on every sprint and support after launch.',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "about_page_team" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_about_page_team_icon" DEFAULT 'code',
  	"title" varchar NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "about_page_principles" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "about_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_eyebrow" varchar DEFAULT 'About',
  	"hero_title" varchar DEFAULT 'An experienced team that builds software businesses run on.',
  	"hero_lead" varchar DEFAULT 'Zesxai is a software development company with 7+ years of shipping ERP systems, business apps, SaaS platforms, mobile apps and AI.',
  	"founder_name" varchar DEFAULT 'Md Abdullah Al Safi',
  	"founder_role" varchar DEFAULT 'Founder & CEO',
  	"founder_bio" varchar,
  	"founder_photo_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "site_settings_social" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "site_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"site_name" varchar DEFAULT 'Zesxai',
  	"logo_id" integer,
  	"meta_description" varchar DEFAULT 'Zesxai is a software development company building ERP systems, business apps, SaaS platforms, mobile apps and AI.',
  	"footer_text" varchar DEFAULT 'Software development company. ERP, business apps, SaaS, mobile and AI, built by an experienced team.',
  	"footer_tagline" varchar DEFAULT 'Software that runs your business',
  	"book_call_url" varchar,
  	"cta_eyebrow" varchar DEFAULT 'Now taking new projects',
  	"cta_title" varchar DEFAULT 'Have a system to build? Let''s talk.',
  	"cta_button" varchar DEFAULT 'Start a project',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "services_tags" ADD CONSTRAINT "services_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "case_studies_stack" ADD CONSTRAINT "case_studies_stack_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "case_studies" ADD CONSTRAINT "case_studies_cover_id_media_id_fk" FOREIGN KEY ("cover_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products_features" ADD CONSTRAINT "products_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products" ADD CONSTRAINT "products_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "gallery_tiles" ADD CONSTRAINT "gallery_tiles_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "gallery_tiles" ADD CONSTRAINT "gallery_tiles_poster_id_media_id_fk" FOREIGN KEY ("poster_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "clients" ADD CONSTRAINT "clients_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "reviews" ADD CONSTRAINT "reviews_avatar_id_media_id_fk" FOREIGN KEY ("avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "reviews" ADD CONSTRAINT "reviews_video_id_media_id_fk" FOREIGN KEY ("video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "reviews" ADD CONSTRAINT "reviews_poster_id_media_id_fk" FOREIGN KEY ("poster_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_case_studies_fk" FOREIGN KEY ("case_studies_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_products_fk" FOREIGN KEY ("products_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_gallery_tiles_fk" FOREIGN KEY ("gallery_tiles_id") REFERENCES "public"."gallery_tiles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_clients_fk" FOREIGN KEY ("clients_id") REFERENCES "public"."clients"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_reviews_fk" FOREIGN KEY ("reviews_id") REFERENCES "public"."reviews"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_leads_fk" FOREIGN KEY ("leads_id") REFERENCES "public"."leads"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_hero_stats" ADD CONSTRAINT "home_page_hero_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_page_models_points" ADD CONSTRAINT "services_page_models_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_page_models"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_page_models" ADD CONSTRAINT "services_page_models_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_page_faq" ADD CONSTRAINT "services_page_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "process_page_steps_deliverables" ADD CONSTRAINT "process_page_steps_deliverables_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."process_page_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "process_page_steps" ADD CONSTRAINT "process_page_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."process_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "process_page_stack" ADD CONSTRAINT "process_page_stack_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."process_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page_team" ADD CONSTRAINT "about_page_team_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page_principles" ADD CONSTRAINT "about_page_principles_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page" ADD CONSTRAINT "about_page_founder_photo_id_media_id_fk" FOREIGN KEY ("founder_photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings_social" ADD CONSTRAINT "site_settings_social_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "services_tags_order_idx" ON "services_tags" USING btree ("_order");
  CREATE INDEX "services_tags_parent_id_idx" ON "services_tags" USING btree ("_parent_id");
  CREATE INDEX "services_updated_at_idx" ON "services" USING btree ("updated_at");
  CREATE INDEX "services_created_at_idx" ON "services" USING btree ("created_at");
  CREATE INDEX "case_studies_stack_order_idx" ON "case_studies_stack" USING btree ("_order");
  CREATE INDEX "case_studies_stack_parent_id_idx" ON "case_studies_stack" USING btree ("_parent_id");
  CREATE INDEX "case_studies_cover_idx" ON "case_studies" USING btree ("cover_id");
  CREATE INDEX "case_studies_updated_at_idx" ON "case_studies" USING btree ("updated_at");
  CREATE INDEX "case_studies_created_at_idx" ON "case_studies" USING btree ("created_at");
  CREATE INDEX "products_features_order_idx" ON "products_features" USING btree ("_order");
  CREATE INDEX "products_features_parent_id_idx" ON "products_features" USING btree ("_parent_id");
  CREATE INDEX "products_image_idx" ON "products" USING btree ("image_id");
  CREATE INDEX "products_updated_at_idx" ON "products" USING btree ("updated_at");
  CREATE INDEX "products_created_at_idx" ON "products" USING btree ("created_at");
  CREATE INDEX "gallery_tiles_media_idx" ON "gallery_tiles" USING btree ("media_id");
  CREATE INDEX "gallery_tiles_poster_idx" ON "gallery_tiles" USING btree ("poster_id");
  CREATE INDEX "gallery_tiles_updated_at_idx" ON "gallery_tiles" USING btree ("updated_at");
  CREATE INDEX "gallery_tiles_created_at_idx" ON "gallery_tiles" USING btree ("created_at");
  CREATE INDEX "clients_logo_idx" ON "clients" USING btree ("logo_id");
  CREATE INDEX "clients_updated_at_idx" ON "clients" USING btree ("updated_at");
  CREATE INDEX "clients_created_at_idx" ON "clients" USING btree ("created_at");
  CREATE INDEX "reviews_avatar_idx" ON "reviews" USING btree ("avatar_id");
  CREATE INDEX "reviews_video_idx" ON "reviews" USING btree ("video_id");
  CREATE INDEX "reviews_poster_idx" ON "reviews" USING btree ("poster_id");
  CREATE INDEX "reviews_updated_at_idx" ON "reviews" USING btree ("updated_at");
  CREATE INDEX "reviews_created_at_idx" ON "reviews" USING btree ("created_at");
  CREATE INDEX "leads_updated_at_idx" ON "leads" USING btree ("updated_at");
  CREATE INDEX "leads_created_at_idx" ON "leads" USING btree ("created_at");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_services_id_idx" ON "payload_locked_documents_rels" USING btree ("services_id");
  CREATE INDEX "payload_locked_documents_rels_case_studies_id_idx" ON "payload_locked_documents_rels" USING btree ("case_studies_id");
  CREATE INDEX "payload_locked_documents_rels_products_id_idx" ON "payload_locked_documents_rels" USING btree ("products_id");
  CREATE INDEX "payload_locked_documents_rels_gallery_tiles_id_idx" ON "payload_locked_documents_rels" USING btree ("gallery_tiles_id");
  CREATE INDEX "payload_locked_documents_rels_clients_id_idx" ON "payload_locked_documents_rels" USING btree ("clients_id");
  CREATE INDEX "payload_locked_documents_rels_reviews_id_idx" ON "payload_locked_documents_rels" USING btree ("reviews_id");
  CREATE INDEX "payload_locked_documents_rels_leads_id_idx" ON "payload_locked_documents_rels" USING btree ("leads_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "home_page_hero_stats_order_idx" ON "home_page_hero_stats" USING btree ("_order");
  CREATE INDEX "home_page_hero_stats_parent_id_idx" ON "home_page_hero_stats" USING btree ("_parent_id");
  CREATE INDEX "services_page_models_points_order_idx" ON "services_page_models_points" USING btree ("_order");
  CREATE INDEX "services_page_models_points_parent_id_idx" ON "services_page_models_points" USING btree ("_parent_id");
  CREATE INDEX "services_page_models_order_idx" ON "services_page_models" USING btree ("_order");
  CREATE INDEX "services_page_models_parent_id_idx" ON "services_page_models" USING btree ("_parent_id");
  CREATE INDEX "services_page_faq_order_idx" ON "services_page_faq" USING btree ("_order");
  CREATE INDEX "services_page_faq_parent_id_idx" ON "services_page_faq" USING btree ("_parent_id");
  CREATE INDEX "process_page_steps_deliverables_order_idx" ON "process_page_steps_deliverables" USING btree ("_order");
  CREATE INDEX "process_page_steps_deliverables_parent_id_idx" ON "process_page_steps_deliverables" USING btree ("_parent_id");
  CREATE INDEX "process_page_steps_order_idx" ON "process_page_steps" USING btree ("_order");
  CREATE INDEX "process_page_steps_parent_id_idx" ON "process_page_steps" USING btree ("_parent_id");
  CREATE INDEX "process_page_stack_order_idx" ON "process_page_stack" USING btree ("_order");
  CREATE INDEX "process_page_stack_parent_id_idx" ON "process_page_stack" USING btree ("_parent_id");
  CREATE INDEX "about_page_team_order_idx" ON "about_page_team" USING btree ("_order");
  CREATE INDEX "about_page_team_parent_id_idx" ON "about_page_team" USING btree ("_parent_id");
  CREATE INDEX "about_page_principles_order_idx" ON "about_page_principles" USING btree ("_order");
  CREATE INDEX "about_page_principles_parent_id_idx" ON "about_page_principles" USING btree ("_parent_id");
  CREATE INDEX "about_page_founder_founder_photo_idx" ON "about_page" USING btree ("founder_photo_id");
  CREATE INDEX "site_settings_social_order_idx" ON "site_settings_social" USING btree ("_order");
  CREATE INDEX "site_settings_social_parent_id_idx" ON "site_settings_social" USING btree ("_parent_id");
  CREATE INDEX "site_settings_logo_idx" ON "site_settings" USING btree ("logo_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "services_tags" CASCADE;
  DROP TABLE "services" CASCADE;
  DROP TABLE "case_studies_stack" CASCADE;
  DROP TABLE "case_studies" CASCADE;
  DROP TABLE "products_features" CASCADE;
  DROP TABLE "products" CASCADE;
  DROP TABLE "gallery_tiles" CASCADE;
  DROP TABLE "clients" CASCADE;
  DROP TABLE "reviews" CASCADE;
  DROP TABLE "leads" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "home_page_hero_stats" CASCADE;
  DROP TABLE "home_page" CASCADE;
  DROP TABLE "services_page_models_points" CASCADE;
  DROP TABLE "services_page_models" CASCADE;
  DROP TABLE "services_page_faq" CASCADE;
  DROP TABLE "services_page" CASCADE;
  DROP TABLE "process_page_steps_deliverables" CASCADE;
  DROP TABLE "process_page_steps" CASCADE;
  DROP TABLE "process_page_stack" CASCADE;
  DROP TABLE "process_page" CASCADE;
  DROP TABLE "about_page_team" CASCADE;
  DROP TABLE "about_page_principles" CASCADE;
  DROP TABLE "about_page" CASCADE;
  DROP TABLE "site_settings_social" CASCADE;
  DROP TABLE "site_settings" CASCADE;
  DROP TYPE "public"."enum_services_icon";
  DROP TYPE "public"."enum_services_visual";
  DROP TYPE "public"."enum_case_studies_type";
  DROP TYPE "public"."enum_case_studies_mockup";
  DROP TYPE "public"."enum_products_icon";
  DROP TYPE "public"."enum_products_status";
  DROP TYPE "public"."enum_products_mockup";
  DROP TYPE "public"."enum_gallery_tiles_column";
  DROP TYPE "public"."enum_gallery_tiles_shape";
  DROP TYPE "public"."enum_reviews_kind";
  DROP TYPE "public"."enum_reviews_source";
  DROP TYPE "public"."enum_leads_status";
  DROP TYPE "public"."enum_process_page_steps_icon";
  DROP TYPE "public"."enum_about_page_team_icon";`)
}
