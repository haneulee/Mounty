import type { Database } from "~/database.types";
import { supabase } from "~/supa-client";

export async function useGetCommunityPosts() {
  // 1. posts + profiles + viewpoints 조인
  const { data: posts } = await supabase
    .from("posts")
    .select(
      `
      *,
      profiles:created_by!inner (
        username,
        profile_id
      ),
      viewpoints:viewpoint_id!inner (
        title
      ),
      post_upvotes (
        profile_id
      )
    `
    )
    .order("created_at", { ascending: false });

  if (!posts) return [];

  // 2. 모든 profile_id 추출
  const profileIds = posts
    .map((post) => post.profiles?.profile_id)
    .filter(Boolean);

  // 3. 해당 profile_id의 photos(프로필 사진) 한 번에 조회
  const { data: photos } = await supabase
    .from("photos")
    .select("url,profile_id")
    .in("profile_id", profileIds);

  // 4. posts와 photos 매칭
  return posts.map((post) => ({
    ...post,
    username: post.profiles?.username,
    avatar_url:
      photos?.find((photo) => photo.profile_id === post.profiles?.profile_id)
        ?.url ?? null,
    viewpoint_title: post.viewpoints?.title,
    upvote_count: Array.isArray(post.post_upvotes)
      ? post.post_upvotes.length
      : 0,
  }));
}
