import type { MergeDeep, SetFieldType, SetNonNullable } from "type-fest";

import type { Database as SupabaseDatabase } from "./database.types";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

export type Database = MergeDeep<
  SupabaseDatabase,
  {
    public: {
      Views: {
        community_post_list_view: {
          Row: SetFieldType<
            SetNonNullable<
              SupabaseDatabase["public"]["Views"]["community_post_list_view"]["Row"]
            >,
            "profile_photos" | "username",
            string | null
          >;
        };
        viewpoint_list_view: {
          Row: SetNonNullable<
            SupabaseDatabase["public"]["Views"]["viewpoints_list_view"]["Row"]
          >;
        };
        trails_list_view: {
          Row: SetNonNullable<
            SupabaseDatabase["public"]["Views"]["trails_list_view"]["Row"]
          >;
        };
      };
    };
  }
>;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables");
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
