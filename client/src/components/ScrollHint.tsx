import { motion } from "framer-motion";

export function ScrollHint() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.4, duration: 0.8 }}
      className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10"
    >
      <span className="mono text-[10px] tracking-[0.3em] uppercase text-foreground/40">
        Descer ao sistema
      </span>
      <div className="relative h-9 w-px overflow-hidden bg-white/10">
        <motion.span
          className="absolute inset-x-0 top-0 h-3 bg-gradient-to-b from-emerald-400 to-transparent"
          animate={{ y: [-12, 36] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </motion.div>
  );
}
