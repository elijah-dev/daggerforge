CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"firstName" varchar(255),
	"lastName" varchar(255),
	"email" varchar(255) NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
