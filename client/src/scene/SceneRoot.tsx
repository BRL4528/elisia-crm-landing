import { Suspense, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { Color, Fog } from "three";
import { Stage } from "@/scene/Stage";
import { useMotionPrefs } from "@/providers/MotionPrefsProvider";
import { dprFor } from "@/hooks/useDeviceTier";

/**
 * SceneRoot — persistent <Canvas>.
 *
 * Background color + fog use <primitive object={...} attach={...}> instead of
 * R3F's <color> / <fog> intrinsics, which can crash applyProps in some
 * R3F-v8 / React-18 / Vite-prebundle interactions. <primitive> just attaches
 * a pre-built THREE object — no createInstance + applyProps dance.
 */
export function SceneRoot() {
  const { tier, enable3D } = useMotionPrefs();
  const bgColor = useMemo(() => new Color("#0b1418"), []);
  const sceneFog = useMemo(() => new Fog("#0b1418", 8, 22), []);

  if (!enable3D) {
    return (
      <div
        className="scene-layer"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse at 50% 35%, rgba(52,211,153,0.18), transparent 55%), radial-gradient(ellipse at 70% 70%, rgba(34,211,238,0.14), transparent 60%), #0b1418",
        }}
      />
    );
  }

  return (
    <div className="scene-layer" aria-hidden>
      <Canvas
        dpr={dprFor(tier)}
        gl={{
          antialias: tier === "high",
          alpha: false,
          powerPreference: "high-performance",
          stencil: false,
          depth: true,
        }}
        camera={{ position: [0, 0, 6.4], fov: 42, near: 0.1, far: 80 }}
        frameloop="always"
        style={{ background: "#0b1418" }}
        flat
      >
        <primitive object={bgColor} attach="background" />
        <primitive object={sceneFog} attach="fog" />
        <Suspense fallback={null}>
          <Stage />
        </Suspense>
      </Canvas>
      <div className="scene-bloom" />
      <div className="scene-vignette" />
      <div className="scene-grain" />
    </div>
  );
}
