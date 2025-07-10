CREATE TYPE "public"."role" AS ENUM('admin', 'user', 'superadmin');--> statement-breakpoint
CREATE TABLE "sources" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT (now() AT TIME ZONE 'utc'::text) NOT NULL,
	"updated_at" timestamp with time zone DEFAULT (now() AT TIME ZONE 'utc'::text),
	CONSTRAINT "sources_name_unique" UNIQUE("name")
);
--> statement-breakpoint
ALTER TABLE "experiences" DROP CONSTRAINT "experiences_adversary_id_adversaries_id_fk";
--> statement-breakpoint
ALTER TABLE "features" DROP CONSTRAINT "features_adversary_id_adversaries_id_fk";
--> statement-breakpoint
ALTER TABLE "adversaries" ALTER COLUMN "type" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "role" "role" DEFAULT 'user' NOT NULL;--> statement-breakpoint
ALTER TABLE "experiences" ADD CONSTRAINT "experiences_adversary_id_adversaries_id_fk" FOREIGN KEY ("adversary_id") REFERENCES "public"."adversaries"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "features" ADD CONSTRAINT "features_adversary_id_adversaries_id_fk" FOREIGN KEY ("adversary_id") REFERENCES "public"."adversaries"("id") ON DELETE cascade ON UPDATE no action;