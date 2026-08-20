import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { LINKS } from "./content";
import { Logo } from "./LandingBits";

const NAV = [
  { href: "#produto", label: "Produto" },
  { href: "#ia", label: "Atendimento com IA" },
  { href: "#planos", label: "Planos" },
  { href: "#faq", label: "Dúvidas" },
];

export function LandingHeader() {
  const [stuck, setStuck] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Fecha o menu ao voltar para o breakpoint desktop.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 981px)");
    const onChange = () => mq.matches && setOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <header data-stuck={stuck}>
      <div className="wrap nav">
        <Logo />
        <nav className="nav-l" aria-label="Navegação principal">
          {NAV.map((i) => (
            <a key={i.href} href={i.href}>
              {i.label}
            </a>
          ))}
        </nav>
        <div className="nav-r">
          <a className="btn btn-t" href={LINKS.signIn}>
            Entrar
          </a>
          <a className="btn btn-p" href={LINKS.signUp}>
            Testar 14 dias grátis
          </a>
        </div>
        <button
          type="button"
          className="nav-burger"
          aria-expanded={open}
          aria-controls="nav-mobile"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <div className="nav-mob" id="nav-mobile" data-open={open}>
        <div className="wrap">
          {NAV.map((i) => (
            <a key={i.href} className="item" href={i.href} onClick={() => setOpen(false)}>
              {i.label}
            </a>
          ))}
          <div className="acts">
            <a className="btn btn-g" href={LINKS.signIn}>
              Entrar
            </a>
            <a className="btn btn-p" href={LINKS.signUp}>
              Testar 14 dias grátis
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
