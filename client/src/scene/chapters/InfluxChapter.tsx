import { useMemo } from "react";
import { Color } from "three";
import { DataStream } from "@/scene/primitives/DataStream";
import { palette } from "@/lib/three/colors";

interface Props {
  intensity: number;
}

const CHANNELS: { origin: [number, number, number]; color: Color; count: number }[] = [
  { origin: [-5.5, 2.2, -1.5], color: palette.emerald.clone(), count: 90 },
  { origin: [5.6, 1.8, -1.2], color: palette.neural.clone(), count: 90 },
  { origin: [-4.8, -1.6, 1.4], color: palette.emeraldGlow.clone(), count: 70 },
  { origin: [4.9, -1.7, 1.5], color: palette.signal.clone(), count: 70 },
  { origin: [0.0, 3.4, -2.2], color: palette.emerald.clone(), count: 80 },
  { origin: [0.0, -3.2, 1.8], color: palette.neural.clone(), count: 60 },
];

export function InfluxChapter({ intensity }: Props) {
  const target = useMemo<[number, number, number]>(() => [0, 0, 0], []);

  if (intensity <= 0.001) return null;

  return (
    <group>
      {CHANNELS.map((c, i) => (
        <DataStream
          key={i}
          origin={c.origin}
          target={target}
          color={c.color}
          count={c.count}
          curve={0.6 + (i % 3) * 0.25}
          intensity={intensity}
          size={6}
          speed={0.18 + (i % 4) * 0.04}
        />
      ))}
    </group>
  );
}
