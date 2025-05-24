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
        locationName: string;
        latitude: number;
        longitude: number;
        photos: {
          id: string;
          url: string;
          description?: string;
        }[];
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
        posts: {
          id: string;
          title: string;
          body: string;
          visitedDate: Date;
          weatherDescription: string;
          createdAt: Date;
          createdBy: {
            id: string;
            username: string;
            profileImageUrl?: string;
          };
        }[];
        relatedTrails: {
          id: string;
          title: string;
          description: string;
          distance: number;
          elevationGain: number;
          estimatedTime: number;
          difficulty: "easy" | "moderate" | "hard" | "expert";
          thumbnailPhotoUrl: string;
          rating: number;
          ratingCount: number;
        }[];
      };
    };
  };
}
