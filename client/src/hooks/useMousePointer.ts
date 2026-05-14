import { useEffect, useRef } from "react";

export interface PointerState {
  x: number;
  y: number;
  tx: number;
  ty: number;
}

/**
 * Mouse pointer normalized to [-1, 1] with smoothed lerped target.
 * Returns a stable ref; consumers should read .current inside useFrame.
 */
export function useMousePointer(damping = 0.08) {
  const ref = useRef<PointerState>({ x: 0, y: 0, tx: 0, ty: 0 });

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      ref.current.tx = (e.clientX / window.innerWidth) * 2 - 1;
      ref.current.ty = -((e.clientY / window.innerHeight) * 2 - 1);
    };

    const onLeave = () => {
      ref.current.tx = 0;
      ref.current.ty = 0;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  // Per-frame smoothing helper, callable from useFrame
  const update = (dt: number) => {
    const k = 1 - Math.exp(-damping * 60 * dt);
    ref.current.x += (ref.current.tx - ref.current.x) * k;
    ref.current.y += (ref.current.ty - ref.current.y) * k;
  };

  return { ref, update };
}
