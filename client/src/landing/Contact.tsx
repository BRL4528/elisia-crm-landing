import { Mail, LogIn } from "lucide-react";
import { ElisiaForm } from "@/components/ElisiaForm";
import { CONTACT_FORM, LINKS } from "./content";

const WAYS = [
  {
    href: LINKS.email,
    icon: <Mail size={18} strokeWidth={2} />,
    name: "E-mail",
    desc: "contato@elisiacrm.com",
  },
  {
    href: LINKS.signIn,
    icon: <LogIn size={18} strokeWidth={2} />,
    name: "Já é cliente?",
    desc: "Entrar",
  },
];

export function Contact() {
  return (
    <section className="sec sec-alt" id="contato">
      <div className="wrap">
        <div className="contact">
          <div>
            <span className="eyebrow">Fale com a gente</span>
            <h2 className="h2">Vamos colocar seu time para vender mais</h2>
            <p className="lead">
              Conta o que você precisa que respondemos rápido — nosso time ou o próprio agente de
              IA da ElisiaCRM te atendem por aqui.
            </p>
            <div className="contact-ways">
              {WAYS.map((w) => (
                <a className="way" href={w.href} key={w.name}>
                  <span className="ic" aria-hidden>
                    {w.icon}
                  </span>
                  <span>
                    <span className="n">{w.name}</span>
                    <span className="d">{w.desc}</span>
                  </span>
                </a>
              ))}
            </div>
          </div>
          <div className="form-card">
            <h3>Fale com o time</h3>
            <p>Preencha os dados e retornamos em até um dia útil.</p>
            <div className="form-host">
              <ElisiaForm formId={CONTACT_FORM.id} formToken={CONTACT_FORM.token} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
