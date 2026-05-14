import { useEffect, useState } from "react";

export type DeviceTier = "low" | "mid" | "high";

/**
 * Coarse device capability heuristic. Drives particle count, postFX intensity,
 * pixel ratio cap. Cheap and deterministic — no per-frame profiling.
 */
export function useDeviceTier(): DeviceTier {
  const [tier, setTier] = useState<DeviceTier>("mid");

  useEffect(() => {
    if (typeof window === "undefined") return;

    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const isCoarse = window.matchMedia("(pointer: coarse)").matches;
    const lowMem = (navigator as any).deviceMemory && (navigator as any).deviceMemory <= 4;
    const lowCpu = (navigator as any).hardwareConcurrency && (navigator as any).hardwareConcurrency <= 4;
    const dpr = window.devicePixelRatio || 1;

    if (isMobile || isCoarse || lowMem) {
      setTier("low");
    } else if (lowCpu || dpr < 1.5) {
      setTier("mid");
    } else {
      setTier("high");
    }
  }, []);

  return tier;
}

export function dprFor(tier: DeviceTier): [number, number] {
  if (tier === "low") return [1, 1.25];
  if (tier === "mid") return [1, 1.5];
  return [1, 2];
}

export function particlesFor(tier: DeviceTier, base: number): number {
  if (tier === "low") return Math.round(base * 0.35);
  if (tier === "mid") return Math.round(base * 0.7);
  return base;
}
