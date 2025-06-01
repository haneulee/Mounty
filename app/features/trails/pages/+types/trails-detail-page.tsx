import type { MetaFunction as RouterMetaFunction } from "react-router";

export namespace Route {
  export type LoaderArgs = {
    request: Request;
    params: {
      trailId: string;
    };
  };

  export type ActionArgs = {
    request: Request;
  };

  export type MetaFunction = RouterMetaFunction;

  export type ComponentProps = {
    loaderData: {
      trail: {
        id: string;
        title: string;
        description: string;
        start_location: string;
        end_location: string;
        distance: number;
        elevation_gain: number;
        estimated_time: number;
        difficulty: "easy" | "moderate" | "hard" | "expert";
        season: string;
        photos: { id: string; url: string; description: string | null }[];
        gpx: string;
        created_at: string;
        created_by: string;
        rating: number;
        rating_count: number;
        posts_count: number;
        viewpoints: {
          id: string;
          title: string;
          location_name: string;
          latitude: number;
          longitude: number;
          photos: { id: string; url: string; description: string | null }[];
          rating: number;
          rating_count: number;
          created_at: string;
          username: string;
          profile_photos: { url: string; description: string | null }[];
        }[];
        createdBy: {
          id: string;
          username: string;
          profileImageUrl?: string;
          bio?: string;
          followersCount: number;
          followingCount: number;
        };
      };
    };
  };
}
