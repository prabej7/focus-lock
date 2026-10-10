import AuroraBackground, {
  LiquidBlobsBackground,
  WaveLinesBackground,
  NeonGridBackground,
  FloatingOrbsBackground,
  RipplesBackground,
} from "./AuraBackground";

export type BackgroundVariant =
  | "aurora"
  | "liquid"
  | "waves"
  | "grid"
  | "orbs"
  | "ripples"
  | "none";

type BackgroundProps = {
  variant?: BackgroundVariant;
  isRunning: boolean;
};

export function Background({
  variant = "aurora",
  isRunning,
}: BackgroundProps) {
  switch (variant) {
    case "aurora":
      return <AuroraBackground isRunning={isRunning} />;
    case "liquid":
      return <LiquidBlobsBackground isRunning={isRunning} />;
    case "waves":
      return <WaveLinesBackground isRunning={isRunning} />;
    case "grid":
      return <NeonGridBackground isRunning={isRunning} />;
    case "orbs":
      return <FloatingOrbsBackground isRunning={isRunning} />;
    case "ripples":
      return <RipplesBackground isRunning={isRunning} />;
    case "none":
    default:
      return null;
  }
}