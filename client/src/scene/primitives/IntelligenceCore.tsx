import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { IcosahedronGeometry, ShaderMaterial, Mesh, AdditiveBlending } from "three";
import { palette, hex } from "@/lib/three/colors";
import { orbVertex, orbFragment } from "@/shaders/orb";
import { useMousePointer } from "@/hooks/useMousePointer";

interface Props {
  intensity?: number; // 0..1 — fades the orb in/out per chapter
  scale?: number;
  detail?: number; // subdivision level
}

export function IntelligenceCore({ intensity = 1, scale = 1, detail = 64 }: Props) {
  const mesh = useRef<Mesh>(null);
  const halo = useRef<Mesh>(null);
  const { ref: pointer, update } = useMousePointer(0.06);

  const geometry = useMemo(() => new IcosahedronGeometry(1, detail), [detail]);
  const haloGeometry = useMemo(() => new IcosahedronGeometry(1.18, 32), []);

  const material = useMemo(() => {
    return new ShaderMaterial({
      vertexShader: orbVertex,
      fragmentShader: orbFragment,
      transparent: true,
      depthWrite: false,
      uniforms: {
        uTime: { value: 0 },
        uDisplacement: { value: 0.22 },
        uPulse: { value: 1 },
        uPointer: { value: [0, 0] },
        uColorA: { value: palette.emeraldDeep },
        uColorB: { value: palette.neural },
        uColorRim: { value: palette.emeraldGlow },
        uOpacity: { value: 1 },
      },
    });
  }, []);

  const haloMaterial = useMemo(() => {
    return new ShaderMaterial({
      vertexShader: orbVertex,
      fragmentShader: orbFragment,
      transparent: true,
      depthWrite: false,
      blending: AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uDisplacement: { value: 0.06 },
        uPulse: { value: 0.6 },
        uPointer: { value: [0, 0] },
        uColorA: { value: palette.neural },
        uColorB: { value: palette.emeraldGlow },
        uColorRim: { value: palette.signal },
        uOpacity: { value: 0.35 },
      },
    });
  }, []);

  useFrame((state, dt) => {
    update(dt);
    const t = state.clock.elapsedTime;

    material.uniforms.uTime.value = t;
    material.uniforms.uOpacity.value = intensity;
    material.uniforms.uPointer.value = [pointer.current.x, pointer.current.y];
    // Breath: slow pulse on displacement
    material.uniforms.uDisplacement.value = 0.18 + Math.sin(t * 0.45) * 0.04;

    haloMaterial.uniforms.uTime.value = t * 0.7;
    haloMaterial.uniforms.uOpacity.value = 0.32 * intensity;
    haloMaterial.uniforms.uPointer.value = [pointer.current.x * 0.4, pointer.current.y * 0.4];

    if (mesh.current) {
      mesh.current.rotation.y = t * 0.06;
      mesh.current.rotation.x = Math.sin(t * 0.3) * 0.12 + pointer.current.y * 0.08;
      mesh.current.position.x = pointer.current.x * 0.08;
    }
    if (halo.current) {
      halo.current.rotation.y = -t * 0.04;
      halo.current.rotation.z = Math.sin(t * 0.2) * 0.08;
    }
  });

  return (
    <group scale={scale}>
      <mesh ref={halo} geometry={haloGeometry} material={haloMaterial} renderOrder={1} />
      <mesh ref={mesh} geometry={geometry} material={material} renderOrder={2} />
      <pointLight position={[0, 0, 0]} intensity={2.5 * intensity} color={hex.emerald} distance={6} />
      <pointLight position={[0.6, 0.4, 0.6]} intensity={1.2 * intensity} color={hex.neural} distance={4} />
    </group>
  );
}
