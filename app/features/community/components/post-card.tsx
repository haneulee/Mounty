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
import { Link } from "react-router";
import { formatDistanceToNow } from "date-fns";

interface PostCardProps {
  post: {
    id: string;
    title: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    viewpoint: string;
    author: string;
    username: string;
    upvotes: number;
  };
}

export function PostCard({ post }: PostCardProps) {
  const { id, title, content, createdAt, viewpoint, username, upvotes } = post;
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="p-3 sm:p-4 space-y-2">
        <div className="flex items-center gap-2">
          <Avatar className="size-6 sm:size-8">
            {/* <AvatarImage src={createdBy.profileImageUrl} /> */}
            <AvatarFallback>{username}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-xs sm:text-sm font-medium truncate">
              {username}
            </p>
            <p className="text-xs text-muted-foreground truncate">
              {formatDistanceToNow(createdAt, { addSuffix: true })}
            </p>
          </div>
        </div>
        <Link to={`/posts/${id}`} className="block">
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
      <CardFooter className="p-3 sm:p-4 pt-0 flex flex-wrap gap-2">
        <Badge variant="secondary" className="text-xs">
          {/* {weatherDescription} */}
        </Badge>
        <Badge variant="outline" className="text-xs">
          {viewpoint}
        </Badge>
      </CardFooter>
    </Card>
  );
}
