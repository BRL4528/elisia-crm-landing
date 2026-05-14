/**
 * Mock data shaped to mirror the real CRM at /samasc_indicators_web.
 * Reconstructed-not-screenshotted panels feed off this. All values are
 * realistic for an Elisia operation snapshot.
 */

export interface FunnelStage {
  id: string;
  name: string;
  color: string;
  count: number;
  amount: string;
}

export interface FunnelLead {
  id: string;
  name: string;
  source: "whatsapp" | "instagram" | "meta" | "site" | "indicacao";
  amount: string;
  stage: string;
  initials: string;
  hot?: boolean;
  tag?: string;
}

export const funnelStages: FunnelStage[] = [
  { id: "novo", name: "Novo Lead", color: "#22d3ee", count: 28, amount: "R$ 184k" },
  { id: "contato", name: "Contato", color: "#34d399", count: 41, amount: "R$ 312k" },
  { id: "proposta", name: "Proposta", color: "#10b981", count: 17, amount: "R$ 268k" },
  { id: "fechado", name: "Fechado", color: "#5eead4", count: 9, amount: "R$ 142k" },
];

export const funnelLeads: FunnelLead[] = [
  { id: "1", name: "Camila Rocha", source: "whatsapp", amount: "R$ 12.400", stage: "novo", initials: "CR", hot: true, tag: "Quente" },
  { id: "2", name: "Eduardo Lima", source: "instagram", amount: "R$ 8.900", stage: "novo", initials: "EL" },
  { id: "3", name: "InovaTech Ltda", source: "site", amount: "R$ 38.200", stage: "contato", initials: "IT", hot: true },
  { id: "4", name: "Marina Pires", source: "meta", amount: "R$ 6.150", stage: "contato", initials: "MP", tag: "Negociação" },
  { id: "5", name: "Grupo Verde", source: "indicacao", amount: "R$ 92.000", stage: "proposta", initials: "GV", hot: true },
  { id: "6", name: "Patrícia Sá", source: "whatsapp", amount: "R$ 14.800", stage: "proposta", initials: "PS" },
  { id: "7", name: "Logística HVL", source: "site", amount: "R$ 41.300", stage: "fechado", initials: "LH", tag: "Ganho" },
];

// ─── Automations ─────────────────────────────────────────────────────────────
export type AutoNodeKind = "trigger" | "action" | "condition" | "delay" | "end";
export interface AutoNode {
  id: string;
  kind: AutoNodeKind;
  label: string;
  sublabel?: string;
  x: number;
  y: number;
}

export const automationNodes: AutoNode[] = [
  { id: "n1", kind: "trigger", label: "Lead entra", sublabel: "WhatsApp Business", x: 12, y: 110 },
  { id: "n2", kind: "condition", label: "Origem?", sublabel: "rota inteligente", x: 175, y: 110 },
  { id: "n3", kind: "action", label: "Enviar mensagem", sublabel: "Template oficial", x: 320, y: 32 },
  { id: "n4", kind: "delay", label: "Aguardar 2h", sublabel: "follow-up", x: 320, y: 188 },
  { id: "n5", kind: "action", label: "Agendar SDR", sublabel: "Calendar API", x: 470, y: 110 },
  { id: "n6", kind: "end", label: "Atribuir vendedor", x: 605, y: 110 },
];

export const automationEdges: { from: string; to: string }[] = [
  { from: "n1", to: "n2" },
  { from: "n2", to: "n3" },
  { from: "n2", to: "n4" },
  { from: "n3", to: "n5" },
  { from: "n4", to: "n5" },
  { from: "n5", to: "n6" },
];

// ─── WhatsApp ────────────────────────────────────────────────────────────────
export interface WaMessage {
  id: string;
  side: "in" | "out";
  text: string;
  time: string;
  status?: "sent" | "delivered" | "read";
}

export const waMessages: WaMessage[] = [
  { id: "1", side: "in", text: "Olá! Vi a campanha de vocês no Instagram. Como funciona o plano enterprise?", time: "09:42" },
  { id: "2", side: "out", text: "Oi Camila! Que bom te receber 🙌 Você atua em qual segmento?", time: "09:43", status: "read" },
  { id: "3", side: "in", text: "Logística, 38 colaboradores. Hoje usamos planilhas.", time: "09:44" },
  { id: "4", side: "out", text: "Perfeito. A Agent Elisia já preparou um diagnóstico inicial pra vocês. Posso te enviar uma proposta personalizada?", time: "09:45", status: "delivered" },
];

// ─── Analytics ───────────────────────────────────────────────────────────────
export const analyticsSeries = [
  { d: "Seg", leads: 124, fechados: 18 },
  { d: "Ter", leads: 168, fechados: 24 },
  { d: "Qua", leads: 142, fechados: 31 },
  { d: "Qui", leads: 198, fechados: 28 },
  { d: "Sex", leads: 232, fechados: 42 },
  { d: "Sáb", leads: 156, fechados: 21 },
  { d: "Dom", leads: 88, fechados: 9 },
];

export const kpiCards = [
  { label: "Leads ativos", value: "1.428", delta: "+12,4%", up: true },
  { label: "Taxa conversão", value: "18,2%", delta: "+2,1pp", up: true },
  { label: "Ticket médio", value: "R$ 14.8k", delta: "+R$ 1.2k", up: true },
  { label: "SLA primeiro contato", value: "2m 18s", delta: "-42s", up: true },
];

// ─── Goals ───────────────────────────────────────────────────────────────────
export interface GoalRow {
  id: string;
  name: string;
  value: number;
  target: number;
  status: "ok" | "warn" | "danger";
  unit?: string;
}

export const goals: GoalRow[] = [
  { id: "g1", name: "Receita Maio", value: 842, target: 1000, status: "warn", unit: "k" },
  { id: "g2", name: "Novos clientes", value: 38, target: 40, status: "ok" },
  { id: "g3", name: "Reativações", value: 11, target: 25, status: "danger" },
  { id: "g4", name: "NPS médio", value: 71, target: 70, status: "ok" },
];

// ─── Sellers ─────────────────────────────────────────────────────────────────
export const sellers = [
  { id: "s1", name: "João Henrique", initials: "JH", deals: 23, revenue: "R$ 318k", pct: 96, badge: "Topo" },
  { id: "s2", name: "Marina Costa", initials: "MC", deals: 19, revenue: "R$ 286k", pct: 88 },
  { id: "s3", name: "Rafael Yuri", initials: "RY", deals: 17, revenue: "R$ 241k", pct: 81 },
  { id: "s4", name: "Bruna Sé", initials: "BS", deals: 14, revenue: "R$ 198k", pct: 72 },
  { id: "s5", name: "Lucas D'Ávila", initials: "LD", deals: 12, revenue: "R$ 172k", pct: 64 },
];

// ─── Indicators ──────────────────────────────────────────────────────────────
export const indicators = [
  { label: "Pipeline total", value: "R$ 4.82M", chip: "ATIVO" },
  { label: "Reuniões agendadas", value: "342", chip: "+18%" },
  { label: "Resposta média", value: "2m 18s", chip: "SLA" },
  { label: "Win-rate trimestre", value: "27,4%", chip: "+3.1pp" },
];

// ─── Elisia Flow / AI Agent ──────────────────────────────────────────────────
export const elisiaInsights = [
  { kind: "alert", text: "3 leads quentes sem retorno há mais de 4h. Acionei follow-up automatizado." },
  { kind: "summary", text: "Performance do dia: 28% acima da média. João Henrique liderou." },
  { kind: "suggest", text: "Marina, sugiro priorizar Grupo Verde — proposta R$ 92k aguardando." },
];
