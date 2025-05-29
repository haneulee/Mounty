DROP TABLE "photos" CASCADE;--> statement-breakpoint
ALTER TABLE "posts" ADD COLUMN "photos" jsonb;--> statement-breakpoint
ALTER TABLE "trails" ADD COLUMN "photos" jsonb;--> statement-breakpoint
ALTER TABLE "profiles" ADD COLUMN "photos" jsonb;--> statement-breakpoint
ALTER TABLE "viewpoints" ADD COLUMN "photos" jsonb;