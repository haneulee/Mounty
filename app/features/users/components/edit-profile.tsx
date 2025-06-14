import { Card, CardContent, CardHeader } from "~/common/components/ui/card";

import { Button } from "~/common/components/ui/button";
import { Input } from "~/common/components/ui/input";
import { Textarea } from "~/common/components/ui/textarea";

interface EditProfileProps {
  user: {
    username: string;
    email: string;
    bio?: string;
  };
}

export function EditProfile({ user }: EditProfileProps) {
  return (
    <Card>
      <CardHeader>
        <h2 className="text-xl font-semibold">Edit Profile</h2>
      </CardHeader>
      <CardContent>
        <form className="space-y-4 sm:space-y-6">
          <div className="space-y-2">
            <label htmlFor="username" className="text-sm font-medium">
              Username
            </label>
            <Input
              id="username"
              name="username"
              defaultValue={user.username}
              required
              className="w-full"
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
              defaultValue={user.email}
              required
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="bio" className="text-sm font-medium">
              Bio
            </label>
            <Textarea
              id="bio"
              name="bio"
              defaultValue={user.bio}
              placeholder="Tell us about yourself"
              className="w-full min-h-[100px]"
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
              className="w-full"
            />
          </div>

          <Button type="submit" className="w-full">
            Save Changes
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
