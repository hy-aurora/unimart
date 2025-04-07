"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  className?: string;
  iconClassName?: string;
  variant?: "default" | "ghost" | "outline";
  showLabel?: boolean;
}

export function ThemeSwitcher({
  className,
  iconClassName,
  variant = "ghost",
  showLabel = false,
}: ThemeToggleProps) {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button variant={variant} size="icon" className={className} disabled>
        <Sun className={cn("h-5 w-5", iconClassName)} />
        <span className="sr-only">Toggle theme</span>
      </Button>
    );
  }

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <Button
      variant={variant}
      size={showLabel ? "sm" : "icon"}
      onClick={toggleTheme}
      className={className}
    >
      <div className="relative w-5 h-5">
        <Sun
          className={cn(
            "absolute transition-transform duration-300 transform",
            theme === "light" ? "rotate-0 scale-100" : "rotate-90 scale-0",
            iconClassName
          )}
        />
        <Moon
          className={cn(
            "absolute transition-transform duration-300 transform",
            theme === "dark" ? "rotate-0 scale-100" : "-rotate-90 scale-0",
            iconClassName
          )}
        />
      </div>
      {showLabel && (
        <span className="ml-2">{theme === "dark" ? "Dark" : "Light"}</span>
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
