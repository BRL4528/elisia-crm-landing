import { motion } from "framer-motion";
import { Check, CheckCheck, Send, Smile, Paperclip } from "lucide-react";
import { PanelChrome } from "@/panels/PanelChrome";
import { waMessages } from "@/panels/data";

export function WhatsAppPanel() {
  return (
    <PanelChrome
      title="Conversas · WhatsApp"
      subtitle="API Oficial Meta · Camila Rocha"
      badge="ONLINE"
      contentClassName="p-0"
    >
      <div className="flex items-center gap-3 px-4 py-3 border-b border-white/[0.05]">
        <div className="relative">
          <div className="size-9 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 grid place-items-center text-[12px] font-semibold text-emerald-950">
            CR
          </div>
          <span className="absolute -bottom-0.5 -right-0.5 size-2.5 rounded-full bg-emerald-400 ring-2 ring-card" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[13px] font-semibold truncate">Camila Rocha</p>
          <p className="text-[10px] text-emerald-300/70 mono">digitando…</p>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="mono text-[9px] text-muted-foreground bg-white/[0.04] border border-white/[0.06] rounded-full px-2 py-0.5">
            LEAD #18420
          </span>
        </div>
      </div>

      <div className="px-4 py-4 space-y-2 max-h-[340px] overflow-hidden">
        {waMessages.map((m, idx) => (
          <motion.div
            key={m.id}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.08 }}
            className={m.side === "out" ? "flex justify-end" : "flex justify-start"}
          >
            <div
              className={
                "max-w-[78%] rounded-2xl px-3 py-2 text-[12px] leading-snug " +
                (m.side === "out"
                  ? "bg-emerald-500/90 text-emerald-950 rounded-br-md"
                  : "bg-white/[0.05] border border-white/[0.06] text-foreground rounded-bl-md")
              }
            >
              <p>{m.text}</p>
              <div className={"flex items-center gap-1 mt-1 " + (m.side === "out" ? "justify-end text-emerald-950/70" : "text-muted-foreground")}>
                <span className="text-[9px] mono">{m.time}</span>
                {m.side === "out" && m.status === "delivered" && <Check className="size-3" />}
                {m.side === "out" && m.status === "read" && <CheckCheck className="size-3 text-cyan-200" />}
              </div>
            </div>
          </motion.div>
        ))}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex justify-start"
        >
          <div className="bg-white/[0.05] border border-white/[0.06] rounded-2xl rounded-bl-md px-3 py-2 flex items-center gap-1">
            <span className="size-1.5 rounded-full bg-emerald-300/70 pulse-dot" />
            <span className="size-1.5 rounded-full bg-emerald-300/70 pulse-dot" style={{ animationDelay: "0.2s" }} />
            <span className="size-1.5 rounded-full bg-emerald-300/70 pulse-dot" style={{ animationDelay: "0.4s" }} />
          </div>
        </motion.div>
      </div>

      <div className="border-t border-white/[0.05] px-3 py-2.5 flex items-center gap-2">
        <Paperclip className="size-3.5 text-muted-foreground" />
        <Smile className="size-3.5 text-muted-foreground" />
        <div className="flex-1 rounded-full bg-white/[0.04] border border-white/[0.05] px-3 py-1.5 text-[11px] text-muted-foreground">
          Resposta sugerida pela Agent Elisia…
        </div>
        <button className="size-7 rounded-full bg-emerald-500/90 text-emerald-950 grid place-items-center">
          <Send className="size-3.5" />
        </button>
      </div>
    </PanelChrome>
  );
}
