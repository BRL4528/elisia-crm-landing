import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface Props {
  title?: string;
  subtitle?: string;
  badge?: string;
  toolbar?: ReactNode;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
}

/**
 * The "operational window" — a glass card with a tight chromed top-bar,
 * three traffic dots, an emerald status pulse, and a soft inner ring.
 * Used as the shell for every reconstructed CRM panel.
 */
export function PanelChrome({
  title,
  subtitle,
  badge,
  toolbar,
  children,
  className,
  contentClassName,
}: Props) {
  return (
    <div data-cursor="panel" className={cn("glass ring-neural rounded-2xl overflow-hidden text-foreground/95", className)}>
      <div className="flex items-center justify-between gap-3 border-b border-white/[0.06] bg-white/[0.015] px-4 py-2.5">
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex gap-1.5 shrink-0">
            <span className="size-2.5 rounded-full bg-white/15" />
            <span className="size-2.5 rounded-full bg-white/15" />
            <span className="size-2.5 rounded-full bg-primary/70" />
          </div>
          <div className="min-w-0">
            {title && (
              <div className="flex items-center gap-2">
                <p className="text-[13px] font-semibold tracking-tight truncate">{title}</p>
                {badge && (
                  <span className="mono text-[9px] uppercase tracking-[0.18em] text-neural/90 bg-neural/10 border border-neural/20 rounded-full px-1.5 py-0.5">
                    {badge}
                  </span>
                )}
              </div>
            )}
            {subtitle && (
              <p className="text-[11px] text-muted-foreground truncate">{subtitle}</p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {toolbar}
          <span className="inline-flex items-center gap-1.5 text-[10px] text-emerald-300/80 mono tracking-wider">
            <span className="size-1.5 rounded-full bg-emerald-400 pulse-dot" />
            LIVE
          </span>
        </div>
      </div>
      <div className={cn("p-4", contentClassName)}>{children}</div>
    </div>
  );
}
