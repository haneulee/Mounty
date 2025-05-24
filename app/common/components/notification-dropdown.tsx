import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

import { BellIcon } from "lucide-react";

interface NotificationDropdownProps {
  hasNotifications: boolean;
  className?: string;
}

export function NotificationDropdown({
  hasNotifications,
  className,
}: NotificationDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={`relative p-1.5 rounded-full cursor-pointer ${className}`}
        >
          <BellIcon className="size-4" />
          {hasNotifications && (
            <div className="absolute top-1 right-1 size-1.5 bg-red-500 rounded-full" />
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-80 max-h-[400px] overflow-y-auto"
        align="end"
        sideOffset={8}
      >
        <DropdownMenuLabel>Notifications</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <NotificationItem
            username="John Doe"
            avatarUrl="https://github.com/haneulee.png"
            message="Liked your viewpoint review"
            timeAgo="2 hours ago"
          />
          <NotificationItem
            username="Jane Smith"
            avatarUrl="https://github.com/haneulee.png"
            message="Commented on your trail post"
            timeAgo="5 hours ago"
          />
          <NotificationItem
            username="Mike Johnson"
            avatarUrl="https://github.com/haneulee.png"
            message="Started following you"
            timeAgo="1 day ago"
          />
          <NotificationItem
            username="Sarah Wilson"
            avatarUrl="https://github.com/haneulee.png"
            message="Shared your trail post"
            timeAgo="2 days ago"
          />
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

interface NotificationItemProps {
  username: string;
  avatarUrl: string;
  message: string;
  timeAgo: string;
}

function NotificationItem({
  username,
  avatarUrl,
  message,
  timeAgo,
}: NotificationItemProps) {
  return (
    <DropdownMenuItem className="flex flex-col items-start gap-1 p-3">
      <div className="flex items-center gap-2">
        <Avatar className="size-6">
          <AvatarImage src={avatarUrl} />
          <AvatarFallback>{username[0]}</AvatarFallback>
        </Avatar>
        <span className="text-sm font-medium">{username}</span>
      </div>
      <p className="text-sm text-muted-foreground">{message}</p>
      <span className="text-xs text-muted-foreground">{timeAgo}</span>
    </DropdownMenuItem>
  );
}
