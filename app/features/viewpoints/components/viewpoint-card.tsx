import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/common/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/common/components/ui/card";
import { ClockIcon, MapPinIcon } from "lucide-react";

import { Link } from "react-router";
import { formatDistanceToNow } from "date-fns";

interface ViewpointCardProps {
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

export function ViewpointCard({
  id,
  title,
  description,
  locationName,
  latitude,
  longitude,
  thumbnailPhotoUrl,
  createdAt,
  createdBy,
}: ViewpointCardProps) {
  return (
    <Link to={`/viewpoints/${id}`}>
      <Card className="w-full overflow-hidden hover:bg-card/50 transition-colors relative aspect-[4/3]">
        {thumbnailPhotoUrl && (
          <div className="absolute inset-0">
            <img
              src={thumbnailPhotoUrl}
              alt={title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          </div>
        )}
        <div className="relative h-full flex flex-col justify-end p-6">
          <CardHeader className="p-0">
            <CardTitle className="text-2xl font-semibold leading-none tracking-tight text-white">
              {title}
            </CardTitle>
            <CardDescription className="text-white/80 line-clamp-2 mt-2">
              {description}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0 mt-4">
            <div className="flex items-center gap-2 text-sm text-white/80">
              <MapPinIcon className="w-4 h-4" />
              <span>{locationName}</span>
            </div>
          </CardContent>
          <CardFooter className="p-0 mt-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Avatar className="w-6 h-6 border-2 border-white">
                <AvatarImage src={createdBy.profileImageUrl} />
                <AvatarFallback className="bg-white/20 text-white">
                  {createdBy.username[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm text-white/80">
                {createdBy.username}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-white/80">
              <ClockIcon className="w-4 h-4" />
              <span>{formatDistanceToNow(createdAt, { addSuffix: true })}</span>
            </div>
          </CardFooter>
        </div>
      </Card>
    </Link>
  );
}
