import { useEffect, useRef, useState } from "react";

type CursorVariant = "default" | "link" | "cta" | "panel" | "scene";

/**
 * Premium dual-cursor:
 *  - Inner dot follows the pointer almost immediately (high damping)
 *  - Outer ring trails with cinematic delay
 *  - Both react to hover state of interactive surfaces
 *  - Hidden entirely on touch / coarse-pointer devices
 *  - mix-blend-mode: difference makes it readable over any backdrop
 *
 * All animation runs in a single rAF loop, never causing React re-renders
 * for pointer position. The only state changes are on variant transitions.
 */
export function CustomCursor() {
  const ring = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLDivElement>(null);

  const target = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const dotPos = useRef({ x: 0, y: 0 });
  const visible = useRef(false);

  const [variant, setVariant] = useState<CursorVariant>("default");
  const [pressed, setPressed] = useState(false);
  const [labelText, setLabelText] = useState<string>("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine) return;

    document.documentElement.classList.add("cursor-hidden");

    const onMove = (e: PointerEvent) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
      if (!visible.current) {
        visible.current = true;
        ringPos.current.x = e.clientX;
        ringPos.current.y = e.clientY;
        dotPos.current.x = e.clientX;
        dotPos.current.y = e.clientY;
        ring.current?.style.setProperty("opacity", "1");
        dot.current?.style.setProperty("opacity", "1");
      }
    };

    const onLeave = () => {
      visible.current = false;
      ring.current?.style.setProperty("opacity", "0");
      dot.current?.style.setProperty("opacity", "0");
    };

    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);

    const onOver = (e: PointerEvent) => {
      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>(
        "[data-cursor], a, button, [role='button'], input, textarea, select",
      );
      if (!el) {
        setVariant("default");
        setLabelText("");
        return;
      }
      const explicit = el.getAttribute("data-cursor") as CursorVariant | null;
      const hint = el.getAttribute("data-cursor-label") ?? "";

      if (explicit) {
        setVariant(explicit);
        setLabelText(hint);
      } else if (el.tagName === "BUTTON" || el.getAttribute("role") === "button") {
        setVariant("cta");
        setLabelText(hint);
      } else if (el.tagName === "A") {
        setVariant("link");
        setLabelText(hint);
      } else {
        setVariant("default");
        setLabelText("");
      }
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointerover", onOver, { passive: true });

    let raf = 0;
    const tick = () => {
      // Damping: dot near-instant, ring slow + heavy (cinematic trail)
      const kRing = 0.18;
      const kDot = 0.55;

      ringPos.current.x += (target.current.x - ringPos.current.x) * kRing;
      ringPos.current.y += (target.current.y - ringPos.current.y) * kRing;
      dotPos.current.x += (target.current.x - dotPos.current.x) * kDot;
      dotPos.current.y += (target.current.y - dotPos.current.y) * kDot;

      if (ring.current) {
        ring.current.style.transform =
          `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%)`;
      }
      if (dot.current) {
        dot.current.style.transform =
          `translate3d(${dotPos.current.x}px, ${dotPos.current.y}px, 0) translate(-50%, -50%)`;
      }
      if (label.current) {
        label.current.style.transform =
          `translate3d(${ringPos.current.x}px, ${ringPos.current.y + 28}px, 0) translate(-50%, 0)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointerover", onOver);
      document.documentElement.classList.remove("cursor-hidden");
    };
  }, []);

  return (
    <>
      {/* Outer ring — cinematic trail */}
      <div
        ref={ring}
        aria-hidden
        className="cursor-ring"
        data-variant={variant}
        data-pressed={pressed ? "" : undefined}
      />
      {/* Inner dot — laser-precise pointer */}
      <div
        ref={dot}
        aria-hidden
        className="cursor-dot"
        data-variant={variant}
        data-pressed={pressed ? "" : undefined}
      />
      {/* Optional label that floats under the ring for hinted surfaces */}
      <div ref={label} aria-hidden className="cursor-label" data-visible={labelText ? "" : undefined}>
        {labelText}
      </div>
    </>
  );
}
