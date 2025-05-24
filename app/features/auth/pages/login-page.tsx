import { Form, Link } from "react-router";

import { Button } from "~/common/components/ui/button";
import InputPair from "~/common/components/input-pair";
import type { Route } from "~/types";

export function loader({ request }: Route.LoaderArgs) {
  return {};
}

export function action({ request }: Route.ActionArgs) {
  return {};
}

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Login - Mounty" },
    { name: "description", content: "Login to your account" },
  ];
};

export default function LoginPage({ loaderData }: Route.ComponentProps) {
  return (
    <div className="flex flex-col relative items-center justify-center h-full">
      <Button variant={"ghost"} asChild className="absolute right-8 top-8 ">
        <Link to="/auth/join">Join</Link>
      </Button>
      <div className="flex items-center flex-col justify-center w-full max-w-md gap-10">
        <h1 className="text-4xl font-semibold">Log in</h1>
        <Form className="w-full space-y-4">
          <InputPair
            label="Email"
            name="email"
            id="email"
            required
            type="email"
            placeholder="test@example.com"
          />
          <InputPair
            id="password"
            label="Password"
            name="password"
            required
            type="password"
            placeholder="****"
          />
          <Button className="w-full" type="submit">
            Log in
          </Button>
        </Form>
      </div>
    </div>
  );
}
