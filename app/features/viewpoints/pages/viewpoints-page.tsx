import { ContentLayout } from "~/common/components/layout/content-layout";
import type { Route } from "~/types";
import { ViewpointCard } from "~/features/viewpoints/components/viewpoint-card";
import type { ViewpointCardProps } from "~/features/viewpoints/components/viewpoint-card";
import { makeSSRClient } from "~/supa-client";
import { useGetViewpoints } from "../queries";
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

const searchParamsSchema = z.object({
  page: z
    .string()
    .transform((val: string) => parseInt(val, 10))
    .optional(),
  sorting: z.enum(["newest", "popular", "rating"]).optional(),
  period: z.enum(["all", "week", "month", "year"]).optional(),
  search: z.string().optional(),
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
    data: viewpoints,
    totalPages,
    currentPage,
  } = await useGetViewpoints(client, {
    page: parsedData.page || 1,
    sortBy: parsedData.sorting || "newest",
    period: parsedData.period || "all",
    search: parsedData.search,
  });

  return { viewpoints, totalPages, currentPage };
}

export function action({ request }: Route.ActionArgs) {
  return {};
}

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Viewpoints - Mounty" },
    {
      name: "description",
      content: "Discover beautiful viewpoints around the world",
    },
  ];
};

export default function ViewpointsPage({ loaderData }: Route.ComponentProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sorting = searchParams.get("sorting") || "newest";
  const period = searchParams.get("period") || "all";
  const search = searchParams.get("search") || "";
  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  return (
    <ContentLayout
      title="Viewpoints"
      subtitle="Discover beautiful viewpoints around the world"
      searchPlaceholder="Search viewpoints..."
      addButtonText="Add Viewpoint"
      addButtonLink="/viewpoints/new"
      sortOptions={SORT_OPTIONS}
      periodOptions={PERIOD_OPTIONS}
      sidebarFilters={[]}
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
        {loaderData.viewpoints.map(
          (viewpoint: ViewpointCardProps, index: number) => (
            <ViewpointCard key={index} {...viewpoint} />
          )
        )}
      </div>
    </ContentLayout>
  );
}
