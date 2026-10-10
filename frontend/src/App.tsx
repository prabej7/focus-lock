import { useEffect, useState } from "react";
import { X } from "lucide-react";

import { FocusTimer } from "@/components/focus/FocusTimer";
import { WebsiteBlocker } from "@/components/websites/WebsiteBlocker";
import { TitleBar } from "@/components/layout/TitleBar";
import { PageNav, type Page } from "@/components/layout/PageNav";
import { GetDuration, SetDuration } from "../wailsjs/go/main/App";

export default function App() {
  const [page, setPage] = useState<Page>("focus");
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [focusMinutes, setFocusMinutes] = useState(25);

  useEffect(() => {
    GetDuration().then((minutes) => {
      setFocusMinutes(minutes);
    });
  }, []);

  return (
    <main className="relative flex h-screen flex-col overflow-hidden bg-background text-foreground">
      <TitleBar onSettingsClick={() => setSettingsOpen(true)} />

      <PageNav page={page} onPageChange={setPage} />

      <div className="min-h-0 flex-1 overflow-hidden p-4">
        {page === "focus" ? (
          <section className="mx-auto flex h-full max-w-sm flex-col justify-center">
            <FocusTimer key={focusMinutes} initialMinutes={focusMinutes} />
          </section>
        ) : (
          <section className="h-full overflow-y-auto">
            <WebsiteBlocker />
          </section>
        )}
      </div>

      {settingsOpen && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/40 p-6">
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="settings-title"
            className="w-full max-w-sm rounded-xl border bg-background p-5 shadow-xl"
          >
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 id="settings-title" className="text-base font-semibold">
                  Settings
                </h2>

                <p className="text-xs text-muted-foreground">
                  Customize your focus session.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSettingsOpen(false)}
                aria-label="Close settings"
                className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <X className="size-4" />
              </button>
            </div>

            <label className="mb-2 block text-sm font-medium">
              Focus duration
            </label>

            <div className="grid grid-cols-4 gap-2">
              {[15, 25, 45, 60].map((minutes) => (
                <button
                  key={minutes}
                  type="button"
                  onClick={() =>
                    SetDuration(minutes).then(() => setFocusMinutes(minutes))
                  }
                  aria-pressed={focusMinutes === minutes}
                  className={`rounded-lg border px-2 py-2 text-sm transition-colors ${
                    focusMinutes === minutes
                      ? "border-foreground bg-foreground text-background"
                      : "hover:bg-muted"
                  }`}
                >
                  {minutes}m
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setSettingsOpen(false)}
              className="mt-6 w-full rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background transition-opacity hover:opacity-90"
            >
              Done
            </button>
          </section>
        </div>
      )}
    </main>
  );
}
