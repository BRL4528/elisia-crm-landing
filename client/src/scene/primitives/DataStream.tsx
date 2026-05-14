import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { BufferGeometry, BufferAttribute, Points, ShaderMaterial, Color, AdditiveBlending } from "three";
import { streamVertex, streamFragment } from "@/shaders/stream";

interface Props {
  origin: [number, number, number];
  target: [number, number, number];
  color: Color;
  count?: number;
  curve?: number;
  intensity?: number;
  size?: number;
  speed?: number;
}

export function DataStream({
  origin,
  target,
  color,
  count = 60,
  curve = 0.8,
  intensity = 1,
  size = 6,
  speed = 0.25,
}: Props) {
  const points = useRef<Points>(null);

  const geometry = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const offsets = new Float32Array(count);
    const speeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      offsets[i] = Math.random();
      speeds[i] = speed * (0.6 + Math.random() * 0.9);
    }
    const g = new BufferGeometry();
    g.setAttribute("position", new BufferAttribute(positions, 3));
    g.setAttribute("aOffset", new BufferAttribute(offsets, 1));
    g.setAttribute("aSpeed", new BufferAttribute(speeds, 1));
    return g;
  }, [count, speed]);

  const material = useMemo(() => {
    return new ShaderMaterial({
      vertexShader: streamVertex,
      fragmentShader: streamFragment,
      transparent: true,
      depthWrite: false,
      blending: AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uIntensity: { value: intensity },
        uOrigin: { value: origin },
        uTarget: { value: target },
        uCurve: { value: curve },
        uSize: { value: size },
        uColor: { value: color },
        uOpacity: { value: 1 },
      },
    });
  }, [origin, target, color, curve, intensity, size]);

  useFrame((state) => {
    material.uniforms.uTime.value = state.clock.elapsedTime;
    material.uniforms.uIntensity.value = intensity;
  });

  return <points ref={points} geometry={geometry} material={material} />;
}
