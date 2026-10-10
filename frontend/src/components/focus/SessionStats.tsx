
import { Clock3, Flame, Target } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const stats = [
  {
    label: "Focus time today",
    value: "0m",
    detail: "Start your first session",
    icon: Clock3,
  },
  {
    label: "Sessions completed",
    value: "0",
    detail: "Every session counts",
    icon: Target,
  },
  {
    label: "Current streak",
    value: "0 days",
    detail: "Build your consistency",
    icon: Flame,
  },
];

export function SessionStats() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {stats.map(({ label, value, detail, icon: Icon }) => (
        <Card key={label} className="shadow-none">
          <CardContent className="flex items-start justify-between p-5">
            <div>
              <p className="text-sm text-muted-foreground">{label}</p>
              <p className="mt-3 text-2xl font-semibold tracking-tight">
                {value}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">{detail}</p>
            </div>
            <div className="rounded-lg bg-primary/10 p-2.5 text-primary">
              <Icon className="size-5" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
