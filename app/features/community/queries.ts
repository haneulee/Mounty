import { supabase } from "~/supa-client";

interface GetPostsOptions {
  page?: number;
  pageSize?: number;
  sortBy?: "newest" | "popular";
  period?: "all" | "week" | "month" | "year";
  search?: string;
}

export async function useGetPosts({
  page = 1,
  pageSize = 12,
  sortBy = "newest",
  period = "all",
  search,
}: GetPostsOptions = {}) {
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  let query = supabase
    .from("community_post_list_view")
    .select("*", { count: "exact" });

  // 검색어가 있는 경우 검색 조건 추가
  if (search) {
    query = query.or(`title.ilike.%${search}%,content.ilike.%${search}%`);
  }

  // 기간 필터 적용
  if (period !== "all") {
    const now = new Date();
    let startDate = new Date();

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

  // 정렬 적용
  switch (sortBy) {
    case "newest":
      query = query.order("created_at", { ascending: false });
      break;
    case "popular":
      query = query.order("upvote_count", { ascending: false });
      break;
  }

  console.log("Query params:", { search, period, sortBy });
  const { data, error, count } = await query.range(from, to);

  if (error) {
    console.error("Query error:", error);
    throw new Error(error.message);
  }

  return {
    data,
    totalCount: count || 0,
    totalPages: count ? Math.ceil(count / pageSize) : 0,
    currentPage: page,
  };
}

interface GetPostDetailOptions {
  postId: string;
}

export async function useGetPostDetail({ postId }: GetPostDetailOptions) {
  const { data: post, error: postError } = await supabase
    .from("community_post_list_view")
    .select("*")
    .eq("post_id", postId)
    .single();

  if (postError) {
    throw new Error(postError.message);
  }

  // Get author profile
  const { data: authorProfile, error: authorError } = await supabase
    .from("profiles")
    .select("profile_id, username, photos, followers_count, following_count")
    .eq("profile_id", post.profile_id)
    .single();

  if (authorError) {
    throw new Error(authorError.message);
  }

  // Get replies
  const { data: replies, error: repliesError } = await supabase
    .from("post_replies")
    .select(
      `
      post_reply_id,
      post_id,
      parent_id,
      profile_id,
      reply,
      upvotes_count,
      created_at,
      updated_at
    `
    )
    .eq("post_id", postId)
    .order("created_at", { ascending: true });

  if (repliesError) {
    throw new Error(repliesError.message);
  }

  // Get viewpoints if exists
  let viewpoint = null;
  if (post.viewpoint_id) {
    const { data: viewpointData, error: viewpointError } = await supabase
      .from("viewpoints_list_view")
      .select("*")
      .eq("id", post.viewpoint_id)
      .single();

    if (!viewpointError) {
      viewpoint = viewpointData;
    }
  }

  // Get profiles for replies
  const profileIds = replies?.map((reply) => reply.profile_id) || [];
  const { data: profiles, error: profilesError } = await supabase
    .from("profiles")
    .select("profile_id, username, photos")
    .in("profile_id", profileIds);

  if (profilesError) {
    throw new Error(profilesError.message);
  }

  const profilesMap = new Map(
    profiles?.map((profile) => [profile.profile_id, profile]) || []
  );

  // Organize replies into a tree structure
  type Reply = {
    id: string;
    content: string;
    created_at: string;
    updated_at: string;
    parent_id: string | null;
    created_by: string;
    created_by_username: string;
    created_by_photos: { url: string; description: string | null }[];
    likes_count: number;
    children: Reply[];
  };

  const repliesMap = new Map<string, Reply>(
    replies?.map((reply) => [
      reply.post_reply_id,
      {
        id: reply.post_reply_id,
        content: reply.reply,
        created_at: reply.created_at,
        updated_at: reply.updated_at,
        parent_id: reply.parent_id,
        created_by: reply.profile_id,
        created_by_username: profilesMap.get(reply.profile_id)?.username || "",
        created_by_photos: profilesMap.get(reply.profile_id)?.photos || [],
        likes_count: reply.upvotes_count,
        children: [],
      },
    ]) || []
  );

  // Build the tree structure
  const rootReplies: Reply[] = [];
  repliesMap.forEach((reply) => {
    if (reply.parent_id) {
      const parent = repliesMap.get(reply.parent_id);
      if (parent) {
        parent.children.push(reply);
      }
    } else {
      rootReplies.push(reply);
    }
  });

  return {
    ...post,
    profile_id: authorProfile.profile_id,
    username: authorProfile.username,
    profile_photos: authorProfile.photos,
    followers_count: authorProfile.followers_count,
    following_count: authorProfile.following_count,
    replies: rootReplies,
    comments_count: replies?.length || 0,
    viewpoint,
  };
}
