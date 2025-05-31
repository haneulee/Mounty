import { supabase } from "~/supa-client";

interface GetViewpointsOptions {
  page?: number;
  pageSize?: number;
  sortBy?: "newest" | "popular" | "rating";
  period?: "all" | "week" | "month" | "year";
  search?: string;
}

export async function useGetViewpoints({
  page = 1,
  pageSize = 12,
  sortBy = "newest",
  period = "all",
  search,
}: GetViewpointsOptions = {}) {
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  let query = supabase
    .from("viewpoints_list_view")
    .select("*", { count: "exact" });

  if (search) {
    query = query.ilike("title", `%${search}%`);
  }

  if (period !== "all") {
    const now = new Date();
    const startDate = new Date();
    switch (period) {
      case "week":
        startDate.setDate(now.getDate() - 7);
        break;
      case "month":
        startDate.setMonth(now.getMonth() - 1);
        break;
      case "year":
        startDate.setFullYear(now.getFullYear() - 1);
        break;
    }
    query = query.gte("created_at", startDate.toISOString());
  }

  switch (sortBy) {
    case "popular":
      query = query.order("posts_count", { ascending: false });
      break;
    case "rating":
      query = query.order("rating", { ascending: false });
      break;
    default:
      query = query.order("created_at", { ascending: false });
  }

  const { data, error, count } = await query.range(from, to);

  if (error) {
    throw new Error(error.message);
  }

  return {
    data,
    totalCount: count || 0,
    totalPages: count ? Math.ceil(count / pageSize) : 0,
    currentPage: page,
  };
}

interface GetViewpointDetailOptions {
  viewpointId: string;
}

export async function useGetViewpointDetail({
  viewpointId,
}: GetViewpointDetailOptions) {
  const { data: viewpoint, error: viewpointError } = await supabase
    .from("viewpoints_list_view")
    .select("*")
    .eq("id", viewpointId)
    .single();

  if (viewpointError) {
    throw new Error(viewpointError.message);
  }

  // Get posts
  const { data: posts, error: postsError } = await supabase
    .from("community_post_list_view")
    .select(
      `
      *,
      username,
      profile_photos
    `
    )
    .eq("viewpoint_id", viewpointId)
    .order("created_at", { ascending: false });

  if (postsError) {
    throw new Error(postsError.message);
  }

  // Get related trails
  const { data: trails, error: trailsError } = await supabase
    .from("trails_list_view")
    .select("*")
    .eq("viewpoint_id", viewpointId)
    .order("rating", { ascending: false });

  if (trailsError) {
    throw new Error(trailsError.message);
  }

  // Get author profile
  const { data: author, error: authorError } = await supabase
    .from("profiles")
    .select("*")
    .eq("profile_id", viewpoint.profile_id)
    .single();

  if (authorError) {
    throw new Error(authorError.message);
  }

  return {
    ...viewpoint,
    posts: posts || [],
    relatedTrails: trails || [],
    createdBy: {
      id: author.profile_id,
      username: author.username,
      profileImageUrl: author.photos?.[0]?.url,
      bio: author.bio,
      followersCount: author.followers_count,
      followingCount: author.following_count,
    },
  };
}
