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
    { name: "description", content: "Create a new account" },
  ];
};

export default function JoinPage({ loaderData }: Route.ComponentProps) {
  return (
    <div className="flex flex-col relative items-center justify-center h-full">
      <Button variant={"ghost"} asChild className="absolute right-8 top-8 ">
        <Link to="/auth/login">Login</Link>
      </Button>
      <div className="flex items-center flex-col justify-center w-full max-w-md gap-10">
        <h1 className="text-4xl font-semibold">Create an account</h1>
        <Form className="w-full space-y-4">
          <InputPair
            label="Name"
            name="name"
            id="name"
            required
            type="text"
            placeholder="Enter your name"
          />
          <InputPair
            id="username"
            label="Username"
            name="username"
            required
            type="text"
            placeholder="mounty"
          />
          <InputPair
            id="email"
            label="Email"
            name="email"
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
            placeholder="Enter your password"
          />
          <Button className="w-full" type="submit">
            Create account
          </Button>
        </Form>
        <AuthButtons />
      </div>
    </div>
  );
}
