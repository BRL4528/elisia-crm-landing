import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh, PlaneGeometry, ShaderMaterial, DoubleSide } from "three";
import { palette } from "@/lib/three/colors";

const vertex = /* glsl */ `
  uniform float uTime;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    vec3 pos = position;
    pos.y += sin(pos.x * 1.4 + uTime * 0.6) * 0.18;
    pos.y += sin(pos.x * 0.6 - uTime * 0.4) * 0.12;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragment = /* glsl */ `
  precision highp float;
  uniform float uTime;
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform float uOpacity;
  varying vec2 vUv;

  void main() {
    // Narrow vertical band — the horizon glow itself
    float band = smoothstep(0.30, 0.50, vUv.y) * (1.0 - smoothstep(0.55, 0.78, vUv.y));

    // Horizontal envelope: brightest at center, dissolves softly at both ends
    // → reads as an infinite horizon receding into the void, no hard edges
    float horizontal = pow(sin(vUv.x * 3.14159), 1.2);

    // Wide-tail edge fade — guarantees zero opacity at the very ends
    float edgeFade = smoothstep(0.0, 0.12, vUv.x) * (1.0 - smoothstep(0.88, 1.0, vUv.x));

    float gradient = band * horizontal * edgeFade;

    vec3 col = mix(uColorA, uColorB, vUv.x + sin(uTime * 0.3 + vUv.y * 4.0) * 0.1);
    float glow = pow(gradient, 1.8);
    gl_FragColor = vec4(col * glow * 0.7, glow * uOpacity * 0.7);
  }
`;

interface Props {
  intensity?: number;
}

export function HorizonRibbon({ intensity = 1 }: Props) {
  const mesh = useRef<Mesh>(null);

  // Plane overshoots viewport on both sides — fragment fade dissolves edges
  const geometry = useMemo(() => new PlaneGeometry(80, 6, 120, 8), []);
  const material = useMemo(
    () =>
      new ShaderMaterial({
        vertexShader: vertex,
        fragmentShader: fragment,
        transparent: true,
        depthWrite: false,
        side: DoubleSide,
        uniforms: {
          uTime: { value: 0 },
          uColorA: { value: palette.emerald },
          uColorB: { value: palette.neural },
          uOpacity: { value: 1 },
        },
      }),
    [],
  );

  useFrame((state) => {
    material.uniforms.uTime.value = state.clock.elapsedTime;
    material.uniforms.uOpacity.value = intensity;
  });

  return (
    <mesh
      ref={mesh}
      geometry={geometry}
      material={material}
      position={[0, -3.2, -16]}
      rotation={[0, 0, 0]}
    />
  );
}
