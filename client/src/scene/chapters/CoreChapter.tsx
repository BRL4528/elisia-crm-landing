import { IntelligenceCore } from "@/scene/primitives/IntelligenceCore";
import { ParticleField } from "@/scene/primitives/ParticleField";

interface Props {
  intensity: number;
}

export function CoreChapter({ intensity }: Props) {
  return (
    <group>
      <IntelligenceCore intensity={Math.max(0.35, intensity)} scale={1.3} />
      <ParticleField count={2400} radius={8} size={0.018} />
    </group>
  );
}
