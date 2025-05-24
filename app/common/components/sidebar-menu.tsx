import { HyperText } from "./ui/hyper-text";
import { Link } from "react-router";

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

interface SidebarMenuProps {
  menus: Menu[];
  onItemClick?: () => void;
}

export function SidebarMenu({ menus, onItemClick }: SidebarMenuProps) {
  return (
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
                onClick={onItemClick}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
