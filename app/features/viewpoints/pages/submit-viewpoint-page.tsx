import { Button } from "~/common/components/ui/button";
import { Input } from "~/common/components/ui/input";
import type { Route } from "~/types";
import { Textarea } from "~/common/components/ui/textarea";

export function loader({ request }: Route.LoaderArgs) {
  return {};
}

export function action({ request }: Route.ActionArgs) {
  return {};
}

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Add Viewpoint - Mounty" },
    { name: "description", content: "Add a new viewpoint" },
  ];
};

export default function SubmitViewpointPage({
  loaderData,
}: Route.ComponentProps) {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Add Viewpoint</h1>
      <form className="max-w-2xl space-y-6">
        <div className="space-y-2">
          <label htmlFor="title" className="text-sm font-medium">
            Title
          </label>
          <Input id="title" name="title" required />
        </div>

        <div className="space-y-2">
          <label htmlFor="description" className="text-sm font-medium">
            Description
          </label>
          <Textarea id="description" name="description" required />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="locationName" className="text-sm font-medium">
              Location Name
            </label>
            <Input id="locationName" name="locationName" required />
          </div>

          <div className="space-y-2">
            <label htmlFor="category" className="text-sm font-medium">
              Category
            </label>
            <Input
              id="category"
              name="category"
              placeholder="e.g. Mountains, Beaches"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="latitude" className="text-sm font-medium">
              Latitude
            </label>
            <Input
              id="latitude"
              name="latitude"
              type="number"
              step="any"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="longitude" className="text-sm font-medium">
              Longitude
            </label>
            <Input
              id="longitude"
              name="longitude"
              type="number"
              step="any"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="thumbnailPhoto" className="text-sm font-medium">
            Thumbnail Photo
          </label>
          <Input
            id="thumbnailPhoto"
            name="thumbnailPhoto"
            type="file"
            accept="image/*"
            required
          />
        </div>

        <Button type="submit" className="w-full" asChild>
          <button>Add Viewpoint</button>
        </Button>
      </form>
    </main>
  );
}
