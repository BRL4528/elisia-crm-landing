import { createContext, ReactNode, useContext, useEffect, useRef, useState } from "react";

export type PhaseId = "core" | "influx" | "synapse" | "command" | "horizon";

export const PHASES: PhaseId[] = ["core", "influx", "synapse", "command", "horizon"];

export interface ScenePhaseState {
  /** Currently most-visible chapter (0..4). */
  active: number;
  /** Global page progress 0..1, written every frame by ScrollTrigger. */
  progressRef: React.MutableRefObject<number>;
  setActive: (n: number) => void;
}

const Ctx = createContext<ScenePhaseState | null>(null);

export function ScenePhaseProvider({ children }: { children: ReactNode }) {
  const [active, setActive] = useState(0);
  const progressRef = useRef(0);

  // Update <body data-phase> for CSS-driven backdrop changes
  useEffect(() => {
    document.body.dataset.phase = String(active);
  }, [active]);

  return (
    <Ctx.Provider value={{ active, progressRef, setActive }}>{children}</Ctx.Provider>
  );
}

export function useScenePhase() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useScenePhase must be inside ScenePhaseProvider");
  return v;
}
