import { Form, Link, redirect, useNavigation } from "react-router";

import AuthButtons from "../components/auto-buttons";
import { Button } from "~/common/components/ui/button";
import InputPair from "~/common/components/input-pair";
import { LoaderCircle } from "lucide-react";
import type { Route } from "~/types";
import { makeSSRClient } from "~/supa-client";
import { z } from "zod";

export function loader({ request }: Route.LoaderArgs) {
  return {};
}

const formSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
    })
    .email("Invalid email address"),
  password: z
    .string({
      required_error: "Password is required",
      invalid_type_error: "Password must be a string",
    })
    .min(8, "Password must be at least 8 characters long"),
});

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const { success, data, error } = formSchema.safeParse(
    Object.fromEntries(formData)
  );
  if (!success) {
    return {
      formErrors: error.flatten().fieldErrors,
    };
  }
  const { email, password } = data;
  const { client, headers } = makeSSRClient(request);
  const { data: authData, error: authError } =
    await client.auth.signInWithPassword({
      email,
      password,
    });
  if (authError) {
    return { loginError: authError.message };
  }
  return redirect("/", { headers });
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
              className="w-full"
              type="submit"
              disabled={isSubmitting}
              aria-disabled={isSubmitting}
            >
              {isSubmitting ? (
                <LoaderCircle className="animate-spin" />
              ) : (
                "Log in"
              )}
            </Button>
            {actionData && "loginError" in actionData && (
              <p className="text-sm text-red-500">{actionData?.loginError}</p>
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
