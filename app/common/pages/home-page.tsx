import { Button } from "~/common/components/ui/button";
import { Link } from "react-router";
import { PostCard } from "~/features/community/components/post-card";
import type { Route } from "~/types";
import { TrailMarquee } from "~/features/trails/components/trail-marquee";
import { ViewpointCard } from "~/features/viewpoints/components/viewpoint-card";

export function loader({ request }: Route.LoaderArgs) {
  return {
    title: "홈",
    description: "Mounty에 오신 것을 환영합니다",
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
  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 sm:space-y-12">
      <section>
        <div className="space-y-4 sm:space-y-6 lg:space-y-8">
          <div className="space-y-2 sm:space-y-4">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight">
              Today's Viewpoint
            </h2>
            <p className="text-base sm:text-lg lg:text-xl font-light text-foreground">
              The best Viewpoint made by our community today.
            </p>
            <Button variant="link" asChild className="text-base sm:text-lg p-0">
              <Link to="/viewpoints">Explore all viewpoints &rarr;</Link>
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2 sm:gap-4 lg:gap-6">
            {Array.from({ length: 10 }).map((_, index) => (
              <ViewpointCard
                key={`viewpointId-${index}`}
                id={`viewpointId-${index}`}
                title="Viewpoint Name"
                description="Viewpoint Description"
                locationName="Viewpoint Location"
                latitude={12}
                longitude={12}
                thumbnailPhotoUrl="https://via.placeholder.com/150"
                createdAt={new Date()}
                createdBy={{
                  id: "1",
                  username: "Viewpoint User",
                }}
              />
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
              The most popular trails in our community.
            </p>
            <Button variant="link" asChild className="text-base sm:text-lg p-0">
              <Link to="/trails">Explore all trails &rarr;</Link>
            </Button>
          </div>
          <TrailMarquee pauseOnHover reverse />
        </div>
      </section>

      <section>
        <div className="space-y-4 sm:space-y-6 lg:space-y-8">
          <div className="space-y-2 sm:space-y-4">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight">
              Latest Posts
            </h2>
            <p className="text-base sm:text-lg lg:text-xl font-light text-foreground">
              The latest posts from our community.
            </p>
            <Button variant="link" asChild className="text-base sm:text-lg p-0">
              <Link to="/community">Explore all posts &rarr;</Link>
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2 sm:gap-4 lg:gap-6">
            {Array.from({ length: 11 }).map((_, index) => (
              <PostCard
                key={`postId-${index}`}
                id={`postId-${index}`}
                title="What is the best viewpoint?"
                body="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
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
                  title: "What is the best viewpoint?",
                  locationName: "Viewpoint",
                }}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
