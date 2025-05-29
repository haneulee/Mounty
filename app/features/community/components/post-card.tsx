import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/common/components/ui/avatar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "~/common/components/ui/card";

import { Badge } from "~/common/components/ui/badge";
import { Button } from "~/common/components/ui/button";
import type { Database } from "~/supa-client";
import { Link } from "react-router";
import { ThumbsUp } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export type Post =
  Database["public"]["Views"]["community_post_list_view"]["Row"] & {
    profile_photos: { url: string; description: string | null }[] | null;
  };

export interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  if (!post) return null;

  const {
    post_id,
    title,
    content,
    created_at,
    username,
    profile_photos,
    viewpoint_title,
    upvote_count,
  } = post;

  return (
    <div className="flex gap-4">
      <Card className="flex-1 flex flex-col">
        <CardHeader className="p-3 sm:p-4 space-y-2">
          <div className="flex items-center gap-3 justify-between">
            <div className="flex items-center gap-2 min-w-0">
              <Avatar className="size-8">
                <AvatarImage src={profile_photos?.[0]?.url || undefined} />
                <AvatarFallback>{username?.[0]?.toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <span className="text-xs sm:text-sm font-medium truncate block">
                  {username}
                </span>
                <span className="text-xs text-muted-foreground truncate block">
                  {created_at
                    ? formatDistanceToNow(new Date(created_at), {
                        addSuffix: true,
                      })
                    : ""}
                </span>
              </div>
            </div>
            {viewpoint_title && (
              <Badge variant="outline" className="text-xs whitespace-nowrap">
                {viewpoint_title}
              </Badge>
            )}
          </div>
          <Link to={`/posts/${post_id}`} className="block mt-2">
            <h3 className="text-sm sm:text-base font-semibold line-clamp-2">
              {title}
            </h3>
          </Link>
        </CardHeader>
        <CardContent className="p-3 sm:p-4 flex-1">
          <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 sm:line-clamp-3">
            {content}
          </p>
        </CardContent>
      </Card>
      <div className="flex flex-col items-center justify-center gap-1 w-16">
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <ThumbsUp className="size-4" />
        </Button>
        <span className="text-sm font-medium">{upvote_count ?? 0}</span>
      </div>
    </div>
  );
}
