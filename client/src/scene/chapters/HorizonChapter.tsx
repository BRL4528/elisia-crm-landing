import { HorizonRibbon } from "@/scene/primitives/HorizonRibbon";

interface Props {
  intensity: number;
}

export function HorizonChapter({ intensity }: Props) {
  if (intensity <= 0.001) return null;
  return <HorizonRibbon intensity={intensity} />;
}
