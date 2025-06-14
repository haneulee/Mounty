import { Form, Link, useNavigation } from "react-router";

import AuthButtons from "../components/auto-buttons";
import { Button } from "~/common/components/ui/button";
import InputPair from "~/common/components/input-pair";
import { LoaderCircle } from "lucide-react";
import type { Route } from "~/types";

export function loader({ request }: Route.LoaderArgs) {
  return {};
}

export async function action({ request }: Route.ActionArgs) {
  await new Promise((resolve) => setTimeout(resolve, 4000));
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  return {
    message: "Error wrong password",
  };
}

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Login - Mounty" },
    { name: "description", content: "Login to your account" },
  ];
};

export default function LoginPage({ actionData }: Route.ComponentProps) {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-full max-w-md p-4 sm:p-6 lg:p-8">
        <Button
          variant={"ghost"}
          asChild
          className="absolute right-4 sm:right-8 top-4 sm:top-8"
        >
          <Link to="/auth/join">Join</Link>
        </Button>
        <div className="flex items-center flex-col justify-center w-full gap-4 sm:gap-6 lg:gap-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-center">
            Log in
          </h1>
          <Form className="w-full space-y-3 sm:space-y-4" method="post">
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
            <Button className="w-full" type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <LoaderCircle className="animate-spin" />
              ) : (
                "Log in"
              )}
            </Button>
            {actionData?.message && (
              <p className="text-sm text-red-500">{actionData.message}</p>
            )}
          </Form>
          <div className="w-full">
            <AuthButtons />
          </div>
        </div>
      </div>
    </div>
  );
}
