import {
  ShieldCheck,
  Minus,
  Settings2,
  X,
  Sun,
  Moon,
  Palette,
} from "lucide-react";
import { WindowMinimise, Quit } from "../../../wailsjs/runtime/runtime";
import { useTheme } from "../ThemeContext";
import { useBackground } from "../BackgroundContext";

type TitleBarProps = {
  onSettingsClick: () => void;
};

export function TitleBar({ onSettingsClick }: TitleBarProps) {
  const { theme, setTheme } = useTheme();
  const { variant, cycleVariant } = useBackground();

  function toggleTheme() {
    setTheme(theme === "dark" ? "light" : "dark");
  }

  return (
    <header
      className="flex h-11 shrink-0 items-center justify-between border-b px-4"
      style={{ "--wails-draggable": "drag" } as React.CSSProperties}
    >
      <div className="flex items-center gap-2">
        <ShieldCheck className="size-4" />
        <span className="text-sm font-semibold">FocusLock</span>
      </div>

      <div className="flex items-center gap-1">
        <button
          onClick={onSettingsClick}
          aria-label="Settings"
          className="flex size-8 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
          style={{ "--wails-draggable": "no-drag" } as React.CSSProperties}
        >
          <Settings2 className="size-4" />
        </button>

        <button
          onClick={cycleVariant}
          aria-label={`Change background (current: ${variant})`}
          title={`Background: ${variant} — click to cycle`}
          className="flex size-8 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
          style={{ "--wails-draggable": "no-drag" } as React.CSSProperties}
        >
          <Palette className="size-4" />
        </button>

        <button
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className="flex size-8 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
          style={{ "--wails-draggable": "no-drag" } as React.CSSProperties}
        >
          {theme === "dark" ? (
            <Sun className="size-4" />
          ) : (
            <Moon className="size-4" />
          )}
        </button>

        <button
          onClick={() => WindowMinimise()}
          aria-label="Minimize"
          className="flex size-8 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
          style={{ "--wails-draggable": "no-drag" } as React.CSSProperties}
        >
          <Minus className="size-4" />
        </button>

        <button
          onClick={() => Quit()}
          aria-label="Close"
          className="flex size-8 items-center justify-center rounded-md text-muted-foreground hover:bg-destructive hover:text-white"
          style={{ "--wails-draggable": "no-drag" } as React.CSSProperties}
        >
          <X className="size-4" />
        </button>
      </div>
    </header>
  );
}
