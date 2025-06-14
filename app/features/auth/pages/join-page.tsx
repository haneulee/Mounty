import { Form, Link, redirect } from "react-router";

import AuthButtons from "../components/auto-buttons";
import { Button } from "~/common/components/ui/button";
import InputPair from "~/common/components/input-pair";
import type { Route } from "~/types";
import { checkUsernameExists } from "../queries";
import { makeSSRClient } from "~/supa-client";
import { z } from "zod";

export function loader({ request }: Route.LoaderArgs) {
  return {};
}

const formSchema = z.object({
  name: z.string().min(3, "Name is required"),
  username: z.string().min(3, "Username is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const { success, data, error } = formSchema.safeParse(
    Object.fromEntries(formData)
  );
  if (!success) {
    return { formErrors: error.flatten().fieldErrors };
  }
  const usernameExists = await checkUsernameExists(request, {
    username: data.username,
  });
  if (usernameExists) {
    return { formErrors: { username: ["Username already exists"] } };
  }
  const { client, headers } = makeSSRClient(request);
  const { error: authError } = await client.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      data: {
        name: data.name,
        username: data.username,
      },
    },
  });
  if (authError) {
    return { authError: authError.message };
  }
  return redirect("/", { headers });
}

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Join - Mounty" },
    { name: "description", content: "Create your account" },
  ];
};

export default function JoinPage({ actionData }: Route.ComponentProps) {
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
          <Form className="w-full space-y-3 sm:space-y-4" method="post">
            <InputPair
              label="Name"
              name="name"
              id="name"
              required
              type="text"
              placeholder="John Doe"
            />
            {actionData && "formErrors" in actionData && (
              <p className="text-sm text-red-500">
                {actionData?.formErrors?.name?.join(", ")}
              </p>
            )}
            <InputPair
              label="Username"
              name="username"
              id="username"
              required
              type="text"
              placeholder="john_doe"
            />
            {actionData && "formErrors" in actionData && (
              <p className="text-sm text-red-500">
                {actionData?.formErrors?.username?.join(", ")}
              </p>
            )}
            <InputPair
              label="Email"
              name="email"
              id="email"
              required
              type="email"
              placeholder="test@example.com"
            />
            {actionData && "formErrors" in actionData && (
              <p className="text-sm text-red-500">
                {actionData?.formErrors?.email?.join(", ")}
              </p>
            )}
            <InputPair
              id="password"
              label="Password"
              name="password"
              required
              type="password"
              placeholder="****"
            />
            {actionData && "formErrors" in actionData && (
              <p className="text-sm text-red-500">
                {actionData?.formErrors?.password?.join(", ")}
              </p>
            )}
            <Button
              className="w-full h-9 sm:h-10 lg:h-11 text-sm sm:text-base"
              type="submit"
            >
              Create account
            </Button>
            {actionData && "authError" in actionData && (
              <p className="text-sm text-red-500">{actionData?.authError}</p>
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
