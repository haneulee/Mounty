import { supabase } from "~/supa-client";

export async function useGetCommunityPosts() {
  const { data, error } = await supabase
    .from("community_post_list_view")
    .select("*");

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
