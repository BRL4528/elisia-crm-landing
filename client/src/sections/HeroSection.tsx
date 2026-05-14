import { motion } from "framer-motion";
import { SectionShell } from "@/components/SectionShell";
import { CTAButton } from "@/components/CTAButton";
import { ScrollHint } from "@/components/ScrollHint";
import { fadeUp, stagger, ease } from "@/lib/motion/easings";

const STATS = [
  { value: "312", label: "automações disparadas hoje" },
  { value: "1.4k", label: "leads em pipeline ativo" },
  { value: "<3s", label: "latência decisional média" },
];

export function HeroSection() {
  return (
    <SectionShell id="core" className="vignette">
      <div className="container relative w-full">
        <motion.div
          variants={stagger(0.12, 0.1)}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto text-center"
        >
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 mb-7">
            <span className="size-1.5 rounded-full bg-emerald-400 pulse-dot" />
            <span className="mono text-[10px] tracking-[0.35em] uppercase text-foreground/60">
              Elisia · Operational Intelligence System
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="display text-5xl sm:text-6xl md:text-7xl lg:text-[88px] leading-[0.96]"
          >
            <span className="text-display-gradient">O cérebro</span>
            <br />
            <span className="text-accent-gradient">operacional</span>
            <br />
            <span className="text-display-gradient">da sua empresa.</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-8 text-lg md:text-xl text-foreground/65 max-w-2xl mx-auto leading-relaxed font-light"
          >
            Um sistema vivo que conecta canais, automações e inteligência em uma única
            fonte de verdade. Conversas viram receita.{" "}
            <span className="text-foreground/85">Decisões viram operação.</span>
          </motion.p>

          <motion.div variants={fadeUp} className="mt-10 flex items-center justify-center gap-3 flex-wrap">
            <CTAButton href="https://app.elisiacrm.com/sign-up" hint="Iniciar agora">
              Realizar cadastro
            </CTAButton>
            <CTAButton href="#influx" external={false} variant="ghost" hint="Entrar no sistema">
              Ver o sistema operando
            </CTAButton>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="mt-16 grid grid-cols-3 gap-px max-w-2xl mx-auto rounded-2xl overflow-hidden border border-white/[0.06] bg-white/[0.015]"
          >
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + i * 0.1, duration: 0.6, ease: ease.out }}
                className="bg-card/40 px-3 py-5"
              >
                <p className="text-2xl md:text-3xl font-semibold tracking-tight text-display-gradient">
                  {s.value}
                </p>
                <p className="mt-1 text-[10px] mono uppercase tracking-[0.18em] text-muted-foreground">
                  {s.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <ScrollHint />
    </SectionShell>
  );
}
