import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/common/components/ui/avatar";
import { Card, CardContent, CardHeader } from "~/common/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "~/common/components/ui/tabs";

import { Button } from "~/common/components/ui/button";
import { Input } from "~/common/components/ui/input";
import { Link } from "react-router";
import { LogOutIcon } from "lucide-react";
import { MyContent } from "~/features/users/components/my-content";
import type { Route } from "~/types";
import { Separator } from "~/common/components/ui/separator";
import { Textarea } from "~/common/components/ui/textarea";
import { makeSSRClient } from "~/supa-client";

interface User {
  id: string;
  username: string;
  email: string;
  bio?: string;
  profileImageUrl?: string;
  followersCount: number;
  followingCount: number;
  postsCount: number;
  trailsCount: number;
  viewpointsCount: number;
}

interface Viewpoint {
  id: string;
  title: string;
  description: string;
  locationName: string;
  latitude: number;
  longitude: number;
  thumbnailPhotoUrl?: string;
  createdAt: Date;
  createdBy: {
    id: string;
    username: string;
    profileImageUrl?: string;
  };
}

interface Trail {
  id: string;
  title: string;
  description: string;
  startLocation: string;
  endLocation: string;
  distance: number;
  elevationGain: number;
  estimatedTime: number;
  difficulty: string;
  season: string;
  thumbnailPhotoUrl: string;
  createdAt: Date;
  createdBy: {
    id: string;
    username: string;
    profileImageUrl?: string;
  };
}

interface Post {
  id: string;
  title: string;
  content: string;
  thumbnailPhotoUrl?: string;
  createdAt: Date;
  createdBy: {
    id: string;
    username: string;
    profileImageUrl?: string;
  };
}

interface Comment {
  id: string;
  content: string;
  createdAt: Date;
  post: {
    id: string;
    title: string;
  };
  createdBy: {
    id: string;
    username: string;
    profileImageUrl?: string;
  };
}

export function loader({ request }: Route.LoaderArgs) {
  const { client, headers } = makeSSRClient(request);
  return {
    user: {
      id: "1",
      username: "john_doe",
      email: "john@example.com",
      bio: "Mountain enthusiast and photographer",
      profileImageUrl: "https://github.com/haneulee.png",
      followersCount: 1234,
      followingCount: 567,
      postsCount: 89,
      trailsCount: 12,
      viewpointsCount: 34,
    } as User,
    viewpoints: [
      {
        id: "1",
        title: "Mount Everest Base Camp",
        description: "The most famous viewpoint in the world",
        locationName: "Nepal",
        latitude: 27.9881,
        longitude: 86.925,
        thumbnailPhotoUrl: "https://github.com/haneulee.png",
        createdAt: new Date(),
        createdBy: {
          id: "1",
          username: "john_doe",
          profileImageUrl: "https://github.com/haneulee.png",
        },
      },
    ] as Viewpoint[],
    trails: [
      {
        id: "1",
        title: "Everest Base Camp Trek",
        description: "The classic trek to Everest Base Camp",
        startLocation: "Lukla",
        endLocation: "Everest Base Camp",
        distance: 130,
        elevationGain: 2800,
        estimatedTime: 12,
        difficulty: "hard",
        season: "spring",
        thumbnailPhotoUrl: "https://github.com/haneulee.png",
        createdAt: new Date(),
        createdBy: {
          id: "1",
          username: "john_doe",
          profileImageUrl: "https://github.com/haneulee.png",
        },
      },
    ] as Trail[],
    posts: [
      {
        id: "1",
        title: "My Journey to Everest Base Camp",
        content:
          "An unforgettable experience trekking to the base of the world's highest mountain...",
        thumbnailPhotoUrl: "https://github.com/haneulee.png",
        createdAt: new Date(),
        createdBy: {
          id: "1",
          username: "john_doe",
          profileImageUrl: "https://github.com/haneulee.png",
        },
      },
    ] as Post[],
    comments: [
      {
        id: "1",
        content: "Great post! I've been there last year and it was amazing.",
        createdAt: new Date(),
        post: {
          id: "1",
          title: "Everest Base Camp Experience",
        },
        createdBy: {
          id: "1",
          username: "john_doe",
          profileImageUrl: "https://github.com/haneulee.png",
        },
      },
    ] as Comment[],
  };
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
  const { user, viewpoints, trails, posts, comments } = loaderData;

  return (
    <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8 mb-8">
          <div className="flex-shrink-0">
            <Avatar className="size-24 sm:size-32">
              <AvatarImage src={user.profileImageUrl} />
              <AvatarFallback className="text-2xl">
                {user.username[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="flex-grow text-center sm:text-left">
            <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold mb-2">
                  {user.username}
                </h1>
                <p className="text-muted-foreground mb-4">{user.bio}</p>
                <div className="flex flex-wrap justify-center sm:justify-start gap-4 sm:gap-6">
                  <div>
                    <div className="font-medium">{user.followersCount}</div>
                    <div className="text-sm text-muted-foreground">
                      Followers
                    </div>
                  </div>
                  <div>
                    <div className="font-medium">{user.followingCount}</div>
                    <div className="text-sm text-muted-foreground">
                      Following
                    </div>
                  </div>
                  <div>
                    <div className="font-medium">{user.postsCount}</div>
                    <div className="text-sm text-muted-foreground">Posts</div>
                  </div>
                  <div>
                    <div className="font-medium">{user.trailsCount}</div>
                    <div className="text-sm text-muted-foreground">Trails</div>
                  </div>
                  <div>
                    <div className="font-medium">{user.viewpointsCount}</div>
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
                    <label
                      htmlFor="profileImage"
                      className="text-sm font-medium"
                    >
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
          </TabsContent>

          <TabsContent value="change-password">
            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold">Change Password</h2>
              </CardHeader>
              <CardContent>
                <form className="space-y-4 sm:space-y-6">
                  <div className="space-y-2">
                    <label
                      htmlFor="currentPassword"
                      className="text-sm font-medium"
                    >
                      Current Password
                    </label>
                    <Input
                      id="currentPassword"
                      name="currentPassword"
                      type="password"
                      required
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="newPassword"
                      className="text-sm font-medium"
                    >
                      New Password
                    </label>
                    <Input
                      id="newPassword"
                      name="newPassword"
                      type="password"
                      required
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="confirmPassword"
                      className="text-sm font-medium"
                    >
                      Confirm New Password
                    </label>
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      required
                      className="w-full"
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    Change Password
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold">Notification Settings</h2>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h3 className="font-medium">Email Notifications</h3>
                      <p className="text-sm text-muted-foreground">
                        Receive email notifications for new followers and
                        comments
                      </p>
                    </div>
                    <Button variant="outline" className="w-full sm:w-auto">
                      Enable
                    </Button>
                  </div>
                  <Separator />
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h3 className="font-medium">Push Notifications</h3>
                      <p className="text-sm text-muted-foreground">
                        Receive push notifications for new messages and mentions
                      </p>
                    </div>
                    <Button variant="outline" className="w-full sm:w-auto">
                      Enable
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
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
