
import { ShieldCheck, Minus, Settings2, X } from "lucide-react";
import { WindowMinimise, Quit } from "../../../wailsjs/runtime/runtime";

type TitleBarProps = {
  onSettingsClick: () => void;
};

export function TitleBar({ onSettingsClick }: TitleBarProps) {
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
