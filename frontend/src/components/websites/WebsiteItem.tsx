
import { Globe, LockKeyhole, LockKeyholeOpen, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Website } from "@/types";

type WebsiteItemProps = {
  website: Website;
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
};

export function WebsiteItem({
  website,
  onToggle,
  onRemove,
}: WebsiteItemProps) {
  return (
    <div className="flex flex-wrap items-center gap-3 border-b py-4 last:border-b-0">
      <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted">
        <Globe className="size-4 text-muted-foreground" />
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium">{website.domain}</p>
        <p className="mt-1 text-xs text-muted-foreground">
          {website.category}
        </p>
      </div>

      <Badge variant={website.blocked ? "default" : "secondary"}>
        {website.blocked ? "Blocked" : "Allowed"}
      </Badge>

      <Button
        variant="ghost"
        size="icon"
        onClick={() => onToggle(website.id)}
        aria-label={website.blocked ? "Allow website" : "Block website"}
        title={website.blocked ? "Allow website" : "Block website"}
      >
        {website.blocked ? (
          <LockKeyholeOpen className="size-4" />
        ) : (
          <LockKeyhole className="size-4" />
        )}
      </Button>

      <Button
        variant="ghost"
        size="icon"
        onClick={() => onRemove(website.id)}
        aria-label={`Remove ${website.domain}`}
        title="Remove website"
      >
        <Trash2 className="size-4 text-muted-foreground" />
      </Button>
    </div>
  );
}
