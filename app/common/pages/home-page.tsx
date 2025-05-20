import { Button } from "~/common/components/ui/button";
import type { Route } from "~/types";

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
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Welcome to Our App</h1>
      <p className="text-lg mb-8">
        Get started by exploring our features or sign in to your account.
      </p>
      <div className="flex gap-4">
        <Button variant="default">Get Started</Button>
        <Button variant="outline">Learn More</Button>
      </div>
    </main>
  );
}
