import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import {
  BufferGeometry,
  BufferAttribute,
  LineSegments,
  LineBasicMaterial,
  Group,
  Vector3,
  AdditiveBlending,
} from "three";
import { palette, hex } from "@/lib/three/colors";
import { useMotionPrefs } from "@/providers/MotionPrefsProvider";
import { particlesFor } from "@/hooks/useDeviceTier";

interface Props {
  nodeCount?: number;
  radius?: number;
  intensity?: number;
}

/**
 * Volumetric neural mesh — nodes scattered through a torus-shaped region,
 * connected by short edges to nearest neighbors. Reads as "synapses firing".
 */
export function NeuralGraph({ nodeCount = 110, radius = 3.2, intensity = 1 }: Props) {
  const { tier } = useMotionPrefs();
  const group = useRef<Group>(null);
  const lines = useRef<LineSegments>(null);

  const count = particlesFor(tier, nodeCount);

  const { nodes, edgesGeometry, nodesGeometry } = useMemo(() => {
    const nodes: Vector3[] = [];
    for (let i = 0; i < count; i++) {
      const t = Math.random() * Math.PI * 2;
      const u = Math.random() * Math.PI * 2;
      const r = radius + (Math.random() - 0.5) * 1.4;
      const tube = 0.9 + Math.random() * 0.6;
      const x = (r + tube * Math.cos(u)) * Math.cos(t);
      const y = tube * Math.sin(u) * 0.7;
      const z = (r + tube * Math.cos(u)) * Math.sin(t);
      nodes.push(new Vector3(x, y, z));
    }

    // Nearest-neighbor edges (k=2)
    const edges: number[] = [];
    for (let i = 0; i < nodes.length; i++) {
      const distances: { j: number; d: number }[] = [];
      for (let j = 0; j < nodes.length; j++) {
        if (i === j) continue;
        distances.push({ j, d: nodes[i].distanceToSquared(nodes[j]) });
      }
      distances.sort((a, b) => a.d - b.d);
      for (let k = 0; k < 2; k++) {
        const a = nodes[i];
        const b = nodes[distances[k].j];
        edges.push(a.x, a.y, a.z, b.x, b.y, b.z);
      }
    }

    const positions = new Float32Array(nodes.flatMap((n) => [n.x, n.y, n.z]));
    const nodesGeometry = new BufferGeometry();
    nodesGeometry.setAttribute("position", new BufferAttribute(positions, 3));

    const edgesGeometry = new BufferGeometry();
    edgesGeometry.setAttribute("position", new BufferAttribute(new Float32Array(edges), 3));

    return { nodes, edgesGeometry, nodesGeometry };
  }, [count, radius]);

  const lineMat = useMemo(
    () =>
      new LineBasicMaterial({
        color: palette.neural,
        transparent: true,
        opacity: 0.22,
        blending: AdditiveBlending,
        depthWrite: false,
      }),
    [],
  );

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (group.current) {
      group.current.rotation.y = t * 0.04;
      group.current.rotation.x = Math.sin(t * 0.18) * 0.06;
    }
    if (lines.current) {
      const mat = lines.current.material as LineBasicMaterial;
      mat.opacity = 0.18 * intensity + 0.06 * Math.sin(t * 1.6);
    }
  });

  return (
    <group ref={group} scale={intensity * 0.9 + 0.1}>
      <points geometry={nodesGeometry}>
        <pointsMaterial
          color={hex.emerald}
          size={0.06}
          transparent
          opacity={0.85 * intensity}
          blending={AdditiveBlending}
          sizeAttenuation
          depthWrite={false}
        />
      </points>
      <lineSegments ref={lines} geometry={edgesGeometry} material={lineMat} />
    </group>
  );
}
