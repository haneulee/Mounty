import { useEffect, useRef } from "react";

import { cn } from "~/lib/utils";

interface ParticlesProps {
  className?: string;
  quantity?: number;
  staticity?: number;
  ease?: number;
}

export function Particles({
  className,
  quantity = 50,
  staticity = 50,
  ease = 50,
}: ParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", resize);
    resize();

    const particles: Array<{
      x: number;
      y: number;
      translateX: number;
      translateY: number;
      size: number;
      alpha: number;
      targetAlpha: number;
      dx: number;
      dy: number;
    }> = [];

    for (let i = 0; i < quantity; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        translateX: 0,
        translateY: 0,
        size: Math.random() * 2,
        alpha: 0,
        targetAlpha: Math.random() * 0.5,
        dx: (Math.random() - 0.5) * 0.5,
        dy: (Math.random() - 0.5) * 0.5,
      });
    }

    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        const distance = Math.sqrt(
          Math.pow(mouseX - particle.x, 2) + Math.pow(mouseY - particle.y, 2)
        );

        if (distance < 100) {
          const angle = Math.atan2(mouseY - particle.y, mouseX - particle.x);
          const force = (100 - distance) / 100;
          particle.translateX += Math.cos(angle) * force * 2;
          particle.translateY += Math.sin(angle) * force * 2;
        }

        particle.translateX += particle.dx;
        particle.translateY += particle.dy;

        particle.translateX *= 0.95;
        particle.translateY *= 0.95;

        particle.x += particle.translateX;
        particle.y += particle.translateY;

        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        particle.alpha += (particle.targetAlpha - particle.alpha) * 0.1;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${particle.alpha})`;
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [quantity, staticity, ease]);

  return (
    <canvas
      ref={canvasRef}
      className={cn(
        "fixed inset-0 pointer-events-none z-0 opacity-50",
        className
      )}
    />
  );
}
