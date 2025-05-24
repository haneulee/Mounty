import { ContentLayout } from "~/common/components/layout/content-layout";
import { PostCard } from "../components/post-card";
import type { Route } from "./+types/community-page";
import { useSearchParams } from "react-router";

interface FilterOption {
  label: string;
  value: string;
}

const SORT_OPTIONS: FilterOption[] = [
  { label: "Latest", value: "newest" },
  { label: "Trending", value: "popular" },
  { label: "Top Rated", value: "rating" },
];

const PERIOD_OPTIONS: FilterOption[] = [
  { label: "All Time", value: "all" },
  { label: "This Week", value: "week" },
  { label: "This Month", value: "month" },
  { label: "This Year", value: "year" },
];

export const meta: Route.MetaFunction = () => {
  return [{ title: "Community | Mounty" }];
};

export default function CommunityPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const sorting = searchParams.get("sorting") || "newest";
  const period = searchParams.get("period") || "all";
  const search = searchParams.get("search") || "";

  const sidebarFilters = [
    {
      title: "Categories",
      type: "link" as const,
      options: [
        { label: "Viewpoint Reviews", value: "viewpoint-reviews" },
        { label: "Hiking Tips", value: "hiking-tips" },
        { label: "Gear Reviews", value: "gear-reviews" },
        { label: "Weather Updates", value: "weather-updates" },
        { label: "Trail Stories", value: "trail-stories" },
      ],
    },
  ];

  return (
    <ContentLayout
      title="Community"
      subtitle="Share your hiking adventures with fellow mountaineers"
      searchPlaceholder="Search stories, tips, and reviews..."
      addButtonText="Share Story"
      addButtonLink="/posts/new"
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
      <div className="space-y-4">
        {Array.from({ length: 11 }).map((_, index) => (
          <PostCard
            key={`postId-${index}`}
            id={`postId-${index}`}
            title="Unforgettable Sunrise at Bukhansan Peak"
            body="Started our hike at 4 AM and reached the summit just in time for sunrise. The winter snow made the view even more magical. A moment I'll never forget!"
            visitedDate={new Date()}
            weatherDescription="Clear"
            createdAt={new Date()}
            createdBy={{
              id: "1",
              username: "MountainExplorer",
              profileImageUrl: "https://github.com/apple.png",
            }}
            viewpoint={{
              id: "1",
              title: "Bukhansan Summit",
              locationName: "Bukhansan National Park",
            }}
          />
        ))}
      </div>
    </ContentLayout>
  );
}
