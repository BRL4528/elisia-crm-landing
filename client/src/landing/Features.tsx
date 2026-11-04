import { FEATURES } from "./content";
import { featureIcon } from "./LandingBits";

export function Features() {
  return (
    <section className="sec sec-alt" id="produto">
      <div className="wrap">
        <div className="sec-head center">
          <span className="eyebrow">O que você recebe</span>
          <h2 className="h2">Um sistema só, do primeiro contato à nota fiscal</h2>
          <p className="lead">
            Atendimento, vendas, marketing e gestão já conversam entre si. Nada de integrar cinco
            ferramentas para saber o que aconteceu com o cliente.
          </p>
        </div>
        <div className="feats">
          {FEATURES.map((f) => (
            <div className="feat" key={f.title}>
              <div className="feat-i" aria-hidden>
                {featureIcon(f.icon)}
              </div>
              <h3>{f.title}</h3>
              <p>{f.body}</p>
              <span className="k">{f.tag}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
