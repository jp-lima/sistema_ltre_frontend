import { cn } from "cn";

export function PageContainer({ children, className }) {
  return (
    <div className={cn("min-h-screen bg-background pl-16", className)}>
      {children}
    </div>
  );
}
