import { Button } from "~/common/components/ui/button";
import type { Route } from "~/types";
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
    <div className="px-20">
      <div className="grid grid-cols-3 gap-4">
        <div>
          <h2 className="text-5xl font-bold leading-tight tracking-tight">
            Today's Viewpoint
          </h2>
          <p className="text-xl font-light text-foreground">
            The best Viewpoint made by our community today.
          </p>
        </div>
        {Array.from({ length: 10 }).map((_, index) => (
          <ViewpointCard
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
  );
}
