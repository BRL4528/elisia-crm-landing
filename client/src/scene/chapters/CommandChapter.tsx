import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Group, Mesh, ShaderMaterial, PlaneGeometry, AdditiveBlending, DoubleSide } from "three";
import { palette } from "@/lib/three/colors";

const vertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragment = /* glsl */ `
  precision highp float;
  uniform vec3  uColor;
  uniform float uTime;
  uniform float uOpacity;
  varying vec2 vUv;

  void main() {
    vec2 c = vUv - 0.5;
    float d = length(c);
    float ring = smoothstep(0.5, 0.46, d) - smoothstep(0.46, 0.42, d);
    float glow = (1.0 - smoothstep(0.0, 0.55, d)) * 0.35;
    float pulse = 0.5 + 0.5 * sin(uTime * 0.8 + d * 16.0);
    float a = (ring * (0.4 + pulse * 0.6) + glow) * uOpacity;
    gl_FragColor = vec4(uColor, a);
  }
`;

interface Props {
  intensity: number;
}

/**
 * COMMAND chapter — floating glowing rings behind the dashboards layer,
 * giving the section a "command center / hologram" depth without competing
 * with the DOM panels on top.
 */
export function CommandChapter({ intensity }: Props) {
  const group = useRef<Group>(null);

  const rings = useMemo(() => {
    return [
      { pos: [-3.2, 0.6, -2.0] as [number, number, number], scale: 2.6, color: palette.emerald.clone() },
      { pos: [3.0, -0.4, -2.4] as [number, number, number], scale: 3.2, color: palette.neural.clone() },
      { pos: [0.4, 1.4, -3.0] as [number, number, number], scale: 2.0, color: palette.emeraldGlow.clone() },
    ];
  }, []);

  const geometry = useMemo(() => new PlaneGeometry(2, 2, 1, 1), []);

  const materials = useMemo(
    () =>
      rings.map(
        (r) =>
          new ShaderMaterial({
            vertexShader: vertex,
            fragmentShader: fragment,
            transparent: true,
            depthWrite: false,
            blending: AdditiveBlending,
            side: DoubleSide,
            uniforms: {
              uTime: { value: Math.random() * 10 },
              uColor: { value: r.color },
              uOpacity: { value: 1 },
            },
          }),
      ),
    [rings],
  );

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    materials.forEach((m, i) => {
      m.uniforms.uTime.value = t + i * 1.7;
      m.uniforms.uOpacity.value = intensity;
    });
    if (group.current) {
      group.current.rotation.y = Math.sin(t * 0.1) * 0.06;
    }
  });

  if (intensity <= 0.001) return null;

  return (
    <group ref={group}>
      {rings.map((r, i) => (
        <mesh
          key={i}
          geometry={geometry}
          material={materials[i]}
          position={r.pos}
          scale={r.scale}
          rotation={[0, 0, i * 0.4]}
        />
      ))}
    </group>
  );
}
