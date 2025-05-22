import { Button } from "~/common/components/ui/button";
import type { Route } from "~/types";

export function loader({ request }: Route.LoaderArgs) {
  return {};
}

export function action({ request }: Route.ActionArgs) {
  return {};
}

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Logout - Mounty" },
    { name: "description", content: "Logout from your account" },
  ];
};

export default function LogoutPage({ loaderData }: Route.ComponentProps) {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">Logout</h1>
        <p className="text-muted-foreground mb-8">
          Are you sure you want to logout?
        </p>
        <form className="space-y-4">
          <Button type="submit" variant="destructive" className="w-full">
            Logout
          </Button>
          <Button type="button" variant="outline" className="w-full">
            Cancel
          </Button>
        </form>
      </div>
    </main>
  );
}
