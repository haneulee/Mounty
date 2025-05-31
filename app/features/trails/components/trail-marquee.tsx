import type { Database } from "~/supa-client";
import { Marquee } from "~/common/components/ui/marquee";
import { TrailCard } from "./trail-card";

type Trail = Database["public"]["Views"]["trails_list_view"]["Row"];

interface TrailMarqueeProps {
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  trails?: Trail[];
}

export function TrailMarquee({
  className,
  reverse,
  pauseOnHover,
  trails,
}: TrailMarqueeProps) {
  return (
    <Marquee
      className={className}
      reverse={reverse}
      pauseOnHover={pauseOnHover}
      repeat={2}
    >
      {trails?.map((trail) => (
        <TrailCard
          key={trail.id}
          id={trail.id}
          title={trail.title}
          description={trail.description}
          start_location={trail.start_location}
          end_location={trail.end_location}
          distance={trail.distance}
          elevation_gain={trail.elevation_gain}
          estimated_time={trail.estimated_time}
          difficulty={trail.difficulty}
          season={trail.season}
          thumbnail_photo_url={trail.thumbnail_photo_url}
          created_at={new Date(trail.created_at)}
          created_by_id={trail.created_by_id}
          created_by_username={trail.created_by_username}
          created_by_photos={trail.created_by_photos}
        />
      ))}
    </Marquee>
  );
}
