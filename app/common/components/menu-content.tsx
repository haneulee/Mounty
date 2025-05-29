import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu";

import { Link } from "react-router";
import { cn } from "~/lib/utils";

interface MenuItem {
  name: string;
  to: string;
  description?: string;
}

interface Menu {
  name: string;
  to: string;
  items?: MenuItem[];
}

interface NavigationMenuProps {
  menus: Menu[];
}

export function MenuContent({ menus }: NavigationMenuProps) {
  return (
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
                            prefetch="intent"
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
  );
}
