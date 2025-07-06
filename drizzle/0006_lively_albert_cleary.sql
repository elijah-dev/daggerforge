CREATE TABLE "adversaries_motives_tactics" (
	"adversaryId" uuid NOT NULL,
	"motiveTacticId" uuid NOT NULL,
	CONSTRAINT "adversaries_motives_tactics_adversaryId_motiveTacticId_pk" PRIMARY KEY("adversaryId","motiveTacticId")
);
--> statement-breakpoint
ALTER TABLE "adversaries" ADD COLUMN "is_public" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "motives_tactics" ADD COLUMN "is_public" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "adversaries_motives_tactics" ADD CONSTRAINT "adversaries_motives_tactics_adversaryId_adversaries_id_fk" FOREIGN KEY ("adversaryId") REFERENCES "public"."adversaries"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "adversaries_motives_tactics" ADD CONSTRAINT "adversaries_motives_tactics_motiveTacticId_motives_tactics_id_fk" FOREIGN KEY ("motiveTacticId") REFERENCES "public"."motives_tactics"("id") ON DELETE cascade ON UPDATE no action;