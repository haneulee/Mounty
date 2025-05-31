import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/common/components/ui/avatar";
import { Card, CardContent, CardHeader } from "~/common/components/ui/card";

import { Link } from "react-router";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";

interface ViewpointPostsProps {
  posts: any[];
}

export function ViewpointPosts({ posts }: ViewpointPostsProps) {
  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <Card key={post.post_id}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={post.profile_photos?.[0]?.url}
                    alt={post.username}
                  />
                  <AvatarFallback>
                    {post.username[0].toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{post.username}</p>
                  <p className="text-sm text-muted-foreground">
                    {formatDistanceToNow(new Date(post.created_at), {
                      addSuffix: true,
                      locale: ko,
                    })}
                  </p>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Link
              to={`/community/${post.post_id}`}
              className="text-lg font-semibold hover:underline"
            >
              {post.title}
            </Link>
            <p className="text-muted-foreground mt-2">{post.content}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
