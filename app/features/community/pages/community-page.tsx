import { ContentLayout } from "~/common/components/layout/content-layout";
import { PostCard } from "../components/post-card";
import type { Route } from "./+types/community-page";
import { useGetCommunityPosts } from "../queries";
import { useSearchParams } from "react-router";

interface FilterOption {
  label: string;
  value: string;
}

const SORT_OPTIONS: FilterOption[] = [
  { label: "Latest", value: "newest" },
  { label: "Popular", value: "popular" },
  { label: "Most Comments", value: "comments" },
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

export const loader = async () => {
  const posts = await useGetCommunityPosts();
  return { posts };
};

export const clientLoader = async ({
  serverLoader,
}: Route.ClientLoaderArgs) => {
  //track analytics
};

export default function CommunityPage({ loaderData }: Route.ComponentProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sorting = searchParams.get("sorting") || "newest";
  const period = searchParams.get("period") || "all";
  const search = searchParams.get("search") || "";

  return (
    <ContentLayout
      title="Community"
      subtitle="Share your hiking experiences and stories"
      searchPlaceholder="Search posts..."
      addButtonText="Write Post"
      addButtonLink="/posts/new"
      sortOptions={SORT_OPTIONS}
      periodOptions={PERIOD_OPTIONS}
      sidebarFilters={[]}
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
        {loaderData.posts.map((post) => (
          <PostCard key={post.post_id} post={post} />
        ))}
      </div>
    </ContentLayout>
  );
}
