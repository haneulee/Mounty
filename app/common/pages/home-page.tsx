import { Button } from "~/common/components/ui/button";
import { Link } from "react-router";
import type { Post } from "~/features/community/components/post-card";
import { PostCard } from "~/features/community/components/post-card";
import type { Route } from "~/types";
import { TrailMarquee } from "~/features/trails/components/trail-marquee";
import type { Viewpoint } from "~/features/viewpoints/components/viewpoint-card";
import { ViewpointCard } from "~/features/viewpoints/components/viewpoint-card";
import { makeSSRClient } from "~/supa-client";
import { useGetPosts } from "~/features/community/queries";
import { useGetTrails } from "~/features/trails/queries";
import { useGetViewpoints } from "~/features/viewpoints/queries";

export async function loader({ request }: Route.LoaderArgs) {
  const { client, headers } = makeSSRClient(request);
  const [viewpoints, trails, posts] = await Promise.all([
    useGetViewpoints(client, { page: 1, pageSize: 10, sortBy: "popular" }),
    useGetTrails(client, { page: 1, pageSize: 10, sortBy: "popular" }),
    useGetPosts(client, { page: 1, pageSize: 10, sortBy: "newest" }),
  ]);

  return {
    title: "홈",
    description: "Mounty에 오신 것을 환영합니다",
    viewpoints: viewpoints.data as Viewpoint[],
    trails: trails.data,
    posts: posts.data as Post[],
  };
}

export function action({ request }: Route.ActionArgs) {
  return {};
}

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Mounty - 홈" },
    { name: "description", content: "Mounty에 오신 것을 환영합니다" },
  ];
};

export default function HomePage({ loaderData }: Route.ComponentProps) {
  const { viewpoints, trails, posts } = loaderData;

  return (
    <div className="p-4 sm:p-6 lg:p-20 space-y-8 sm:space-y-12">
      <section>
        <div className="space-y-4 sm:space-y-6 lg:space-y-8">
          <div className="space-y-2 sm:space-y-4">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight">
              Featured Viewpoints
            </h2>
            <p className="text-base sm:text-lg lg:text-xl font-light text-foreground">
              Discover today's most breathtaking viewpoints
            </p>
            <Button variant="link" asChild className="text-base sm:text-lg p-0">
              <Link to="/viewpoints">Explore all viewpoints &rarr;</Link>
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2 sm:gap-4 lg:gap-6">
            {viewpoints.map((viewpoint: Viewpoint) => (
              <ViewpointCard key={viewpoint.id} {...viewpoint} />
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="space-y-4 sm:space-y-6 lg:space-y-8">
          <div className="space-y-2 sm:space-y-4">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight">
              Popular Trails
            </h2>
            <p className="text-base sm:text-lg lg:text-xl font-light text-foreground">
              Explore our most-loved hiking trails
            </p>
            <Button variant="link" asChild className="text-base sm:text-lg p-0">
              <Link to="/trails">View all trails &rarr;</Link>
            </Button>
          </div>
          <TrailMarquee trails={trails} pauseOnHover reverse />
        </div>
      </section>

      <section>
        <div className="space-y-4 sm:space-y-6 lg:space-y-8">
          <div className="space-y-2 sm:space-y-4">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight">
              Latest Stories
            </h2>
            <p className="text-base sm:text-lg lg:text-xl font-light text-foreground">
              Read inspiring stories from our community
            </p>
            <Button variant="link" asChild className="text-base sm:text-lg p-0">
              <Link to="/community">Read all stories &rarr;</Link>
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2 sm:gap-4 lg:gap-6">
            {posts.map((post: Post) => (
              <PostCard
                key={post.post_id}
                post={post}
                className="flex-col h-full"
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
