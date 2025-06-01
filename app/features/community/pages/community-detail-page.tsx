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
import { Card, CardContent, CardHeader } from "~/common/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "~/common/components/ui/dialog";
import { HeartIcon, MessageCircleIcon, ReplyIcon } from "lucide-react";

import { Button } from "~/common/components/ui/button";
import { Link } from "react-router";
import { ReplyItem } from "../components/reply-item";
import type { Route } from "./+types/community-detail-page";
import { Textarea } from "~/common/components/ui/textarea";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";
import { useGetPostDetail } from "../queries";
import { useState } from "react";

export async function loader({ request, params }: Route.LoaderArgs) {
  const post = await useGetPostDetail({
    postId: params.postId,
  });

  return { post };
}

export function action({ request }: Route.ActionArgs) {
  return {};
}

export const meta: Route.MetaFunction = () => {
  return [{ title: "Post | Mounty" }];
};

export default function CommunityDetailPage({
  loaderData,
}: Route.ComponentProps) {
  const { post } = loaderData;
  const [selectedPhoto, setSelectedPhoto] = useState<
    (typeof post.photos)[0] | null
  >(null);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState("");

  const handleReply = (replyId: string) => {
    setReplyingTo(replyId);
    setReplyContent("");
  };

  const handleCancelReply = () => {
    setReplyingTo(null);
    setReplyContent("");
  };

  const handleSubmitReply = () => {
    // TODO: Implement reply submission
    setReplyingTo(null);
    setReplyContent("");
  };

  const renderReplies = (replies: typeof post.replies, depth = 0) => {
    return replies.map((reply) => (
      <ReplyItem
        key={reply.id}
        reply={reply}
        depth={depth}
        replyingTo={replyingTo}
        replyContent={replyContent}
        onReply={handleReply}
        onCancelReply={handleCancelReply}
        onSubmitReply={handleSubmitReply}
        onReplyContentChange={setReplyContent}
        onRenderChildren={renderReplies}
      />
    ));
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
              <Link to="/community">Community</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to={`/community/${post.post_id}`}>{post.title}</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-grow">
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                {post.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <HeartIcon className="size-4" />
                  <span>{post.upvote_count} likes</span>
                </div>
                <span>·</span>
                <div className="flex items-center gap-2">
                  <MessageCircleIcon className="size-4" />
                  <span>{post.comments_count} comments</span>
                </div>
                <span>·</span>
                <span>
                  {formatDistanceToNow(new Date(post.created_at), {
                    addSuffix: true,
                    locale: ko,
                  })}
                </span>
              </div>
            </div>

            {/* 이미지 갤러리 */}
            {post.photos && post.photos.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {post.photos.map((photo) => (
                  <div
                    key={photo.id}
                    className="cursor-pointer"
                    onClick={() => setSelectedPhoto(photo)}
                  >
                    <img
                      src={photo.url}
                      alt={photo.description || ""}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                ))}
              </div>
            )}

            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p>{post.content}</p>
            </div>

            {/* 관련 뷰포인트 */}
            {post.viewpoint && (
              <div className="border-t pt-8">
                <h2 className="text-2xl font-semibold mb-4">
                  Related Viewpoint
                </h2>
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-semibold mb-2">
                      {post.viewpoint.title}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {post.viewpoint.location_name}
                    </p>
                    <Button variant="link" asChild>
                      <Link to={`/viewpoints/${post.viewpoint.id}`}>
                        View viewpoint details &rarr;
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* 댓글 섹션 */}
            <div className="border-t pt-8">
              <h2 className="text-2xl font-semibold mb-4">Replies</h2>
              <div className="space-y-4">{renderReplies(post.replies)}</div>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-80 space-y-6">
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold">Author</h2>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage
                      src={post.profile_photos?.[0]?.url}
                      alt={post.username}
                    />
                    <AvatarFallback>
                      {post.username[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-lg">{post.username}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <span className="font-medium">
                          {post.followers_count}
                        </span>
                        <span>followers</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="font-medium">
                          {post.following_count}
                        </span>
                        <span>following</span>
                      </div>
                    </div>
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  Follow
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* 이미지 모달 */}
      <Dialog
        open={!!selectedPhoto}
        onOpenChange={() => setSelectedPhoto(null)}
      >
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>{selectedPhoto?.description}</span>
            </DialogTitle>
          </DialogHeader>
          <div className="relative aspect-video">
            <img
              src={selectedPhoto?.url}
              alt={selectedPhoto?.description || ""}
              className="w-full h-full object-contain"
            />
          </div>
        </DialogContent>
      </Dialog>
    </main>
  );
}
