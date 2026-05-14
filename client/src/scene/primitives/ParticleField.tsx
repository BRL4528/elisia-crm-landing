import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { BufferGeometry, BufferAttribute, Points, PointsMaterial, AdditiveBlending } from "three";
import { palette } from "@/lib/three/colors";
import { useMotionPrefs } from "@/providers/MotionPrefsProvider";
import { particlesFor } from "@/hooks/useDeviceTier";

interface Props {
  count?: number;
  radius?: number;
  color?: typeof palette.neural;
  size?: number;
  speed?: number;
}

export function ParticleField({
  count = 2400,
  radius = 8,
  color = palette.neural,
  size = 0.018,
  speed = 0.04,
}: Props) {
  const { tier } = useMotionPrefs();
  const points = useRef<Points>(null);
  const finalCount = particlesFor(tier, count);

  const geometry = useMemo(() => {
    const positions = new Float32Array(finalCount * 3);
    const seeds = new Float32Array(finalCount);
    for (let i = 0; i < finalCount; i++) {
      // Spherical, biased outward
      const r = Math.pow(Math.random(), 0.6) * radius;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3 + 0] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.cos(phi) * 0.6;
      positions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
      seeds[i] = Math.random();
    }
    const g = new BufferGeometry();
    g.setAttribute("position", new BufferAttribute(positions, 3));
    g.setAttribute("aSeed", new BufferAttribute(seeds, 1));
    return g;
  }, [finalCount, radius]);

  const material = useMemo(
    () =>
      new PointsMaterial({
        color,
        size,
        transparent: true,
        opacity: 0.55,
        sizeAttenuation: true,
        depthWrite: false,
        blending: AdditiveBlending,
      }),
    [color, size],
  );

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y = state.clock.elapsedTime * speed;
      points.current.rotation.x = Math.sin(state.clock.elapsedTime * speed * 0.5) * 0.08;
    }
  });

  return <points ref={points} geometry={geometry} material={material} />;
}
