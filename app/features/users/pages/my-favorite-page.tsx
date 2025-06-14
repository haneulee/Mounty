import { Card, CardContent } from "~/common/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "~/common/components/ui/tabs";

import type { Route } from "~/types";
import { TrailCard } from "~/features/trails/components/trail-card";
import { ViewpointCard } from "~/features/viewpoints/components/viewpoint-card";
import { makeSSRClient } from "~/supa-client";

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

export function loader({ request }: Route.LoaderArgs) {
  const { client, headers } = makeSSRClient(request);
  return {
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
      {
        id: "2",
        title: "Machu Picchu",
        description: "Ancient Incan citadel set high in the Andes Mountains",
        locationName: "Peru",
        latitude: -13.1631,
        longitude: -72.545,
        thumbnailPhotoUrl: "https://github.com/haneulee.png",
        createdAt: new Date(),
        createdBy: {
          id: "2",
          username: "mountain_lover",
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
  };
}

export function action({ request }: Route.ActionArgs) {
  return {};
}

export const meta: Route.MetaFunction = () => {
  return [
    { title: "My Favorites - Mounty" },
    { name: "description", content: "View your favorite content" },
  ];
};

export default function MyFavoritePage({ loaderData }: Route.ComponentProps) {
  const { viewpoints, trails, posts } = loaderData;

  return (
    <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 sm:mb-8 lg:mb-12">
        My Favorites
      </h1>

      <Tabs
        defaultValue="viewpoints"
        className="space-y-4 sm:space-y-6 lg:space-y-8"
      >
        <TabsList className="w-full sm:w-auto">
          <TabsTrigger value="viewpoints" className="flex-1 sm:flex-none">
            Viewpoints ({viewpoints.length})
          </TabsTrigger>
          <TabsTrigger value="trails" className="flex-1 sm:flex-none">
            Trails ({trails.length})
          </TabsTrigger>
          <TabsTrigger value="posts" className="flex-1 sm:flex-none">
            Posts ({posts.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="viewpoints">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {viewpoints.map((viewpoint: Viewpoint) => (
              <ViewpointCard key={viewpoint.id} {...viewpoint} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="trails">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {trails.map((trail: Trail) => (
              <TrailCard key={trail.id} {...trail} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="posts">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {posts.map((post: Post) => (
              <Card key={post.id} className="overflow-hidden h-full">
                <CardContent className="p-0 flex flex-col h-full">
                  {post.thumbnailPhotoUrl && (
                    <img
                      src={post.thumbnailPhotoUrl}
                      alt={post.title}
                      className="w-full aspect-video object-cover"
                    />
                  )}
                  <div className="p-4 flex-grow">
                    <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground line-clamp-3 text-sm sm:text-base">
                      {post.content}
                    </p>
                    <div className="flex items-center gap-2 mt-4">
                      <img
                        src={post.createdBy.profileImageUrl}
                        alt={post.createdBy.username}
                        className="w-6 h-6 rounded-full"
                      />
                      <span className="text-sm text-muted-foreground truncate">
                        {post.createdBy.username}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </main>
  );
}
