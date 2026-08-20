import type { ReactNode } from "react";
import {
  BarChart3,
  BarChartBig,
  Calendar,
  MessageCircle,
  Users,
  Workflow,
  Zap,
} from "lucide-react";

type SideItem =
  | { group: string }
  | { icon: ReactNode; label: string; on?: boolean; badge?: string };

const SIDE: SideItem[] = [
  { group: "Operação" },
  { icon: <BarChart3 size={15} strokeWidth={2} />, label: "Funil", on: true },
  { icon: <MessageCircle size={15} strokeWidth={2} />, label: "Conversas", badge: "12" },
  { icon: <Calendar size={15} strokeWidth={2} />, label: "Agenda" },
  { icon: <Users size={15} strokeWidth={2} />, label: "Contatos" },
  { group: "Automação" },
  { icon: <Zap size={15} strokeWidth={2} />, label: "Agente de IA" },
  { icon: <Workflow size={15} strokeWidth={2} />, label: "Fluxos" },
  { icon: <BarChartBig size={15} strokeWidth={2} />, label: "Relatórios" },
];

const COLUMNS = [
  {
    name: "Novo",
    color: "#3b82f6",
    count: 6,
    deals: [
      { n: "Padaria Bom Trigo", v: "R$ 4.200", who: "JS", tag: "IA qualificou", ia: true },
      { n: "Clínica Vitalis", v: "R$ 12.800", who: "MR", tag: "WhatsApp" },
    ],
  },
  {
    name: "Proposta",
    color: "#f59e0b",
    count: 4,
    deals: [
      { n: "Auto Center Silva", v: "R$ 26.400", who: "AL", tag: "Reunião hoje" },
      { n: "Cooasgo Agro", v: "R$ 61.900", who: "JS", tag: "Follow-up IA", ia: true },
    ],
  },
  {
    name: "Negociação",
    color: "#a855f7",
    count: 3,
    deals: [{ n: "Transportes Vale", v: "R$ 38.500", who: "MR", tag: "Aguarda contrato" }],
  },
  {
    name: "Ganho",
    color: "#22c55e",
    count: 9,
    deals: [
      { n: "Ótica Central", v: "R$ 9.700", who: "AL", tag: "Assinado" },
      { n: "Studio Nove", v: "R$ 15.300", who: "JS", tag: "Assinado" },
    ],
  },
];

/** Mock estático da tela de funil — ilustração, não é dado real. */
export function AppShot() {
  return (
    <div className="shot" aria-hidden>
      <div className="app">
        <div className="app-bar">
          <span className="dots">
            <i />
            <i />
            <i />
          </span>
          <span className="app-url">app.elisiacrm.com/funil</span>
        </div>
        <div className="app-b">
          <div className="side">
            {SIDE.map((item, i) =>
              "group" in item ? (
                <div className="side-h" key={`g-${i}`}>
                  {item.group}
                </div>
              ) : (
                <div className="side-i" key={item.label} data-on={item.on ? "true" : undefined}>
                  {item.icon}
                  {item.label}
                  {item.badge && <span className="badge">{item.badge}</span>}
                </div>
              ),
            )}
          </div>
          <div>
            <div className="board-h">
              <span className="t">Funil comercial</span>
              <span className="chip" data-on="true">
                Este mês
              </span>
              <span className="chip">R$ 284.900 em aberto</span>
              <span className="chip">Taxa de ganho 31%</span>
            </div>
            <div className="board">
              {COLUMNS.map((col) => (
                <div key={col.name}>
                  <div className="col-h">
                    <i style={{ background: col.color }} />
                    {col.name}
                    <span>{col.count}</span>
                  </div>
                  {col.deals.map((d) => (
                    <div className="dcard" key={d.n}>
                      <div className="n">{d.n}</div>
                      <div className="v">{d.v}</div>
                      <div className="m">
                        <span className="av">{d.who}</span>
                        <span className="tg" data-ia={d.ia ? "true" : undefined}>
                          {d.tag}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
