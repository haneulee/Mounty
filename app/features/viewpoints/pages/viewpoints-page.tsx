import { ContentLayout } from "~/common/components/layout/content-layout";
import type { Route } from "~/types";
import { ViewpointCard } from "~/features/viewpoints/components/viewpoint-card";
import type { ViewpointCardProps } from "~/features/viewpoints/components/viewpoint-card";
import { useGetViewpoints } from "../queries";
import { useSearchParams } from "react-router";

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

export async function loader({ request }: Route.LoaderArgs) {
  const viewpoints = await useGetViewpoints();
  return { viewpoints };
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

  const sidebarFilters = [
    {
      title: "View Type",
      type: "link" as const,
      options: [
        { label: "Mountain", value: "mountain" },
        { label: "Ocean", value: "ocean" },
        { label: "City", value: "city" },
        { label: "Forest", value: "forest" },
        { label: "Desert", value: "desert" },
        { label: "Lake", value: "lake" },
      ],
    },
    {
      title: "Popular Tags",
      type: "tag" as const,
      options: [
        { label: "Panoramic", value: "panoramic" },
        { label: "Scenic", value: "scenic" },
        { label: "Photography", value: "photography" },
        { label: "Hiking", value: "hiking" },
        { label: "Nature", value: "nature" },
      ],
    },
  ];

  return (
    <ContentLayout
      title="Viewpoints"
      subtitle="Discover beautiful viewpoints around the world"
      searchPlaceholder="Search viewpoints..."
      addButtonText="Add Viewpoint"
      addButtonLink="/viewpoints/new"
      sortOptions={SORT_OPTIONS}
      periodOptions={PERIOD_OPTIONS}
      sidebarFilters={sidebarFilters}
      currentSort={sorting}
      currentPeriod={period}
      searchValue={search}
      onSearch={(value) => {
        searchParams.set("search", value);
        setSearchParams(searchParams);
      }}
      onSort={(value) => {
        searchParams.set("sorting", value);
        setSearchParams(searchParams);
      }}
      onPeriodChange={(value) => {
        searchParams.set("period", value);
        setSearchParams(searchParams);
      }}
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
