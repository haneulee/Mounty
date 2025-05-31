import { Card, CardContent } from "~/common/components/ui/card";

import { Button } from "~/common/components/ui/button";
import { Link } from "react-router";
import { StarIcon } from "lucide-react";

export function RelatedTrailCard({
  id,
  title,
  description,
  distance,
  elevation_gain,
  estimated_time,
  difficulty,
  photos,
  rating,
  rating_count,
}: any) {
  return (
    <Card className="overflow-hidden">
      <div className="aspect-video relative">
        <img
          src={photos?.[0] || ""}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-lg font-semibold text-white mb-1">{title}</h3>
          <div className="flex items-center gap-2 text-white/80 text-sm">
            <span>{distance} km</span>
            <span>·</span>
            <span>{elevation_gain} m</span>
            <span>·</span>
            <span>{estimated_time} days</span>
          </div>
        </div>
      </div>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1">
            <StarIcon className="size-4 text-yellow-500" />
            <span className="font-medium">{rating.toFixed(1)}</span>
            <span className="text-muted-foreground text-sm">
              ({rating_count})
            </span>
          </div>
          <span className="text-sm font-medium px-2 py-1 rounded-full bg-muted">
            {difficulty}
          </span>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {description}
        </p>
        <Button variant="link" className="p-0 h-auto mt-2" asChild>
          <Link to={`/trails/${id}`}>View trail details →</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
