
import { Timer, Globe } from "lucide-react";

export type Page = "focus" | "websites";

type PageNavProps = {
  page: Page;
  onPageChange: (page: Page) => void;
};

export function PageNav({ page, onPageChange }: PageNavProps) {
  return (
    <nav className="flex shrink-0 gap-1 border-b px-4">
      <button
        onClick={() => onPageChange("focus")}
        className={`flex items-center gap-2 border-b-2 px-3 py-3 text-sm transition-colors ${
          page === "focus"
            ? "border-foreground font-medium"
            : "border-transparent text-muted-foreground hover:text-foreground"
        }`}
      >
        <Timer className="size-4" />
        Focus
      </button>

      <button
        onClick={() => onPageChange("websites")}
        className={`flex items-center gap-2 border-b-2 px-3 py-3 text-sm transition-colors ${
          page === "websites"
            ? "border-foreground font-medium"
            : "border-transparent text-muted-foreground hover:text-foreground"
        }`}
      >
        <Globe className="size-4" />
        Websites
      </button>
    </nav>
  );
}
