import { ArrowRight } from "lucide-react";

/** Mock estático de conversa no WhatsApp — ilustração, não é dado real. */
export function ChatPanel() {
  return (
    <div className="panel">
      <div className="panel-h">
        <span className="dot" />
        WhatsApp · Clínica Vitalis
        <span className="meta">Agente ativo</span>
      </div>
      <div className="panel-b">
        <div className="msg in">
          Oi, vocês fazem exame de rotina? Qual valor?
          <div className="t">21:42</div>
        </div>
        <div className="msg out">
          <div className="who">Agente ElisiaCRM</div>
          Fazemos sim. O check-up básico sai R$ 320 e temos horário amanhã às 9h ou 14h. Quer que
          eu já reserve um?
          <div className="t">21:42</div>
        </div>
        <div className="msg in">
          Pode ser 9h
          <div className="t">21:43</div>
        </div>
        <div className="msg out">
          <div className="who">Agente ElisiaCRM</div>
          Reservado para amanhã, 9h. Vou passar seu contato para a Marina confirmar os detalhes.
          <div className="t">21:43</div>
        </div>
        <div className="hand">
          <ArrowRight size={15} strokeWidth={2.2} aria-hidden />
          <span>
            <b>Passado para Marina</b> · agenda criada · negócio movido para Proposta
          </span>
        </div>
      </div>
    </div>
  );
}
