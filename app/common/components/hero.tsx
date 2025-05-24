interface HeroProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export function Hero({ title, subtitle, className = "" }: HeroProps) {
  return (
    <div
      className={`flex flex-col py-20 text-center justify-center items-center rounded-md bg-gradient-to-t from-background to-primary/20 ${className}`}
    >
      <h1 className="text-5xl font-bold mb-4">{title}</h1>
      {subtitle && (
        <p className="text-2xl font-light text-foreground">{subtitle}</p>
      )}
    </div>
  );
}
