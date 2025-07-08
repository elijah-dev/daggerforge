ALTER TABLE "adversaries" ALTER COLUMN "created_at" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "adversaries" ALTER COLUMN "created_at" SET DEFAULT (now() AT TIME ZONE 'utc'::text);--> statement-breakpoint
ALTER TABLE "adversaries" ALTER COLUMN "created_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "adversaries" ALTER COLUMN "updated_at" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "adversaries" ALTER COLUMN "updated_at" SET DEFAULT (now() AT TIME ZONE 'utc'::text);--> statement-breakpoint
ALTER TABLE "experiences" ALTER COLUMN "created_at" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "experiences" ALTER COLUMN "created_at" SET DEFAULT (now() AT TIME ZONE 'utc'::text);--> statement-breakpoint
ALTER TABLE "experiences" ALTER COLUMN "created_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "experiences" ALTER COLUMN "updated_at" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "experiences" ALTER COLUMN "updated_at" SET DEFAULT (now() AT TIME ZONE 'utc'::text);--> statement-breakpoint
ALTER TABLE "features" ALTER COLUMN "created_at" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "features" ALTER COLUMN "created_at" SET DEFAULT (now() AT TIME ZONE 'utc'::text);--> statement-breakpoint
ALTER TABLE "features" ALTER COLUMN "created_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "features" ALTER COLUMN "updated_at" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "features" ALTER COLUMN "updated_at" SET DEFAULT (now() AT TIME ZONE 'utc'::text);--> statement-breakpoint
ALTER TABLE "motives_tactics" ALTER COLUMN "created_at" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "motives_tactics" ALTER COLUMN "created_at" SET DEFAULT (now() AT TIME ZONE 'utc'::text);--> statement-breakpoint
ALTER TABLE "motives_tactics" ALTER COLUMN "created_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "motives_tactics" ALTER COLUMN "updated_at" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "motives_tactics" ALTER COLUMN "updated_at" SET DEFAULT (now() AT TIME ZONE 'utc'::text);--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "created_at" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "created_at" SET DEFAULT (now() AT TIME ZONE 'utc'::text);--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "created_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "updated_at" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "updated_at" SET DEFAULT (now() AT TIME ZONE 'utc'::text);--> statement-breakpoint
ALTER TABLE "adversaries_motives_tactics" ADD COLUMN "created_at" timestamp with time zone DEFAULT (now() AT TIME ZONE 'utc'::text) NOT NULL;--> statement-breakpoint
ALTER TABLE "adversaries_motives_tactics" ADD COLUMN "updated_at" timestamp with time zone DEFAULT (now() AT TIME ZONE 'utc'::text);