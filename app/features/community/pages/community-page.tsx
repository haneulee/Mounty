import { ContentLayout } from "~/common/components/layout/content-layout";
import { PostCard } from "~/features/community/components/post-card";
import type { Route } from "~/types";
import { makeSSRClient } from "~/supa-client";
import { useGetPosts } from "../queries";
import { useSearchParams } from "react-router";
import { z } from "zod";

interface FilterOption {
  label: string;
  value: string;
}

const SORT_OPTIONS: FilterOption[] = [
  { label: "Newest", value: "newest" },
  { label: "Popular", value: "popular" },
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
  sorting: z.enum(["newest", "popular"]).optional(),
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
    data: posts,
    totalPages,
    currentPage,
  } = await useGetPosts(client, {
    page: parsedData.page || 1,
    sortBy: parsedData.sorting || "newest",
    period: parsedData.period || "all",
    search: parsedData.search,
  });

  return { posts, totalPages, currentPage };
}

export function action({ request }: Route.ActionArgs) {
  return {};
}

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Community - Mounty" },
    {
      name: "description",
      content: "Join our community of outdoor enthusiasts",
    },
  ];
};

export default function CommunityPage({ loaderData }: Route.ComponentProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sorting = searchParams.get("sorting") || "newest";
  const period = searchParams.get("period") || "all";
  const search = searchParams.get("search") || "";
  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  return (
    <ContentLayout
      title="Community"
      subtitle="Join our community of outdoor enthusiasts"
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
      <div className="grid grid-cols-1 gap-4">
        {loaderData.posts.map((post: any) => (
          <PostCard key={post.post_id} post={post} />
        ))}
      </div>
    </ContentLayout>
  );
}
