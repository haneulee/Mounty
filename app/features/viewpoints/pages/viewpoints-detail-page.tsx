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
import { MapPinIcon, StarIcon } from "lucide-react";

import { Button } from "~/common/components/ui/button";
import { Link } from "react-router";
import { RelatedTrailCard } from "../components/related-trail-card";
import type { Route } from "./+types/viewpoints-detail-page";
import { Star } from "lucide-react";
import { ViewpointAuthorCard } from "../components/viewpoint-author-card";
import { ViewpointPosts } from "../components/viewpoint-posts";
import { useState } from "react";

interface Viewpoint {
  id: string;
  title: string;
  description: string;
  locationName: string;
  latitude: number;
  longitude: number;
  photos: {
    id: string;
    url: string;
    description?: string;
  }[];
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
  posts: {
    id: string;
    title: string;
    body: string;
    visitedDate: Date;
    weatherDescription: string;
    createdAt: Date;
    createdBy: {
      id: string;
      username: string;
      profileImageUrl?: string;
    };
  }[];
  relatedTrails: {
    id: string;
    title: string;
    description: string;
    distance: number;
    elevationGain: number;
    estimatedTime: number;
    difficulty: string;
    thumbnailPhotoUrl: string;
    rating: number;
    ratingCount: number;
  }[];
}

export function loader({ request, params }: Route.LoaderArgs) {
  // TODO: 실제 데이터베이스에서 뷰포인트 데이터를 가져오도록 수정
  return {
    viewpoint: {
      id: params.viewpointId,
      title: "Mount Everest Base Camp",
      description:
        "The Everest Base Camp is one of the most iconic viewpoints in the world. Located at an altitude of 5,364 meters, it offers breathtaking views of the world's highest mountain. The journey to reach this point is challenging but absolutely worth it for the spectacular scenery and the sense of achievement.",
      locationName: "Nepal",
      latitude: 27.9881,
      longitude: 86.925,
      photos: [
        {
          id: "1",
          url: "https://github.com/haneulee.png",
          description: "View of Mount Everest from Base Camp",
        },
        {
          id: "2",
          url: "https://github.com/haneulee.png",
          description: "Khumbu Icefall",
        },
        {
          id: "3",
          url: "https://github.com/haneulee.png",
          description: "Base Camp at sunset",
        },
      ],
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
      posts: [
        {
          id: "1",
          title: "My Journey to Everest Base Camp",
          body: "It was an amazing experience...",
          visitedDate: new Date(),
          weatherDescription: "Sunny",
          createdAt: new Date(),
          createdBy: {
            id: "1",
            username: "john_doe",
            profileImageUrl: "https://github.com/haneulee.png",
          },
        },
        {
          id: "2",
          title: "Breathtaking Views at Base Camp",
          body: "The sunrise was spectacular...",
          visitedDate: new Date(),
          weatherDescription: "Clear",
          createdAt: new Date(),
          createdBy: {
            id: "2",
            username: "mountain_lover",
            profileImageUrl: "https://github.com/haneulee.png",
          },
        },
      ],
      relatedTrails: [
        {
          id: "1",
          title: "Everest Base Camp Trek",
          description: "The classic trek to Everest Base Camp...",
          distance: 130,
          elevationGain: 2800,
          estimatedTime: 12,
          difficulty: "hard",
          thumbnailPhotoUrl: "https://github.com/haneulee.png",
          rating: 4.9,
          ratingCount: 2345,
        },
        {
          id: "2",
          title: "Gokyo Lakes Trek",
          description: "A beautiful alternative route...",
          distance: 110,
          elevationGain: 2500,
          estimatedTime: 10,
          difficulty: "hard",
          thumbnailPhotoUrl: "https://github.com/haneulee.png",
          rating: 4.7,
          ratingCount: 1234,
        },
      ],
    } as Viewpoint,
  };
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
    Viewpoint["photos"][0] | null
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
              <p className="text-muted-foreground text-lg">
                {viewpoint.description}
              </p>
            </div>

            {/* 이미지 갤러리 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {viewpoint.photos.map((photo) => (
                <div
                  key={photo.id}
                  className="aspect-video bg-muted rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                  onClick={() => setSelectedPhoto(photo)}
                >
                  <img
                    src={photo.url}
                    alt={photo.description}
                    className="w-full h-full object-cover"
                  />
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
                    {viewpoint.locationName}
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
                      ({viewpoint.ratingCount} reviews)
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 구글 맵 */}
            <div className="border-t pt-8">
              <h2 className="text-2xl font-semibold mb-4">Location</h2>
              <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                <iframe
                  src={`https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=${viewpoint.latitude},${viewpoint.longitude}`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

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
              <ViewpointPosts
                posts={viewpoint.posts}
                viewpoint={{
                  id: viewpoint.id,
                  title: viewpoint.title,
                  locationName: viewpoint.locationName,
                }}
              />
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
                    <p className="text-sm text-muted-foreground">
                      {new Date(viewpoint.createdAt).toLocaleDateString()}
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

          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold">Popular Tags</h2>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {["mountain", "lake", "forest", "sunset", "sunrise"].map(
                  (tag) => (
                    <Link
                      key={tag}
                      to={`/viewpoints?tag=${tag}`}
                      className="text-sm text-muted-foreground hover:text-primary"
                    >
                      #{tag}
                    </Link>
                  )
                )}
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
              alt={selectedPhoto?.description}
              className="w-full h-full object-contain"
            />
          </div>
        </DialogContent>
      </Dialog>
    </main>
  );
}
