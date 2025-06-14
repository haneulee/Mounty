import { DIFFICULTY_VALUES, SEASON_VALUES } from "../constants";

import { ContentLayout } from "~/common/components/layout/content-layout";
import type { Route } from "~/types";
import { TrailCard } from "~/features/trails/components/trail-card";
import { makeSSRClient } from "~/supa-client";
import { useGetTrails } from "../queries";
import { useSearchParams } from "react-router";
import { z } from "zod";

interface FilterOption {
  label: string;
  value: string;
}

const SORT_OPTIONS: FilterOption[] = [
  { label: "Newest", value: "newest" },
  { label: "Popular", value: "popular" },
  { label: "Rating", value: "rating" },
];

const PERIOD_OPTIONS: FilterOption[] = [
  { label: "All Time", value: "all" },
  { label: "This Week", value: "week" },
  { label: "This Month", value: "month" },
  { label: "This Year", value: "year" },
];

const DIFFICULTY_OPTIONS: FilterOption[] = DIFFICULTY_VALUES.map((value) => ({
  label: value.charAt(0).toUpperCase() + value.slice(1),
  value,
}));

const SEASON_OPTIONS: FilterOption[] = [
  { label: "Spring", value: "spring" },
  { label: "Summer", value: "summer" },
  { label: "Fall", value: "fall" },
  { label: "Winter", value: "winter" },
  { label: "All Seasons", value: "all" },
];

const searchParamsSchema = z.object({
  page: z
    .string()
    .transform((val: string) => parseInt(val, 10))
    .optional(),
  sorting: z.enum(["newest", "popular", "rating"]).optional(),
  period: z.enum(["all", "week", "month", "year"]).optional(),
  search: z.string().optional(),
  difficulty: z.enum(DIFFICULTY_VALUES).optional(),
  season: z.enum(SEASON_VALUES).optional(),
});

export async function loader({ request }: Route.LoaderArgs) {
  const { client, headers } = makeSSRClient(request);
  const url = new URL(request.url);
  const { success, data: parsedData } = searchParamsSchema.safeParse(
    Object.fromEntries(url.searchParams)
  );

  if (!success) {
    throw new Response(
      JSON.stringify({
        error_code: "invalid_search_params",
        message: "Invalid search params",
      }),
      { status: 400 }
    );
  }

  const {
    data: trails,
    totalPages,
    currentPage,
  } = await useGetTrails(client, {
    page: parsedData.page || 1,
    sortBy: parsedData.sorting || "newest",
    period: parsedData.period || "all",
    search: parsedData.search,
    difficulty: parsedData.difficulty,
    season: parsedData.season,
  });

  return { trails, totalPages, currentPage };
}

export function action({ request }: Route.ActionArgs) {
  return {};
}

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Trails - Mounty" },
    {
      name: "description",
      content: "Discover beautiful trails around the world",
    },
  ];
};

export default function TrailsPage({ loaderData }: Route.ComponentProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sorting = searchParams.get("sorting") || "newest";
  const period = searchParams.get("period") || "all";
  const search = searchParams.get("search") || "";
  const difficulty = searchParams.get("difficulty") || "";
  const season = searchParams.get("season") || "";
  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  const handleFilterChange = (type: "difficulty" | "season", value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value === searchParams.get(type)) {
      newParams.delete(type);
    } else {
      newParams.set(type, value);
    }
    newParams.set("page", "1");
    setSearchParams(newParams);
  };

  return (
    <ContentLayout
      title="Trails"
      subtitle="Discover beautiful trails around the world"
      searchPlaceholder="Search trails..."
      addButtonText="Add Trail"
      addButtonLink="/trails/new"
      sortOptions={SORT_OPTIONS}
      periodOptions={PERIOD_OPTIONS}
      sidebarFilters={[
        {
          title: "Difficulty",
          options: DIFFICULTY_OPTIONS,
          type: "link",
          value: difficulty,
          onChange: (value) => handleFilterChange("difficulty", value),
        },
        {
          title: "Season",
          options: SEASON_OPTIONS,
          type: "link",
          value: season,
          onChange: (value) => handleFilterChange("season", value),
        },
      ]}
      currentSort={sorting}
      currentPeriod={period}
      searchValue={search}
      onSearch={(value) => {
        searchParams.set("search", value);
        searchParams.set("page", "1");
        setSearchParams(searchParams);
      }}
      onSort={(value) => {
        searchParams.set("sorting", value);
        searchParams.set("page", "1");
        setSearchParams(searchParams);
      }}
      onPeriodChange={(value) => {
        searchParams.set("period", value);
        searchParams.set("page", "1");
        setSearchParams(searchParams);
      }}
      onPageChange={(page) => {
        searchParams.set("page", page.toString());
        setSearchParams(searchParams);
      }}
      currentPage={currentPage}
      totalPages={loaderData.totalPages}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
        {loaderData.trails.map((trail: any) => (
          <TrailCard key={trail.id} {...trail} />
        ))}
      </div>
    </ContentLayout>
  );
}
