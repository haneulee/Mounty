import type { MetaFunction as RouterMetaFunction } from "react-router";

export namespace Route {
  export type LoaderArgs = {
    request: Request;
    params: {
      postId: string;
    };
  };

  export type ActionArgs = {
    request: Request;
  };

  export type MetaFunction = RouterMetaFunction;

  export type ComponentProps = {
    loaderData: {
      post: {
        post_id: string;
        title: string;
        content: string;
        photos: { id: string; url: string; description: string | null }[];
        created_at: string;
        profile_id: string;
        username: string;
        profile_photos: { url: string; description: string | null }[];
        followers_count: number;
        following_count: number;
        upvote_count: number;
        comments_count: number;
        trail?: {
          trail_id: string;
          title: string;
          description: string;
          start_location: string;
          end_location: string;
          distance: number;
          elevation_gain: number;
          estimated_time: number;
          difficulty: string;
          season: string;
          thumbnail_photo_url: string;
        };
        viewpoint?: {
          id: string;
          title: string;
          location_name: string;
          latitude: number;
          longitude: number;
          photos: { id: string; url: string; description: string | null }[];
        };
        replies: {
          id: string;
          content: string;
          created_at: string;
          updated_at: string;
          parent_id: string | null;
          created_by: string;
          created_by_username: string;
          created_by_photos: { url: string; description: string | null }[];
          likes_count: number;
          children: {
            id: string;
            content: string;
            created_at: string;
            updated_at: string;
            parent_id: string | null;
            created_by: string;
            created_by_username: string;
            created_by_photos: { url: string; description: string | null }[];
            likes_count: number;
            children: any[];
          }[];
        }[];
      };
    };
  };
}
