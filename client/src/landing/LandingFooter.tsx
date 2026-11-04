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
              Atendimento, vendas, marketing e gestão com IA, numa plataforma feita para empresas
              brasileiras.
            </p>
          </div>
          <div>
            <h4>Produto</h4>
            <a href="/#produto">Atendimento e vendas</a>
            <a href="/#ia">Agente de IA</a>
            <a href="/#produto">Pedidos e notas fiscais</a>
            <a href="/#produto">Financeiro</a>
            <a href="/#planos">Planos</a>
            <Link href={LINKS.downloads}>App para computador</Link>
          </div>
          <div>
            <h4>Empresa</h4>
            <a href="/#contato">Contato</a>
            <a href={LINKS.signIn}>Entrar</a>
            <a href={LINKS.signUp}>Criar conta</a>
          </div>
          <div>
            <h4>Ajuda</h4>
            <a href="/#faq">Dúvidas frequentes</a>
            <Link href={LINKS.terms}>Termos de uso</Link>
            {/* Carga completa: a Vercel serve a política estática (privacy-policy.html). */}
            <a href={LINKS.privacy}>Privacidade</a>
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
