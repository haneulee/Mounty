import {
  bigint,
  boolean,
  check,
  doublePrecision,
  integer,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

import { posts } from "../community/schema";
import { profiles } from "../users/schema";
import { sql } from "drizzle-orm";
import { trails } from "../trails/schema";

export const viewpoints = pgTable(
  "viewpoints",
  {
    id: uuid("id").primaryKey(),
    title: text("title").notNull(),
    description: text("description").notNull(),
    location_name: text("location_name").notNull(),
    latitude: doublePrecision("latitude").notNull(),
    longitude: doublePrecision("longitude").notNull(),
    created_by: uuid().references(() => profiles.profile_id, {
      onDelete: "cascade",
    }),
    rating: doublePrecision("rating").notNull().default(0),
    rating_count: integer("rating_count").notNull().default(0),
    created_at: timestamp("created_at").notNull().defaultNow(),
    updated_at: timestamp("updated_at").notNull().defaultNow(),
  },
  (table) => [
    check("rating_check", sql`${table.rating} BETWEEN 1 AND 5`),
    check("rating_count_check", sql`${table.rating_count} >= 0`),
  ]
);

export const photos = pgTable("photos", {
  id: uuid("id").primaryKey(),
  profile_id: uuid().references(() => profiles.profile_id, {
    onDelete: "cascade",
  }),
  viewpoint_id: uuid().references(() => viewpoints.id, { onDelete: "cascade" }),
  trail_id: uuid().references(() => trails.id, { onDelete: "cascade" }),
  post_id: bigint({ mode: "number" }).references(() => posts.post_id, {
    onDelete: "cascade",
  }),
  url: text("url").notNull(),
  description: text("description"),
  is_thumbnail: boolean("is_thumbnail").notNull().default(false),
  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("updated_at").notNull().defaultNow(),
});
