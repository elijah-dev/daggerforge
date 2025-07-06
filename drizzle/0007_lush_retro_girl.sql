ALTER TABLE "adversaries_motives_tactics" RENAME COLUMN "adversaryId" TO "adversary_id";--> statement-breakpoint
ALTER TABLE "adversaries_motives_tactics" RENAME COLUMN "motiveTacticId" TO "motive_tactic_id";--> statement-breakpoint
ALTER TABLE "adversaries_motives_tactics" DROP CONSTRAINT "adversaries_motives_tactics_adversaryId_adversaries_id_fk";
--> statement-breakpoint
ALTER TABLE "adversaries_motives_tactics" DROP CONSTRAINT "adversaries_motives_tactics_motiveTacticId_motives_tactics_id_fk";
--> statement-breakpoint
ALTER TABLE "adversaries_motives_tactics" DROP CONSTRAINT "adversaries_motives_tactics_adversaryId_motiveTacticId_pk";--> statement-breakpoint
ALTER TABLE "adversaries_motives_tactics" ADD CONSTRAINT "adversaries_motives_tactics_adversary_id_motive_tactic_id_pk" PRIMARY KEY("adversary_id","motive_tactic_id");--> statement-breakpoint
ALTER TABLE "adversaries_motives_tactics" ADD CONSTRAINT "adversaries_motives_tactics_adversary_id_adversaries_id_fk" FOREIGN KEY ("adversary_id") REFERENCES "public"."adversaries"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "adversaries_motives_tactics" ADD CONSTRAINT "adversaries_motives_tactics_motive_tactic_id_motives_tactics_id_fk" FOREIGN KEY ("motive_tactic_id") REFERENCES "public"."motives_tactics"("id") ON DELETE cascade ON UPDATE no action;