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
import { ClockIcon, MapPinIcon, StarIcon } from "lucide-react";

import { Badge } from "~/common/components/ui/badge";
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
  };
}

export function ViewpointCard({
  id,
  title,
  description,
  locationName,
  thumbnailPhotoUrl = "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070&auto=format&fit=crop",
  createdAt,
  createdBy,
}: ViewpointCardProps) {
  return (
    <Card className="relative h-full flex flex-col overflow-hidden">
      <img
        src={thumbnailPhotoUrl}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <Link to={`/viewpoints/${id}`} className="block h-full">
        <div className=" h-full">
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="relative h-full flex flex-col justify-end p-3 sm:p-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Avatar className="size-6 sm:size-8 border-2 border-white">
                  <AvatarImage
                    src={`https://github.com/${createdBy.username}.png`}
                  />
                  <AvatarFallback className="bg-white/20 text-white">
                    {createdBy.username[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-xs sm:text-sm font-medium text-white truncate">
                    {createdBy.username}
                  </p>
                  <p className="text-xs text-white/80 truncate">
                    {formatDistanceToNow(createdAt, { addSuffix: true })}
                  </p>
                </div>
              </div>
              <h3 className="text-sm sm:text-base font-semibold text-white line-clamp-2">
                {title}
              </h3>
              <p className="text-xs sm:text-sm text-white/80 line-clamp-2 sm:line-clamp-3">
                {description}
              </p>
              <Badge
                variant="secondary"
                className="text-xs bg-white/20 hover:bg-white/30 text-white border-0"
              >
                {locationName}
              </Badge>
            </div>
          </div>
        </div>
      </Link>
    </Card>
  );
}
