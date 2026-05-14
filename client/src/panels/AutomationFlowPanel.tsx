import { useMemo } from "react";
import { motion } from "framer-motion";
import { Zap, GitBranch, Clock, MessageSquare, CheckCircle2, Play } from "lucide-react";
import { PanelChrome } from "@/panels/PanelChrome";
import { automationNodes, automationEdges, AutoNodeKind } from "@/panels/data";

const NODE_W = 130;
const NODE_H = 56;
const SVG_W = 760;
const SVG_H = 250;

const kindStyle: Record<AutoNodeKind, { color: string; label: string; Icon: any }> = {
  trigger: { color: "#22d3ee", label: "Gatilho", Icon: Play },
  condition: { color: "#a78bfa", label: "Condição", Icon: GitBranch },
  action: { color: "#34d399", label: "Ação", Icon: Zap },
  delay: { color: "#fbbf24", label: "Espera", Icon: Clock },
  end: { color: "#5eead4", label: "Final", Icon: CheckCircle2 },
};

export function AutomationFlowPanel() {
  const nodeMap = useMemo(() => Object.fromEntries(automationNodes.map((n) => [n.id, n])), []);

  const paths = useMemo(() => {
    return automationEdges.map((e) => {
      const a = nodeMap[e.from];
      const b = nodeMap[e.to];
      const ax = a.x + NODE_W;
      const ay = a.y + NODE_H / 2;
      const bx = b.x;
      const by = b.y + NODE_H / 2;
      const cx = (ax + bx) / 2;
      return { d: `M ${ax} ${ay} C ${cx} ${ay} ${cx} ${by} ${bx} ${by}`, key: `${e.from}-${e.to}` };
    });
  }, [nodeMap]);

  return (
    <PanelChrome
      title="Elisia Flow · Automação"
      subtitle="execução · 312 disparos hoje"
      badge="LIVE"
      toolbar={
        <span className="mono text-[10px] text-emerald-300/80 inline-flex items-center gap-1">
          <MessageSquare className="size-3" /> 4 ativas
        </span>
      }
      contentClassName="p-3"
    >
      <div className="relative overflow-hidden rounded-xl bg-[#0a1316]/50 border border-white/[0.04]"
           style={{ height: SVG_H }}>
        <div
          className="absolute inset-0 opacity-50"
          style={{
            backgroundImage:
              "linear-gradient(rgba(34,211,238,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(34,211,238,0.06) 1px,transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
        <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} className="absolute inset-0 w-full h-full">
          <defs>
            <linearGradient id="edge-grad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#34d399" stopOpacity="0.7" />
            </linearGradient>
          </defs>
          {paths.map((p, i) => (
            <g key={p.key}>
              <path d={p.d} stroke="url(#edge-grad)" strokeWidth={1.5} fill="none" strokeLinecap="round" opacity={0.65} />
              <motion.circle
                r={2.4}
                fill="#5eead4"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 1, 0] }}
                transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.32, ease: "easeInOut" }}
              >
                <animateMotion dur="2.4s" repeatCount="indefinite" begin={`${i * 0.32}s`} path={p.d} />
              </motion.circle>
            </g>
          ))}
        </svg>

        {automationNodes.map((n, idx) => {
          const style = kindStyle[n.kind];
          const Icon = style.Icon;
          return (
            <motion.div
              key={n.id}
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-20%" }}
              transition={{ duration: 0.45, delay: idx * 0.08 }}
              className="absolute"
              style={{ left: n.x, top: n.y, width: NODE_W, height: NODE_H }}
            >
              <div
                className="h-full rounded-lg border bg-card/85 backdrop-blur-sm px-2.5 py-1.5 shadow-lg flex items-center gap-2"
                style={{ borderColor: style.color + "55", boxShadow: `0 8px 24px -10px ${style.color}40` }}
              >
                <div
                  className="size-7 rounded-md grid place-items-center shrink-0"
                  style={{ backgroundColor: style.color + "20", color: style.color }}
                >
                  <Icon className="size-3.5" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] font-semibold leading-tight truncate">{n.label}</p>
                  {n.sublabel && (
                    <p className="text-[9px] text-muted-foreground truncate mono">{n.sublabel}</p>
                  )}
                </div>
              </div>
              <span
                className="absolute -top-1.5 left-2 mono text-[8px] tracking-wider px-1 rounded-sm"
                style={{ color: style.color, backgroundColor: "#0a1316" }}
              >
                {style.label}
              </span>
            </motion.div>
          );
        })}
      </div>
    </PanelChrome>
  );
}
