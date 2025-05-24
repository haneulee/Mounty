import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/common/components/ui/select";

import { Button } from "~/common/components/ui/button";
import { Input } from "~/common/components/ui/input";
import type { Route } from "~/types";
import { Textarea } from "~/common/components/ui/textarea";

interface Viewpoint {
  id: string;
  title: string;
  locationName: string;
}

export function loader({ request }: Route.LoaderArgs) {
  return {
    viewpoints: [
      {
        id: "1",
        title: "Mount Everest Base Camp",
        locationName: "Nepal",
      },
    ],
  };
}

export function action({ request }: Route.ActionArgs) {
  return {};
}

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Create Post - Mounty" },
    { name: "description", content: "Create a new post" },
  ];
};

export default function CommunityCreatePage({
  loaderData,
}: Route.ComponentProps) {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Create Post</h1>
      <form className="max-w-2xl space-y-6">
        <div className="space-y-2">
          <label htmlFor="title" className="text-sm font-medium">
            Title
          </label>
          <Input id="title" name="title" required />
        </div>

        <div className="space-y-2">
          <label htmlFor="body" className="text-sm font-medium">
            Content
          </label>
          <Textarea id="body" name="body" required />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="visitedDate" className="text-sm font-medium">
              Visited Date
            </label>
            <Input id="visitedDate" name="visitedDate" type="date" required />
          </div>

          <div className="space-y-2">
            <label htmlFor="weatherDescription" className="text-sm font-medium">
              Weather
            </label>
            <Input
              id="weatherDescription"
              name="weatherDescription"
              placeholder="e.g. Sunny, Cloudy"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="viewpoint" className="text-sm font-medium">
            Viewpoint
          </label>
          <Select name="viewpointId" required>
            <SelectTrigger>
              <SelectValue placeholder="Select a viewpoint" />
            </SelectTrigger>
            <SelectContent>
              {loaderData.viewpoints.map((viewpoint: Viewpoint) => (
                <SelectItem key={viewpoint.id} value={viewpoint.id}>
                  {viewpoint.title} ({viewpoint.locationName})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button type="submit" className="w-full" asChild>
          <button>Create Post</button>
        </Button>
      </form>
    </main>
  );
}
