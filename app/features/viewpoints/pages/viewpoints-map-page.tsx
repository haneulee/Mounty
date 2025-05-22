import type { Route } from "~/types";

interface Viewpoint {
  id: string;
  title: string;
  locationName: string;
  latitude: number;
  longitude: number;
}

export function loader({ request }: Route.LoaderArgs) {
  return {
    viewpoints: [
      {
        id: "1",
        title: "Mount Everest Base Camp",
        locationName: "Nepal",
        latitude: 27.9881,
        longitude: 86.925,
      },
    ] as Viewpoint[],
  };
}

export function action({ request }: Route.ActionArgs) {
  return {};
}

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Viewpoints Map - Mounty" },
    { name: "description", content: "View viewpoints on a map" },
  ];
};

export default function ViewpointsMapPage({
  loaderData,
}: Route.ComponentProps) {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Viewpoints Map</h1>
      <div className="h-[600px] bg-muted rounded-lg">
        {/* Map component will be added here */}
      </div>
    </main>
  );
}
