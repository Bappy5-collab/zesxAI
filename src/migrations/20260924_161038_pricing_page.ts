import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "pricing_page_plans_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "pricing_page_plans" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"price" numeric,
  	"price_label" varchar,
  	"period" varchar DEFAULT '/ month',
  	"badge" varchar,
  	"highlight" boolean DEFAULT false,
  	"description" varchar,
  	"cta_label" varchar DEFAULT 'Get started',
  	"cta_url" varchar DEFAULT '/contact'
  );
  
  CREATE TABLE "pricing_page_notes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "pricing_page_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar NOT NULL,
  	"answer" varchar NOT NULL
  );
  
  CREATE TABLE "pricing_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_eyebrow" varchar DEFAULT 'Pricing',
  	"hero_title" varchar DEFAULT 'Simple monthly plans for a dedicated team.',
  	"hero_lead" varchar DEFAULT 'Pick a plan, and the same experienced team builds, launches and supports your software every month.',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "pricing_page_plans_features" ADD CONSTRAINT "pricing_page_plans_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pricing_page_plans"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pricing_page_plans" ADD CONSTRAINT "pricing_page_plans_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pricing_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pricing_page_notes" ADD CONSTRAINT "pricing_page_notes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pricing_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pricing_page_faq" ADD CONSTRAINT "pricing_page_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pricing_page"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pricing_page_plans_features_order_idx" ON "pricing_page_plans_features" USING btree ("_order");
  CREATE INDEX "pricing_page_plans_features_parent_id_idx" ON "pricing_page_plans_features" USING btree ("_parent_id");
  CREATE INDEX "pricing_page_plans_order_idx" ON "pricing_page_plans" USING btree ("_order");
  CREATE INDEX "pricing_page_plans_parent_id_idx" ON "pricing_page_plans" USING btree ("_parent_id");
  CREATE INDEX "pricing_page_notes_order_idx" ON "pricing_page_notes" USING btree ("_order");
  CREATE INDEX "pricing_page_notes_parent_id_idx" ON "pricing_page_notes" USING btree ("_parent_id");
  CREATE INDEX "pricing_page_faq_order_idx" ON "pricing_page_faq" USING btree ("_order");
  CREATE INDEX "pricing_page_faq_parent_id_idx" ON "pricing_page_faq" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pricing_page_plans_features" CASCADE;
  DROP TABLE "pricing_page_plans" CASCADE;
  DROP TABLE "pricing_page_notes" CASCADE;
  DROP TABLE "pricing_page_faq" CASCADE;
  DROP TABLE "pricing_page" CASCADE;`)
}
