import { Plus } from "lucide-react";
import { FAQ } from "./content";

export function Faq() {
  return (
    <section className="sec" id="faq">
      <div className="wrap">
        <div className="faq">
          <div>
            <span className="eyebrow">Dúvidas</span>
            <h2 className="h2" style={{ fontSize: 34 }}>
              Antes de começar
            </h2>
            <p className="lead" style={{ fontSize: "15.5px" }}>
              Se ficou alguma dúvida, fale com a gente pelo WhatsApp — quem responde é o time que
              usa o produto todo dia.
            </p>
            <a className="btn btn-g" href="#contato" style={{ marginTop: 22 }}>
              Falar com o time
            </a>
          </div>
          <div className="faq-l">
            {FAQ.map((item, i) => (
              <details className="q" key={item.q} open={i === 0}>
                <summary>
                  {item.q}
                  <Plus className="pm" size={18} strokeWidth={2.4} aria-hidden />
                </summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
