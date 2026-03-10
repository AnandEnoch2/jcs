CREATE TABLE "inquiries" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"phone" text NOT NULL,
	"event_type" text NOT NULL,
	"guests" integer NOT NULL,
	"message" text NOT NULL,
	"created_at" timestamp DEFAULT now()
);
