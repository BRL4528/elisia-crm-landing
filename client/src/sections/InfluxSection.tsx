import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle, Instagram, Megaphone, Globe, Users, Mail } from "lucide-react";
import { SectionShell } from "@/components/SectionShell";
import { Eyebrow } from "@/components/Eyebrow";
import { FunnelPanel } from "@/panels/FunnelPanel";
import { fadeUp, stagger } from "@/lib/motion/easings";
import { gsap, ScrollTrigger } from "@/hooks/useScrollPhase";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useDeviceTier } from "@/hooks/useDeviceTier";

const CHANNELS = [
  { Icon: MessageCircle, name: "WhatsApp Business", desc: "API oficial Meta" },
  { Icon: Instagram, name: "Instagram Direct", desc: "campanhas + DMs" },
  { Icon: Megaphone, name: "Meta Ads", desc: "lead forms sincronizados" },
  { Icon: Globe, name: "Site & Landing", desc: "captura nativa" },
  { Icon: Users, name: "Indicações", desc: "rede de parceiros" },
  { Icon: Mail, name: "E-mail Inbound", desc: "roteamento automático" },
];

export function InfluxSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();
  const tier = useDeviceTier();
  const [funnelProgress, setFunnelProgress] = useState(0);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    // Skip the pinned scrub on touch/low-tier devices — keep the panel
    // statically winning so mobile users still see the celebrated state.
    if (reduced || tier === "low") {
      setFunnelProgress(1);
      return;
    }

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top top",
      end: "+=140%",
      pin: true,
      pinSpacing: true,
      pinType: "transform",
      scrub: 0.5,
      anticipatePin: 1,
      onUpdate: (self) => setFunnelProgress(self.progress),
      onLeave: () => setFunnelProgress(1),
      onEnterBack: (self) => setFunnelProgress(self.progress),
    });

    // ScrollTrigger needs a refresh after pin layout settles so other
    // triggers (phase rail, global progress) recompute end positions.
    const refreshId = window.setTimeout(() => ScrollTrigger.refresh(), 200);

    return () => {
      window.clearTimeout(refreshId);
      trigger.kill();
    };
  }, [reduced, tier]);

  return (
    <SectionShell id="influx" ref={sectionRef}>
      <div className="container relative w-full">
        <motion.div
          variants={stagger(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-15%" }}
          className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center"
        >
          <div className="lg:col-span-5">
            <motion.div variants={fadeUp}>
              <Eyebrow index="02" label="Convergência" />
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="display text-4xl md:text-5xl lg:text-6xl text-display-gradient"
            >
              Todos os canais
              <br />
              <span className="text-accent-gradient">no mesmo fluxo.</span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="mt-6 text-base md:text-lg text-foreground/65 leading-relaxed font-light max-w-md"
            >
              WhatsApp, Instagram, Meta Ads, site, indicações — tudo entra pelo
              mesmo núcleo. Sem perda, sem retrabalho, sem ilhas de dados.
            </motion.p>

            <motion.div variants={stagger(0.05)} className="mt-8 grid grid-cols-2 gap-2">
              {CHANNELS.map((c) => (
                <motion.div
                  key={c.name}
                  variants={fadeUp}
                  className="group flex items-center gap-2.5 rounded-lg border border-white/[0.06] bg-white/[0.015] px-3 py-2.5 hover:bg-white/[0.04] transition-colors"
                >
                  <div className="size-7 rounded-md grid place-items-center bg-emerald-500/10 border border-emerald-400/15 text-emerald-300/90">
                    <c.Icon className="size-3.5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] font-semibold truncate">{c.name}</p>
                    <p className="text-[9px] text-muted-foreground mono truncate">{c.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Scroll hint while pinned — disappears as the user drives */}
            <motion.div
              initial={false}
              animate={{ opacity: funnelProgress < 0.05 ? 1 : 0 }}
              transition={{ duration: 0.4 }}
              className="mt-8 inline-flex items-center gap-2 text-[10px] mono uppercase tracking-[0.22em] text-emerald-300/70"
            >
              <span className="size-1 rounded-full bg-emerald-400 pulse-dot" />
              continue rolando · acompanhe o lead até o ganho
            </motion.div>
          </div>

          <motion.div variants={fadeUp} className="lg:col-span-7 lg:pl-6">
            <FunnelPanel progress={funnelProgress} />
          </motion.div>
        </motion.div>
      </div>
    </SectionShell>
  );
}
