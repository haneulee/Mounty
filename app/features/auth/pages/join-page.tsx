import { Form, Link } from "react-router";

import AuthButtons from "../components/auto-buttons";
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
    { title: "Join - Mounty" },
    { name: "description", content: "Create your account" },
  ];
};

export default function JoinPage({ loaderData }: Route.ComponentProps) {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-full max-w-md p-4 sm:p-6 lg:p-8">
        <Button
          variant={"ghost"}
          asChild
          className="absolute right-4 sm:right-8 top-4 sm:top-8"
        >
          <Link to="/auth/login">Login</Link>
        </Button>
        <div className="flex items-center flex-col justify-center w-full gap-4 sm:gap-6 lg:gap-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-center">
            Create an account
          </h1>
          <Form className="w-full space-y-3 sm:space-y-4">
            <InputPair
              label="Name"
              name="name"
              id="name"
              required
              type="text"
              placeholder="John Doe"
            />
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
            <Button
              className="w-full h-9 sm:h-10 lg:h-11 text-sm sm:text-base"
              type="submit"
            >
              Create account
            </Button>
          </Form>
          <div className="w-full">
            <AuthButtons />
          </div>
        </div>
      </div>
    </div>
  );
}
