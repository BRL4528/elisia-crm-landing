import { ReactNode, useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Props {
  children: ReactNode;
}

let lenisInstance: Lenis | null = null;

export function getLenis() {
  return lenisInstance;
}

interface ScrollToOpts {
  duration?: number;
  offset?: number;
  immediate?: boolean;
}

/**
 * Cinematic scroll-to. Slow, weighted ease — feels intentional and
 * "directed", not snappy. Falls back to native scroll when Lenis is
 * unavailable (SSR / reduced motion).
 */
export function smoothScrollTo(target: string | HTMLElement, opts: ScrollToOpts = {}) {
  const el = typeof target === "string" ? document.querySelector<HTMLElement>(target) : target;
  if (!el) return;

  const lenis = getLenis();
  const duration = opts.duration ?? 1.6;
  const offset = opts.offset ?? 0;

  if (lenis) {
    lenis.scrollTo(el, {
      duration,
      offset,
      // ease-out-expo — drops in fast, settles like glass
      easing: (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
      lock: true,
    });
  } else {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

export function SmoothScrollProvider({ children }: Props) {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: !reduced,
      wheelMultiplier: 1,
      touchMultiplier: 1.4,
      syncTouch: false,
    });

    lenisInstance = lenis;
    lenis.on("scroll", ScrollTrigger.update);

    const tickerCb = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tickerCb);
    gsap.ticker.lagSmoothing(0);

    // Global delegation: any <a href="#foo"> routes through Lenis with the
    // cinematic ease. Plays nice with wouter's <Link> for path navigation.
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      const a = (e.target as HTMLElement | null)?.closest("a");
      if (!a) return;

      const href = a.getAttribute("href");
      if (!href || !href.startsWith("#") || href === "#") return;

      const id = href.slice(1);
      const el = document.getElementById(id);
      if (!el) return;

      e.preventDefault();
      // Brief blur to soften the focus snap during the slide
      (document.activeElement as HTMLElement | null)?.blur?.();
      smoothScrollTo(el, { duration: 1.7, offset: -8 });

      // Update URL hash without triggering native jump
      history.pushState(null, "", href);
    };

    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      gsap.ticker.remove(tickerCb);
      lenis.destroy();
      lenisInstance = null;
    };
  }, []);

  return <>{children}</>;
}
