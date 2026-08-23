import { Moon, Sun, Monitor } from "lucide-react";
import { useTheme, type Theme } from "@/lib/theme";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, setTheme } = useTheme();

  const cycleTheme = () => {
    const nextTheme: Record<Theme, Theme> = {
      dark: "light",
      light: "system",
      system: "dark",
    };
    setTheme(nextTheme[theme]);
  };

  const Icon = theme === "dark" ? Moon : theme === "light" ? Sun : Monitor;
  const label =
    theme === "dark"
      ? "Dark theme (click for light)"
      : theme === "light"
        ? "Light theme (click for system)"
        : "System theme (click for dark)";

  return (
    <button
      onClick={cycleTheme}
      title={label}
      aria-label={label}
      className={`inline-flex items-center justify-center rounded-lg border border-border bg-surface p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring ${className}`}
    >
      <Icon className="size-4" />
    </button>
  );
}

export function ThemeSelectDropdown() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center gap-1 rounded-lg border border-border bg-surface p-1">
      <button
        onClick={() => setTheme("dark")}
        className={`flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium transition-colors ${
          theme === "dark"
            ? "bg-secondary text-foreground shadow-xs"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        <Moon className="size-3.5" />
        Dark
      </button>
      <button
        onClick={() => setTheme("light")}
        className={`flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium transition-colors ${
          theme === "light"
            ? "bg-secondary text-foreground shadow-xs"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        <Sun className="size-3.5" />
        Light
      </button>
      <button
        onClick={() => setTheme("system")}
        className={`flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium transition-colors ${
          theme === "system"
            ? "bg-secondary text-foreground shadow-xs"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        <Monitor className="size-3.5" />
        Auto
      </button>
    </div>
  );
}
