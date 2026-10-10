import { useEffect, useState } from "react";
import { Pause, Play, RotateCcw, Timer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import AuroraBackground, {
  FloatingOrbsBackground,
  LiquidBlobsBackground,
  NeonGridBackground,
  RipplesBackground,
  WaveLinesBackground,
} from "../AuraBackground";
import { Background } from "../AnimatedBackground";
import { useBackground } from "../BackgroundContext";

function formatTime(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

type FocusTimerProps = {
  initialMinutes?: number;
};

export function FocusTimer({ initialMinutes = 25 }: FocusTimerProps) {
  const totalSeconds = initialMinutes * 60;
  const { variant } = useBackground();
  const [remaining, setRemaining] = useState(totalSeconds);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning || remaining === 0) return;

    const timerId = window.setInterval(() => {
      setRemaining((seconds) => Math.max(0, seconds - 1));
    }, 1000);

    return () => window.clearInterval(timerId);
  }, [isRunning, remaining]);

  useEffect(() => {
    if (remaining === 0) {
      setIsRunning(false);
    }
  }, [remaining]);

  const progress = Math.min(
    100,
    Math.max(0, ((totalSeconds - remaining) / totalSeconds) * 100),
  );

  function resetTimer() {
    setIsRunning(false);
    setRemaining(totalSeconds);
  }

  return (
    <Card className="w-full h-90  border-0 py-0 shadow-none">
      <Background variant={variant} isRunning={isRunning} />
      <CardContent className="flex h-full flex-col items-center justify-center gap-8 px-4 py-2">
        {/* Header */}
        <div className="flex items-center justify-center gap-2 text-sm font-medium text-muted-foreground">
          <Timer className="size-4 text-primary" />
          <span>Focus session</span>
        </div>

        {/* Timer ring */}
        <div
          className="relative flex size-44 shrink-0 items-center justify-center rounded-full"
          style={{
            background: `conic-gradient(var(--primary) ${progress}%, var(--muted) ${progress}%)`,
          }}
        >
          {/* Inner circle */}
          <div className="flex size-41 flex-col items-center justify-center rounded-full bg-background">
            <span className="text-4xl font-semibold tracking-tight tabular-nums">
              {formatTime(remaining)}
            </span>

            <span className="mt-2 text-xs font-medium text-muted-foreground">
              {remaining === 0
                ? "Session complete"
                : isRunning
                  ? "Stay focused"
                  : "Ready when you are"}
            </span>
          </div>
        </div>

        {/* Controls — centered under the timer */}
        {/* Controls — Start centered under the timer, reset pinned right */}
        <div className="relative flex w-full items-center justify-center">
          <Button
            onClick={() => setIsRunning((running) => !running)}
            disabled={remaining === 0}
            className="h-10 min-w-36 gap-2 font-medium"
          >
            {isRunning ? (
              <>
                <Pause className="size-4" />
                Pause session
              </>
            ) : (
              <>
                <Play className="size-4" />
                Start focus
              </>
            )}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={resetTimer}
            aria-label="Reset timer"
            title="Reset timer"
            className="absolute right-0 size-10 text-muted-foreground hover:text-foreground"
          >
            <RotateCcw className="size-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
