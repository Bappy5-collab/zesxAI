import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "services_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "services_deliverables" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "services_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar NOT NULL,
  	"answer" varchar NOT NULL
  );
  
  CREATE TABLE "case_studies_results" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "work_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_eyebrow" varchar DEFAULT 'Work',
  	"hero_title" varchar DEFAULT 'Software we have designed, built and shipped.',
  	"hero_lead" varchar DEFAULT 'Custom ERP systems, business apps for SMBs, SaaS platforms, mobile apps and AI projects. Filter by type.',
  	"all_label" varchar DEFAULT 'All',
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"meta_keywords" varchar,
  	"meta_noindex" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "reviews_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_eyebrow" varchar DEFAULT 'Reviews',
  	"hero_title" varchar DEFAULT 'What our clients say.',
  	"hero_lead" varchar DEFAULT 'Video stories and written reviews from business owners and teams we have built software with.',
  	"written_eyebrow" varchar DEFAULT 'Written reviews',
  	"written_title" varchar DEFAULT 'In their own words.',
  	"written_lead" varchar DEFAULT '',
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"meta_keywords" varchar,
  	"meta_noindex" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "contact_page_project_types" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "contact_page_stages" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "contact_page_timelines" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "contact_page_next_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"when" varchar
  );
  
  CREATE TABLE "contact_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_eyebrow" varchar DEFAULT 'Start a project',
  	"hero_title" varchar DEFAULT 'Tell us what you want to build.',
  	"hero_lead" varchar DEFAULT 'Four quick steps. We reply within one business day with a call slot and first questions.',
  	"steps_type" varchar DEFAULT 'What are we building?',
  	"steps_stage" varchar DEFAULT 'Where are you today?',
  	"steps_budget" varchar DEFAULT 'Budget and timeline',
  	"steps_contact" varchar DEFAULT 'How do we reach you?',
  	"budget_min" numeric DEFAULT 3500,
  	"budget_max" numeric DEFAULT 150000,
  	"budget_step" numeric DEFAULT 500,
  	"budget_start" numeric DEFAULT 5500,
  	"done_title" varchar DEFAULT 'Brief received',
  	"done_text" varchar DEFAULT 'We reply within one business day with a short call slot and first questions.',
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"meta_keywords" varchar,
  	"meta_noindex" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "site_settings_nav" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE "site_settings_footer_columns_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE "site_settings_footer_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL
  );
  
  ALTER TABLE "services" ADD COLUMN "headline" varchar;
  ALTER TABLE "services" ADD COLUMN "intro" varchar;
  ALTER TABLE "services" ADD COLUMN "slug" varchar;
  ALTER TABLE "services" ADD COLUMN "meta_title" varchar;
  ALTER TABLE "services" ADD COLUMN "meta_description" varchar;
  ALTER TABLE "services" ADD COLUMN "meta_image_id" integer;
  ALTER TABLE "services" ADD COLUMN "meta_keywords" varchar;
  ALTER TABLE "services" ADD COLUMN "meta_noindex" boolean DEFAULT false;
  ALTER TABLE "case_studies" ADD COLUMN "summary" varchar;
  ALTER TABLE "case_studies" ADD COLUMN "service_id" integer;
  ALTER TABLE "case_studies" ADD COLUMN "slug" varchar;
  ALTER TABLE "case_studies" ADD COLUMN "meta_title" varchar;
  ALTER TABLE "case_studies" ADD COLUMN "meta_description" varchar;
  ALTER TABLE "case_studies" ADD COLUMN "meta_image_id" integer;
  ALTER TABLE "case_studies" ADD COLUMN "meta_keywords" varchar;
  ALTER TABLE "case_studies" ADD COLUMN "meta_noindex" boolean DEFAULT false;
  ALTER TABLE "home_page" ADD COLUMN "erp_graph" jsonb DEFAULT '{"hint":"Drag the modules · drag the canvas to pan","nodes":[{"id":"sales","title":"Sales & CRM","icon":"chat","text":"Leads, quotes and orders","p":[0,0],"m":[0,0]},{"id":"pos","title":"POS & e-commerce","icon":"card","text":"Every shop and online store","p":[0,135],"m":[216,0]},{"id":"buy","title":"Purchasing","icon":"check","text":"Suppliers and purchase orders","p":[0,270],"m":[0,125]},{"id":"hr","title":"HR & payroll","icon":"shield","text":"Staff, attendance, salaries","p":[0,405],"m":[216,125]},{"id":"core","title":"Your ERP core","icon":"stack","type":"core","w":240,"tb":true,"text":"One database, one source of truth for every department","meta":"Real-time","status":"Live","p":[370,175],"m":[86,285]},{"id":"ai","title":"AI assistant","icon":"brain","type":"ai","tb":true,"text":"Answers questions, flags issues","p":[392,420],"m":[108,470]},{"id":"fin","title":"Finance & accounting","icon":"file","text":"Invoices, ledger, tax","p":[770,0],"m":[0,610]},{"id":"inv","title":"Inventory & warehouse","icon":"folder","text":"Stock across every branch","p":[770,135],"m":[216,610]},{"id":"rep","title":"Reports & dashboards","icon":"chart","text":"Live numbers for owners","p":[770,270],"m":[0,735]},{"id":"mob","title":"Mobile app","icon":"code","text":"Managers and field staff","p":[770,405],"m":[216,735]}],"edges":[{"s":"sales","t":"core","label":"Orders"},{"s":"pos","t":"core"},{"s":"buy","t":"core"},{"s":"hr","t":"core"},{"s":"core","t":"fin","label":"Invoices"},{"s":"core","t":"inv"},{"s":"core","t":"rep"},{"s":"core","t":"mob"},{"s":"ai","t":"core","from":"t","to":"b","pulse":false,"label":"Ask"}]}'::jsonb;
  ALTER TABLE "home_page" ADD COLUMN "pricing_eyebrow" varchar DEFAULT 'Pricing';
  ALTER TABLE "home_page" ADD COLUMN "pricing_title" varchar DEFAULT 'Simple monthly plans, a full team on every one.';
  ALTER TABLE "home_page" ADD COLUMN "pricing_lead" varchar DEFAULT 'Every plan includes developers, a designer, QA and a project manager. Growth adds marketing.';
  ALTER TABLE "home_page" ADD COLUMN "show_pricing" boolean DEFAULT true;
  ALTER TABLE "home_page" ADD COLUMN "buttons_services" varchar DEFAULT 'Explore our services';
  ALTER TABLE "home_page" ADD COLUMN "buttons_process" varchar DEFAULT 'See the full process';
  ALTER TABLE "home_page" ADD COLUMN "buttons_reviews" varchar DEFAULT 'Read all reviews';
  ALTER TABLE "home_page" ADD COLUMN "buttons_pricing" varchar DEFAULT 'Compare plans and FAQ';
  ALTER TABLE "home_page" ADD COLUMN "meta_title" varchar;
  ALTER TABLE "home_page" ADD COLUMN "meta_description" varchar;
  ALTER TABLE "home_page" ADD COLUMN "meta_image_id" integer;
  ALTER TABLE "home_page" ADD COLUMN "meta_keywords" varchar;
  ALTER TABLE "home_page" ADD COLUMN "meta_noindex" boolean DEFAULT false;
  ALTER TABLE "services_page" ADD COLUMN "models_head_eyebrow" varchar DEFAULT 'Ways to work with us';
  ALTER TABLE "services_page" ADD COLUMN "models_head_title" varchar DEFAULT 'Engagement models.';
  ALTER TABLE "services_page" ADD COLUMN "models_head_lead" varchar DEFAULT '';
  ALTER TABLE "services_page" ADD COLUMN "faq_head_eyebrow" varchar DEFAULT 'FAQ';
  ALTER TABLE "services_page" ADD COLUMN "faq_head_title" varchar DEFAULT 'Questions we hear a lot';
  ALTER TABLE "services_page" ADD COLUMN "faq_head_lead" varchar DEFAULT '';
  ALTER TABLE "services_page" ADD COLUMN "meta_title" varchar;
  ALTER TABLE "services_page" ADD COLUMN "meta_description" varchar;
  ALTER TABLE "services_page" ADD COLUMN "meta_image_id" integer;
  ALTER TABLE "services_page" ADD COLUMN "meta_keywords" varchar;
  ALTER TABLE "services_page" ADD COLUMN "meta_noindex" boolean DEFAULT false;
  ALTER TABLE "pricing_page" ADD COLUMN "faq_head_eyebrow" varchar DEFAULT 'Pricing FAQ';
  ALTER TABLE "pricing_page" ADD COLUMN "faq_head_title" varchar DEFAULT 'Questions about plans';
  ALTER TABLE "pricing_page" ADD COLUMN "faq_head_lead" varchar DEFAULT '';
  ALTER TABLE "pricing_page" ADD COLUMN "meta_title" varchar;
  ALTER TABLE "pricing_page" ADD COLUMN "meta_description" varchar;
  ALTER TABLE "pricing_page" ADD COLUMN "meta_image_id" integer;
  ALTER TABLE "pricing_page" ADD COLUMN "meta_keywords" varchar;
  ALTER TABLE "pricing_page" ADD COLUMN "meta_noindex" boolean DEFAULT false;
  ALTER TABLE "process_page" ADD COLUMN "pipeline_graph" jsonb DEFAULT '{"hint":"Our delivery pipeline · drag to explore","top":70,"nodes":[{"id":"discover","title":"Discover","icon":"chat","text":"Workshops and requirements","meta":"Week 1","p":[0,120],"m":[0,0]},{"id":"plan","title":"Plan & design","icon":"file","text":"Architecture, UI/UX, fixed quote","meta":"Weeks 2–3","p":[245,120],"m":[0,130]},{"id":"build","title":"Build","icon":"code","type":"core","tb":true,"text":"Two-week sprints with demos","meta":"Sprints","status":"Active","p":[530,15],"m":[0,260]},{"id":"qa","title":"Test & QA","icon":"shield","tb":true,"text":"Manual and automated tests","meta":"Every sprint","p":[530,235],"m":[0,400]},{"id":"launch","title":"Launch","icon":"cloud","text":"Migration, deploy, training","meta":"Go-live","p":[790,120],"m":[0,530]},{"id":"support","title":"Support & grow","icon":"gear","tb":true,"text":"Maintenance and new features","meta":"Ongoing","status":"Monthly","p":[1040,120],"m":[0,660]}],"edges":[{"s":"discover","t":"plan"},{"s":"plan","t":"build"},{"s":"build","t":"qa","from":"b","to":"t","label":"Test","mfrom":"b","mto":"t"},{"s":"qa","t":"build","from":"l","to":"l","back":true,"label":"Fixes","mfrom":"l","mto":"l"},{"s":"qa","t":"launch"},{"s":"launch","t":"support"},{"s":"support","t":"build","from":"t","to":"t","arc":150,"back":true,"label":"New features","mfrom":"r","mto":"r"}]}'::jsonb;
  ALTER TABLE "process_page" ADD COLUMN "steps_head_eyebrow" varchar DEFAULT 'Step by step';
  ALTER TABLE "process_page" ADD COLUMN "steps_head_title" varchar DEFAULT 'What happens at each stage';
  ALTER TABLE "process_page" ADD COLUMN "steps_head_lead" varchar DEFAULT '';
  ALTER TABLE "process_page" ADD COLUMN "stack_head_eyebrow" varchar DEFAULT 'Stack';
  ALTER TABLE "process_page" ADD COLUMN "stack_head_title" varchar DEFAULT 'Tools we know deeply';
  ALTER TABLE "process_page" ADD COLUMN "stack_head_lead" varchar DEFAULT '';
  ALTER TABLE "process_page" ADD COLUMN "meta_title" varchar;
  ALTER TABLE "process_page" ADD COLUMN "meta_description" varchar;
  ALTER TABLE "process_page" ADD COLUMN "meta_image_id" integer;
  ALTER TABLE "process_page" ADD COLUMN "meta_keywords" varchar;
  ALTER TABLE "process_page" ADD COLUMN "meta_noindex" boolean DEFAULT false;
  ALTER TABLE "about_page" ADD COLUMN "principles_head_eyebrow" varchar DEFAULT 'Principles';
  ALTER TABLE "about_page" ADD COLUMN "principles_head_title" varchar DEFAULT 'How we operate';
  ALTER TABLE "about_page" ADD COLUMN "principles_head_lead" varchar DEFAULT '';
  ALTER TABLE "about_page" ADD COLUMN "meta_title" varchar;
  ALTER TABLE "about_page" ADD COLUMN "meta_description" varchar;
  ALTER TABLE "about_page" ADD COLUMN "meta_image_id" integer;
  ALTER TABLE "about_page" ADD COLUMN "meta_keywords" varchar;
  ALTER TABLE "about_page" ADD COLUMN "meta_noindex" boolean DEFAULT false;
  ALTER TABLE "site_settings" ADD COLUMN "site_url" varchar;
  ALTER TABLE "site_settings" ADD COLUMN "seo_title_template" varchar DEFAULT '%s | Zesxai';
  ALTER TABLE "site_settings" ADD COLUMN "seo_default_title" varchar DEFAULT 'Zesxai | Custom Software, ERP & SaaS Development Company';
  ALTER TABLE "site_settings" ADD COLUMN "seo_keywords" varchar;
  ALTER TABLE "site_settings" ADD COLUMN "seo_og_image_id" integer;
  ALTER TABLE "site_settings" ADD COLUMN "seo_twitter_handle" varchar;
  ALTER TABLE "site_settings" ADD COLUMN "seo_google_verification" varchar;
  ALTER TABLE "site_settings" ADD COLUMN "seo_bing_verification" varchar;
  ALTER TABLE "site_settings" ADD COLUMN "seo_noindex" boolean DEFAULT false;
  ALTER TABLE "site_settings" ADD COLUMN "organization_legal_name" varchar;
  ALTER TABLE "site_settings" ADD COLUMN "organization_founding_year" varchar;
  ALTER TABLE "site_settings" ADD COLUMN "organization_email" varchar;
  ALTER TABLE "site_settings" ADD COLUMN "organization_phone" varchar;
  ALTER TABLE "site_settings" ADD COLUMN "organization_city" varchar;
  ALTER TABLE "site_settings" ADD COLUMN "organization_country" varchar;
  ALTER TABLE "site_settings" ADD COLUMN "organization_area_served" varchar DEFAULT 'Worldwide';
  ALTER TABLE "site_settings" ADD COLUMN "nav_cta" varchar DEFAULT 'Start a project';
  ALTER TABLE "services_features" ADD CONSTRAINT "services_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_deliverables" ADD CONSTRAINT "services_deliverables_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_faq" ADD CONSTRAINT "services_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "case_studies_results" ADD CONSTRAINT "case_studies_results_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "work_page" ADD CONSTRAINT "work_page_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "reviews_page" ADD CONSTRAINT "reviews_page_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "contact_page_project_types" ADD CONSTRAINT "contact_page_project_types_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_page_stages" ADD CONSTRAINT "contact_page_stages_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_page_timelines" ADD CONSTRAINT "contact_page_timelines_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_page_next_steps" ADD CONSTRAINT "contact_page_next_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_page" ADD CONSTRAINT "contact_page_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings_nav" ADD CONSTRAINT "site_settings_nav_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_footer_columns_links" ADD CONSTRAINT "site_settings_footer_columns_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings_footer_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_footer_columns" ADD CONSTRAINT "site_settings_footer_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "services_features_order_idx" ON "services_features" USING btree ("_order");
  CREATE INDEX "services_features_parent_id_idx" ON "services_features" USING btree ("_parent_id");
  CREATE INDEX "services_deliverables_order_idx" ON "services_deliverables" USING btree ("_order");
  CREATE INDEX "services_deliverables_parent_id_idx" ON "services_deliverables" USING btree ("_parent_id");
  CREATE INDEX "services_faq_order_idx" ON "services_faq" USING btree ("_order");
  CREATE INDEX "services_faq_parent_id_idx" ON "services_faq" USING btree ("_parent_id");
  CREATE INDEX "case_studies_results_order_idx" ON "case_studies_results" USING btree ("_order");
  CREATE INDEX "case_studies_results_parent_id_idx" ON "case_studies_results" USING btree ("_parent_id");
  CREATE INDEX "work_page_meta_meta_image_idx" ON "work_page" USING btree ("meta_image_id");
  CREATE INDEX "reviews_page_meta_meta_image_idx" ON "reviews_page" USING btree ("meta_image_id");
  CREATE INDEX "contact_page_project_types_order_idx" ON "contact_page_project_types" USING btree ("_order");
  CREATE INDEX "contact_page_project_types_parent_id_idx" ON "contact_page_project_types" USING btree ("_parent_id");
  CREATE INDEX "contact_page_stages_order_idx" ON "contact_page_stages" USING btree ("_order");
  CREATE INDEX "contact_page_stages_parent_id_idx" ON "contact_page_stages" USING btree ("_parent_id");
  CREATE INDEX "contact_page_timelines_order_idx" ON "contact_page_timelines" USING btree ("_order");
  CREATE INDEX "contact_page_timelines_parent_id_idx" ON "contact_page_timelines" USING btree ("_parent_id");
  CREATE INDEX "contact_page_next_steps_order_idx" ON "contact_page_next_steps" USING btree ("_order");
  CREATE INDEX "contact_page_next_steps_parent_id_idx" ON "contact_page_next_steps" USING btree ("_parent_id");
  CREATE INDEX "contact_page_meta_meta_image_idx" ON "contact_page" USING btree ("meta_image_id");
  CREATE INDEX "site_settings_nav_order_idx" ON "site_settings_nav" USING btree ("_order");
  CREATE INDEX "site_settings_nav_parent_id_idx" ON "site_settings_nav" USING btree ("_parent_id");
  CREATE INDEX "site_settings_footer_columns_links_order_idx" ON "site_settings_footer_columns_links" USING btree ("_order");
  CREATE INDEX "site_settings_footer_columns_links_parent_id_idx" ON "site_settings_footer_columns_links" USING btree ("_parent_id");
  CREATE INDEX "site_settings_footer_columns_order_idx" ON "site_settings_footer_columns" USING btree ("_order");
  CREATE INDEX "site_settings_footer_columns_parent_id_idx" ON "site_settings_footer_columns" USING btree ("_parent_id");
  ALTER TABLE "services" ADD CONSTRAINT "services_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "case_studies" ADD CONSTRAINT "case_studies_service_id_services_id_fk" FOREIGN KEY ("service_id") REFERENCES "public"."services"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "case_studies" ADD CONSTRAINT "case_studies_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_page" ADD CONSTRAINT "home_page_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_page" ADD CONSTRAINT "services_page_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pricing_page" ADD CONSTRAINT "pricing_page_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "process_page" ADD CONSTRAINT "process_page_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "about_page" ADD CONSTRAINT "about_page_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE UNIQUE INDEX "services_slug_idx" ON "services" USING btree ("slug");
  CREATE INDEX "services_meta_meta_image_idx" ON "services" USING btree ("meta_image_id");
  CREATE INDEX "case_studies_service_idx" ON "case_studies" USING btree ("service_id");
  CREATE UNIQUE INDEX "case_studies_slug_idx" ON "case_studies" USING btree ("slug");
  CREATE INDEX "case_studies_meta_meta_image_idx" ON "case_studies" USING btree ("meta_image_id");
  CREATE INDEX "home_page_meta_meta_image_idx" ON "home_page" USING btree ("meta_image_id");
  CREATE INDEX "services_page_meta_meta_image_idx" ON "services_page" USING btree ("meta_image_id");
  CREATE INDEX "pricing_page_meta_meta_image_idx" ON "pricing_page" USING btree ("meta_image_id");
  CREATE INDEX "process_page_meta_meta_image_idx" ON "process_page" USING btree ("meta_image_id");
  CREATE INDEX "about_page_meta_meta_image_idx" ON "about_page" USING btree ("meta_image_id");
  CREATE INDEX "site_settings_seo_seo_og_image_idx" ON "site_settings" USING btree ("seo_og_image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "services_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "services_deliverables" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "services_faq" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "case_studies_results" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "work_page" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "reviews_page" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "contact_page_project_types" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "contact_page_stages" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "contact_page_timelines" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "contact_page_next_steps" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "contact_page" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "site_settings_nav" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "site_settings_footer_columns_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "site_settings_footer_columns" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "services_features" CASCADE;
  DROP TABLE "services_deliverables" CASCADE;
  DROP TABLE "services_faq" CASCADE;
  DROP TABLE "case_studies_results" CASCADE;
  DROP TABLE "work_page" CASCADE;
  DROP TABLE "reviews_page" CASCADE;
  DROP TABLE "contact_page_project_types" CASCADE;
  DROP TABLE "contact_page_stages" CASCADE;
  DROP TABLE "contact_page_timelines" CASCADE;
  DROP TABLE "contact_page_next_steps" CASCADE;
  DROP TABLE "contact_page" CASCADE;
  DROP TABLE "site_settings_nav" CASCADE;
  DROP TABLE "site_settings_footer_columns_links" CASCADE;
  DROP TABLE "site_settings_footer_columns" CASCADE;
  ALTER TABLE "services" DROP CONSTRAINT "services_meta_image_id_media_id_fk";
  
  ALTER TABLE "case_studies" DROP CONSTRAINT "case_studies_service_id_services_id_fk";
  
  ALTER TABLE "case_studies" DROP CONSTRAINT "case_studies_meta_image_id_media_id_fk";
  
  ALTER TABLE "home_page" DROP CONSTRAINT "home_page_meta_image_id_media_id_fk";
  
  ALTER TABLE "services_page" DROP CONSTRAINT "services_page_meta_image_id_media_id_fk";
  
  ALTER TABLE "pricing_page" DROP CONSTRAINT "pricing_page_meta_image_id_media_id_fk";
  
  ALTER TABLE "process_page" DROP CONSTRAINT "process_page_meta_image_id_media_id_fk";
  
  ALTER TABLE "about_page" DROP CONSTRAINT "about_page_meta_image_id_media_id_fk";
  
  ALTER TABLE "site_settings" DROP CONSTRAINT "site_settings_seo_og_image_id_media_id_fk";
  
  DROP INDEX "services_slug_idx";
  DROP INDEX "services_meta_meta_image_idx";
  DROP INDEX "case_studies_service_idx";
  DROP INDEX "case_studies_slug_idx";
  DROP INDEX "case_studies_meta_meta_image_idx";
  DROP INDEX "home_page_meta_meta_image_idx";
  DROP INDEX "services_page_meta_meta_image_idx";
  DROP INDEX "pricing_page_meta_meta_image_idx";
  DROP INDEX "process_page_meta_meta_image_idx";
  DROP INDEX "about_page_meta_meta_image_idx";
  DROP INDEX "site_settings_seo_seo_og_image_idx";
  ALTER TABLE "services" DROP COLUMN "headline";
  ALTER TABLE "services" DROP COLUMN "intro";
  ALTER TABLE "services" DROP COLUMN "slug";
  ALTER TABLE "services" DROP COLUMN "meta_title";
  ALTER TABLE "services" DROP COLUMN "meta_description";
  ALTER TABLE "services" DROP COLUMN "meta_image_id";
  ALTER TABLE "services" DROP COLUMN "meta_keywords";
  ALTER TABLE "services" DROP COLUMN "meta_noindex";
  ALTER TABLE "case_studies" DROP COLUMN "summary";
  ALTER TABLE "case_studies" DROP COLUMN "service_id";
  ALTER TABLE "case_studies" DROP COLUMN "slug";
  ALTER TABLE "case_studies" DROP COLUMN "meta_title";
  ALTER TABLE "case_studies" DROP COLUMN "meta_description";
  ALTER TABLE "case_studies" DROP COLUMN "meta_image_id";
  ALTER TABLE "case_studies" DROP COLUMN "meta_keywords";
  ALTER TABLE "case_studies" DROP COLUMN "meta_noindex";
  ALTER TABLE "home_page" DROP COLUMN "erp_graph";
  ALTER TABLE "home_page" DROP COLUMN "pricing_eyebrow";
  ALTER TABLE "home_page" DROP COLUMN "pricing_title";
  ALTER TABLE "home_page" DROP COLUMN "pricing_lead";
  ALTER TABLE "home_page" DROP COLUMN "show_pricing";
  ALTER TABLE "home_page" DROP COLUMN "buttons_services";
  ALTER TABLE "home_page" DROP COLUMN "buttons_process";
  ALTER TABLE "home_page" DROP COLUMN "buttons_reviews";
  ALTER TABLE "home_page" DROP COLUMN "buttons_pricing";
  ALTER TABLE "home_page" DROP COLUMN "meta_title";
  ALTER TABLE "home_page" DROP COLUMN "meta_description";
  ALTER TABLE "home_page" DROP COLUMN "meta_image_id";
  ALTER TABLE "home_page" DROP COLUMN "meta_keywords";
  ALTER TABLE "home_page" DROP COLUMN "meta_noindex";
  ALTER TABLE "services_page" DROP COLUMN "models_head_eyebrow";
  ALTER TABLE "services_page" DROP COLUMN "models_head_title";
  ALTER TABLE "services_page" DROP COLUMN "models_head_lead";
  ALTER TABLE "services_page" DROP COLUMN "faq_head_eyebrow";
  ALTER TABLE "services_page" DROP COLUMN "faq_head_title";
  ALTER TABLE "services_page" DROP COLUMN "faq_head_lead";
  ALTER TABLE "services_page" DROP COLUMN "meta_title";
  ALTER TABLE "services_page" DROP COLUMN "meta_description";
  ALTER TABLE "services_page" DROP COLUMN "meta_image_id";
  ALTER TABLE "services_page" DROP COLUMN "meta_keywords";
  ALTER TABLE "services_page" DROP COLUMN "meta_noindex";
  ALTER TABLE "pricing_page" DROP COLUMN "faq_head_eyebrow";
  ALTER TABLE "pricing_page" DROP COLUMN "faq_head_title";
  ALTER TABLE "pricing_page" DROP COLUMN "faq_head_lead";
  ALTER TABLE "pricing_page" DROP COLUMN "meta_title";
  ALTER TABLE "pricing_page" DROP COLUMN "meta_description";
  ALTER TABLE "pricing_page" DROP COLUMN "meta_image_id";
  ALTER TABLE "pricing_page" DROP COLUMN "meta_keywords";
  ALTER TABLE "pricing_page" DROP COLUMN "meta_noindex";
  ALTER TABLE "process_page" DROP COLUMN "pipeline_graph";
  ALTER TABLE "process_page" DROP COLUMN "steps_head_eyebrow";
  ALTER TABLE "process_page" DROP COLUMN "steps_head_title";
  ALTER TABLE "process_page" DROP COLUMN "steps_head_lead";
  ALTER TABLE "process_page" DROP COLUMN "stack_head_eyebrow";
  ALTER TABLE "process_page" DROP COLUMN "stack_head_title";
  ALTER TABLE "process_page" DROP COLUMN "stack_head_lead";
  ALTER TABLE "process_page" DROP COLUMN "meta_title";
  ALTER TABLE "process_page" DROP COLUMN "meta_description";
  ALTER TABLE "process_page" DROP COLUMN "meta_image_id";
  ALTER TABLE "process_page" DROP COLUMN "meta_keywords";
  ALTER TABLE "process_page" DROP COLUMN "meta_noindex";
  ALTER TABLE "about_page" DROP COLUMN "principles_head_eyebrow";
  ALTER TABLE "about_page" DROP COLUMN "principles_head_title";
  ALTER TABLE "about_page" DROP COLUMN "principles_head_lead";
  ALTER TABLE "about_page" DROP COLUMN "meta_title";
  ALTER TABLE "about_page" DROP COLUMN "meta_description";
  ALTER TABLE "about_page" DROP COLUMN "meta_image_id";
  ALTER TABLE "about_page" DROP COLUMN "meta_keywords";
  ALTER TABLE "about_page" DROP COLUMN "meta_noindex";
  ALTER TABLE "site_settings" DROP COLUMN "site_url";
  ALTER TABLE "site_settings" DROP COLUMN "seo_title_template";
  ALTER TABLE "site_settings" DROP COLUMN "seo_default_title";
  ALTER TABLE "site_settings" DROP COLUMN "seo_keywords";
  ALTER TABLE "site_settings" DROP COLUMN "seo_og_image_id";
  ALTER TABLE "site_settings" DROP COLUMN "seo_twitter_handle";
  ALTER TABLE "site_settings" DROP COLUMN "seo_google_verification";
  ALTER TABLE "site_settings" DROP COLUMN "seo_bing_verification";
  ALTER TABLE "site_settings" DROP COLUMN "seo_noindex";
  ALTER TABLE "site_settings" DROP COLUMN "organization_legal_name";
  ALTER TABLE "site_settings" DROP COLUMN "organization_founding_year";
  ALTER TABLE "site_settings" DROP COLUMN "organization_email";
  ALTER TABLE "site_settings" DROP COLUMN "organization_phone";
  ALTER TABLE "site_settings" DROP COLUMN "organization_city";
  ALTER TABLE "site_settings" DROP COLUMN "organization_country";
  ALTER TABLE "site_settings" DROP COLUMN "organization_area_served";
  ALTER TABLE "site_settings" DROP COLUMN "nav_cta";`)
}
