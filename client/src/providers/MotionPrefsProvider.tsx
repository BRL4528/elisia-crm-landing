import { createContext, ReactNode, useContext, useMemo } from "react";
import { useDeviceTier, DeviceTier } from "@/hooks/useDeviceTier";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

interface MotionPrefs {
  tier: DeviceTier;
  reduced: boolean;
  enable3D: boolean;
  enablePostFX: boolean;
}

const Ctx = createContext<MotionPrefs | null>(null);

export function MotionPrefsProvider({ children }: { children: ReactNode }) {
  const tier = useDeviceTier();
  const reduced = usePrefersReducedMotion();

  const value = useMemo<MotionPrefs>(
    () => ({
      tier,
      reduced,
      enable3D: !reduced,
      enablePostFX: !reduced && tier !== "low",
    }),
    [tier, reduced],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useMotionPrefs() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useMotionPrefs must be inside MotionPrefsProvider");
  return v;
}
