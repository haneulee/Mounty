import { supabase } from "~/supa-client";

export async function useGetViewpoints() {
  const { data, error } = await supabase
    .from("viewpoints_list_view")
    .select("*");

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
