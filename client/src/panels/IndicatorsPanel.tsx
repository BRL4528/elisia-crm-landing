import { motion } from "framer-motion";
import { Activity } from "lucide-react";
import { PanelChrome } from "@/panels/PanelChrome";
import { indicators } from "@/panels/data";

export function IndicatorsPanel() {
  return (
    <PanelChrome
      title="Indicadores Operacionais"
      subtitle="snapshot tempo real"
      badge="KPI"
      contentClassName="p-3"
    >
      <div className="grid grid-cols-2 gap-2">
        {indicators.map((k, i) => (
          <motion.div
            key={k.label}
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: i * 0.06 }}
            className="rounded-lg border border-white/[0.06] bg-gradient-to-br from-white/[0.02] to-transparent p-2.5"
          >
            <div className="flex items-center justify-between mb-1">
              <Activity className="size-3 text-emerald-300/80" />
              <span className="mono text-[8px] uppercase tracking-wider text-neural/80 bg-neural/8 border border-neural/15 rounded-full px-1.5 py-0.5">
                {k.chip}
              </span>
            </div>
            <p className="text-[14px] font-semibold leading-none">{k.value}</p>
            <p className="text-[10px] text-muted-foreground mt-1">{k.label}</p>
          </motion.div>
        ))}
      </div>
    </PanelChrome>
  );
}
