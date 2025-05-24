import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  BarChart3Icon,
  BellIcon,
  LogOutIcon,
  MenuIcon,
  MessageCircleIcon,
  SettingsIcon,
  UserIcon,
} from "lucide-react";
import { Dock, DockItem } from "./ui/dock";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

import { Button } from "./ui/button";
import { HyperText } from "./ui/hyper-text";
import { Link } from "react-router";
import { Separator } from "~/common/components/ui/separator";
import { cn } from "~/lib/utils";

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
  {
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
  },
];

export default function Navigation({
  isLoggedIn,
  hasNotifications,
  hasMessages,
}: {
  isLoggedIn: boolean;
  hasNotifications: boolean;
  hasMessages: boolean;
}) {
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
          <NavigationMenu>
            <NavigationMenuList>
              {menus.map((menu) => (
                <NavigationMenuItem key={menu.name}>
                  {menu.items ? (
                    <>
                      <NavigationMenuTrigger>{menu.name}</NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid w-[400px] sm:w-[600px] font-light gap-3 p-4 grid-cols-1 sm:grid-cols-2">
                          {menu.items?.map((item) => (
                            <NavigationMenuItem
                              key={item.name}
                              className={cn([
                                "select-none rounded-md transition-colors focus:bg-accent hover:bg-accent",
                                (item.to === "/products/promote" ||
                                  item.to === "/jobs/submit") &&
                                  "col-span-2 bg-primary/10 hover:bg-primary/20 focus:bg-primary/20",
                              ])}
                            >
                              <NavigationMenuLink asChild>
                                <Link
                                  className="p-3 space-y-1 block leading-none no-underline outline-none"
                                  to={item.to}
                                >
                                  <span className="text-sm font-medium leading-none">
                                    {item.name}
                                  </span>
                                  <p className="text-sm leading-snug text-muted-foreground">
                                    {item.description}
                                  </p>
                                </Link>
                              </NavigationMenuLink>
                            </NavigationMenuItem>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </>
                  ) : (
                    <Link className={navigationMenuTriggerStyle()} to={menu.to}>
                      {menu.name}
                    </Link>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
      {isLoggedIn ? (
        <div className="flex items-center gap-2 sm:gap-4">
          <Dock className="hidden sm:flex">
            <DockItem asChild>
              <Link to="/my/notifications" className="relative">
                <BellIcon className="size-4" />
                {hasNotifications && (
                  <div className="absolute top-1.5 right-1.5 size-2 bg-red-500 rounded-full" />
                )}
              </Link>
            </DockItem>
            <DockItem asChild>
              <Link to="/my/messages" className="relative">
                <MessageCircleIcon className="size-4" />
                {hasMessages && (
                  <div className="absolute top-1.5 right-1.5 size-2 bg-red-500 rounded-full" />
                )}
              </Link>
            </DockItem>
          </Dock>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="cursor-pointer size-8 sm:size-10">
                <AvatarImage src="https://github.com/haneulee.png" />
                <AvatarFallback>N</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel className="flex flex-col">
                <span className="font-medium">John Doe</span>
                <span className="text-xs text-muted-foreground">@username</span>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link to="/my/dashboard">
                    <BarChart3Icon className="size-4 mr-2" />
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link to="/my/profile">
                    <UserIcon className="size-4 mr-2" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link to="/my/settings">
                    <SettingsIcon className="size-4 mr-2" />
                    Settings
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild className="cursor-pointer">
                <Link to="/auth/logout">
                  <LogOutIcon className="size-4 mr-2" />
                  Logout
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ) : (
        <div className="flex items-center gap-2 sm:gap-4">
          <Button
            asChild
            variant="secondary"
            size="sm"
            className="hidden sm:flex"
          >
            <Link to="/auth/login">Login</Link>
          </Button>
          <Button asChild size="sm" className="hidden sm:flex">
            <Link to="/auth/join">Join</Link>
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="sm:hidden">
                <MenuIcon className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] p-0">
              <div className="flex flex-col h-full">
                <div className="flex-1 overflow-y-auto p-4 sm:p-6">
                  <div className="space-y-8 pt-4">
                    {menus.map((menu) => (
                      <div key={menu.name} className="space-y-3">
                        <h3 className="font-medium text-base">
                          <HyperText
                            duration={600}
                            delay={100}
                            className="hover:text-primary transition-colors"
                          >
                            {menu.name}
                          </HyperText>
                        </h3>
                        <div className="space-y-2">
                          {menu.items?.map((item) => (
                            <Link
                              key={item.name}
                              to={item.to}
                              className="block text-sm text-muted-foreground hover:text-foreground py-1.5"
                            >
                              {item.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="p-4 sm:p-6 border-t">
                  <div className="flex flex-col gap-2">
                    <Button
                      asChild
                      variant="secondary"
                      size="sm"
                      className="w-full"
                    >
                      <Link to="/auth/login">Login</Link>
                    </Button>
                    <Button asChild size="sm" className="w-full">
                      <Link to="/auth/join">Join</Link>
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
