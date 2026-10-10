
import {
  ChartNoAxesColumn,
  Globe,
  LayoutDashboard,
  Settings,
  ShieldCheck,
} from "lucide-react";

const navItems = [
  { label: "Overview", icon: LayoutDashboard },
  { label: "Blocked websites", icon: Globe },
  { label: "Statistics", icon: ChartNoAxesColumn },
  { label: "Settings", icon: Settings },
];

export function AppSidebar() {
  return (
    <aside className="flex h-full w-64 shrink-0 flex-col border-r bg-card">
      <div className="flex h-20 items-center gap-3 px-6">
        <div className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
          <ShieldCheck className="size-5" />
        </div>
        <div>
          <h1 className="text-lg font-bold tracking-tight">FocusLock</h1>
          <p className="text-xs text-muted-foreground">Stay in control</p>
        </div>
      </div>

      <div className="px-4 pt-5">
        <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Workspace
        </p>

        <nav className="space-y-1">
          {navItems.map(({ label, icon: Icon }, index) => (
            <button
              key={label}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                index === 0
                  ? "bg-primary/10 font-medium text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <Icon className="size-4" />
              {label}
            </button>
          ))}
        </nav>
      </div>

      <div className="mt-auto p-4">
        <div className="rounded-xl border bg-muted/40 p-4">
          <div className="mb-2 flex items-center gap-2">
            <ShieldCheck className="size-4 text-primary" />
            <span className="text-sm font-medium">Your focus matters</span>
          </div>
          <p className="text-xs leading-relaxed text-muted-foreground">
            Small, consistent sessions build better habits.
          </p>
        </div>
        <p className="mt-4 text-center text-xs text-muted-foreground">
          FocusLock · Desktop
        </p>
      </div>
    </aside>
  );
}
