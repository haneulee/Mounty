import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/common/components/ui/avatar";
import { Card, CardContent, CardHeader } from "~/common/components/ui/card";

import { Button } from "~/common/components/ui/button";

interface ViewpointAuthorCardProps {
  author: {
    id: string;
    username: string;
    profileImageUrl?: string;
    bio?: string;
    followersCount: number;
    followingCount: number;
  };
}

export function ViewpointAuthorCard({ author }: ViewpointAuthorCardProps) {
  return (
    <div className="sticky top-24">
      <Card>
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar className="size-16">
            <AvatarImage src={author.profileImageUrl} />
            <AvatarFallback>{author.username[0].toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold">{author.username}</h3>
            <p className="text-sm text-muted-foreground">{author.bio}</p>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-4">
            <div>
              <div className="font-medium">{author.followersCount}</div>
              <div className="text-sm text-muted-foreground">Followers</div>
            </div>
            <div>
              <div className="font-medium">{author.followingCount}</div>
              <div className="text-sm text-muted-foreground">Following</div>
            </div>
          </div>
          <Button className="w-full">Follow</Button>
        </CardContent>
      </Card>
    </div>
  );
}
