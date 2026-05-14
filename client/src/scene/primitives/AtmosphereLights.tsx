import { hex } from "@/lib/three/colors";

export function AtmosphereLights() {
  return (
    <>
      <ambientLight intensity={0.18} color={hex.surface} />
      <directionalLight position={[3, 4, 5]} intensity={0.7} color={hex.signal} />
      <directionalLight position={[-4, -2, -3]} intensity={0.35} color={hex.emerald} />
      <hemisphereLight args={[hex.neural, hex.bg, 0.25]} />
    </>
  );
}
