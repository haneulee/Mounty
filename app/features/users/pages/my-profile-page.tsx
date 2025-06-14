import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/common/components/ui/avatar";
import { Link, redirect } from "react-router";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "~/common/components/ui/tabs";

import { Button } from "~/common/components/ui/button";
import { ChangePassword } from "../components/change-password";
import { EditProfile } from "../components/edit-profile";
import { LogOutIcon } from "lucide-react";
import { MyContent } from "~/features/users/components/my-content";
import { NotificationSettings } from "../components/notification-settings";
import type { Route } from "~/types";
import { getUserById } from "../queries";
import { makeSSRClient } from "~/supa-client";

export async function loader({ request }: Route.LoaderArgs) {
  const { client, headers } = makeSSRClient(request);
  const {
    data: { user },
  } = await client.auth.getUser();
  if (user) {
    const profile = await getUserById(client, { id: user.id });
    return {
      user,
      profile,
    };
  }
  return redirect("/auth/login");
}

export function action({ request }: Route.ActionArgs) {
  return {};
}

export const meta: Route.MetaFunction = () => {
  return [
    { title: "My Profile - Mounty" },
    { name: "description", content: "Manage your profile information" },
  ];
};

export default function MyProfilePage({ loaderData }: Route.ComponentProps) {
  const { user, profile, viewpoints, trails, posts, comments } = loaderData;

  return (
    <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8 mb-8">
          <div className="flex-shrink-0">
            <Avatar className="size-24 sm:size-32">
              <AvatarImage src={profile.photos?.[0] || ""} />
              <AvatarFallback className="text-2xl">
                {profile.username?.slice(0, 1).toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="flex-grow text-center sm:text-left">
            <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold mb-2">
                  {profile.name}
                </h1>
                <div className="flex flex-wrap justify-center sm:justify-start gap-4 sm:gap-6">
                  <div>
                    <div className="font-medium">{profile.followers_count}</div>
                    <div className="text-sm text-muted-foreground">
                      Followers
                    </div>
                  </div>
                  <div>
                    <div className="font-medium">{profile.following_count}</div>
                    <div className="text-sm text-muted-foreground">
                      Following
                    </div>
                  </div>
                  <div>
                    <div className="font-medium">{profile.posts_count}</div>
                    <div className="text-sm text-muted-foreground">Posts</div>
                  </div>
                  <div>
                    <div className="font-medium">{profile.trails_count}</div>
                    <div className="text-sm text-muted-foreground">Trails</div>
                  </div>
                  <div>
                    <div className="font-medium">
                      {profile.viewpoints_count}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Viewpoints
                    </div>
                  </div>
                </div>
              </div>
              <Button
                asChild
                variant="destructive"
                size="sm"
                className="w-full sm:w-auto"
              >
                <Link to="/auth/logout">
                  <LogOutIcon className="size-4 mr-2" />
                  Logout
                </Link>
              </Button>
            </div>
          </div>
        </div>

        <Tabs defaultValue="edit-profile" className="space-y-10">
          <TabsList className="w-full grid grid-cols-2 sm:grid-cols-4 lg:flex lg:flex-row gap-2 sm:gap-4 bg-transparent">
            <TabsTrigger
              value="edit-profile"
              className="text-sm sm:text-base whitespace-nowrap px-2 sm:px-4"
            >
              Edit Profile
            </TabsTrigger>
            <TabsTrigger
              value="change-password"
              className="text-sm sm:text-base whitespace-nowrap px-2 sm:px-4"
            >
              Change Password
            </TabsTrigger>
            <TabsTrigger
              value="notifications"
              className="text-sm sm:text-base whitespace-nowrap px-2 sm:px-4"
            >
              Notifications
            </TabsTrigger>
            <TabsTrigger
              value="my-content"
              className="text-sm sm:text-base whitespace-nowrap px-2 sm:px-4"
            >
              My Content
            </TabsTrigger>
          </TabsList>

          <TabsContent value="edit-profile">
            <EditProfile profile={profile} />
          </TabsContent>

          <TabsContent value="change-password">
            <ChangePassword />
          </TabsContent>

          <TabsContent value="notifications">
            <NotificationSettings />
          </TabsContent>

          <TabsContent value="my-content">
            <MyContent
              viewpoints={viewpoints}
              trails={trails}
              posts={posts}
              comments={comments}
            />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
