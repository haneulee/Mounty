import { DIFFICULTY_VALUES, SEASON_VALUES } from "./constants";

import { supabase } from "~/supa-client";

interface GetTrailsOptions {
  page?: number;
  pageSize?: number;
  sortBy?: "newest" | "popular" | "rating";
  period?: "all" | "week" | "month" | "year";
  search?: string;
  difficulty?: (typeof DIFFICULTY_VALUES)[number];
  season?: (typeof SEASON_VALUES)[number];
}

export async function useGetTrails({
  page = 1,
  pageSize = 12,
  sortBy = "newest",
  period = "all",
  search,
  difficulty,
  season,
}: GetTrailsOptions = {}) {
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  let query = supabase.from("trails_list_view").select("*", { count: "exact" });

  // 검색어가 있는 경우 검색 조건 추가
  if (search) {
    query = query.or(
      `title.ilike.%${search}%,description.ilike.%${search}%,start_location.ilike.%${search}%,end_location.ilike.%${search}%`
    );
  }

  // 난이도와 계절 필터 적용
  if (difficulty && season) {
    query = query
      .eq("difficulty", difficulty)
      .or(`season.ilike.%${season}%,season.eq.${season}`);
  } else if (difficulty) {
    query = query.eq("difficulty", difficulty);
  } else if (season) {
    query = query.or(`season.ilike.%${season}%,season.eq.${season}`);
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
      query = query.order("rating_count", { ascending: false });
      break;
    case "rating":
      query = query.order("rating", { ascending: false });
      break;
  }

  console.log("Query params:", { difficulty, season, search, period, sortBy });
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
