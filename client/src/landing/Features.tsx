import { FEATURES } from "./content";
import { featureIcon } from "./LandingBits";

export function Features() {
  return (
    <section className="sec sec-alt" id="produto">
      <div className="wrap">
        <div className="sec-head center">
          <span className="eyebrow">O que você recebe</span>
          <h2 className="h2">Um sistema só, do primeiro contato ao pós-venda</h2>
          <p className="lead">
            Cada módulo já vem conectado ao funil. Nada de integrar cinco ferramentas para saber
            quem falou com o cliente.
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
