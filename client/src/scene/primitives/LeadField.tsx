import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import {
  BufferGeometry,
  BufferAttribute,
  Points,
  ShaderMaterial,
  NormalBlending,
} from "three";
import { useMotionPrefs } from "@/providers/MotionPrefsProvider";
import { particlesFor } from "@/hooks/useDeviceTier";
import { useMousePointer } from "@/hooks/useMousePointer";
import { leadVertex, leadFragment } from "@/shaders/leadField";

interface Props {
  /** 0 = scattered in the wild · 1 = fully gathered into the funnel */
  gather: number;
  /** Overall opacity (used to fade out after Influx hands off) */
  opacity?: number;
  /** Particle count (high tier). Lower tiers scale down automatically. */
  count?: number;
}

const CHANNEL_COLORS = [
  [0.22, 0.83, 0.60], // emerald — WhatsApp
  [0.13, 0.83, 0.93], // neural cyan — Instagram
  [0.40, 0.92, 0.83], // soft teal — site
  [0.66, 0.55, 0.98], // lavender — Meta Ads
  [0.95, 0.75, 0.27], // amber — referrals
] as const;

/**
 * Lead field — distant motes that converge into the funnel.
 *
 * Scattered distribution is BACKGROUND-biased: particles live mostly behind
 * the focal point in Z, with a wide XY spread, so they read as a distant
 * dust of leads rather than foreground noise blocking the hero copy.
 */
export function LeadField({ gather, opacity = 1, count = 720 }: Props) {
  const { tier } = useMotionPrefs();
  const total = particlesFor(tier, count);
  const points = useRef<Points>(null);
  const { ref: pointer, update } = useMousePointer(0.05);

  const geometry = useMemo(() => {
    const scattered = new Float32Array(total * 3);
    const target = new Float32Array(total * 3);
    const seeds = new Float32Array(total);
    const colors = new Float32Array(total * 3);

    for (let i = 0; i < total; i++) {
      // Scattered — fully 3D distribution (spherical), pushed slightly into
      // the background in Z so it reads as ambient depth rather than
      // foreground noise. Particles fill all of X/Y/Z, not a flat band.
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 4.2 + Math.pow(Math.random(), 0.55) * 6.5; // 4.2 → ~10.7
      scattered[i * 3 + 0] = r * Math.sin(phi) * Math.cos(theta);
      scattered[i * 3 + 1] = r * Math.cos(phi) * 0.85;     // slight vertical squish, NOT flat
      scattered[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta) * 0.7 - 2.5;

      // Funnel target — inverted cone (top wide, bottom narrow)
      const tHeight = Math.pow(Math.random(), 0.7);
      const fY = 1.6 - tHeight * 3.4;
      const fR = (1.0 - tHeight) * 2.2 + 0.08;
      const fA = Math.random() * Math.PI * 2;
      target[i * 3 + 0] = Math.cos(fA) * fR;
      target[i * 3 + 1] = fY;
      target[i * 3 + 2] = Math.sin(fA) * fR;

      seeds[i] = Math.random();

      const c = CHANNEL_COLORS[Math.floor(Math.random() * CHANNEL_COLORS.length)];
      colors[i * 3 + 0] = c[0];
      colors[i * 3 + 1] = c[1];
      colors[i * 3 + 2] = c[2];
    }

    const g = new BufferGeometry();
    g.setAttribute("aScattered", new BufferAttribute(scattered, 3));
    g.setAttribute("position", new BufferAttribute(scattered.slice(), 3));
    g.setAttribute("aTarget", new BufferAttribute(target, 3));
    g.setAttribute("aSeed", new BufferAttribute(seeds, 1));
    g.setAttribute("aColor", new BufferAttribute(colors, 3));
    return g;
  }, [total]);

  const material = useMemo(
    () =>
      new ShaderMaterial({
        vertexShader: leadVertex,
        fragmentShader: leadFragment,
        transparent: true,
        depthWrite: false,
        // Normal (not additive) — prevents luminance pile-up on overlap that
        // turned the field into a bokeh blanket. Stars, not blobs.
        blending: NormalBlending,
        uniforms: {
          uTime: { value: 0 },
          uGather: { value: 0 },
          uOpacity: { value: 1 },
          uPointer: { value: [0, 0] },
        },
      }),
    [],
  );

  useFrame((state, dt) => {
    update(dt);
    material.uniforms.uTime.value = state.clock.elapsedTime;
    const current = material.uniforms.uGather.value as number;
    material.uniforms.uGather.value = current + (gather - current) * 0.08;
    material.uniforms.uOpacity.value = opacity;
    material.uniforms.uPointer.value = [pointer.current.x, pointer.current.y];
  });

  return <points ref={points} geometry={geometry} material={material} />;
}
