CREATE TYPE "public"."adversary_type" AS ENUM('bruiser', 'horde', 'leader', 'minion', 'ranged', 'skulk', 'social', 'solo', 'standard', 'support');--> statement-breakpoint
CREATE TYPE "public"."attack_range" AS ENUM('melee', 'very close', 'close', 'far', 'very far');--> statement-breakpoint
CREATE TYPE "public"."damage_type" AS ENUM('physical', 'magical');--> statement-breakpoint
CREATE TYPE "public"."feature_type" AS ENUM('action', 'passive', 'reaction');--> statement-breakpoint
CREATE TABLE "adversaries" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"tier" integer,
	"type" "adversary_type" DEFAULT 'standard',
	"horde_value" integer DEFAULT 0,
	"description" text,
	"difficulty" integer NOT NULL,
	"major_threshold" integer,
	"severe_threshold" integer,
	"hp" integer NOT NULL,
	"stress" integer NOT NULL,
	"attack_modifier" integer DEFAULT 0 NOT NULL,
	"attack_name" text NOT NULL,
	"attack_range" "attack_range" DEFAULT 'melee' NOT NULL,
	"attack_damage" text NOT NULL,
	"attack_damage_type" "damage_type" DEFAULT 'physical' NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp,
	CONSTRAINT "tier_check" CHECK ("adversaries"."tier" >= 1 AND "adversaries"."tier" <= 5),
	CONSTRAINT "horde_check" CHECK (
          CASE 
            WHEN "adversaries"."type" = 'horde' THEN "adversaries"."horde_value" IS NOT NULL
            ELSE "adversaries"."horde_value" IS NULL
          END
          )
);
--> statement-breakpoint
CREATE TABLE "experiences" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"adversary_id" uuid NOT NULL,
	"name" text NOT NULL,
	"value" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "features" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"adversary_id" uuid NOT NULL,
	"name" text NOT NULL,
	"value" integer,
	"modified_attack_damage" text,
	"description" text NOT NULL,
	"type" "feature_type" DEFAULT 'action' NOT NULL,
	"fear_cost" integer,
	"stress_cost" integer,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "motives_tactics" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp,
	CONSTRAINT "motives_tactics_name_unique" UNIQUE("name")
);
--> statement-breakpoint
ALTER TABLE "experiences" ADD CONSTRAINT "experiences_adversary_id_adversaries_id_fk" FOREIGN KEY ("adversary_id") REFERENCES "public"."adversaries"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "features" ADD CONSTRAINT "features_adversary_id_adversaries_id_fk" FOREIGN KEY ("adversary_id") REFERENCES "public"."adversaries"("id") ON DELETE no action ON UPDATE no action;