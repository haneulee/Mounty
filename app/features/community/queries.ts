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
