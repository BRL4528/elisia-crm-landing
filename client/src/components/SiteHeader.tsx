import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BrandMark } from "@/components/BrandMark";
import { Link } from "wouter";

const NAV = [
  { href: "#core", label: "Núcleo", hint: "Inteligência" },
  { href: "#influx", label: "Canais", hint: "Convergência" },
  { href: "#synapse", label: "Automação", hint: "Sinapse" },
  { href: "#command", label: "Operação", hint: "Centro de comando" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={
        "fixed inset-x-0 top-0 z-50 transition-all duration-500 " +
        (scrolled
          ? "backdrop-blur-xl bg-background/55 border-b border-white/[0.05]"
          : "bg-transparent")
      }
    >
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <BrandMark size={26} className="transition-transform group-hover:rotate-90 duration-700" />
          <div className="flex flex-col leading-none">
            <span className="text-[14px] font-semibold tracking-tight">Elisia CRM</span>
            <span className="mono text-[9px] text-muted-foreground tracking-widest uppercase">
              operational intelligence
            </span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-7">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              data-cursor="link"
              data-cursor-label={n.hint}
              className="nav-link text-[12px] text-foreground/70 hover:text-foreground transition-colors mono tracking-wider uppercase"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="https://app.elisiacrm.com/sign-in"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex text-[12px] text-foreground/70 hover:text-foreground transition-colors mono tracking-wider uppercase"
          >
            Entrar
          </a>
          <a
            href="https://app.elisiacrm.com/sign-up"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="cta"
            data-cursor-label="Cadastrar"
            className="group relative inline-flex items-center gap-2 rounded-full px-4 py-2 text-[12px] font-semibold tracking-tight text-emerald-950 bg-gradient-to-r from-emerald-400 to-emerald-500 hover:from-emerald-300 hover:to-emerald-400 transition-all shadow-[0_0_24px_-6px_rgba(52,211,153,0.6)]"
          >
            <span>Acessar plataforma</span>
            <svg width="10" height="10" viewBox="0 0 10 10" className="transition-transform group-hover:translate-x-0.5">
              <path d="M1 5h7m0 0L5 2m3 3L5 8" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </motion.header>
  );
}
