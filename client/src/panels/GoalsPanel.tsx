import { motion } from "framer-motion";
import { Target } from "lucide-react";
import { PanelChrome } from "@/panels/PanelChrome";
import { goals } from "@/panels/data";

const statusColor: Record<string, string> = {
  ok: "#34d399",
  warn: "#fbbf24",
  danger: "#f87171",
};

const statusLabel: Record<string, string> = {
  ok: "no rumo",
  warn: "atenção",
  danger: "abaixo",
};

export function GoalsPanel() {
  return (
    <PanelChrome
      title="Metas & Premiações"
      subtitle="ciclo atual · time comercial"
      badge="GOALS"
      contentClassName="p-4"
    >
      <div className="space-y-2.5">
        {goals.map((g, i) => {
          const pct = Math.round((g.value / g.target) * 100);
          const color = statusColor[g.status];
          return (
            <motion.div
              key={g.id}
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
              className="rounded-lg border border-white/[0.06] bg-white/[0.015] p-2.5"
            >
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2 min-w-0">
                  <Target className="size-3 shrink-0" style={{ color }} />
                  <p className="text-[12px] font-semibold truncate">{g.name}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className="mono text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded-full"
                    style={{ color, backgroundColor: color + "12", border: `1px solid ${color}30` }}
                  >
                    {statusLabel[g.status]}
                  </span>
                  <span className="mono text-[10px] text-foreground/80">
                    {g.value}
                    {g.unit ?? ""}/{g.target}
                    {g.unit ?? ""}
                  </span>
                </div>
              </div>
              <div className="h-1.5 rounded-full bg-white/[0.04] overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${Math.min(100, pct)}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.1, delay: i * 0.06 + 0.2, ease: [0.22, 1, 0.36, 1] }}
                  className="h-full rounded-full"
                  style={{
                    background: `linear-gradient(90deg, ${color}, ${color}cc)`,
                    boxShadow: `0 0 12px ${color}80`,
                  }}
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </PanelChrome>
  );
}
