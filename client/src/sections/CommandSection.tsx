import { motion } from "framer-motion";
import { SectionShell } from "@/components/SectionShell";
import { Eyebrow } from "@/components/Eyebrow";
import { AnalyticsPanel } from "@/panels/AnalyticsPanel";
import { GoalsPanel } from "@/panels/GoalsPanel";
import { SellersPanel } from "@/panels/SellersPanel";
import { IndicatorsPanel } from "@/panels/IndicatorsPanel";
import { ElisiaFlowPanel } from "@/panels/ElisiaFlowPanel";
import { fadeUp, stagger } from "@/lib/motion/easings";

export function CommandSection() {
  return (
    <SectionShell id="command">
      <div className="container relative w-full">
        <motion.div
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          className="max-w-3xl mb-12"
        >
          <motion.div variants={fadeUp}>
            <Eyebrow index="04" label="Centro de comando" />
          </motion.div>
          <motion.h2 variants={fadeUp} className="display text-4xl md:text-5xl lg:text-6xl">
            <span className="text-display-gradient">Toda a operação.</span>
            <br />
            <span className="text-accent-gradient">Uma única superfície.</span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-6 text-base md:text-lg text-foreground/65 leading-relaxed font-light max-w-2xl"
          >
            Dashboards vivos, metas, ranking, indicadores e a Agent Elisia
            sintetizando tudo em insights acionáveis — em tempo real, em uma
            única vista.
          </motion.p>
        </motion.div>

        <motion.div
          variants={stagger(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-5%" }}
          className="grid grid-cols-12 gap-4 lg:gap-5"
        >
          <motion.div variants={fadeUp} className="col-span-12 lg:col-span-8">
            <AnalyticsPanel />
          </motion.div>
          <motion.div variants={fadeUp} className="col-span-12 lg:col-span-4">
            <ElisiaFlowPanel />
          </motion.div>
          <motion.div variants={fadeUp} className="col-span-12 md:col-span-6 lg:col-span-4">
            <GoalsPanel />
          </motion.div>
          <motion.div variants={fadeUp} className="col-span-12 md:col-span-6 lg:col-span-5">
            <SellersPanel />
          </motion.div>
          <motion.div variants={fadeUp} className="col-span-12 lg:col-span-3">
            <IndicatorsPanel />
          </motion.div>
        </motion.div>
      </div>
    </SectionShell>
  );
}
