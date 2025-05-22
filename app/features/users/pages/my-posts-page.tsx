import { PostCard } from "~/features/community/components/post-card";
import type { Route } from "~/types";

interface Post {
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
  viewpoint: {
    id: string;
    title: string;
    locationName: string;
  };
}

export function loader({ request }: Route.LoaderArgs) {
  return {
    posts: [
      {
        id: "1",
        title: "My Journey to Everest Base Camp",
        body: "It was an amazing experience...",
        visitedDate: new Date(),
        weatherDescription: "Sunny",
        createdAt: new Date(),
        createdBy: {
          id: "1",
          username: "john_doe",
          profileImageUrl: "https://github.com/haneulee.png",
        },
        viewpoint: {
          id: "1",
          title: "Mount Everest Base Camp",
          locationName: "Nepal",
        },
      },
    ] as Post[],
  };
}

export function action({ request }: Route.ActionArgs) {
  return {};
}

export const meta: Route.MetaFunction = () => {
  return [
    { title: "My Posts - Mounty" },
    { name: "description", content: "View and manage your posts" },
  ];
};

export default function MyPostsPage({ loaderData }: Route.ComponentProps) {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">My Posts</h1>
      <div className="space-y-4">
        {loaderData.posts.map((post: Post) => (
          <PostCard key={post.id} {...post} />
        ))}
      </div>
    </main>
  );
}
