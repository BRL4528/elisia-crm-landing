// Force-load R3F's global JSX.IntrinsicElements augmentation project-wide.
// Without this, files that only use lowercase R3F components (e.g. <mesh>)
// without importing from @react-three/fiber won't see the augmented types.
import "@react-three/fiber";
import "@react-three/drei";

export {};
