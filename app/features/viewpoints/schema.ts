import {
  check,
  doublePrecision,
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

import { profiles } from "../users/schema";
import { sql } from "drizzle-orm";

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
    photos: jsonb("photos").$type<
      { url: string; description: string | null }[] | null
    >(),
  },
  (table) => [
    check("rating_check", sql`${table.rating} BETWEEN 1 AND 5`),
    check("rating_count_check", sql`${table.rating_count} >= 0`),
  ]
);
