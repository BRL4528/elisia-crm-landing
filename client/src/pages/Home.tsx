import { lazy, Suspense, useEffect } from "react";
import { ScenePhaseProvider } from "@/providers/ScenePhaseProvider";
import { MotionPrefsProvider } from "@/providers/MotionPrefsProvider";
import { SmoothScrollProvider } from "@/providers/SmoothScrollProvider";
import { useScrollPhase } from "@/hooks/useScrollPhase";
import { useTabPresence } from "@/hooks/useTabPresence";
import { SceneErrorBoundary } from "@/scene/SceneErrorBoundary";

// Defer the WebGL bundle until after first paint
const SceneRoot = lazy(() =>
  import("@/scene/SceneRoot").then((m) => ({ default: m.SceneRoot })),
);

function SceneFallback() {
  return (
    <div
      aria-hidden
      className="scene-layer"
      style={{
        background:
          "radial-gradient(ellipse at 50% 35%, rgba(52,211,153,0.18), transparent 55%), radial-gradient(ellipse at 70% 70%, rgba(34,211,238,0.14), transparent 60%), #0b1418",
      }}
    />
  );
}
import { SiteHeader } from "@/components/SiteHeader";
import { PhaseRail } from "@/components/PhaseRail";
import { CustomCursor } from "@/components/CustomCursor";
import { HeroSection } from "@/sections/HeroSection";
import { InfluxSection } from "@/sections/InfluxSection";
import { SynapseSection } from "@/sections/SynapseSection";
import { CommandSection } from "@/sections/CommandSection";
import { HorizonSection } from "@/sections/HorizonSection";
import { SiteFooter } from "@/sections/SiteFooter";

function PageBody() {
  useScrollPhase();
  useTabPresence();

  return (
    <main id="page-shell" className="page-shell">
      <HeroSection />
      <InfluxSection />
      <SynapseSection />
      <CommandSection />
      <HorizonSection />
      <SiteFooter />
    </main>
  );
}

export default function Home() {
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <MotionPrefsProvider>
      <ScenePhaseProvider>
        <SmoothScrollProvider>
          <SceneErrorBoundary>
            <Suspense fallback={<SceneFallback />}>
              <SceneRoot />
            </Suspense>
          </SceneErrorBoundary>
          <SiteHeader />
          <PhaseRail />
          <PageBody />
          <CustomCursor />
          {/* Persistent backdrop fade so DOM panels read against the 3D layer */}
          <div
            aria-hidden
            className="pointer-events-none fixed inset-x-0 bottom-0 h-32 z-[1] bg-gradient-to-t from-background via-background/60 to-transparent"
          />
        </SmoothScrollProvider>
      </ScenePhaseProvider>
    </MotionPrefsProvider>
  );
}
