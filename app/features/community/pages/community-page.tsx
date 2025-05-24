import { ContentLayout } from "~/common/components/layout/content-layout";
import { PostCard } from "../components/post-card";
import type { Route } from "./+types/community-page";
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

export const meta: Route.MetaFunction = () => {
  return [{ title: "Posts | Mounty" }];
};

export default function CommunityPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const sorting = searchParams.get("sorting") || "newest";
  const period = searchParams.get("period") || "all";
  const search = searchParams.get("search") || "";

  const sidebarFilters = [
    {
      title: "Topics",
      type: "link" as const,
      options: [
        { label: "AI Tools", value: "ai-tools" },
        { label: "Design Tools", value: "design-tools" },
        { label: "Dev Tools", value: "dev-tools" },
        { label: "Note Taking Apps", value: "note-taking-apps" },
        { label: "Productivity Tools", value: "productivity-tools" },
      ],
    },
  ];

  return (
    <ContentLayout
      title="Posts"
      subtitle="Share your experiences and connect with others"
      searchPlaceholder="Search posts..."
      addButtonText="Add Post"
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
            title="What is the best place to go?"
            body="I think the best place to go is sdf sdfdsfdsf"
            visitedDate={new Date()}
            weatherDescription="Sunny"
            createdAt={new Date()}
            createdBy={{
              id: "1",
              username: "Nico",
              profileImageUrl: "https://github.com/apple.png",
            }}
            viewpoint={{
              id: "1",
              title: "Productivity",
              locationName: "Productivity",
            }}
          />
        ))}
      </div>
    </ContentLayout>
  );
}
