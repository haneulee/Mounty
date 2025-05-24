import { Marquee } from "~/common/components/ui/marquee";
import { TrailCard } from "./trail-card";

interface TrailMarqueeProps {
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
}

export function TrailMarquee({
  className,
  reverse,
  pauseOnHover,
}: TrailMarqueeProps) {
  return (
    <Marquee
      className={className}
      reverse={reverse}
      pauseOnHover={pauseOnHover}
      repeat={2}
    >
      {Array.from({ length: 10 }).map((_, index) => (
        <TrailCard
          key={`trailId-${index}`}
          id={`trailId-${index}`}
          title="Trail Name"
          description="Trail Description"
          startLocation="Start Location"
          endLocation="End Location"
          distance={10}
          elevationGain={100}
          estimatedTime={10}
          difficulty="Easy"
          season="Spring"
          thumbnailPhotoUrl="https://via.placeholder.com/150"
          createdAt={new Date()}
          createdBy={{
            id: "1",
            username: "Trail User",
          }}
        />
      ))}
    </Marquee>
  );
}
