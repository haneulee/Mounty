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
import { ClockIcon, MapPinIcon, MountainIcon } from "lucide-react";

import { Link } from "react-router";
import { formatDistanceToNow } from "date-fns";

interface TrailCardProps {
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

export function TrailCard({
  id,
  title,
  description,
  startLocation,
  endLocation,
  distance,
  elevationGain,
  estimatedTime,
  difficulty,
  season,
  thumbnailPhotoUrl,
  createdAt,
  createdBy,
}: TrailCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow relative aspect-[3/4]">
      <Link to={`/trails/${id}`} className="block h-full">
        <div className="absolute inset-0">
          <img
            src={thumbnailPhotoUrl}
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        </div>
        <div className="relative h-full flex flex-col justify-end p-4">
          <div className="space-y-2">
            <h3 className="font-semibold text-lg text-white line-clamp-1">
              {title}
            </h3>
            <p className="text-sm text-white/80 line-clamp-2">{description}</p>
          </div>
          <div className="mt-3 space-y-2">
            <div className="flex items-center gap-2 text-sm text-white/80">
              <MapPinIcon className="size-4" />
              <span className="line-clamp-1">
                {startLocation} → {endLocation}
              </span>
            </div>
            <div className="flex items-center gap-3 text-sm text-white/80">
              <div className="flex items-center gap-1">
                <MountainIcon className="size-4" />
                <span>{distance}km</span>
              </div>
              <div className="flex items-center gap-1">
                <ClockIcon className="size-4" />
                <span>{estimatedTime}일</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="capitalize">{season}</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Avatar className="size-6 border-2 border-white">
                  <AvatarImage src={createdBy.profileImageUrl} />
                  <AvatarFallback className="bg-white/20 text-white">
                    {createdBy.username[0].toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm text-white/80 line-clamp-1">
                  {createdBy.username}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-white/80">
                <ClockIcon className="size-4" />
                <span>
                  {formatDistanceToNow(createdAt, { addSuffix: true })}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </Card>
  );
}
