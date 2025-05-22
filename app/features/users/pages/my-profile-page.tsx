import { Button } from "~/common/components/ui/button";
import { Input } from "~/common/components/ui/input";
import type { Route } from "~/types";
import { Textarea } from "~/common/components/ui/textarea";

interface User {
  id: string;
  username: string;
  email: string;
  bio?: string;
  profileImageUrl?: string;
}

export function loader({ request }: Route.LoaderArgs) {
  return {
    user: {
      id: "1",
      username: "john_doe",
      email: "john@example.com",
      bio: "Mountain enthusiast and photographer",
      profileImageUrl: "https://github.com/haneulee.png",
    } as User,
  };
}

export function action({ request }: Route.ActionArgs) {
  return {};
}

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Edit Profile - Mounty" },
    { name: "description", content: "Edit your profile information" },
  ];
};

export default function MyProfilePage({ loaderData }: Route.ComponentProps) {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Edit Profile</h1>
      <form className="max-w-2xl space-y-6">
        <div className="space-y-2">
          <label htmlFor="username" className="text-sm font-medium">
            Username
          </label>
          <Input
            id="username"
            name="username"
            defaultValue={loaderData.user.username}
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            defaultValue={loaderData.user.email}
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="bio" className="text-sm font-medium">
            Bio
          </label>
          <Textarea
            id="bio"
            name="bio"
            defaultValue={loaderData.user.bio}
            placeholder="Tell us about yourself"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="profileImage" className="text-sm font-medium">
            Profile Image
          </label>
          <Input
            id="profileImage"
            name="profileImage"
            type="file"
            accept="image/*"
          />
          {loaderData.user.profileImageUrl && (
            <img
              src={loaderData.user.profileImageUrl}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover mt-2"
            />
          )}
        </div>

        <Button type="submit" className="w-full">
          Save Changes
        </Button>
      </form>
    </main>
  );
}
