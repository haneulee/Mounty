import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/common/components/ui/avatar";
import { Card, CardContent } from "~/common/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "~/common/components/ui/tabs";

import { TrailCard } from "~/features/trails/components/trail-card";
import { ViewpointCard } from "~/features/viewpoints/components/viewpoint-card";
import { formatDistanceToNow } from "date-fns";

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

interface MyContentProps {
  viewpoints: Viewpoint[];
  trails: Trail[];
  posts: Post[];
  comments: Comment[];
}

export function MyContent({
  viewpoints,
  trails,
  posts,
  comments,
}: MyContentProps) {
  return (
    <div className="mt-6 sm:mt-8">
      <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">
        My Content
      </h2>

      <Tabs
        defaultValue="viewpoints"
        className="space-y-4 sm:space-y-6 lg:space-y-8"
      >
        <TabsList className="w-full sm:w-auto">
          <TabsTrigger value="viewpoints" className="flex-1 sm:flex-none">
            Viewpoints
          </TabsTrigger>
          <TabsTrigger value="trails" className="flex-1 sm:flex-none">
            Trails
          </TabsTrigger>
          <TabsTrigger value="posts" className="flex-1 sm:flex-none">
            Posts
          </TabsTrigger>
          <TabsTrigger value="comments" className="flex-1 sm:flex-none">
            Comments
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
                      <Avatar className="size-6">
                        <AvatarImage src={post.createdBy.profileImageUrl} />
                        <AvatarFallback>
                          {post.createdBy.username[0].toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
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

        <TabsContent value="comments">
          <div className="space-y-4">
            {comments.map((comment: Comment) => (
              <Card key={comment.id}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <Avatar className="size-8 sm:size-10">
                      <AvatarImage src={comment.createdBy.profileImageUrl} />
                      <AvatarFallback>
                        {comment.createdBy.username[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-grow min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="font-medium truncate">
                          {comment.createdBy.username}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {formatDistanceToNow(comment.createdAt, {
                            addSuffix: true,
                          })}
                        </span>
                      </div>
                      <p className="text-muted-foreground mb-2 line-clamp-2 sm:line-clamp-none">
                        {comment.content}
                      </p>
                      <div className="text-sm">
                        <span className="text-muted-foreground">On post: </span>
                        <a
                          href={`/posts/${comment.post.id}`}
                          className="text-primary hover:underline truncate inline-block max-w-[200px] sm:max-w-none"
                        >
                          {comment.post.title}
                        </a>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
