import { DIFFICULTY_VALUES, SEASON_VALUES } from "./constants";
import {
  check,
  doublePrecision,
  integer,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

import { profiles } from "../users/schema";
import { sql } from "drizzle-orm";
import { viewpoints } from "../viewpoints/schema";

export const trails = pgTable(
  "trails",
  {
    id: uuid("id").primaryKey(),
    title: text("title").notNull(),
    description: text("description").notNull(),
    start_location: text("start_location").notNull(),
    end_location: text("end_location").notNull(),
    distance: doublePrecision("distance").notNull(),
    elevation_gain: doublePrecision("elevation_gain").notNull(),
    estimated_time: integer("estimated_time").notNull(),
    difficulty: text("difficulty", {
      enum: DIFFICULTY_VALUES,
    }).notNull(),
    season: text("season", {
      enum: SEASON_VALUES,
    }).notNull(),
    created_by: uuid().references(() => profiles.profile_id, {
      onDelete: "cascade",
    }),
    viewpoint_id: uuid().references(() => viewpoints.id, {
      onDelete: "cascade",
    }),
    rating: doublePrecision("rating").notNull().default(0),
    rating_count: integer("rating_count").notNull().default(0),
    posts_count: integer("posts_count").notNull().default(0),
    created_at: timestamp("created_at").notNull().defaultNow(),
    updated_at: timestamp("updated_at").notNull().defaultNow(),
  },
  (table) => [
    check("rating_check", sql`${table.rating} BETWEEN 1 AND 5`),
    check("rating_count_check", sql`${table.rating_count} >= 0`),
  ]
);
