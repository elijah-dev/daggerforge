ALTER TABLE "adversaries" ADD COLUMN "attack_damage_die_count" integer DEFAULT 1 NOT NULL;--> statement-breakpoint
ALTER TABLE "adversaries" ADD COLUMN "attack_damage_die" integer DEFAULT 6 NOT NULL;--> statement-breakpoint
ALTER TABLE "adversaries" ADD COLUMN "attack_damage_modifier" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "adversaries" ADD CONSTRAINT "damage_die_count_check" CHECK ("adversaries"."attack_damage_die_count" >= 0);