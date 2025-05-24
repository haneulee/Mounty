import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/common/components/ui/avatar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "~/common/components/ui/breadcrumb";
import { CalendarIcon, CloudIcon } from "lucide-react";
import { Card, CardContent, CardHeader } from "~/common/components/ui/card";

import { Button } from "~/common/components/ui/button";
import { CommentItem } from "../components/comment-item";
import { Link } from "react-router";
import type { Route } from "./+types/post-page";
import { Textarea } from "~/common/components/ui/textarea";
import { formatDistanceToNow } from "date-fns";
import { useState } from "react";

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
    bio?: string;
    followersCount: number;
    followingCount: number;
  };
  viewpoint: {
    id: string;
    title: string;
    locationName: string;
  };
  commentsCount: number;
  likesCount: number;
}

interface Comment {
  id: string;
  content: string;
  createdAt: Date;
  createdBy: {
    id: string;
    username: string;
    profileImageUrl?: string;
  };
  replies?: Comment[];
}

export function loader({ request, params }: Route.LoaderArgs) {
  // TODO: 실제 데이터베이스에서 포스트 데이터를 가져오도록 수정
  return {
    post: {
      id: params.postId,
      title: "My Journey to Everest Base Camp",
      body: "It was an amazing experience... The view was breathtaking and the weather was perfect. I spent hours just taking in the scenery and capturing photos. The journey to get here was challenging but absolutely worth it. The local guides were incredibly knowledgeable and made the experience even better.",
      visitedDate: new Date(),
      weatherDescription: "Sunny",
      createdAt: new Date(),
      createdBy: {
        id: "1",
        username: "john_doe",
        profileImageUrl: "https://github.com/haneulee.png",
        bio: "Adventure seeker and nature lover. Always looking for the next great view.",
        followersCount: 1234,
        followingCount: 567,
      },
      viewpoint: {
        id: "1",
        title: "Mount Everest Base Camp",
        locationName: "Nepal",
      },
      commentsCount: 42,
      likesCount: 156,
    } as Post,
    comments: [
      {
        id: "1",
        content:
          "Amazing photos! I've always wanted to visit Everest Base Camp. How long did it take you to reach there?",
        createdAt: new Date(),
        createdBy: {
          id: "2",
          username: "mountain_lover",
          profileImageUrl: "https://github.com/haneulee.png",
        },
        replies: [
          {
            id: "1-1",
            content:
              "It took us about 12 days to reach the base camp. The journey was challenging but absolutely worth it!",
            createdAt: new Date(),
            createdBy: {
              id: "1",
              username: "john_doe",
              profileImageUrl: "https://github.com/haneulee.png",
            },
          },
          {
            id: "1-2",
            content:
              "That's quite a journey! Did you have any altitude sickness?",
            createdAt: new Date(),
            createdBy: {
              id: "3",
              username: "traveler_jane",
              profileImageUrl: "https://github.com/haneulee.png",
            },
          },
        ],
      },
      {
        id: "2",
        content:
          "The weather looks perfect for the trek. What time of year did you go?",
        createdAt: new Date(),
        createdBy: {
          id: "3",
          username: "traveler_jane",
          profileImageUrl: "https://github.com/haneulee.png",
        },
        replies: [
          {
            id: "2-1",
            content:
              "We went in October, which is considered one of the best times to visit. The weather was clear and the views were spectacular!",
            createdAt: new Date(),
            createdBy: {
              id: "1",
              username: "john_doe",
              profileImageUrl: "https://github.com/haneulee.png",
            },
          },
        ],
      },
    ] as Comment[],
  };
}

export function action({ request }: Route.ActionArgs) {
  return {};
}

export const meta: Route.MetaFunction = () => {
  return [{ title: "Post | Mounty" }];
};

export default function PostPage({ loaderData }: Route.ComponentProps) {
  const { post, comments } = loaderData;
  const [commentContent, setCommentContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitComment = () => {
    if (commentContent.trim()) {
      // TODO: 실제로 댓글을 저장하는 로직 구현
      setCommentContent("");
    }
  };

  const handleReply = (commentId: string, content: string) => {
    // TODO: 실제로 답글을 저장하는 로직 구현
    console.log(`Replying to comment ${commentId} with content: ${content}`);
  };

  return (
    <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/posts">Posts</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to={`/posts/${post.id}`}>{post.title}</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-grow">
          <article className="max-w-3xl mx-auto">
            <header className="mb-8">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                {post.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Avatar className="size-8">
                    <AvatarImage src={post.createdBy.profileImageUrl} />
                    <AvatarFallback>
                      {post.createdBy.username[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span>{post.createdBy.username}</span>
                </div>
                <span>·</span>
                <div className="flex items-center gap-1">
                  <CalendarIcon className="size-4" />
                  <span>{post.visitedDate.toLocaleDateString()}</span>
                </div>
                <span>·</span>
                <div className="flex items-center gap-1">
                  <CloudIcon className="size-4" />
                  <span>{post.weatherDescription}</span>
                </div>
                <span>·</span>
                <span>
                  {formatDistanceToNow(post.createdAt, { addSuffix: true })}
                </span>
              </div>
            </header>

            <div className="prose prose-lg dark:prose-invert max-w-none mb-8">
              <p>{post.body}</p>
            </div>

            <div className="border-t pt-8">
              <h2 className="text-2xl font-semibold mb-4">Viewpoint</h2>
              <div className="bg-card rounded-lg p-4">
                <h3 className="text-lg font-medium mb-2">
                  {post.viewpoint.title}
                </h3>
                <p className="text-muted-foreground">
                  {post.viewpoint.locationName}
                </p>
                <Button variant="link" asChild className="mt-2">
                  <Link to={`/viewpoints/${post.viewpoint.id}`}>
                    View viewpoint details &rarr;
                  </Link>
                </Button>
              </div>
            </div>

            {/* 댓글 섹션 */}
            <div className="border-t pt-8 mt-8">
              <h2 className="text-2xl font-semibold mb-6">
                Comments ({post.commentsCount})
              </h2>

              {/* 댓글 작성 폼 */}
              <div className="mb-8">
                <Textarea
                  placeholder="What are your thoughts?"
                  className="min-h-[100px] mb-4"
                  value={commentContent}
                  onChange={(e) => setCommentContent(e.target.value)}
                />
                <Button
                  onClick={handleSubmitComment}
                  disabled={!commentContent.trim() || isSubmitting}
                >
                  {isSubmitting ? "Posting..." : "Post Comment"}
                </Button>
              </div>

              {/* 댓글 목록 */}
              <div className="space-y-6">
                {comments.map((comment) => (
                  <CommentItem
                    key={comment.id}
                    comment={comment}
                    onReply={handleReply}
                  />
                ))}
              </div>
            </div>
          </article>
        </div>

        <div className="w-full lg:w-80 space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <Avatar className="size-16">
                <AvatarImage src={post.createdBy.profileImageUrl} />
                <AvatarFallback>
                  {post.createdBy.username[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold">{post.createdBy.username}</h3>
                <p className="text-sm text-muted-foreground">
                  {post.createdBy.bio}
                </p>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 mb-4">
                <div>
                  <div className="font-medium">
                    {post.createdBy.followersCount}
                  </div>
                  <div className="text-sm text-muted-foreground">Followers</div>
                </div>
                <div>
                  <div className="font-medium">
                    {post.createdBy.followingCount}
                  </div>
                  <div className="text-sm text-muted-foreground">Following</div>
                </div>
              </div>
              <Button className="w-full">Follow</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
