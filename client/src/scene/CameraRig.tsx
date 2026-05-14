import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Vector3 } from "three";
import { useScenePhase } from "@/providers/ScenePhaseProvider";
import { useMousePointer } from "@/hooks/useMousePointer";
import { damp, smoothstep } from "@/lib/three/lerp";

/**
 * Camera keyframes per chapter. Position interpolated against global scroll
 * progress (0..1). Mouse adds a subtle parallax offset.
 */
const KEYFRAMES: { pos: Vector3; look: Vector3 }[] = [
  // Core — wide reveal of the scattered lead field
  { pos: new Vector3(0, 0.2, 9.0), look: new Vector3(0, 0, 0) },
  // Influx — shift left so the forming funnel sits in the left half,
  // leaving the right column clear for the DOM FunnelPanel
  { pos: new Vector3(-1.8, 0.4, 8.4), look: new Vector3(-0.9, 0, 0) },
  // Synapse — drop into the neural graph, off-axis
  { pos: new Vector3(1.2, 0.2, 5.4), look: new Vector3(0, 0, 0) },
  // Command — pull back, slight pitch up for hologram floor feel
  { pos: new Vector3(0, 1.0, 9.0), look: new Vector3(0, -0.2, 0) },
  // Horizon — far back, hero shot
  { pos: new Vector3(0, 1.8, 11.5), look: new Vector3(0, 0.6, 0) },
];

export function CameraRig() {
  const { camera } = useThree();
  const { progressRef } = useScenePhase();
  const { ref: pointer, update } = useMousePointer(0.05);
  const targetPos = useRef(new Vector3());
  const targetLook = useRef(new Vector3());
  const currentLook = useRef(new Vector3());

  useFrame((_, dt) => {
    update(dt);
    const p = progressRef.current;
    const segCount = KEYFRAMES.length - 1;
    const seg = Math.min(segCount - 1, Math.floor(p * segCount));
    const local = smoothstep(0, 1, p * segCount - seg);

    const a = KEYFRAMES[seg];
    const b = KEYFRAMES[seg + 1];

    targetPos.current.lerpVectors(a.pos, b.pos, local);
    targetLook.current.lerpVectors(a.look, b.look, local);

    // Mouse parallax — subtle, never distracting
    targetPos.current.x += pointer.current.x * 0.35;
    targetPos.current.y += pointer.current.y * 0.25;

    camera.position.x = damp(camera.position.x, targetPos.current.x, 4, dt);
    camera.position.y = damp(camera.position.y, targetPos.current.y, 4, dt);
    camera.position.z = damp(camera.position.z, targetPos.current.z, 3.6, dt);

    currentLook.current.x = damp(currentLook.current.x, targetLook.current.x, 4, dt);
    currentLook.current.y = damp(currentLook.current.y, targetLook.current.y, 4, dt);
    currentLook.current.z = damp(currentLook.current.z, targetLook.current.z, 4, dt);

    camera.lookAt(currentLook.current);
  });

  return null;
}
