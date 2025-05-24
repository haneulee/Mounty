import { LogOutIcon, MenuIcon } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

import { Button } from "./ui/button";
import { Link } from "react-router";
import { MenuContent } from "./menu-content";
import { NotificationDropdown } from "./notification-dropdown";
import { Separator } from "~/common/components/ui/separator";
import { SidebarMenu } from "./sidebar-menu";
import { useState } from "react";

const menus = [
  {
    name: "Viewpoints",
    to: "/viewpoints",
    items: [
      {
        name: "Find Viewpoints",
        description: "Discover beautiful viewpoints around you",
        to: "/viewpoints",
      },
      {
        name: "View on Map",
        description: "Check viewpoint locations on the map",
        to: "/viewpoints/map",
      },
      {
        name: "Add Viewpoint",
        description: "Register a new viewpoint",
        to: "/viewpoints/new",
      },
    ],
  },
  {
    name: "Trails",
    to: "/trails",
    items: [
      {
        name: "All Trails",
        description: "Browse all hiking trails",
        to: "/trails",
      },
      {
        name: "Create Trail",
        description: "Register a new hiking trail",
        to: "/trails/new",
      },
    ],
  },
  {
    name: "Posts",
    to: "/posts",
    items: [
      {
        name: "All Posts",
        description: "Browse all posts",
        to: "/posts",
      },
      {
        name: "Create Post",
        description: "Write a new post",
        to: "/posts/new",
      },
    ],
  },
];

const myPageMenu = {
  name: "My Page",
  to: "/mypage",
  items: [
    {
      name: "My Profile",
      description: "Manage your profile information",
      to: "/mypage/profile",
    },
    {
      name: "Favorite",
      description: "View your favorite viewpoints, trails, and posts",
      to: "/mypage/favorite",
    },
  ],
};

export default function Navigation({
  isLoggedIn,
  hasNotifications,
}: {
  isLoggedIn: boolean;
  hasNotifications: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const displayMenus = isLoggedIn ? [...menus, myPageMenu] : menus;

  return (
    <nav className="flex px-4 sm:px-6 lg:px-20 h-16 items-center justify-between backdrop-blur fixed top-0 left-0 right-0 z-50 bg-background/50">
      <div className="flex items-center">
        <Link
          to="/"
          className="font-bold tracking-tighter text-base sm:text-lg"
        >
          Mounty
        </Link>
        <Separator
          orientation="vertical"
          className="h-6 mx-2 sm:mx-4 hidden sm:block"
        />
        <div className="hidden md:block">
          <MenuContent menus={displayMenus} />
        </div>
      </div>
      {isLoggedIn ? (
        <div className="flex items-center">
          <NotificationDropdown
            hasNotifications={hasNotifications}
            className="size-8 hidden sm:flex"
          />
          <div className="flex items-center gap-2">
            <NotificationDropdown
              hasNotifications={hasNotifications}
              className="sm:hidden size-8"
            />
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="sm:hidden cursor-pointer"
                >
                  <MenuIcon className="size-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px] p-0">
                <div className="flex flex-col h-full">
                  <div className="flex-1 overflow-y-auto p-4 sm:p-6">
                    <SidebarMenu
                      menus={displayMenus}
                      onItemClick={() => setIsOpen(false)}
                    />
                  </div>
                  <div className="p-4 sm:p-6 border-t">
                    <div className="flex flex-col gap-2">
                      <Button
                        asChild
                        variant="secondary"
                        size="sm"
                        className="w-full"
                      >
                        <Link to="/auth/logout">
                          <LogOutIcon className="size-4 mr-2" />
                          Logout
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-2 sm:gap-4">
          <Button
            asChild
            variant="secondary"
            size="sm"
            className="hidden sm:flex cursor-pointer"
          >
            <Link to="/auth/login">Login</Link>
          </Button>
          <Button asChild size="sm" className="hidden sm:flex cursor-pointer">
            <Link to="/auth/join">Join</Link>
          </Button>
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="sm:hidden cursor-pointer"
              >
                <MenuIcon className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] p-0">
              <div className="flex flex-col h-full">
                <div className="flex-1 overflow-y-auto p-4 sm:p-6">
                  <SidebarMenu
                    menus={displayMenus}
                    onItemClick={() => setIsOpen(false)}
                  />
                </div>
                <div className="p-4 sm:p-6 border-t">
                  <div className="flex flex-col gap-2">
                    <Button
                      asChild
                      variant="secondary"
                      size="sm"
                      className="w-full"
                    >
                      <Link to="/auth/login" onClick={() => setIsOpen(false)}>
                        Login
                      </Link>
                    </Button>
                    <Button asChild size="sm" className="w-full">
                      <Link to="/auth/join" onClick={() => setIsOpen(false)}>
                        Join
                      </Link>
                    </Button>
                    <Button
                      asChild
                      variant="ghost"
                      size="sm"
                      className="w-full text-red-500 hover:text-red-600 hover:bg-red-50"
                    >
                      <Link to="/auth/logout" onClick={() => setIsOpen(false)}>
                        <LogOutIcon className="size-4 mr-2" />
                        Logout
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      )}
    </nav>
  );
}
