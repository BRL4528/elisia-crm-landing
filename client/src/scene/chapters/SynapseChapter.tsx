import { NeuralGraph } from "@/scene/primitives/NeuralGraph";

interface Props {
  intensity: number;
}

export function SynapseChapter({ intensity }: Props) {
  if (intensity <= 0.001) return null;
  return <NeuralGraph nodeCount={130} radius={3.4} intensity={intensity} />;
}
