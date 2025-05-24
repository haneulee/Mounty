import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/common/components/ui/avatar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "~/common/components/ui/breadcrumb";
import { Card, CardContent, CardHeader } from "~/common/components/ui/card";
import { ClockIcon, MapPinIcon, MountainIcon, StarIcon } from "lucide-react";

import { Button } from "~/common/components/ui/button";
import { Link } from "react-router";
import type { Route } from "./+types/trails-detail-page";
import { formatDistanceToNow } from "date-fns";

interface Trail {
  id: string;
  title: string;
  description: string;
  startLocation: string;
  endLocation: string;
  distance: number;
  elevationGain: number;
  estimatedTime: number;
  difficulty: "easy" | "moderate" | "hard" | "expert";
  thumbnailPhotoUrl: string;
  createdAt: Date;
  createdBy: {
    id: string;
    username: string;
    profileImageUrl?: string;
    bio?: string;
    followersCount: number;
    followingCount: number;
  };
  rating: number;
  ratingCount: number;
  postsCount: number;
  viewpoints: {
    id: string;
    title: string;
    locationName: string;
  }[];
}

export function loader({ request, params }: Route.LoaderArgs) {
  // TODO: 실제 데이터베이스에서 트레일 데이터를 가져오도록 수정
  return {
    trail: {
      id: params.trailId,
      title: "Everest Base Camp Trek",
      description:
        "The Everest Base Camp Trek is one of the most popular trekking routes in Nepal. This challenging yet rewarding trail takes you through beautiful Sherpa villages, Buddhist monasteries, and stunning mountain landscapes. The journey culminates at the base camp of the world's highest mountain, offering breathtaking views of the Khumbu Icefall and surrounding peaks.",
      startLocation: "Lukla, Nepal",
      endLocation: "Everest Base Camp, Nepal",
      distance: 130, // km
      elevationGain: 2800, // meters
      estimatedTime: 12, // days
      difficulty: "hard",
      thumbnailPhotoUrl: "https://github.com/haneulee.png",
      createdAt: new Date(),
      createdBy: {
        id: "1",
        username: "john_doe",
        profileImageUrl: "https://github.com/haneulee.png",
        bio: "Adventure seeker and nature lover. Always looking for the next great view.",
        followersCount: 1234,
        followingCount: 567,
      },
      rating: 4.8,
      ratingCount: 1234,
      postsCount: 567,
      viewpoints: [
        {
          id: "1",
          title: "Namche Bazaar",
          locationName: "Namche Bazaar, Nepal",
        },
        {
          id: "2",
          title: "Kala Patthar",
          locationName: "Kala Patthar, Nepal",
        },
        {
          id: "3",
          title: "Everest Base Camp",
          locationName: "Everest Base Camp, Nepal",
        },
      ],
    } as Trail,
  };
}

export function action({ request }: Route.ActionArgs) {
  return {};
}

export const meta: Route.MetaFunction = () => {
  return [{ title: "Trail | Mounty" }];
};

export default function TrailDetailPage({ loaderData }: Route.ComponentProps) {
  const { trail } = loaderData;

  return (
    <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/trails">Trails</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to={`/trails/${trail.id}`}>{trail.title}</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-grow">
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                {trail.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <MapPinIcon className="size-4" />
                  <span>
                    {trail.startLocation} → {trail.endLocation}
                  </span>
                </div>
                <span>·</span>
                <div className="flex items-center gap-2">
                  <StarIcon className="size-4" />
                  <span>
                    {trail.rating.toFixed(1)} ({trail.ratingCount} ratings)
                  </span>
                </div>
                <span>·</span>
                <span>{trail.postsCount} posts</span>
              </div>
            </div>

            <div className="aspect-video bg-muted rounded-lg overflow-hidden">
              <img
                src={trail.thumbnailPhotoUrl}
                alt={trail.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p>{trail.description}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2 mb-2">
                    <MountainIcon className="size-4" />
                    <span className="font-medium">Distance</span>
                  </div>
                  <p className="text-2xl font-bold">{trail.distance} km</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2 mb-2">
                    <MountainIcon className="size-4" />
                    <span className="font-medium">Elevation Gain</span>
                  </div>
                  <p className="text-2xl font-bold">{trail.elevationGain} m</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2 mb-2">
                    <ClockIcon className="size-4" />
                    <span className="font-medium">Estimated Time</span>
                  </div>
                  <p className="text-2xl font-bold">
                    {trail.estimatedTime} days
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="border-t pt-8">
              <h2 className="text-2xl font-semibold mb-4">Viewpoints</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {trail.viewpoints.map((viewpoint) => (
                  <Card key={viewpoint.id}>
                    <CardContent className="pt-6">
                      <h3 className="font-semibold mb-2">{viewpoint.title}</h3>
                      <p className="text-muted-foreground mb-4">
                        {viewpoint.locationName}
                      </p>
                      <Button variant="link" asChild>
                        <Link to={`/viewpoints/${viewpoint.id}`}>
                          View details &rarr;
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-80 space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <Avatar className="size-16">
                <AvatarImage src={trail.createdBy.profileImageUrl} />
                <AvatarFallback>
                  {trail.createdBy.username[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold">{trail.createdBy.username}</h3>
                <p className="text-sm text-muted-foreground">
                  {trail.createdBy.bio}
                </p>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 mb-4">
                <div>
                  <div className="font-medium">
                    {trail.createdBy.followersCount}
                  </div>
                  <div className="text-sm text-muted-foreground">Followers</div>
                </div>
                <div>
                  <div className="font-medium">
                    {trail.createdBy.followingCount}
                  </div>
                  <div className="text-sm text-muted-foreground">Following</div>
                </div>
              </div>
              <Button className="w-full">Follow</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
