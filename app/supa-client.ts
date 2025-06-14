import type { MergeDeep, SetFieldType, SetNonNullable } from "type-fest";
import {
  createBrowserClient,
  createServerClient,
  parseCookieHeader,
  serializeCookieHeader,
} from "@supabase/ssr";

import type { Database as SupabaseDatabase } from "./database.types";

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

export const browserClient = createBrowserClient<Database>(
  supabaseUrl,
  supabaseAnonKey
);

export const makeSSRClient = (request: Request) => {
  const headers = new Headers();
  const serverSideClient = createServerClient<Database>(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          const cookies = parseCookieHeader(
            request.headers.get("Cookie") ?? ""
          );
          return cookies.map((cookie) => ({
            name: cookie.name,
            value: cookie.value ?? "",
          }));
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            headers.append(
              "Set-Cookie",
              serializeCookieHeader(name, value, options)
            );
          });
        },
      },
    }
  );
  return {
    client: serverSideClient,
    headers,
  };
};
