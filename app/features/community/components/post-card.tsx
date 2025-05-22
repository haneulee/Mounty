import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/common/components/ui/avatar";
import { CalendarIcon, CloudIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/common/components/ui/card";

import { Button } from "~/common/components/ui/button";
import { Link } from "react-router";
import { formatDistanceToNow } from "date-fns";

interface PostCardProps {
  id: string;
  title: string;
  body: string;
  visitedDate: Date;
  weatherDescription?: string;
  createdAt: Date;
  createdBy: {
    id: string;
    username: string;
    profileImageUrl?: string;
  };
  viewpoint: {
    id: string;
    title: string;
    locationName: string;
  };
}

export function PostCard({
  id,
  title,
  body,
  visitedDate,
  weatherDescription,
  createdAt,
  createdBy,
  viewpoint,
}: PostCardProps) {
  return (
    <Card className="bg-transparent hover:bg-card/50 transition-colors">
      <CardHeader className="flex flex-row items-start gap-4">
        <Avatar className="size-12">
          <AvatarImage src={createdBy.profileImageUrl} />
          <AvatarFallback>{createdBy.username[0].toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="space-y-1.5 flex-1">
          <CardTitle className="text-xl">{title}</CardTitle>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <CalendarIcon className="w-4 h-4" />
              <span>{visitedDate.toLocaleDateString()}</span>
            </div>
            {weatherDescription && (
              <div className="flex items-center gap-1">
                <CloudIcon className="w-4 h-4" />
                <span>{weatherDescription}</span>
              </div>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground line-clamp-3">{body}</p>
        <div className="mt-4">
          <Link
            to={`/viewpoints/${viewpoint.id}`}
            className="text-sm text-primary hover:underline"
          >
            {viewpoint.title} · {viewpoint.locationName}
          </Link>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>{createdBy.username}</span>
          <span>·</span>
          <span>{formatDistanceToNow(createdAt, { addSuffix: true })}</span>
        </div>
        <Button variant="link" asChild>
          <Link to={`/community/${id}`}>Read more &rarr;</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
