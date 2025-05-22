import type { Route } from "~/types";

interface Trail {
  id: string;
  title: string;
  description: string;
  lengthKm: number;
  durationMinutes: number;
  difficulty: string;
  season: string;
  createdAt: Date;
  createdBy: {
    id: string;
    username: string;
    profileImageUrl?: string;
  };
  viewpoint: {
    id: string;
    title: string;
    locationName: string;
  };
}

export function loader({ request }: Route.LoaderArgs) {
  return {
    trails: [
      {
        id: "1",
        title: "Everest Base Camp Trek",
        description: "The classic trek to Everest Base Camp",
        lengthKm: 130,
        durationMinutes: 14400,
        difficulty: "hard",
        season: "spring",
        createdAt: new Date(),
        createdBy: {
          id: "1",
          username: "john_doe",
          profileImageUrl: "https://github.com/haneulee.png",
        },
        viewpoint: {
          id: "1",
          title: "Mount Everest Base Camp",
          locationName: "Nepal",
        },
      },
    ] as Trail[],
  };
}

export function action({ request }: Route.ActionArgs) {
  return {};
}

export const meta: Route.MetaFunction = () => {
  return [
    { title: "My Trails - Mounty" },
    { name: "description", content: "View and manage your trails" },
  ];
};

export default function MyTrailsPage({ loaderData }: Route.ComponentProps) {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">My Trails</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loaderData.trails.map((trail: Trail) => (
          <div key={trail.id} className="p-4 border rounded-lg">
            <h2 className="text-xl font-semibold">{trail.title}</h2>
            <p className="text-muted-foreground mt-2">{trail.description}</p>
            <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
              <span>{trail.lengthKm}km</span>
              <span>·</span>
              <span>{Math.floor(trail.durationMinutes / 60)}h</span>
              <span>·</span>
              <span className="capitalize">{trail.difficulty}</span>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
