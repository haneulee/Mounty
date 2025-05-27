CREATE TABLE "post_replies" (
	"post_reply_id" bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "post_replies_post_reply_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 9223372036854775807 START WITH 1 CACHE 1),
	"post_id" bigint,
	"parent_id" bigint,
	"profile_id" uuid NOT NULL,
	"reply" text NOT NULL,
	"upvotes_count" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "post_reply_upvotes" (
	"post_reply_id" bigint,
	"profile_id" uuid,
	CONSTRAINT "post_reply_upvotes_post_reply_id_profile_id_pk" PRIMARY KEY("post_reply_id","profile_id")
);
--> statement-breakpoint
CREATE TABLE "post_upvotes" (
	"post_id" bigint,
	"profile_id" uuid,
	CONSTRAINT "post_upvotes_post_id_profile_id_pk" PRIMARY KEY("post_id","profile_id")
);
--> statement-breakpoint
CREATE TABLE "posts" (
	"post_id" bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "posts_post_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 9223372036854775807 START WITH 1 CACHE 1),
	"title" text NOT NULL,
	"content" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"viewpoint_id" uuid,
	"created_by" uuid
);
--> statement-breakpoint
CREATE TABLE "trails" (
	"id" uuid PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"start_location" text NOT NULL,
	"end_location" text NOT NULL,
	"distance" double precision NOT NULL,
	"elevation_gain" double precision NOT NULL,
	"estimated_time" integer NOT NULL,
	"difficulty" text NOT NULL,
	"season" text NOT NULL,
	"created_by" uuid,
	"viewpoint_id" uuid,
	"rating" double precision DEFAULT 0 NOT NULL,
	"rating_count" integer DEFAULT 0 NOT NULL,
	"posts_count" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "rating_check" CHECK ("trails"."rating" BETWEEN 1 AND 5),
	CONSTRAINT "rating_count_check" CHECK ("trails"."rating_count" >= 0)
);
--> statement-breakpoint
CREATE TABLE "follows" (
	"follower_id" uuid,
	"following_id" uuid,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "follows_follower_id_following_id_pk" PRIMARY KEY("follower_id","following_id")
);
--> statement-breakpoint
CREATE TABLE "profiles" (
	"profile_id" uuid PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"username" text NOT NULL,
	"headline" text,
	"bio" text,
	"followers_count" integer DEFAULT 0 NOT NULL,
	"following_count" integer DEFAULT 0 NOT NULL,
	"posts_count" integer DEFAULT 0 NOT NULL,
	"trails_count" integer DEFAULT 0 NOT NULL,
	"viewpoints_count" integer DEFAULT 0 NOT NULL,
	"views" jsonb,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "photos" (
	"id" uuid PRIMARY KEY NOT NULL,
	"profile_id" uuid,
	"viewpoint_id" uuid,
	"trail_id" uuid,
	"post_id" bigint,
	"url" text NOT NULL,
	"description" text,
	"is_thumbnail" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "viewpoints" (
	"id" uuid PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"location_name" text NOT NULL,
	"latitude" double precision NOT NULL,
	"longitude" double precision NOT NULL,
	"created_by" uuid,
	"rating" double precision DEFAULT 0 NOT NULL,
	"rating_count" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "rating_check" CHECK ("viewpoints"."rating" BETWEEN 1 AND 5),
	CONSTRAINT "rating_count_check" CHECK ("viewpoints"."rating_count" >= 0)
);
--> statement-breakpoint
ALTER TABLE "post_replies" ADD CONSTRAINT "post_replies_post_id_posts_post_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."posts"("post_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "post_replies" ADD CONSTRAINT "post_replies_parent_id_post_replies_post_reply_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."post_replies"("post_reply_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "post_replies" ADD CONSTRAINT "post_replies_profile_id_profiles_profile_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("profile_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "post_reply_upvotes" ADD CONSTRAINT "post_reply_upvotes_post_reply_id_post_replies_post_reply_id_fk" FOREIGN KEY ("post_reply_id") REFERENCES "public"."post_replies"("post_reply_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "post_reply_upvotes" ADD CONSTRAINT "post_reply_upvotes_profile_id_profiles_profile_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("profile_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "post_upvotes" ADD CONSTRAINT "post_upvotes_post_id_posts_post_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."posts"("post_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "post_upvotes" ADD CONSTRAINT "post_upvotes_profile_id_profiles_profile_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("profile_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "posts" ADD CONSTRAINT "posts_viewpoint_id_viewpoints_id_fk" FOREIGN KEY ("viewpoint_id") REFERENCES "public"."viewpoints"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "posts" ADD CONSTRAINT "posts_created_by_profiles_profile_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."profiles"("profile_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "trails" ADD CONSTRAINT "trails_created_by_profiles_profile_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."profiles"("profile_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "trails" ADD CONSTRAINT "trails_viewpoint_id_viewpoints_id_fk" FOREIGN KEY ("viewpoint_id") REFERENCES "public"."viewpoints"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "follows" ADD CONSTRAINT "follows_follower_id_profiles_profile_id_fk" FOREIGN KEY ("follower_id") REFERENCES "public"."profiles"("profile_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "follows" ADD CONSTRAINT "follows_following_id_profiles_profile_id_fk" FOREIGN KEY ("following_id") REFERENCES "public"."profiles"("profile_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_profile_id_users_id_fk" FOREIGN KEY ("profile_id") REFERENCES "auth"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "photos" ADD CONSTRAINT "photos_profile_id_profiles_profile_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("profile_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "photos" ADD CONSTRAINT "photos_viewpoint_id_viewpoints_id_fk" FOREIGN KEY ("viewpoint_id") REFERENCES "public"."viewpoints"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "photos" ADD CONSTRAINT "photos_trail_id_trails_id_fk" FOREIGN KEY ("trail_id") REFERENCES "public"."trails"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "photos" ADD CONSTRAINT "photos_post_id_posts_post_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."posts"("post_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "viewpoints" ADD CONSTRAINT "viewpoints_created_by_profiles_profile_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."profiles"("profile_id") ON DELETE cascade ON UPDATE no action;