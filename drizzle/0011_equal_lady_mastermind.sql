ALTER TABLE "adversaries" DROP CONSTRAINT "adversaries_created_by_users_id_fk";
--> statement-breakpoint
ALTER TABLE "adversaries" ADD CONSTRAINT "adversaries_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;