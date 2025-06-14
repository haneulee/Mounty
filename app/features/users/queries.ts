import type { Database } from "~/supa-client";
import type { SupabaseClient } from "@supabase/supabase-js";

export const getUserProfile = async (
  client: SupabaseClient<Database>,
  { username }: { username: string }
) => {
  const { data, error } = await client
    .from("profiles")
    .select(
      `
          profile_id,
          name,
          username,
          email,
          password,
          followers_count,
          following_count,
          posts_count,
          trails_count,
          viewpoints_count,
          photos,
          bio
          `
    )
    .eq("username", username)
    .single();
  if (error) {
    throw error;
  }
  return data;
};

export const getUserById = async (
  client: SupabaseClient<Database>,
  { id }: { id: string }
) => {
  const { data, error } = await client
    .from("profiles")
    .select(
      `
          profile_id,
          name,
          username,
          email,
          password,
          followers_count,
          following_count,
          posts_count,
          trails_count,
          viewpoints_count,
          photos,
          bio
          `
    )
    .eq("profile_id", id)
    .single();
  if (error) {
    throw error;
  }
  return data;
};

export const getUserViewpoints = async (
  client: SupabaseClient<Database>,
  { username }: { username: string }
) => {
  const { data, error } = await client
    .from("viewpoints_list_view")
    .select("*")
    .eq("username", username)
    .order("created_at", { ascending: false });
  if (error) {
    throw error;
  }
  return data;
};

export const getUserTrails = async (
  client: SupabaseClient<Database>,
  { username }: { username: string }
) => {
  const { data, error } = await client
    .from("trails_list_view")
    .select("*")
    .eq("created_by_username", username)
    .order("created_at", { ascending: false });
  if (error) {
    throw error;
  }
  return data;
};

export const getUserPosts = async (
  client: SupabaseClient<Database>,
  { username }: { username: string }
) => {
  const { data, error } = await client
    .from("community_post_list_view")
    .select("*")
    .eq("username", username)
    .order("created_at", { ascending: false });
  if (error) {
    throw error;
  }
  return data;
};
