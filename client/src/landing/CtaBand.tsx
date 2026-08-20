import { LINKS } from "./content";

export function CtaBand() {
  return (
    <section style={{ paddingBottom: 0 }}>
      <div className="wrap">
        <div className="cta-band">
          <h2>Coloque a operação para rodar esta semana</h2>
          <p>Crie sua conta, conecte o WhatsApp e veja o funil se encher com o que já chega hoje.</p>
          <div className="hero-a">
            <a className="btn btn-w btn-lg" href={LINKS.signUp}>
              Começar 14 dias grátis
            </a>
            <a className="btn btn-o btn-lg" href="#contato">
              Agendar demonstração
            </a>
          </div>
          <p className="fine">Sem cartão de crédito · Plano Básico gratuito para sempre</p>
        </div>
      </div>
    </section>
  );
}
