import { Slot } from "@radix-ui/react-slot";
import { cn } from "~/lib/utils";

interface DockProps {
  children: React.ReactNode;
  className?: string;
}

export function Dock({ children, className }: DockProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center gap-2 p-2 rounded-full bg-background/80 backdrop-blur-sm border shadow-lg",
        className
      )}
    >
      {children}
    </div>
  );
}

interface DockItemProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  asChild?: boolean;
}

export function DockItem({
  children,
  className,
  onClick,
  asChild,
}: DockItemProps) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      onClick={onClick}
      className={cn(
        "flex items-center justify-center size-12 rounded-full bg-background hover:bg-accent transition-all duration-300 hover:scale-110",
        className
      )}
    >
      {children}
    </Comp>
  );
}
