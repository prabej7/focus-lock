
import { Bell, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export function AppHeader() {
  const today = new Intl.DateTimeFormat("en", {
    weekday: "long",
    month: "long",
    day: "numeric",
  }).format(new Date());

  return (
    <header className="flex min-h-20 flex-wrap items-center justify-between gap-4 border-b bg-background px-6 py-4 lg:px-8">
      <div>
        <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
          {today}
        </p>
        <h2 className="mt-1 text-xl font-semibold tracking-tight">
          Your workspace
        </h2>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative hidden sm:block">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search..."
            className="w-48 pl-9 lg:w-60"
            aria-label="Search"
          />
        </div>
        <button
          aria-label="Notifications"
          className="flex size-10 items-center justify-center rounded-lg border hover:bg-muted"
        >
          <Bell className="size-4" />
        </button>
        <div className="flex size-10 items-center justify-center rounded-full bg-muted text-sm font-semibold">
          P
        </div>
      </div>
    </header>
  );
}
