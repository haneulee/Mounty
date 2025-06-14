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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "~/common/components/ui/dialog";

import { Button } from "~/common/components/ui/button";
import { Link } from "react-router";
import type { Route } from "./+types/trails-detail-page";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";
import { makeSSRClient } from "~/supa-client";
import { useGetTrailDetail } from "../queries";
import { useState } from "react";

export async function loader({ request, params }: Route.LoaderArgs) {
  const { client, headers } = makeSSRClient(request);
  const trail = await useGetTrailDetail(client, {
    trailId: params.trailId,
  });

  return { trail };
}

export function action({ request }: Route.ActionArgs) {
  return {};
}

export const meta: Route.MetaFunction = () => {
  return [{ title: "Trail | Mounty" }];
};

export default function TrailDetailPage({ loaderData }: Route.ComponentProps) {
  const { trail } = loaderData;
  const [selectedPhoto, setSelectedPhoto] = useState<
    (typeof trail.photos)[0] | null
  >(null);

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
                    {trail.start_location} → {trail.end_location}
                  </span>
                </div>
                <span>·</span>
                <div className="flex items-center gap-2">
                  <StarIcon className="size-4" />
                  <span>
                    {trail.rating.toFixed(1)} ({trail.rating_count} ratings)
                  </span>
                </div>
                <span>·</span>
                <span>{trail.posts_count} posts</span>
                <span>·</span>
                <span>
                  {formatDistanceToNow(new Date(trail.created_at), {
                    addSuffix: true,
                    locale: ko,
                  })}
                </span>
              </div>
            </div>

            {/* 이미지 갤러리 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {trail.photos?.map((photo) => (
                <div
                  key={photo.id}
                  className="cursor-pointer"
                  onClick={() => setSelectedPhoto(photo)}
                >
                  <img
                    src={photo.url}
                    alt={photo.description || ""}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              ))}
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
                  <p className="text-2xl font-bold">{trail.elevation_gain} m</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2 mb-2">
                    <ClockIcon className="size-4" />
                    <span className="font-medium">Estimated Time</span>
                  </div>
                  <p className="text-2xl font-bold">
                    {trail.estimated_time} days
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
                        {viewpoint.location_name}
                      </p>
                      <div className="flex items-center gap-2 mb-4">
                        <StarIcon className="size-4 text-yellow-400" />
                        <span className="font-medium">
                          {viewpoint.rating.toFixed(1)}
                        </span>
                        <span className="text-muted-foreground">
                          ({viewpoint.rating_count} reviews)
                        </span>
                      </div>
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
            <CardHeader>
              <h2 className="text-lg font-semibold">Author</h2>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage
                      src={trail.createdBy.profileImageUrl}
                      alt={trail.createdBy.username}
                    />
                    <AvatarFallback>
                      {trail.createdBy.username[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-lg">
                      {trail.createdBy.username}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {trail.createdBy.bio}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <div>
                    <span className="font-semibold">
                      {trail.createdBy.followersCount}
                    </span>
                    <span className="text-muted-foreground"> followers</span>
                  </div>
                  <div>
                    <span className="font-semibold">
                      {trail.createdBy.followingCount}
                    </span>
                    <span className="text-muted-foreground"> following</span>
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  Follow
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* 이미지 모달 */}
      <Dialog
        open={!!selectedPhoto}
        onOpenChange={() => setSelectedPhoto(null)}
      >
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>{selectedPhoto?.description}</span>
            </DialogTitle>
          </DialogHeader>
          <div className="relative aspect-video">
            <img
              src={selectedPhoto?.url}
              alt={selectedPhoto?.description || ""}
              className="w-full h-full object-contain"
            />
          </div>
        </DialogContent>
      </Dialog>
    </main>
  );
}
