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
        startLocation: string;
        endLocation: string;
        distance: number;
        elevationGain: number;
        estimatedTime: number;
        difficulty: "easy" | "moderate" | "hard" | "expert";
        thumbnailPhotoUrl: string;
        createdAt: Date;
        createdBy: {
          id: string;
          username: string;
          profileImageUrl?: string;
          bio?: string;
          followersCount: number;
          followingCount: number;
        };
        rating: number;
        ratingCount: number;
        postsCount: number;
        viewpoints: {
          id: string;
          title: string;
          locationName: string;
        }[];
      };
    };
  };
}
