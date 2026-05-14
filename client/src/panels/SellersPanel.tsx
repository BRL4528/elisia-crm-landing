import { motion } from "framer-motion";
import { Trophy } from "lucide-react";
import { PanelChrome } from "@/panels/PanelChrome";
import { sellers } from "@/panels/data";

export function SellersPanel() {
  return (
    <PanelChrome
      title="Ranking Vendedores"
      subtitle="top 5 · mês atual"
      badge="EQUIPE"
      contentClassName="p-4"
    >
      <div className="space-y-1.5">
        {sellers.map((s, i) => (
          <motion.div
            key={s.id}
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="flex items-center gap-2.5 rounded-lg border border-white/[0.05] bg-white/[0.015] px-2.5 py-2"
          >
            <div className="mono text-[10px] text-muted-foreground w-4">{i + 1}</div>
            <div className="size-7 rounded-full bg-gradient-to-br from-emerald-400/30 to-cyan-400/20 grid place-items-center text-[10px] font-semibold border border-white/10">
              {s.initials}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <p className="text-[11px] font-semibold truncate">{s.name}</p>
                {s.badge && (
                  <span className="mono text-[8px] uppercase tracking-wider px-1 py-0.5 rounded bg-emerald-500/15 text-emerald-300 border border-emerald-400/20 inline-flex items-center gap-1">
                    <Trophy className="size-2.5" />
                    {s.badge}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 mt-0.5">
                <div className="flex-1 h-1 rounded-full bg-white/[0.04] overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${s.pct}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, delay: i * 0.06 + 0.15 }}
                    className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-cyan-300"
                  />
                </div>
                <span className="mono text-[9px] text-muted-foreground w-8 text-right">{s.pct}%</span>
              </div>
            </div>
            <div className="text-right shrink-0">
              <p className="text-[11px] font-semibold text-emerald-300/90 mono">{s.revenue}</p>
              <p className="text-[9px] text-muted-foreground mono">{s.deals} deals</p>
            </div>
          </motion.div>
        ))}
      </div>
    </PanelChrome>
  );
}
