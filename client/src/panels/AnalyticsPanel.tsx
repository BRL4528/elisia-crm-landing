import { motion } from "framer-motion";
import { TrendingUp, ArrowUpRight } from "lucide-react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { PanelChrome } from "@/panels/PanelChrome";
import { analyticsSeries, kpiCards } from "@/panels/data";

export function AnalyticsPanel() {
  return (
    <PanelChrome
      title="Dashboard · Performance Operacional"
      subtitle="últimos 7 dias · todos os canais"
      badge="ANALYTICS"
      contentClassName="p-4"
    >
      <div className="grid grid-cols-4 gap-2 mb-3">
        {kpiCards.map((k, i) => (
          <motion.div
            key={k.label}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            className="rounded-lg border border-white/[0.06] bg-white/[0.015] p-2.5"
          >
            <p className="text-[9px] uppercase tracking-wider text-muted-foreground mono">{k.label}</p>
            <p className="text-[15px] font-semibold mt-0.5 leading-none">{k.value}</p>
            <div className="flex items-center gap-1 mt-1 text-emerald-300/90">
              <ArrowUpRight className="size-3" />
              <span className="text-[9px] mono">{k.delta}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="rounded-xl border border-white/[0.05] bg-[#0a1316]/40 p-3 pr-1">
        <div className="flex items-center justify-between mb-2 pr-3">
          <div className="flex items-center gap-2">
            <TrendingUp className="size-3.5 text-emerald-300" />
            <p className="text-[11px] font-semibold">Volume diário · leads & fechamentos</p>
          </div>
          <div className="flex items-center gap-3 text-[10px] mono text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-emerald-400" />
              leads
            </span>
            <span className="flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-cyan-300" />
              fechados
            </span>
          </div>
        </div>
        <div className="h-[150px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={analyticsSeries} margin={{ top: 4, right: 16, left: -28, bottom: 0 }}>
              <defs>
                <linearGradient id="grad-leads" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#34d399" stopOpacity={0.6} />
                  <stop offset="100%" stopColor="#34d399" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="grad-fec" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#67e8f9" stopOpacity={0.55} />
                  <stop offset="100%" stopColor="#67e8f9" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="rgba(255,255,255,0.04)" vertical={false} />
              <XAxis dataKey="d" tick={{ fill: "#6b7280", fontSize: 9 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#6b7280", fontSize: 9 }} axisLine={false} tickLine={false} width={28} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(10,19,22,0.95)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: 8,
                  fontSize: 11,
                }}
                cursor={{ stroke: "rgba(52,211,153,0.3)" }}
              />
              <Area type="monotone" dataKey="leads" stroke="#34d399" strokeWidth={1.8} fill="url(#grad-leads)" />
              <Area type="monotone" dataKey="fechados" stroke="#67e8f9" strokeWidth={1.8} fill="url(#grad-fec)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </PanelChrome>
  );
}
