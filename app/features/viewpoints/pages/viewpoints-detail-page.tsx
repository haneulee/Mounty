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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "~/common/components/ui/dialog";

import { Button } from "~/common/components/ui/button";
import { Link } from "react-router";
import { RelatedTrailCard } from "../components/related-trail-card";
import type { Route } from "./+types/viewpoints-detail-page";
import { Star } from "lucide-react";
import { ViewpointPosts } from "../components/viewpoint-posts";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";
import { makeSSRClient } from "~/supa-client";
import { useGetViewpointDetail } from "../queries";
import { useState } from "react";

declare global {
  interface Window {
    ENV: {
      GOOGLE_MAPS_API_KEY: string;
    };
  }
}

const GOOGLE_MAPS_API_KEY =
  typeof window !== "undefined" ? window.ENV?.GOOGLE_MAPS_API_KEY : null;

export async function loader({ request, params }: Route.LoaderArgs) {
  const { client, headers } = makeSSRClient(request);
  const viewpoint = await useGetViewpointDetail(client, {
    viewpointId: params.viewpointId,
  });

  return { viewpoint };
}

export function action({ request }: Route.ActionArgs) {
  return {};
}

export const meta: Route.MetaFunction = () => {
  return [{ title: "Viewpoint | Mounty" }];
};

export default function ViewpointDetailPage({
  loaderData,
}: Route.ComponentProps) {
  const { viewpoint } = loaderData;
  const [selectedPhoto, setSelectedPhoto] = useState<
    (typeof viewpoint.photos)[0] | null
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
              <Link to="/viewpoints">Viewpoints</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to={`/viewpoints/${viewpoint.id}`}>{viewpoint.title}</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-grow">
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                {viewpoint.title}
              </h1>
              <p className="text-sm text-muted-foreground">
                {formatDistanceToNow(new Date(viewpoint.created_at), {
                  addSuffix: true,
                  locale: ko,
                })}
              </p>
              <p className="text-muted-foreground text-lg mt-4">
                {viewpoint.description}
              </p>
            </div>

            {/* 이미지 갤러리 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {viewpoint.photos?.map((photo) => (
                <div key={photo.id}>
                  <img src={photo.url} alt={photo.description || ""} />
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold">Location</h3>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    {viewpoint.location_name}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold">Coordinates</h3>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    {viewpoint.latitude}, {viewpoint.longitude}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold">Rating</h3>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-yellow-400" />
                    <span className="font-semibold">{viewpoint.rating}</span>
                    <span className="text-muted-foreground">
                      ({viewpoint.rating_count} reviews)
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 구글 맵 */}
            {GOOGLE_MAPS_API_KEY && (
              <div className="border-t pt-8">
                <h2 className="text-2xl font-semibold mb-4">Location</h2>
                <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                  <iframe
                    src={`https://www.google.com/maps/embed/v1/place?key=${GOOGLE_MAPS_API_KEY}&q=${viewpoint.latitude},${viewpoint.longitude}&zoom=15`}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
                <div className="mt-4 flex justify-end">
                  <Button variant="outline" asChild>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${viewpoint.latitude},${viewpoint.longitude}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Google Maps에서 보기
                    </a>
                  </Button>
                </div>
              </div>
            )}

            <div>
              <h2 className="text-2xl font-semibold mb-4">Related Trails</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {viewpoint.relatedTrails.map((trail) => (
                  <RelatedTrailCard key={trail.id} {...trail} />
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">Posts</h2>
              <ViewpointPosts posts={viewpoint.posts} />
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
                      src={viewpoint.createdBy.profileImageUrl}
                      alt={viewpoint.createdBy.username}
                    />
                    <AvatarFallback>
                      {viewpoint.createdBy.username[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-lg">
                      {viewpoint.createdBy.username}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  {viewpoint.createdBy.bio}
                </p>
                <div className="flex items-center gap-4 text-sm">
                  <div>
                    <span className="font-semibold">
                      {viewpoint.createdBy.followersCount}
                    </span>
                    <span className="text-muted-foreground"> followers</span>
                  </div>
                  <div>
                    <span className="font-semibold">
                      {viewpoint.createdBy.followingCount}
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
