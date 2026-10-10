import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type BackgroundVariant =
  | "aurora"
  | "liquid"
  | "waves"
  | "grid"
  | "orbs"
  | "ripples"
  | "none";

export const BACKGROUND_VARIANTS: BackgroundVariant[] = [
  "aurora",
  "liquid",
  "waves",
  "grid",
  "orbs",
  "ripples",
  "none",
];

const STORAGE_KEY = "focuslock.background";

type BackgroundContextValue = {
  variant: BackgroundVariant;
  setVariant: (v: BackgroundVariant) => void;
  cycleVariant: () => void;
  variants: BackgroundVariant[];
};

const BackgroundContext = createContext<BackgroundContextValue | null>(null);

function readInitialVariant(): BackgroundVariant {
  if (typeof window === "undefined") return "aurora";
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored && BACKGROUND_VARIANTS.includes(stored as BackgroundVariant)) {
      return stored as BackgroundVariant;
    }
  } catch {
    // ignore (private mode, etc.)
  }
  return "aurora";
}

export function BackgroundProvider({ children }: { children: ReactNode }) {
  const [variant, setVariantState] = useState<BackgroundVariant>(readInitialVariant);

  // Persist on change
  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, variant);
    } catch {
      // ignore
    }
  }, [variant]);

  const setVariant = useCallback((v: BackgroundVariant) => {
    setVariantState(v);
  }, []);

  const cycleVariant = useCallback(() => {
    setVariantState((current) => {
      const idx = BACKGROUND_VARIANTS.indexOf(current);
      const next = BACKGROUND_VARIANTS[(idx + 1) % BACKGROUND_VARIANTS.length];
      return next;
    });
  }, []);

  const value = useMemo(
    () => ({
      variant,
      setVariant,
      cycleVariant,
      variants: BACKGROUND_VARIANTS,
    }),
    [variant, setVariant, cycleVariant],
  );

  return (
    <BackgroundContext.Provider value={value}>
      {children}
    </BackgroundContext.Provider>
  );
}

export function useBackground() {
  const ctx = useContext(BackgroundContext);
  if (!ctx) {
    throw new Error("useBackground must be used inside <BackgroundProvider>");
  }
  return ctx;
}