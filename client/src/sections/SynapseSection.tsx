import { motion } from "framer-motion";
import { GitBranch, Zap, Brain, ArrowUpRight } from "lucide-react";
import { SectionShell } from "@/components/SectionShell";
import { Eyebrow } from "@/components/Eyebrow";
import { AutomationFlowPanel } from "@/panels/AutomationFlowPanel";
import { WhatsAppPanel } from "@/panels/WhatsAppPanel";
import { fadeUp, stagger } from "@/lib/motion/easings";

const PILLARS = [
  {
    index: "01",
    title: "Roteamento inteligente",
    desc: "Cada lead é classificado, priorizado e direcionado ao SDR certo em milissegundos. Nenhuma fila esquecida, nenhuma oportunidade vazada.",
    metric: "< 3s · latência média",
    Icon: GitBranch,
    accent: "#22d3ee",
  },
  {
    index: "02",
    title: "Execução em tempo real",
    desc: "Templates aprovados, agendamentos automáticos e follow-ups disparados na hora exata. O time atua — a Elisia executa.",
    metric: "312 disparos / hora",
    Icon: Zap,
    accent: "#34d399",
  },
  {
    index: "03",
    title: "Aprendizado contínuo",
    desc: "Cada conversa treina o modelo da sua operação. Quanto mais o time usa, mais afiado o sistema fica — automático.",
    metric: "78% precisão de rota",
    Icon: Brain,
    accent: "#5eead4",
  },
];

export function SynapseSection() {
  return (
    <SectionShell id="synapse">
      <div className="container relative w-full">
        <motion.div
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          className="max-w-3xl mb-14"
        >
          <motion.div variants={fadeUp}>
            <Eyebrow index="03" label="Sinapse" />
          </motion.div>
          <motion.h2 variants={fadeUp} className="display text-4xl md:text-5xl lg:text-6xl">
            <span className="text-display-gradient">Automações que pensam.</span>
            <br />
            <span className="text-accent-gradient">Atendimento que executa.</span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-6 text-base md:text-lg text-foreground/65 leading-relaxed font-light max-w-2xl"
          >
            Cada lead aciona uma cascata de decisões inteligentes. A Agent Elisia
            interpreta intenção, roteia, responde e escala — enquanto seu time
            foca onde realmente importa.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-8"
          >
            <AutomationFlowPanel />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-4"
          >
            <WhatsAppPanel />
          </motion.div>
        </div>

        <motion.div
          variants={stagger(0.1, 0.2)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          className="mt-14 grid md:grid-cols-3 gap-4 lg:gap-5"
        >
          {PILLARS.map((p) => {
            const Icon = p.Icon;
            return (
              <motion.div
                key={p.index}
                variants={fadeUp}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="group relative rounded-2xl p-6 lg:p-7 overflow-hidden"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(20,32,38,0.92), rgba(14,24,28,0.86))",
                  border: `1px solid ${p.accent}28`,
                  boxShadow: `0 20px 60px -20px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.02) inset, 0 1px 0 0 rgba(255,255,255,0.04) inset`,
                  backdropFilter: "blur(14px) saturate(140%)",
                  WebkitBackdropFilter: "blur(14px) saturate(140%)",
                }}
              >
                {/* Accent corner glow — distinct per pillar */}
                <div
                  aria-hidden
                  className="absolute -top-12 -right-12 size-40 rounded-full opacity-25 blur-3xl pointer-events-none transition-opacity duration-500 group-hover:opacity-40"
                  style={{ backgroundColor: p.accent }}
                />

                {/* Index + live pulse */}
                <div className="relative flex items-center justify-between mb-5">
                  <span
                    className="mono text-[10px] tracking-[0.32em] font-semibold"
                    style={{ color: `${p.accent}DD` }}
                  >
                    {p.index}
                  </span>
                  <span
                    className="size-1.5 rounded-full pulse-dot"
                    style={{ backgroundColor: p.accent, boxShadow: `0 0 10px ${p.accent}` }}
                  />
                </div>

                {/* Icon — bigger, colored, with subtle ring */}
                <div
                  className="relative size-12 rounded-xl grid place-items-center mb-5 transition-transform duration-500 group-hover:scale-105"
                  style={{
                    background: `linear-gradient(135deg, ${p.accent}20, ${p.accent}08)`,
                    border: `1px solid ${p.accent}40`,
                    color: p.accent,
                    boxShadow: `0 0 24px -8px ${p.accent}50`,
                  }}
                >
                  <Icon className="size-5" strokeWidth={1.8} />
                </div>

                {/* Title — bigger, tracked tight */}
                <h3 className="relative text-lg lg:text-xl font-semibold tracking-tight leading-tight mb-2.5 text-foreground">
                  {p.title}
                </h3>

                {/* Description — restored contrast */}
                <p className="relative text-[13.5px] text-foreground/75 leading-relaxed font-light">
                  {p.desc}
                </p>

                {/* Metric footer */}
                <div className="relative mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between">
                  <span
                    className="mono text-[10px] uppercase tracking-[0.18em] font-semibold"
                    style={{ color: p.accent }}
                  >
                    {p.metric}
                  </span>
                  <ArrowUpRight
                    className="size-3.5 text-foreground/30 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    style={{ color: p.accent }}
                  />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </SectionShell>
  );
}
