import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pricing_page_plans_color" AS ENUM('cyan', 'indigo', 'amber', 'coral', 'green');
  CREATE TABLE "pricing_page_plans_team_roles" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL
  );
  
  ALTER TABLE "pricing_page_plans" ADD COLUMN "subtitle" varchar;
  ALTER TABLE "pricing_page_plans" ADD COLUMN "color" "enum_pricing_page_plans_color" DEFAULT 'indigo';
  ALTER TABLE "pricing_page" ADD COLUMN "help_title" varchar DEFAULT 'Not sure which plan fits?';
  ALTER TABLE "pricing_page" ADD COLUMN "help_text" varchar DEFAULT 'Tell us what you are building and we will recommend a plan on a 30-minute call.';
  ALTER TABLE "pricing_page" ADD COLUMN "help_button" varchar DEFAULT 'Get a recommendation';
  ALTER TABLE "pricing_page" ADD COLUMN "billing_note" varchar DEFAULT 'Billed monthly · cancel with 30 days notice';
  ALTER TABLE "pricing_page_plans_team_roles" ADD CONSTRAINT "pricing_page_plans_team_roles_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pricing_page_plans"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pricing_page_plans_team_roles_order_idx" ON "pricing_page_plans_team_roles" USING btree ("_order");
  CREATE INDEX "pricing_page_plans_team_roles_parent_id_idx" ON "pricing_page_plans_team_roles" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pricing_page_plans_team_roles" CASCADE;
  ALTER TABLE "pricing_page_plans" DROP COLUMN "subtitle";
  ALTER TABLE "pricing_page_plans" DROP COLUMN "color";
  ALTER TABLE "pricing_page" DROP COLUMN "help_title";
  ALTER TABLE "pricing_page" DROP COLUMN "help_text";
  ALTER TABLE "pricing_page" DROP COLUMN "help_button";
  ALTER TABLE "pricing_page" DROP COLUMN "billing_note";
  DROP TYPE "public"."enum_pricing_page_plans_color";`)
}
