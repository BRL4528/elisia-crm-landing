import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useScenePhase } from "@/providers/ScenePhaseProvider";

/**
 * Mounts a single ScrollTrigger that tracks the entire #page-shell:
 *  - writes 0..1 to progressRef every frame
 *  - flips `active` (0..4) when the user crosses 5 even segments
 *
 * Mount once at the page root. Cheap — one Trigger, no per-section overhead.
 */
export function useScrollPhase() {
  const { progressRef, setActive } = useScenePhase();

  useEffect(() => {
    let lastActive = -1;
    const target = document.getElementById("page-shell");
    if (!target) return;

    const st = ScrollTrigger.create({
      trigger: target,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        progressRef.current = self.progress;
        const idx = Math.min(4, Math.floor(self.progress * 5));
        if (idx !== lastActive) {
          lastActive = idx;
          setActive(idx);
        }
      },
    });

    // Recalc on resize
    const ro = new ResizeObserver(() => ScrollTrigger.refresh());
    ro.observe(document.body);

    return () => {
      st.kill();
      ro.disconnect();
    };
  }, [progressRef, setActive]);
}

/** Per-section reveal: ties a callback to a section entering / leaving the viewport. */
export function attachSectionReveal(el: HTMLElement, onEnter: () => void) {
  const st = ScrollTrigger.create({
    trigger: el,
    start: "top 75%",
    onEnter,
    once: true,
  });
  return () => st.kill();
}

// Re-export gsap utilities so callers don't import gsap directly
export { gsap, ScrollTrigger };
