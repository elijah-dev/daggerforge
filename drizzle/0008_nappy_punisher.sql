ALTER TABLE "features" ALTER COLUMN "type" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "features" ALTER COLUMN "type" SET DEFAULT 'action'::text;--> statement-breakpoint
DROP TYPE "public"."feature_type";--> statement-breakpoint
CREATE TYPE "public"."feature_type" AS ENUM('action', 'reaction', 'passive');--> statement-breakpoint
ALTER TABLE "features" ALTER COLUMN "type" SET DEFAULT 'action'::"public"."feature_type";--> statement-breakpoint
ALTER TABLE "features" ALTER COLUMN "type" SET DATA TYPE "public"."feature_type" USING "type"::"public"."feature_type";--> statement-breakpoint
ALTER TABLE "features" DROP COLUMN "value";--> statement-breakpoint
ALTER TABLE "features" DROP COLUMN "modified_attack_damage";--> statement-breakpoint
ALTER TABLE "features" DROP COLUMN "fear_cost";--> statement-breakpoint
ALTER TABLE "features" DROP COLUMN "stress_cost";