import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/common/components/ui/avatar";
import { HeartIcon, ReplyIcon } from "lucide-react";

import { Button } from "~/common/components/ui/button";
import { ReplyInput } from "./reply-input";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";

interface ReplyItemProps {
  reply: {
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
  };
  depth: number;
  replyingTo: string | null;
  replyContent: string;
  onReply: (replyId: string) => void;
  onCancelReply: () => void;
  onSubmitReply: () => void;
  onReplyContentChange: (content: string) => void;
  onRenderChildren: (replies: any[], depth: number) => React.ReactNode;
}

export function ReplyItem({
  reply,
  depth,
  replyingTo,
  replyContent,
  onReply,
  onCancelReply,
  onSubmitReply,
  onReplyContentChange,
  onRenderChildren,
}: ReplyItemProps) {
  return (
    <div className="space-y-4">
      <div className="relative">
        {depth > 0 && (
          <div className="absolute -left-4 top-0 bottom-0 w-px bg-border" />
        )}
        <div className="py-4">
          <div className="flex items-center gap-4 mb-2">
            <Avatar className="size-8">
              <AvatarImage
                src={reply.created_by_photos?.[0]?.url}
                alt={reply.created_by_username}
              />
              <AvatarFallback>
                {reply.created_by_username[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium text-sm">{reply.created_by_username}</p>
              <p className="text-xs text-muted-foreground">
                {formatDistanceToNow(new Date(reply.created_at), {
                  addSuffix: true,
                  locale: ko,
                })}
                {reply.updated_at !== reply.created_at && " (수정됨)"}
              </p>
            </div>
          </div>
          <div className="ml-12">
            <p className="text-sm text-muted-foreground mb-2">
              {reply.content}
            </p>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <HeartIcon className="size-3" />
                <span>{reply.likes_count}</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 px-2 gap-1"
                onClick={() => onReply(reply.id)}
              >
                <ReplyIcon className="size-3" />
                답글
              </Button>
            </div>
          </div>
        </div>

        {replyingTo === reply.id && (
          <div className="mt-2 ml-12">
            <ReplyInput
              value={replyContent}
              onChange={onReplyContentChange}
              onSubmit={onSubmitReply}
              onCancel={onCancelReply}
            />
          </div>
        )}
      </div>

      {depth < 2 && reply.children.length > 0 && (
        <div className="ml-8">
          {onRenderChildren(reply.children, depth + 1)}
        </div>
      )}
    </div>
  );
}
