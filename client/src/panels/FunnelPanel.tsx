import { useMemo } from "react";
import { motion } from "framer-motion";
import {
  GripVertical,
  Flame,
  Instagram,
  MessageCircle,
  Globe,
  Megaphone,
  Users,
  Trophy,
} from "lucide-react";
import { PanelChrome } from "@/panels/PanelChrome";
import { funnelStages, funnelLeads, FunnelLead } from "@/panels/data";

const sourceIcon: Record<FunnelLead["source"], any> = {
  whatsapp: MessageCircle,
  instagram: Instagram,
  meta: Megaphone,
  site: Globe,
  indicacao: Users,
};

const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

const FEATURED = {
  id: "feat-camila",
  name: "Camila Rocha",
  source: "whatsapp" as const,
  amount: "R$ 92.400",
  initials: "CR",
  tag: "Hot Deal",
};

interface Props {
  /** 0 = lead in first column · 1 = lead won in final column */
  progress?: number;
}

export function FunnelPanel({ progress = 0 }: Props) {
  const eff = Math.max(0, Math.min(1, progress));
  const eased = easeInOutCubic(eff);

  // Discrete active column (highlights the destination as the card travels)
  const activeColumn = Math.min(3, Math.floor(eff * 4));

  // Column centers in %: 4 columns evenly spread (12.5, 37.5, 62.5, 87.5)
  const cardLeftPct = 12.5 + 75 * eased;

  // Footer state
  const approaching = eff >= 0.55;
  const closing = eff >= 0.88;
  const won = eff >= 0.96;

  // Confetti — deterministic angles so layout is stable
  const confetti = useMemo(
    () =>
      Array.from({ length: 28 }, (_, i) => {
        const angle = (i / 28) * Math.PI * 2 + Math.random() * 0.5;
        const speed = 60 + Math.random() * 80;
        return {
          x: Math.cos(angle) * speed,
          y: Math.sin(angle) * speed - 20 - Math.random() * 30,
          rot: 200 + Math.random() * 360,
          color: ["#34d399", "#22d3ee", "#5eead4", "#fbbf24", "#a78bfa"][i % 5],
          delay: Math.random() * 0.12,
        };
      }),
    [],
  );

  const FeaturedSourceIcon = sourceIcon[FEATURED.source];

  return (
    <PanelChrome
      title="Funil de Vendas"
      subtitle="pipeline operacional · maio"
      badge="CRM"
      contentClassName="p-3"
    >
      <div className="relative overflow-hidden rounded-xl bg-[#070f12] border border-white/[0.06] p-3">
        <div
          className="absolute inset-0 opacity-70 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(34,211,238,0.08) 1px,transparent 1px),linear-gradient(90deg,rgba(34,211,238,0.08) 1px,transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        {/* Kanban columns ── unchanged static data */}
        <div className="relative grid grid-cols-4 gap-2">
          {funnelStages.map((stage, sIdx) => {
            const leads = funnelLeads.filter((l) => l.stage === stage.id);
            const isActive = activeColumn === sIdx && eff > 0.02;
            const isWonTarget = sIdx === 3 && won;
            return (
              <div
                key={stage.id}
                className="flex flex-col gap-2 transition-all duration-500"
                style={{
                  opacity: isActive || isWonTarget ? 1 : 0.78,
                }}
              >
                <div className="flex items-center justify-between px-1">
                  <div className="flex items-center gap-2 min-w-0">
                    <span
                      className="size-2 rounded-full shrink-0"
                      style={{
                        backgroundColor: stage.color,
                        boxShadow: `0 0 ${isActive ? 16 : 10}px ${stage.color}${isActive ? "B0" : "80"}`,
                      }}
                    />
                    <p className="text-[11px] font-semibold truncate">{stage.name}</p>
                  </div>
                  <span className="mono text-[9px] text-muted-foreground">{stage.count}</span>
                </div>
                <p className="text-[10px] text-muted-foreground -mt-1 px-1">{stage.amount}</p>

                <div className="flex flex-col gap-1.5 relative">
                  {/* Landing-zone hint inside the destination column */}
                  {sIdx === 3 && eff > 0.4 && !won && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: eff > 0.55 ? 0.85 : 0.35 }}
                      className="absolute inset-0 rounded-lg border border-dashed pointer-events-none -m-0.5"
                      style={{
                        borderColor: stage.color + "80",
                        backgroundColor: stage.color + "08",
                      }}
                    />
                  )}
                  {leads.map((lead, lIdx) => {
                    const Icon = sourceIcon[lead.source];
                    return (
                      <motion.div
                        key={lead.id}
                        initial={{ opacity: 0, y: 6 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-20%" }}
                        transition={{ duration: 0.5, delay: sIdx * 0.06 + lIdx * 0.05 }}
                        className="group rounded-lg border border-white/[0.08] bg-white/[0.025] hover:bg-white/[0.045] transition-colors p-2"
                      >
                        <div className="flex items-start gap-2">
                          <GripVertical className="size-3 text-white/15 mt-0.5 shrink-0" />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5">
                              <p className="text-[11px] font-semibold truncate">{lead.name}</p>
                              {lead.hot && <Flame className="size-3 text-orange-400 shrink-0" />}
                            </div>
                            <div className="flex items-center gap-1.5 mt-0.5">
                              <Icon className="size-2.5 text-neural/80" />
                              <span className="text-[10px] text-emerald-300/90 mono">
                                {lead.amount}
                              </span>
                            </div>
                            {lead.tag && (
                              <span
                                className="inline-block mt-1 mono text-[8px] uppercase tracking-wider px-1.5 py-0.5 rounded-full border"
                                style={{
                                  borderColor: stage.color + "40",
                                  color: stage.color,
                                  backgroundColor: stage.color + "10",
                                }}
                              >
                                {lead.tag}
                              </span>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                  <div className="rounded-lg border border-dashed border-white/[0.06] h-7 grid place-items-center text-[10px] text-white/20 mono">
                    + adicionar
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ─── FEATURED FLOATING LEAD CARD ─────────────────────────────
            Floats absolutely over the kanban, driven by `progress` prop.
            Sits above the column header strip so it reads as "in transit". */}
        <div
          className="absolute pointer-events-none"
          style={{
            left: `${cardLeftPct}%`,
            top: "62px",
            width: "calc(25% - 14px)",
            transform: "translateX(-50%)",
            transition: "none",
            zIndex: 5,
          }}
        >
          <motion.div
            animate={
              won
                ? { scale: [1, 1.18, 1.05], y: [0, -10, -4] }
                : { scale: 1, y: 0 }
            }
            transition={{
              duration: 0.65,
              ease: [0.22, 1, 0.36, 1],
              times: won ? [0, 0.45, 1] : undefined,
            }}
            className="rounded-lg p-2 backdrop-blur-sm"
            style={{
              border: won
                ? "1.5px solid #5eead4"
                : "1.5px solid rgba(34,211,238,0.7)",
              background: won
                ? "linear-gradient(180deg, rgba(52,211,153,0.18), rgba(16,185,129,0.10))"
                : "linear-gradient(180deg, rgba(34,211,238,0.10), rgba(34,211,238,0.05))",
              boxShadow: won
                ? "0 0 28px rgba(94,234,212,0.55), 0 12px 32px -8px rgba(34,211,238,0.45)"
                : "0 0 18px rgba(34,211,238,0.40), 0 8px 24px -8px rgba(0,0,0,0.6)",
            }}
          >
            <div className="flex items-start gap-2">
              <div className="size-6 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-400 grid place-items-center text-[9px] font-semibold text-emerald-950 shrink-0">
                {FEATURED.initials}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1">
                  <p className="text-[11px] font-semibold truncate">{FEATURED.name}</p>
                  <Flame className="size-3 text-orange-300 shrink-0" />
                </div>
                <div className="flex items-center gap-1 mt-0.5">
                  <FeaturedSourceIcon className="size-2.5 text-neural/90" />
                  <span className="text-[10px] text-emerald-300 mono font-semibold">
                    {FEATURED.amount}
                  </span>
                </div>
              </div>
            </div>
            {/* Motion trail — subtle directional glow behind the card */}
            <span
              aria-hidden
              className="absolute inset-y-0 right-full w-12 pointer-events-none"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(34,211,238,0.18))",
                opacity: won ? 0 : Math.min(1, eff * 2),
                transition: "opacity 0.3s ease-out",
              }}
            />
          </motion.div>
        </div>

        {/* ─── CONFETTI BURST ────────────────────────────────────────── */}
        {won && (
          <div
            aria-hidden
            className="absolute pointer-events-none"
            style={{ left: "87.5%", top: "92px", transform: "translateX(-50%)" }}
          >
            {confetti.map((c, i) => (
              <motion.span
                key={i}
                initial={{ x: 0, y: 0, opacity: 1, scale: 0, rotate: 0 }}
                animate={{
                  x: c.x,
                  y: c.y + 70,
                  opacity: 0,
                  scale: 1,
                  rotate: c.rot,
                }}
                transition={{
                  duration: 1.4,
                  delay: c.delay,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="absolute"
                style={{
                  width: i % 3 === 0 ? 8 : 5,
                  height: i % 3 === 0 ? 4 : 5,
                  backgroundColor: c.color,
                  borderRadius: i % 3 === 0 ? 2 : 999,
                }}
              />
            ))}
          </div>
        )}

        {/* ─── BOTTOM CELEBRATION FOOTER ─────────────────────────────── */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={
            approaching ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }
          }
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-3 relative rounded-lg overflow-hidden"
        >
          <div
            className="relative px-3 py-2 flex items-center justify-between gap-3 transition-all duration-500"
            style={{
              background: won
                ? "linear-gradient(90deg, rgba(52,211,153,0.18), rgba(34,211,238,0.15))"
                : "linear-gradient(90deg, rgba(34,211,238,0.10), rgba(34,211,238,0.04))",
              border: won
                ? "1px solid rgba(94,234,212,0.42)"
                : "1px solid rgba(34,211,238,0.22)",
            }}
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <motion.div
                animate={won ? { rotate: [0, -10, 10, 0], scale: [1, 1.25, 1] } : {}}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="size-7 rounded-full grid place-items-center shrink-0"
                style={{
                  background: won
                    ? "linear-gradient(135deg, #5eead4, #34d399)"
                    : "rgba(34,211,238,0.18)",
                  border: won
                    ? "1px solid rgba(255,255,255,0.4)"
                    : "1px solid rgba(34,211,238,0.35)",
                  color: won ? "#062a1f" : "#67e8f9",
                }}
              >
                <Trophy className="size-3.5" />
              </motion.div>
              <div className="min-w-0">
                <p
                  className="text-[11px] font-semibold leading-tight transition-colors"
                  style={{ color: won ? "#a7f3d0" : "#67e8f9" }}
                >
                  {won
                    ? "Ganho · R$ 92.400 fechados"
                    : closing
                      ? "Em fechamento · estágio Fechado"
                      : "Próxima parada · estágio Fechado"}
                </p>
                <p className="text-[9px] text-muted-foreground mono leading-tight mt-0.5">
                  {won
                    ? "Camila Rocha · convertida pela Agent Elisia"
                    : "Camila Rocha · WhatsApp Business"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span
                className="mono text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full"
                style={{
                  color: won ? "#a7f3d0" : "#67e8f9",
                  borderWidth: 1,
                  borderStyle: "solid",
                  borderColor: won ? "rgba(94,234,212,0.4)" : "rgba(34,211,238,0.3)",
                  backgroundColor: won ? "rgba(94,234,212,0.10)" : "rgba(34,211,238,0.08)",
                }}
              >
                {won ? "Ganho 🎯" : `${Math.round(eff * 100)}%`}
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </PanelChrome>
  );
}
