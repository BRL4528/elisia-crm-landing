import { EffectComposer, Bloom, Vignette, ChromaticAberration } from "@react-three/postprocessing";
import { BlendFunction, KernelSize } from "postprocessing";
import { Vector2 } from "three";
import { useMotionPrefs } from "@/providers/MotionPrefsProvider";

export function PostFX() {
  const { enablePostFX, tier } = useMotionPrefs();
  if (!enablePostFX) return null;

  const bloomIntensity = tier === "high" ? 0.55 : 0.42;
  const bloomThreshold = 0.72;

  return (
    <EffectComposer multisampling={0} enableNormalPass={false}>
      <Bloom
        intensity={bloomIntensity}
        luminanceThreshold={bloomThreshold}
        luminanceSmoothing={0.4}
        kernelSize={KernelSize.MEDIUM}
        mipmapBlur
      />
      <ChromaticAberration
        offset={new Vector2(0.00045, 0.00075)}
        blendFunction={BlendFunction.NORMAL}
        radialModulation={false}
        modulationOffset={0}
      />
      <Vignette eskil={false} offset={0.18} darkness={0.62} />
    </EffectComposer>
  );
}
