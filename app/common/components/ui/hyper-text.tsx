import { useEffect, useState } from "react";

import { cn } from "~/lib/utils";

interface HyperTextProps {
  children: string;
  className?: string;
  duration?: number;
  delay?: number;
  as?: React.ElementType;
  startOnView?: boolean;
  animateOnHover?: boolean;
  characterSet?: string[];
}

export function HyperText({
  children,
  className,
  duration = 800,
  delay = 0,
  as: Component = "div",
  startOnView = false,
  animateOnHover = true,
  characterSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""),
}: HyperTextProps) {
  const [text, setText] = useState(children);
  const [isAnimating, setIsAnimating] = useState(false);

  const scramble = () => {
    setIsAnimating(true);
    let iterations = 0;
    const maxIterations = 3;
    const interval = setInterval(() => {
      setText(
        children
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (iterations > index) return children[index];
            return characterSet[
              Math.floor(Math.random() * characterSet.length)
            ];
          })
          .join("")
      );

      iterations += 1 / 3;
      if (iterations >= maxIterations) {
        clearInterval(interval);
        setText(children);
        setIsAnimating(false);
      }
    }, duration / maxIterations);
  };

  useEffect(() => {
    if (startOnView) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            scramble();
          }
        },
        { threshold: 0.1 }
      );

      const element = document.getElementById(`hyper-text-${children}`);
      if (element) observer.observe(element);

      return () => {
        if (element) observer.unobserve(element);
      };
    }
  }, [startOnView, children]);

  return (
    <Component
      id={`hyper-text-${children}`}
      className={cn("inline-block", className)}
      onMouseEnter={() => {
        if (animateOnHover && !isAnimating) {
          setTimeout(scramble, delay);
        }
      }}
    >
      {text}
    </Component>
  );
}
