import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import {
  BufferGeometry,
  BufferAttribute,
  LineSegments,
  LineBasicMaterial,
  AdditiveBlending,
  Group,
  ShaderMaterial,
  CircleGeometry,
  Mesh,
} from "three";
import { hex } from "@/lib/three/colors";

interface Props {
  /** 0 = invisible · 1 = fully formed. Tracks scroll gather curve. */
  intensity: number;
}

const TOP_Y = 1.6;
const BOTTOM_Y = -1.8;
const TOP_R = 2.2;
const BOTTOM_R = 0.16;
const LEVELS = 5;
const SLICES = 56;

/**
 * Inverted truncated cone built from layered circles + connecting tendrils.
 * Reads as the "operational funnel" — leads enter wide at the top and
 * converge through the narrow outlet at the bottom.
 *
 * Three layers stacked:
 *   1. Horizontal rings — funnel silhouette (subtle)
 *   2. Vertical tendrils — flow lines suggesting capture direction
 *   3. Outlet disc — a soft glow at the bottom where leads "leave" the
 *      funnel into the CRM
 */
export function FunnelFormation({ intensity }: Props) {
  const group = useRef<Group>(null);
  const rings = useRef<LineSegments>(null);
  const tendrils = useRef<LineSegments>(null);
  const outlet = useRef<Mesh>(null);

  // ── Horizontal rings ──────────────────────────────────────────────────
  const ringGeometry = useMemo(() => {
    const verts: number[] = [];
    for (let i = 0; i < LEVELS; i++) {
      const t = i / (LEVELS - 1);
      const y = TOP_Y + (BOTTOM_Y - TOP_Y) * t;
      const r = TOP_R + (BOTTOM_R - TOP_R) * t;
      for (let s = 0; s < SLICES; s++) {
        const a = (s / SLICES) * Math.PI * 2;
        const b = ((s + 1) / SLICES) * Math.PI * 2;
        verts.push(Math.cos(a) * r, y, Math.sin(a) * r);
        verts.push(Math.cos(b) * r, y, Math.sin(b) * r);
      }
    }
    const g = new BufferGeometry();
    g.setAttribute("position", new BufferAttribute(new Float32Array(verts), 3));
    return g;
  }, []);

  // ── Vertical tendrils ─────────────────────────────────────────────────
  const tendrilGeometry = useMemo(() => {
    const verts: number[] = [];
    const TENDRILS = 18;
    for (let i = 0; i < TENDRILS; i++) {
      const a = (i / TENDRILS) * Math.PI * 2;
      const cos = Math.cos(a);
      const sin = Math.sin(a);
      for (let s = 0; s < 12; s++) {
        const t1 = s / 12;
        const t2 = (s + 1) / 12;
        // Slightly curved inward as it descends (s-curve via easing)
        const r1 = TOP_R + (BOTTOM_R - TOP_R) * Math.pow(t1, 0.85);
        const r2 = TOP_R + (BOTTOM_R - TOP_R) * Math.pow(t2, 0.85);
        const y1 = TOP_Y + (BOTTOM_Y - TOP_Y) * t1;
        const y2 = TOP_Y + (BOTTOM_Y - TOP_Y) * t2;
        verts.push(cos * r1, y1, sin * r1);
        verts.push(cos * r2, y2, sin * r2);
      }
    }
    const g = new BufferGeometry();
    g.setAttribute("position", new BufferAttribute(new Float32Array(verts), 3));
    return g;
  }, []);

  // ── Outlet disc (glow at the bottom) ──────────────────────────────────
  const outletGeometry = useMemo(() => new CircleGeometry(0.55, 64), []);

  const outletMaterial = useMemo(
    () =>
      new ShaderMaterial({
        transparent: true,
        depthWrite: false,
        blending: AdditiveBlending,
        uniforms: {
          uTime: { value: 0 },
          uOpacity: { value: 0 },
        },
        vertexShader: /* glsl */ `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: /* glsl */ `
          precision highp float;
          uniform float uTime;
          uniform float uOpacity;
          varying vec2 vUv;
          void main() {
            float d = length(vUv - 0.5);
            float g = smoothstep(0.5, 0.0, d);
            float pulse = 0.8 + 0.2 * sin(uTime * 1.6);
            vec3 col = mix(vec3(0.36, 0.92, 0.83), vec3(0.13, 0.83, 0.93), d * 1.4);
            gl_FragColor = vec4(col * pulse, g * uOpacity);
          }
        `,
      }),
    [],
  );

  const ringMaterial = useMemo(
    () =>
      new LineBasicMaterial({
        color: hex.emerald,
        transparent: true,
        opacity: 0,
        blending: AdditiveBlending,
        depthWrite: false,
      }),
    [],
  );

  const tendrilMaterial = useMemo(
    () =>
      new LineBasicMaterial({
        color: hex.neural,
        transparent: true,
        opacity: 0,
        blending: AdditiveBlending,
        depthWrite: false,
      }),
    [],
  );

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const I = Math.max(0, Math.min(1, intensity));

    // Rings: fade in subtly
    ringMaterial.opacity = 0.28 * I + 0.04 * Math.sin(t * 1.1) * I;

    // Tendrils: stronger fade — they suggest the flow path
    tendrilMaterial.opacity = 0.22 * I + 0.05 * Math.sin(t * 1.4 + 1.2) * I;

    // Outlet pulses brighter as more leads converge
    outletMaterial.uniforms.uTime.value = t;
    outletMaterial.uniforms.uOpacity.value = 0.55 * I;

    // Group breathes very slightly — feels alive
    if (group.current) {
      const breath = 1 + Math.sin(t * 0.6) * 0.012;
      group.current.scale.setScalar(breath);
      group.current.rotation.y = t * 0.04 * I;
    }
  });

  if (intensity <= 0.001) return null;

  return (
    <group ref={group}>
      <lineSegments ref={rings} geometry={ringGeometry} material={ringMaterial} />
      <lineSegments ref={tendrils} geometry={tendrilGeometry} material={tendrilMaterial} />
      <mesh
        ref={outlet}
        geometry={outletGeometry}
        material={outletMaterial}
        position={[0, BOTTOM_Y - 0.05, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      />
    </group>
  );
}
