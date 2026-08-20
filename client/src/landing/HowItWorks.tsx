import { Tick } from "./LandingBits";
import { ChatPanel } from "./panels/ChatPanel";
import { FlowPanel } from "./panels/FlowPanel";
import { CalendarPanel } from "./panels/CalendarPanel";

export function HowItWorks() {
  return (
    <section className="sec" id="ia">
      <div className="wrap">
        <div className="sec-head">
          <span className="eyebrow">Como funciona no dia a dia</span>
          <h2 className="h2">O cliente manda mensagem. O CRM cuida do resto.</h2>
        </div>

        <div className="row">
          <div className="row-t">
            <span className="eyebrow">01 · Atendimento</span>
            <h3>Ninguém fica sem resposta</h3>
            <p>
              O agente de IA atende no WhatsApp com o tom da sua empresa, usa seu catálogo e sua
              tabela de preços, e chama o vendedor no momento em que a conversa esquenta.
            </p>
            <ul className="ticks">
              <li>
                <Tick />
                Responde em segundos, inclusive de madrugada
              </li>
              <li>
                <Tick />
                Transferência para humano com o resumo da conversa
              </li>
              <li>
                <Tick />
                Cada mensagem fica registrada no contato e no negócio
              </li>
            </ul>
          </div>
          <ChatPanel />
        </div>

        <div className="row" data-flip="true">
          <div className="row-t">
            <span className="eyebrow">02 · Automação</span>
            <h3>O follow-up acontece sem ninguém lembrar</h3>
            <p>
              Monte o fluxo uma vez e ele roda para todos os leads: lembrete de visita, retomada
              de proposta parada, pesquisa depois da venda.
            </p>
            <ul className="ticks">
              <li>
                <Tick />
                Gatilhos por etapa, tempo sem resposta ou origem do lead
              </li>
              <li>
                <Tick />
                Editor visual, sem escrever código
              </li>
              <li>
                <Tick />
                Histórico de tudo que foi disparado, por lead
              </li>
            </ul>
          </div>
          <FlowPanel />
        </div>

        <div className="row">
          <div className="row-t">
            <span className="eyebrow">03 · Gestão</span>
            <h3>Você enxerga a operação inteira</h3>
            <p>
              Agenda do time, carga de atendimento e resultado por vendedor na mesma tela. Dá
              para saber onde o funil trava antes do fim do mês.
            </p>
            <ul className="ticks">
              <li>
                <Tick />
                Agenda compartilhada com confirmação automática
              </li>
              <li>
                <Tick />
                Tempo de primeira resposta por atendente
              </li>
              <li>
                <Tick />
                App para acompanhar do celular, em campo
              </li>
            </ul>
          </div>
          <CalendarPanel />
        </div>
      </div>
    </section>
  );
}
