import {
  boolean,
  integer,
  jsonb,
  pgSchema,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

const users = pgSchema("auth").table("users", {
  id: uuid().primaryKey(),
});

export const profiles = pgTable("profiles", {
  profile_id: uuid()
    .primaryKey()
    .references(() => users.id, { onDelete: "cascade" }),
  name: text().notNull(),
  username: text().notNull(),
  bio: text(),
  followers_count: integer("followers_count").notNull().default(0),
  following_count: integer("following_count").notNull().default(0),
  posts_count: integer("posts_count").notNull().default(0),
  trails_count: integer("trails_count").notNull().default(0),
  viewpoints_count: integer("viewpoints_count").notNull().default(0),
  email: text().notNull(),
  password: text().notNull(),
  created_at: timestamp().notNull().defaultNow(),
  updated_at: timestamp().notNull().defaultNow(),
  photos: jsonb("photos").$type<
    { url: string; description: string | null }[] | null
  >(),
});

export const follows = pgTable(
  "follows",
  {
    follower_id: uuid().references(() => profiles.profile_id, {
      onDelete: "cascade",
    }),
    following_id: uuid().references(() => profiles.profile_id, {
      onDelete: "cascade",
    }),
    created_at: timestamp().notNull().defaultNow(),
  },
  (table) => [primaryKey({ columns: [table.follower_id, table.following_id] })]
);

export const notifications = pgTable("notifications", {
  id: uuid("id").primaryKey(),
  recipient_id: uuid()
    .notNull()
    .references(() => profiles.profile_id, { onDelete: "cascade" }),
  sender_id: uuid()
    .notNull()
    .references(() => profiles.profile_id, { onDelete: "cascade" }),
  type: text("type").notNull(), // 'follow', 'like', 'comment', 'mention' 등
  content: text("content").notNull(),
  reference_id: uuid(), // 관련된 엔티티의 ID (post_id, comment_id 등)
  is_read: boolean("is_read").notNull().default(false),
  created_at: timestamp("created_at").notNull().defaultNow(),
});
