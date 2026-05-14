import { motion } from "framer-motion";
import { Sparkles, Bot, AlertTriangle, BarChart3, Lightbulb } from "lucide-react";
import { PanelChrome } from "@/panels/PanelChrome";
import { elisiaInsights } from "@/panels/data";

const kindStyle: Record<string, { Icon: any; color: string; tag: string }> = {
  alert: { Icon: AlertTriangle, color: "#fbbf24", tag: "ALERTA" },
  summary: { Icon: BarChart3, color: "#34d399", tag: "RESUMO" },
  suggest: { Icon: Lightbulb, color: "#67e8f9", tag: "SUGESTÃO" },
};

export function ElisiaFlowPanel() {
  return (
    <PanelChrome
      title="Agent Elisia"
      subtitle="inteligência operacional ativa"
      badge="AI"
      contentClassName="p-4"
      toolbar={
        <span className="mono text-[10px] text-cyan-300/80 inline-flex items-center gap-1.5">
          <Sparkles className="size-3" /> 12 análises/h
        </span>
      }
    >
      <div className="flex items-start gap-3 mb-3">
        <div className="relative shrink-0">
          <div className="size-10 rounded-xl bg-gradient-to-br from-emerald-400 via-cyan-400 to-emerald-500 grid place-items-center">
            <Bot className="size-5 text-emerald-950" />
          </div>
          <div className="absolute -bottom-0.5 -right-0.5 size-3 rounded-full bg-emerald-400 ring-2 ring-card pulse-dot" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[12px] font-semibold">Elisia · processando</p>
          <p className="text-[10px] text-muted-foreground mono">monitorando 1.428 leads · 4 funis ativos</p>
        </div>
      </div>

      <div className="space-y-2">
        {elisiaInsights.map((it, i) => {
          const s = kindStyle[it.kind];
          const Icon = s.Icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 6 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="rounded-lg border border-white/[0.06] bg-white/[0.015] p-2.5"
            >
              <div className="flex items-center gap-1.5 mb-1">
                <Icon className="size-3" style={{ color: s.color }} />
                <span
                  className="mono text-[8px] uppercase tracking-wider px-1.5 py-0.5 rounded-full"
                  style={{ color: s.color, backgroundColor: s.color + "10", border: `1px solid ${s.color}30` }}
                >
                  {s.tag}
                </span>
              </div>
              <p className="text-[11px] leading-snug text-foreground/90">{it.text}</p>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-3 rounded-lg bg-gradient-to-r from-emerald-500/8 via-cyan-500/8 to-emerald-500/8 border border-white/[0.06] px-3 py-2 flex items-center gap-2">
        <Sparkles className="size-3 text-cyan-300/90" />
        <p className="text-[10px] text-muted-foreground">
          Próximo report agendado · <span className="mono text-foreground/90">07:00 via WhatsApp</span>
        </p>
      </div>
    </PanelChrome>
  );
}
