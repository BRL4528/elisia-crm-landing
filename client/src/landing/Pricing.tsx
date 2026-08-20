import { useState } from "react";
import { Clock } from "lucide-react";
import { CYCLES, DEFAULT_CYCLE, LINKS, type CycleId } from "./content";
import { Tick } from "./LandingBits";
import { ComparisonTable } from "./ComparisonTable";

/** Seção de planos: seletor de ciclo, 3 tiers e tabela comparativa recolhível. */
export function Pricing() {
  const [cycleId, setCycleId] = useState<CycleId>(DEFAULT_CYCLE);
  const cycle = CYCLES.find((c) => c.id === cycleId) ?? CYCLES[0];

  return (
    <section className="sec sec-alt" id="planos">
      <div className="wrap">
        <div className="sec-head center">
          <span className="eyebrow">Planos</span>
          <h2 className="h2">Comece grátis por 14 dias. Depois, escolha o tamanho.</h2>
          <p className="lead">
            Preço por empresa, não por módulo. Todo plano pago inclui WhatsApp oficial, agente de
            IA e automações. O valor anual está em{" "}
            <b style={{ color: "var(--lp-green-d)", fontWeight: 600 }}>
              super promoção por tempo limitado
            </b>
            .
          </p>
        </div>

        <div className="cycle">
          <div className="seg" role="group" aria-label="Ciclo de cobrança">
            {CYCLES.map((c) => (
              <button
                key={c.id}
                type="button"
                data-on={c.id === cycleId ? "true" : undefined}
                aria-pressed={c.id === cycleId}
                onClick={() => setCycleId(c.id)}
              >
                {c.label}
                {c.off ? <span className="off">{c.off}</span> : null}
              </button>
            ))}
          </div>
        </div>

        <div className="tiers">
          <div className="tier">
            <div className="tier-top">
              <span className="tier-n">Básico</span>
            </div>
            <p className="tier-for">Para organizar contatos e o funil sem pagar nada.</p>
            <div className="price">
              <span className="v">Grátis</span>
            </div>
            <div className="billed">Sem cobrança, para sempre</div>
            <a className="btn btn-g" href={LINKS.signUp}>
              Criar conta grátis
            </a>
            <ul className="feats-l">
              <li>
                <Tick />
                <span>
                  <b>3 usuários</b> incluídos
                </span>
              </li>
              <li>
                <Tick />
                <span>Funil, contatos e agenda</span>
              </li>
              <li>
                <Tick />
                <span>1 canal de atendimento</span>
              </li>
              <li>
                <Tick />
                <span className="m">Suporte por e-mail</span>
              </li>
            </ul>
          </div>

          <div className="tier" data-hi="true">
            <div className="tier-top">
              <span className="tier-n">Profissional</span>
              <span className="tier-tag">{cycle.tag}</span>
            </div>
            <p className="tier-for">Para o time que vende todo dia e não quer perder lead.</p>
            <div className="price" aria-live="polite">
              <span className="v">
                <span className="c">R$</span>
                <b className="mono">{cycle.price}</b>
              </span>
              <span className="per">/mês</span>
            </div>
            <div className="billed">
              {cycle.save ? <b>{cycle.billed}</b> : cycle.billed}
              {cycle.save ? (
                <>
                  <br />
                  <span className="save">{cycle.save}</span>
                </>
              ) : null}
            </div>
            <div className="promo" hidden={!cycle.promo}>
              <Clock size={13} strokeWidth={2.4} aria-hidden />
              Preço de super promoção, por tempo limitado
            </div>
            <a className="btn btn-p" href={LINKS.signUp}>
              Testar 14 dias grátis
            </a>
            <ul className="feats-l">
              <li className="h">Tudo do Básico, e mais:</li>
              <li>
                <Tick />
                <span>
                  <b>3 usuários</b> incluídos <span className="m">· +R$ 39,90 cada extra</span>
                </span>
              </li>
              <li>
                <Tick />
                <span>WhatsApp oficial e canais ilimitados</span>
              </li>
              <li>
                <Tick />
                <span>Agente de IA, automações e integrações</span>
              </li>
              <li>
                <Tick />
                <span>Sites, formulários e relatórios</span>
              </li>
            </ul>
          </div>

          <div className="tier">
            <div className="tier-top">
              <span className="tier-n">Empresarial</span>
            </div>
            <p className="tier-for">Para operações com vários times, filiais e regras próprias.</p>
            <div className="price">
              <span className="v" style={{ fontSize: 32 }}>
                Sob consulta
              </span>
            </div>
            <div className="billed">Contrato anual, faturamento por nota</div>
            <a className="btn btn-g" href={LINKS.email}>
              Falar com vendas
            </a>
            <ul className="feats-l">
              <li className="h">Tudo do Profissional, e mais:</li>
              <li>
                <Tick />
                <span>Usuários ilimitados</span>
              </li>
              <li>
                <Tick />
                <span>Perfis de acesso e auditoria completa</span>
              </li>
              <li>
                <Tick />
                <span>Implantação com parceiro homologado</span>
              </li>
              <li>
                <Tick />
                <span>Gerente de conta dedicado</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pay">
          <span>Pagamento via Stripe · cartão ou boleto</span>
          <span className="sep">·</span>
          <span>Sem taxa de implantação</span>
          <span className="sep">·</span>
          <span>Cancele quando quiser</span>
        </div>

        <details className="cmp">
          <summary>
            Comparar todos os recursos
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              aria-hidden
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </summary>
          <ComparisonTable />
        </details>
      </div>
    </section>
  );
}
