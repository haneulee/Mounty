import type { Route } from "~/types";
import { ViewpointCard } from "~/features/viewpoints/components/viewpoint-card";

interface Viewpoint {
  id: string;
  title: string;
  description: string;
  locationName: string;
  thumbnailPhotoUrl?: string;
  createdAt: Date;
  createdBy: {
    id: string;
    username: string;
    profileImageUrl?: string;
  };
}

export function loader({ request }: Route.LoaderArgs) {
  return {
    viewpoints: [
      {
        id: "1",
        title: "Mount Everest Base Camp",
        description: "The most famous viewpoint in the world",
        locationName: "Nepal",
        thumbnailPhotoUrl: "https://example.com/everest.jpg",
        createdAt: new Date(),
        createdBy: {
          id: "1",
          username: "john_doe",
          profileImageUrl: "https://github.com/haneulee.png",
        },
      },
    ] as Viewpoint[],
  };
}

export function action({ request }: Route.ActionArgs) {
  return {};
}

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Popular Viewpoints - Mounty" },
    { name: "description", content: "Most popular viewpoints" },
  ];
};

export default function ViewpointsPopularPage({
  loaderData,
}: Route.ComponentProps) {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Popular Viewpoints</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loaderData.viewpoints.map((viewpoint: Viewpoint) => (
          <ViewpointCard key={viewpoint.id} {...viewpoint} />
        ))}
      </div>
    </main>
  );
}
