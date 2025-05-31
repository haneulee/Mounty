import type { MetaFunction as RouterMetaFunction } from "react-router";

export namespace Route {
  export type LoaderArgs = {
    request: Request;
    params: {
      viewpointId: string;
    };
  };

  export type ActionArgs = {
    request: Request;
  };

  export type MetaFunction = RouterMetaFunction;

  export type ComponentProps = {
    loaderData: {
      viewpoint: {
        id: string;
        title: string;
        description: string;
        location_name: string;
        latitude: number;
        longitude: number;
        photos: { id: string; url: string; description: string | null }[];
        created_at: string;
        created_by: string;
        rating: number;
        rating_count: number;
        posts_count: number;
        username: string;
        profile_photos: { url: string; description: string | null }[];
        posts: {
          post_id: string;
          title: string;
          content: string;
          created_at: string;
          username: string;
          profile_photos: { url: string; description: string | null }[];
        }[];
        relatedTrails: {
          id: string;
          title: string;
          description: string;
          distance: number;
          elevation_gain: number;
          estimated_time: number;
          difficulty: "easy" | "moderate" | "hard" | "expert";
          photos: { url: string; description: string | null }[];
          rating: number;
          rating_count: number;
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
