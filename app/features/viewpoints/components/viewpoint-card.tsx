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
import { formatDistanceToNow, parseISO } from "date-fns";

import { Badge } from "~/common/components/ui/badge";
import type { Database } from "~/supa-client";
import { Link } from "react-router";

export type Viewpoint =
  Database["public"]["Views"]["viewpoints_list_view"]["Row"] & {
    photos: { url: string; description: string | null }[] | null;
    profile_photos: { url: string; description: string | null }[] | null;
  };

export interface ViewpointCardProps extends Viewpoint {}

export function ViewpointCard({ ...viewpoint }: ViewpointCardProps) {
  const {
    id,
    title,
    description,
    latitude,
    longitude,
    created_at,
    username,
    photos,
    profile_photos,
  } = viewpoint;
  const formattedDate = created_at
    ? formatDistanceToNow(parseISO(created_at), {
        addSuffix: true,
      })
    : "Unknown date";

  return (
    <Card className="relative h-full flex flex-col overflow-hidden">
      <img
        src={photos?.[0]?.url || undefined}
        alt={title || ""}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <Link to={`/viewpoints/${id}`} className="block h-full">
        <div className="h-full">
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="relative h-full flex flex-col justify-end p-3 sm:p-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Avatar className="size-6 sm:size-8 border-2 border-white">
                  <AvatarImage src={profile_photos?.[0]?.url || undefined} />
                  <AvatarFallback className="bg-white/20 text-white">
                    {(username || "U")[0].toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-xs sm:text-sm font-medium text-white truncate">
                    {username || "Unknown User"}
                  </p>
                  <p className="text-xs text-white/80 truncate">
                    {formattedDate}
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
                {/* {locationName} */}
              </Badge>
            </div>
          </div>
        </div>
      </Link>
    </Card>
  );
}
