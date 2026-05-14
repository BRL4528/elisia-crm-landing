import { useScenePhase, PHASES } from "@/providers/ScenePhaseProvider";

const LABELS = ["Núcleo", "Canais", "Sinapse", "Operação", "Horizonte"];

export function PhaseRail() {
  const { active } = useScenePhase();

  return (
    <div className="fixed left-6 top-1/2 -translate-y-1/2 z-30 hidden lg:flex flex-col gap-3 pointer-events-none">
      {PHASES.map((_, i) => {
        const isActive = i === active;
        return (
          <a
            key={i}
            href={`#${PHASES[i]}`}
            data-cursor="link"
            data-cursor-label={LABELS[i]}
            className="group flex items-center gap-3 pointer-events-auto"
            aria-label={`Ir para ${LABELS[i]}`}
          >
            <span className="relative inline-block">
              <span
                className={
                  "block size-2 rounded-full transition-all duration-500 " +
                  (isActive ? "bg-emerald-400 scale-100" : "bg-white/15 scale-75 group-hover:bg-white/40")
                }
              />
              {isActive && (
                <span className="absolute inset-0 rounded-full bg-emerald-400/40 animate-ping" />
              )}
            </span>
            <span
              className={
                "mono text-[10px] uppercase tracking-[0.22em] transition-all duration-500 " +
                (isActive ? "opacity-100 text-foreground" : "opacity-0 group-hover:opacity-60 text-foreground/60 -translate-x-1")
              }
            >
              {LABELS[i]}
            </span>
          </a>
        );
      })}
    </div>
  );
}
