import { LINKS, STATS } from "./content";
import { AppShot } from "./AppShot";
import { Tick } from "./LandingBits";

const NOTES = [
  "Sem cartão de crédito",
  "Pronto para usar em 10 minutos",
  "Cancele quando quiser",
];

export function Hero() {
  return (
    <>
      <section className="hero" id="top">
        <div className="wrap">
          <div className="hero-c">
            <span className="pill">
              <b>Novo</b> Agente de IA que responde no WhatsApp 24h
            </span>
            <h1>
              O CRM que <em>atende, vende</em> e acompanha por você
            </h1>
            <p className="hero-s">
              Todos os contatos, conversas e negócios da sua empresa em um só lugar — com um
              agente de IA que responde, agenda e registra tudo no funil.
            </p>
            <div className="hero-a">
              <a className="btn btn-p btn-lg" href={LINKS.signUp}>
                Começar 14 dias grátis
              </a>
              <a className="btn btn-g btn-lg" href="#produto">
                Ver como funciona
              </a>
            </div>
            <div className="hero-n">
              {NOTES.map((n) => (
                <span key={n}>
                  <Tick size={15} />
                  {n}
                </span>
              ))}
            </div>
          </div>

          <AppShot />
        </div>
      </section>

      <section className="sec" style={{ paddingTop: 34 }}>
        <div className="wrap">
          <div className="strip">
            {STATS.map((s) => (
              <div key={s.v}>
                <div className="v mono">{s.v}</div>
                <div className="l">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
