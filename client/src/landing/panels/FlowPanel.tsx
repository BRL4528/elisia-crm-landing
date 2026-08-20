import { Clock, MessageCircle, Zap } from "lucide-react";

/** Mock estático de um fluxo de automação — ilustração, não é dado real. */
export function FlowPanel() {
  return (
    <div className="panel">
      <div className="panel-h">
        <span className="dot" />
        Fluxo · Proposta sem resposta
        <span className="meta">142 execuções hoje</span>
      </div>
      <div className="panel-b">
        <div className="flow">
          <div className="node" data-k="in">
            <span className="ic">
              <Clock size={15} strokeWidth={2.2} aria-hidden />
            </span>
            <span>
              <span className="n">Quando ficar 3 dias sem resposta</span>
              <span className="d">Etapa: Proposta</span>
            </span>
          </div>
          <div className="link" />
          <div className="node" data-k="ai">
            <span className="ic">
              <Zap size={15} strokeWidth={2.2} aria-hidden />
            </span>
            <span>
              <span className="n">A IA escreve a retomada</span>
              <span className="d">Usa o histórico e o valor da proposta</span>
            </span>
          </div>
          <div className="link" />
          <div className="node" data-k="out">
            <span className="ic">
              <MessageCircle size={15} strokeWidth={2.2} aria-hidden />
            </span>
            <span>
              <span className="n">Envia no WhatsApp e cria tarefa</span>
              <span className="d">Responsável: dono do negócio</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
