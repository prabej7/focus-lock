import { useEffect, useState } from "react";
import { Pause, Play, RotateCcw, Timer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const SESSION_MINUTES = 25;
const INITIAL_SECONDS = SESSION_MINUTES * 60;

function formatTime(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

type FocusTimerProps = {
  initialMinutes?: number;
};

export function FocusTimer({ initialMinutes = 25 }: FocusTimerProps) {
  const [remaining, setRemaining] = useState(initialMinutes * 60);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning || remaining === 0) return;

    const timerId = window.setInterval(() => {
      setRemaining((seconds) => Math.max(0, seconds - 1));
    }, 1000);

    return () => window.clearInterval(timerId);
  }, [isRunning, remaining]);

  useEffect(() => {
    if (remaining === 0) setIsRunning(false);
  }, [remaining]);

  const progress = ((INITIAL_SECONDS - remaining) / INITIAL_SECONDS) * 100;

  function resetTimer() {
    setIsRunning(false);
    setRemaining(INITIAL_SECONDS);
  }

  return (
    <Card className="overflow-hidden shadow-none">
      <CardContent className="p-6 sm:p-8">
        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <Timer className="size-4" />
          Focus session
        </div>

        <div className="mx-auto mt-8 flex max-w-sm flex-col items-center text-center">
          <div
            className="relative flex size-52 items-center justify-center rounded-full"
            style={{
              background: `conic-gradient(hsl(var(--primary)) ${progress}%, hsl(var(--muted)) ${progress}%)`,
            }}
          >
            <div className="flex size-44 flex-col items-center justify-center rounded-full bg-card">
              <span className="text-5xl font-semibold tabular-nums tracking-tight">
                {formatTime(remaining)}
              </span>
              <span className="mt-2 text-sm text-muted-foreground">
                {remaining === 0
                  ? "Session complete"
                  : isRunning
                    ? "Stay focused"
                    : "Ready when you are"}
              </span>
            </div>
          </div>

          <p className="mt-6 max-w-xs text-sm leading-relaxed text-muted-foreground">
            One task at a time. Give your attention to what matters.
          </p>

          <div className="mt-6 flex items-center gap-3">
            <Button
              onClick={() => setIsRunning((running) => !running)}
              disabled={remaining === 0}
              className="min-w-32 gap-2"
            >
              {isRunning ? (
                <>
                  <Pause className="size-4" />
                  Pause
                </>
              ) : (
                <>
                  <Play className="size-4" />
                  Start focus
                </>
              )}
            </Button>

            <Button
              variant="outline"
              size="icon"
              onClick={resetTimer}
              aria-label="Reset timer"
            >
              <RotateCcw className="size-4" />
            </Button>
          </div>

          <p className="mt-4 text-xs text-muted-foreground">
            25-minute session · Short break afterward
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
