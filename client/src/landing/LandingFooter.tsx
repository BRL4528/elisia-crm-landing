import { Link } from "wouter";
import { Sparkles } from "lucide-react";
import { LINKS } from "./content";
import { Logo } from "./LandingBits";

export function LandingFooter() {
  return (
    <footer>
      <div className="wrap">
        <div className="f-grid">
          <div>
            <Logo />
            <p className="f-note">
              CRM com atendimento, automação e IA para times de vendas brasileiros.
            </p>
          </div>
          <div>
            <h4>Produto</h4>
            <a href="#produto">Funil de vendas</a>
            <a href="#ia">Agente de IA</a>
            <a href="#produto">WhatsApp oficial</a>
            <a href="#produto">Automações</a>
            <a href="#planos">Planos</a>
          </div>
          <div>
            <h4>Empresa</h4>
            <a href="#contato">Contato</a>
            <a href={LINKS.signIn}>Entrar</a>
            <a href={LINKS.signUp}>Criar conta</a>
          </div>
          <div>
            <h4>Ajuda</h4>
            <a href="#faq">Dúvidas frequentes</a>
            <Link href={LINKS.terms}>Termos de uso</Link>
            <Link href={LINKS.privacy}>Privacidade</Link>
          </div>
        </div>
        <div className="f-bot">
          <span>© 2026 ElisiaCRM</span>
          <span className="sep">·</span>
          <span>Feito no Brasil</span>
          <span className="sep">·</span>
          <span>Dados hospedados no Brasil, conforme a LGPD</span>
          <Link href="/experiencia" className="f-legacy">
            <Sparkles size={14} strokeWidth={2.2} />
            Ver a experiência imersiva (landing anterior)
          </Link>
        </div>
      </div>
    </footer>
  );
}
