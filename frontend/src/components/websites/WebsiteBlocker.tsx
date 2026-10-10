import { useEffect, useState, type FormEvent } from "react";
import { Plus, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { WebsiteItem } from "./WebsiteItem";
import type { Website } from "@/types";
import { GetDomains, AddDomain } from "../../../wailsjs/go/main/App";
const initialWebsites: Website[] = [
  // {
  //   id: "1",
  //   domain: "youtube.com",
  //   category: "Entertainment",
  //   blocked: true,
  // },
  // {
  //   id: "2",
  //   domain: "reddit.com",
  //   category: "Social media",
  //   blocked: true,
  // },
  // {
  //   id: "3",
  //   domain: "instagram.com",
  //   category: "Social media",
  //   blocked: true,
  // },
];

function normalizeDomain(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .split("/")[0];
}

function isValidDomain(domain: string) {
  return (
    domain.length <= 253 &&
    /^(?=.{1,253}$)(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,63}$/.test(
      domain,
    )
  );
}

export function WebsiteBlocker() {
  const [websites, setWebsites] = useState(initialWebsites);
  const [domain, setDomain] = useState("");
  const [error, setError] = useState("");

  const blockedCount = websites.filter((site) => site.blocked).length;

  useEffect(() => {
    GetDomains().then((domains) => {
      setWebsites(
        domains.map((domain) => ({
          blocked: domain.IsBlocked,
          category: "Custom",
          domain: domain.Url,
          id: crypto.randomUUID(),
        })),
      );
    });
  }, [websites]);

  function addWebsite(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const normalized = normalizeDomain(domain);

    if (!isValidDomain(normalized)) {
      setError("Enter a valid domain, such as example.com.");
      return;
    }

    if (websites.some((site) => site.domain === normalized)) {
      setError("That website is already in your list.");
      return;
    }

    setWebsites((current) => [
      ...current,
      {
        id: crypto.randomUUID(),
        domain: normalized,
        category: "Custom",
        blocked: true,
      },
    ]);

    
    AddDomain(normalized).catch((error) => {
      console.error("Error adding domain:", error);
    });

    setDomain("");
    setError("");
  }

  function toggleWebsite(id: string) {
    setWebsites((current) =>
      current.map((site) =>
        site.id === id ? { ...site, blocked: !site.blocked } : site,
      ),
    );
  }

  function removeWebsite(id: string) {
    setWebsites((current) => current.filter((site) => site.id !== id));
  }

  return (
    <Card className="shadow-none">
      <CardHeader className="flex flex-row items-start justify-between gap-4 space-y-0">
        <div>
          <CardTitle className="text-base">Website restrictions</CardTitle>
          <p className="mt-1 text-sm text-muted-foreground">
            Choose which websites distract you most.
          </p>
        </div>
        <Badge variant="secondary">{blockedCount} blocked</Badge>
      </CardHeader>

      <CardContent>
        <form onSubmit={addWebsite} className="flex gap-2">
          <Input
            value={domain}
            onChange={(event) => {
              setDomain(event.target.value);
              setError("");
            }}
            placeholder="e.g. youtube.com"
            aria-label="Website domain"
            aria-invalid={Boolean(error)}
          />
          <Button type="submit" className="shrink-0 gap-2">
            <Plus className="size-4" />
            <span className="hidden sm:inline">Add website</span>
            <span className="sm:hidden">Add</span>
          </Button>
        </form>

        {error && (
          <p role="alert" className="mt-2 text-sm text-destructive">
            {error}
          </p>
        )}

        <div className="mt-4">
          {websites.length === 0 ? (
            <div className="flex flex-col items-center py-10 text-center">
              <ShieldCheck className="size-8 text-muted-foreground" />
              <p className="mt-3 text-sm font-medium">No websites added</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Add a distracting website to get started.
              </p>
            </div>
          ) : (
            websites.map((website) => (
              <WebsiteItem
                key={website.id}
                website={website}
                onToggle={toggleWebsite}
                onRemove={removeWebsite}
              />
            ))
          )}
        </div>

        <p className="mt-4 rounded-lg bg-muted/50 p-3 text-xs leading-relaxed text-muted-foreground">
          Preview only: changing a website's status does not block or unblock it
          in Windows yet.
        </p>
      </CardContent>
    </Card>
  );
}
