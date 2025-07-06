ALTER TABLE "adversaries" DROP CONSTRAINT "horde_check";--> statement-breakpoint
ALTER TABLE "adversaries" DROP CONSTRAINT "tier_check";--> statement-breakpoint
ALTER TABLE "adversaries" ALTER COLUMN "tier" SET DEFAULT 1;--> statement-breakpoint
ALTER TABLE "adversaries" ALTER COLUMN "tier" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "adversaries" ADD COLUMN "creatures_per_hp" integer;--> statement-breakpoint
ALTER TABLE "adversaries" ADD COLUMN "created_by" uuid;--> statement-breakpoint
ALTER TABLE "adversaries" ADD CONSTRAINT "adversaries_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "adversaries" DROP COLUMN "horde_value";--> statement-breakpoint
ALTER TABLE "adversaries" ADD CONSTRAINT "tier_check" CHECK ("adversaries"."tier" >= 1 AND "adversaries"."tier" <= 4);