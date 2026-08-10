import { motion } from "framer-motion";
import { SectionShell } from "@/components/SectionShell";
import { Eyebrow } from "@/components/Eyebrow";
import { CTAButton } from "@/components/CTAButton";
import { ElisiaForm } from "@/components/ElisiaForm";
import { fadeUp, stagger } from "@/lib/motion/easings";

export function HorizonSection() {
  return (
    <SectionShell id="horizon">
      {/* Localized darkener — keeps the climax copy readable against any
          residual scene glow without dimming the section's own gradient feel */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 45%, rgba(11,20,24,0.62), transparent 80%)",
        }}
      />
      <div className="container relative w-full">
        <motion.div
          variants={stagger(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          className="max-w-3xl mx-auto text-center"
        >
          <motion.div variants={fadeUp}>
            <Eyebrow index="05" label="Horizonte" />
          </motion.div>

          <motion.h2 variants={fadeUp} className="display text-5xl md:text-6xl lg:text-7xl">
            <span className="text-display-gradient">Pronto para operar</span>
            <br />
            <span className="text-accent-gradient">no próximo nível?</span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mt-8 text-lg md:text-xl text-foreground/65 leading-relaxed font-light max-w-2xl mx-auto"
          >
            A próxima conversa do seu cliente já está acontecendo.
            <br />
            <span className="text-foreground/85">A Elisia está pronta para responder.</span>
          </motion.p>

          <motion.div variants={fadeUp} className="mt-12 flex items-center justify-center gap-3 flex-wrap">
            <CTAButton href="https://app.elisiacrm.com/sign-up" hint="Iniciar agora">
              Realizar cadastro
            </CTAButton>
            <CTAButton href="https://app.elisiacrm.com/sign-in" variant="ghost" hint="Entrar">
              Acessar plataforma
            </CTAButton>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="mt-14 mx-auto w-full max-w-md rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 text-left backdrop-blur-sm"
          >
            <ElisiaForm
              formId="71dcd255-31d6-40b2-b9f9-012ccd8d9ce3"
              formToken="90ee6394-eff3-4106-b1de-10bf3407b469"
            />
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="mt-16 inline-flex items-center gap-2 text-[10px] mono uppercase tracking-[0.3em] text-muted-foreground"
          >
            <span className="size-1 rounded-full bg-emerald-400 pulse-dot" />
            implantação assistida · onboarding em 7 dias
          </motion.div>
        </motion.div>
      </div>
    </SectionShell>
  );
}
