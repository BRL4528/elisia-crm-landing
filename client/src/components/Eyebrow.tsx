import { motion } from "framer-motion";

interface Props {
  index?: string;
  label: string;
}

export function Eyebrow({ index, label }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="inline-flex items-center gap-3 mb-6"
    >
      {index && (
        <span className="mono text-[10px] text-emerald-300/70 tracking-[0.3em]">{index}</span>
      )}
      <span className="h-px w-8 bg-gradient-to-r from-emerald-400/60 to-transparent" />
      <span className="eyebrow">{label}</span>
    </motion.div>
  );
}
