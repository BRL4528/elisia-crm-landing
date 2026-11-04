import { Link } from "wouter";
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
            <Link className="pill" href={LINKS.downloads}>
              <b>Novo</b> App da Elisia para Windows, macOS e Linux
            </Link>
            <h1>
              A plataforma que <em>atende, vende</em> e organiza sua empresa
            </h1>
            <p className="hero-s">
              Atendimento, vendas, marketing, pedidos, notas fiscais e financeiro em um só
              lugar, com uma IA que responde o cliente e trabalha junto com o seu time.
            </p>
            <div className="hero-a">
              <a className="btn btn-p btn-lg" href={LINKS.signUp}>
                Começar 14 dias grátis
              </a>
              <a className="btn btn-g btn-lg" href="/#produto">
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
