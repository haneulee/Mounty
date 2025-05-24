import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/common/components/ui/avatar";

import { Button } from "~/common/components/ui/button";
import { ReplyIcon } from "lucide-react";
import { Textarea } from "~/common/components/ui/textarea";
import { formatDistanceToNow } from "date-fns";
import { useState } from "react";

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

interface CommentItemProps {
  comment: Comment;
  onReply: (commentId: string, content: string) => void;
  isReply?: boolean;
}

export function CommentItem({
  comment,
  onReply,
  isReply = false,
}: CommentItemProps) {
  const [isReplying, setIsReplying] = useState(false);
  const [replyContent, setReplyContent] = useState("");

  const handleReply = () => {
    setIsReplying(true);
  };

  const handleSubmitReply = () => {
    if (replyContent.trim()) {
      onReply(comment.id, replyContent);
      setReplyContent("");
      setIsReplying(false);
    }
  };

  const handleCancelReply = () => {
    setReplyContent("");
    setIsReplying(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <Avatar className={isReply ? "size-8" : "size-10"}>
          <AvatarImage src={comment.createdBy.profileImageUrl} />
          <AvatarFallback>
            {comment.createdBy.username[0].toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-medium">{comment.createdBy.username}</span>
            <span className="text-sm text-muted-foreground">
              {formatDistanceToNow(comment.createdAt, { addSuffix: true })}
            </span>
          </div>
          <p className="text-muted-foreground">{comment.content}</p>
          <div className="flex items-center gap-2 mt-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleReply}
              className="text-muted-foreground hover:text-foreground"
            >
              <ReplyIcon className="size-4 mr-2" />
              Reply
            </Button>
          </div>
          {isReplying && (
            <div className="mt-4 space-y-4">
              <Textarea
                placeholder="What are your thoughts?"
                className="min-h-[100px]"
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                autoFocus
              />
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={handleSubmitReply}
                  disabled={!replyContent.trim()}
                >
                  Reply
                </Button>
                <Button size="sm" variant="ghost" onClick={handleCancelReply}>
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
      {comment.replies && comment.replies.length > 0 && (
        <div className="ml-14 space-y-4">
          {comment.replies.map((reply) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              onReply={onReply}
              isReply
            />
          ))}
        </div>
      )}
    </div>
  );
}
