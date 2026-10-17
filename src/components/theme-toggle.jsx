import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";

export function ThemeToggle({ variant = "ghost", size = "icon" }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button variant={variant} size={size} onClick={toggleTheme} aria-label="Alternar tema">
      {theme === "light" ? (
        <Moon className="h-[1.2rem] w-[1.2rem] transition-all" />
      ) : (
        <Sun className="h-[1.2rem] w-[1.2rem] transition-all" />
      )}
    </Button>
  );
}
