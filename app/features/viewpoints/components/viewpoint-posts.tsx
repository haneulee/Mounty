import { PostCard } from "~/features/community/components/post-card";

interface ViewpointPost {
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
}

interface ViewpointPostsProps {
  posts: ViewpointPost[];
  viewpoint: {
    id: string;
    title: string;
    locationName: string;
  };
}

export function ViewpointPosts({ posts, viewpoint }: ViewpointPostsProps) {
  return (
    <div className="space-y-5">
      {posts.map((post) => (
        <PostCard
          key={post.id}
          id={post.id}
          title={post.title}
          body={post.body}
          visitedDate={post.visitedDate}
          weatherDescription={post.weatherDescription}
          createdAt={post.createdAt}
          createdBy={post.createdBy}
          viewpoint={viewpoint}
        />
      ))}
    </div>
  );
}
