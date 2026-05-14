import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useScenePhase } from "@/providers/ScenePhaseProvider";
import { smoothstep } from "@/lib/three/lerp";
import { AtmosphereLights } from "@/scene/primitives/AtmosphereLights";
import { LeadField } from "@/scene/primitives/LeadField";
import { FunnelFormation } from "@/scene/primitives/FunnelFormation";
import { SynapseChapter } from "@/scene/chapters/SynapseChapter";
import { CommandChapter } from "@/scene/chapters/CommandChapter";
import { HorizonChapter } from "@/scene/chapters/HorizonChapter";
import { CameraRig } from "@/scene/CameraRig";

/**
 * Stage — single 3D world.
 *
 * Narrative:
 *   0.00–0.20  CORE     leads scattered across the digital wild
 *   0.10–0.40  INFLUX   leads converge into the funnel (Elisia captures)
 *   0.40–0.60  SYNAPSE  captured leads route through automations
 *   0.60–0.80  COMMAND  operational dashboards over the converged state
 *   0.80–1.00  HORIZON  wide hero shot + CTA
 *
 * LeadField + FunnelFormation are scene-level (persistent), driven by
 * `gather` and `funnel` curves derived from global scroll progress. This
 * makes the lead→funnel handoff feel like one continuous animation.
 */
export function Stage() {
  const { progressRef } = useScenePhase();
  const [intensities, setIntensities] = useState<{
    gather: number;
    funnel: number;
    leadOpacity: number;
    synapse: number;
    command: number;
    horizon: number;
  }>({
    gather: 0,
    funnel: 0,
    leadOpacity: 1,
    synapse: 0,
    command: 0,
    horizon: 0,
  });
  const lastWritten = useRef(0);

  useFrame((state) => {
    const p = progressRef.current;
    if (state.clock.elapsedTime - lastWritten.current < 0.05) return;
    lastWritten.current = state.clock.elapsedTime;

    // gather: rises from 0 → 1 across CORE→INFLUX (the capture animation)
    const gather = smoothstep(0.05, 0.32, p);
    // funnel visibility: appears slightly before gather peaks, holds through INFLUX
    const funnel = smoothstep(0.10, 0.30, p) * (1 - smoothstep(0.55, 0.70, p));
    // leads fade out as we leave INFLUX (handoff to neural graph)
    const leadOpacity = 1 - smoothstep(0.42, 0.62, p) * 0.85;

    const synapse = smoothstep(0.40, 0.55, p) * (1 - smoothstep(0.62, 0.74, p));
    const command = smoothstep(0.58, 0.70, p) * (1 - smoothstep(0.78, 0.90, p));
    const horizon = smoothstep(0.78, 0.90, p);

    setIntensities({ gather, funnel, leadOpacity, synapse, command, horizon });
  });

  return (
    <>
      <AtmosphereLights />
      <CameraRig />

      <LeadField gather={intensities.gather} opacity={intensities.leadOpacity} count={720} />
      <FunnelFormation intensity={intensities.funnel} />

      <SynapseChapter intensity={intensities.synapse} />
      <CommandChapter intensity={intensities.command} />
      <HorizonChapter intensity={intensities.horizon} />
    </>
  );
}
