/**
 * Conteúdo e links da landing comercial.
 * Texto e preços vivem aqui para que marketing altere sem tocar em JSX.
 */

export const LINKS = {
  signUp: "https://app.elisiacrm.com/sign-up",
  signIn: "https://app.elisiacrm.com/sign-in",
  email: "mailto:contato@elisiacrm.com",
  privacy: "/privacy-policy",
  terms: "/terms-of-use",
  legacy: "/experiencia",
  downloads: "/downloads",
  webApp: "https://app.elisiacrm.com",
  /** Releases públicas do app desktop (o repo do código é privado). */
  desktopReleasesApi: "https://api.github.com/repos/BRL4528/elisia-desktop-releases/releases/latest",
  desktopReleasesPage: "https://github.com/BRL4528/elisia-desktop-releases/releases/latest",
} as const;

/** Formulário de contato já existente no Elisia (entra direto no funil). */
export const CONTACT_FORM = {
  id: "71dcd255-31d6-40b2-b9f9-012ccd8d9ce3",
  token: "90ee6394-eff3-4106-b1de-10bf3407b469",
} as const;

export type CycleId = "mensal" | "semestral" | "anual";

export interface Cycle {
  id: CycleId;
  label: string;
  off?: string;
  /** Preço mensal equivalente do plano Profissional. */
  price: string;
  /** Valor total do ciclo — destacado em negrito, como no design. */
  billedAmount?: string;
  /** Restante da frase de cobrança. */
  billed: string;
  save?: string;
  tag: string;
  promo: boolean;
}

export const CYCLES: Cycle[] = [
  {
    id: "mensal",
    label: "Mensal",
    price: "159,90",
    billed: "Cobrado mensalmente, sem fidelidade",
    tag: "Mais escolhido",
    promo: false,
  },
  {
    id: "semestral",
    label: "Semestral",
    off: "−16%",
    price: "134,90",
    billedAmount: "R$ 809,40",
    billed: "a cada 6 meses",
    save: "economize R$ 150,00",
    tag: "Mais escolhido",
    promo: false,
  },
  {
    id: "anual",
    label: "Anual",
    off: "−31%",
    price: "109,90",
    billedAmount: "R$ 1.318,80",
    billed: "a cada 12 meses",
    save: "economize R$ 600,00 por ano",
    tag: "Super promoção",
    promo: true,
  },
];

export const DEFAULT_CYCLE: CycleId = "anual";

export interface Feature {
  icon: string;
  title: string;
  body: string;
  tag: string;
}

export const FEATURES: Feature[] = [
  {
    icon: "whatsapp",
    title: "Atendimento em todos os canais",
    body: "WhatsApp oficial, Instagram, chat do site e e-mail numa caixa só, com vários atendentes e histórico salvo no contato.",
    tag: "Multiatendimento",
  },
  {
    icon: "ai",
    title: "Agente de IA",
    body: "Responde dúvidas, qualifica o lead, agenda a visita e passa para o humano quando precisa.",
    tag: "ElisiaAgent",
  },
  {
    icon: "assistant",
    title: "Assistente da empresa",
    body: "Pergunte em português e a Elisia busca clientes, vendas e números do sistema, monta resumos e adianta tarefas.",
    tag: "IA no dia a dia",
  },
  {
    icon: "funnel",
    title: "Funil e carteira de clientes",
    body: "Arraste negócios entre etapas, organize a carteira por vendedor e veja valor em aberto e taxa de ganho em tempo real.",
    tag: "Kanban e lista",
  },
  {
    icon: "flow",
    title: "Automações",
    body: "Monte fluxos visuais: mensagem enviada, tarefa criada, etapa mudada, sem depender de TI.",
    tag: "Sem código",
  },
  {
    icon: "social",
    title: "Redes sociais",
    body: "Crie, agende e publique posts no Instagram, Facebook e outras redes, com calendário e legenda escrita pela IA.",
    tag: "ElisiaPost",
  },
  {
    icon: "orders",
    title: "Pedidos e estoque",
    body: "Orçamento, pedido de venda e saldo de produtos ligados ao cliente, do balcão ao vendedor externo.",
    tag: "Gestão",
  },
  {
    icon: "fiscal",
    title: "Notas fiscais",
    body: "Emita NF-e, NFC-e e NFS-e a partir do pedido, com as regras fiscais da sua empresa já configuradas.",
    tag: "NF-e, NFC-e e NFS-e",
  },
  {
    icon: "finance",
    title: "Financeiro",
    body: "Contas a pagar e a receber, extrato e conciliação na mesma base das vendas, sem planilha paralela.",
    tag: "Contas e extrato",
  },
  {
    icon: "pdv",
    title: "Frente de caixa",
    body: "PDV para o balcão com emissão de NFC-e, que segue vendendo no computador mesmo quando a internet cai.",
    tag: "PDV",
  },
  {
    icon: "sites",
    title: "Sites e formulários",
    body: "Publique páginas de captura que já entram no funil com origem, campanha e responsável.",
    tag: "Incluído",
  },
  {
    icon: "reports",
    title: "Relatórios e painéis",
    body: "Conversão, tempo de resposta, vendas e produtividade por pessoa, prontos de fábrica ou montados do seu jeito.",
    tag: "Tempo real",
  },
];

export const STATS = [
  { v: "1 lugar", l: "Atendimento, vendas, notas fiscais e financeiro sem trocar de sistema" },
  { v: "24h", l: "O agente de IA responde e qualifica fora do horário comercial" },
  { v: "14 dias", l: "Teste completo, sem cartão e sem contrato" },
  { v: "R$ 0", l: "Durante os 14 dias de teste, com 3 usuários incluídos" },
];

export const FAQ = [
  {
    q: "Como funciona o teste de 14 dias?",
    a: "Você cria a conta e usa o plano Profissional completo por 14 dias, sem cartão de crédito. No fim do período, escolhe o plano pago para continuar. Nada é cobrado automaticamente.",
  },
  {
    q: "Preciso usar todos os módulos?",
    a: "Não. Você começa pelo que a operação precisa hoje, como atendimento e funil, e liga pedidos, notas fiscais ou financeiro quando fizer sentido. Os dados já nascem conectados, então nada precisa ser migrado de novo.",
  },
  {
    q: "Preciso do WhatsApp oficial?",
    a: "Nos planos pagos a conexão é pela API oficial da Meta, o que permite vários atendentes no mesmo número sem risco de bloqueio. A ativação é feita junto com nosso time durante a implantação.",
  },
  {
    q: "Consigo migrar meus contatos de outro sistema?",
    a: "Sim. Importamos contatos, empresas e negócios por planilha, mantendo etapa do funil e responsável. Em bases grandes o time acompanha a migração.",
  },
  {
    q: "E se eu passar dos usuários incluídos?",
    a: "No Profissional cada usuário além dos 3 incluídos custa R$ 39,90 por mês, cobrado proporcionalmente. Você vê o consumo na tela de planos antes de qualquer cobrança.",
  },
  {
    q: "O agente de IA responde do jeito que eu quero?",
    a: "Você define tom de voz, o que ele pode oferecer, preços e quando deve transferir para uma pessoa. Todas as respostas ficam registradas para revisão.",
  },
  {
    q: "Existe contrato de fidelidade?",
    a: "No mensal não há fidelidade: cancele quando quiser. Semestral e anual têm preço menor por serem pagos por período, e a troca de plano é ajustada de forma proporcional. Os pagamentos são processados pela Stripe, no cartão ou por boleto.",
  },
  {
    q: "Tem aplicativo para computador?",
    a: "Sim. O app da Elisia roda no Windows, no macOS e no Linux, avisa de cada conversa nova e se atualiza sozinho. É só baixar na página de downloads e entrar com o mesmo login.",
  },
];

/** Linhas da tabela comparativa. `null` = recurso ausente no plano. */
export interface CmpRow {
  label: string;
  basico: string | null;
  pro: string | null;
  ent: string | null;
}

export const COMPARISON: { group: string; rows: CmpRow[] }[] = [
  {
    group: "Time",
    rows: [
      { label: "Usuários incluídos", basico: "3", pro: "3", ent: "Ilimitado" },
      { label: "Usuário extra", basico: null, pro: "R$ 39,90", ent: "Incluso" },
      { label: "Perfis de acesso e times", basico: null, pro: "✓", ent: "✓" },
    ],
  },
  {
    group: "Atendimento",
    rows: [
      { label: "Canais de atendimento", basico: "1", pro: "Ilimitados", ent: "Ilimitados" },
      { label: "WhatsApp oficial (API Meta)", basico: null, pro: "✓", ent: "✓" },
      { label: "Agente de IA", basico: null, pro: "✓", ent: "✓" },
    ],
  },
  {
    group: "Vendas e automação",
    rows: [
      { label: "Funil, contatos e agenda", basico: "✓", pro: "✓", ent: "✓" },
      { label: "Automações e fluxos", basico: null, pro: "✓", ent: "✓" },
      { label: "Sites e formulários", basico: null, pro: "✓", ent: "✓" },
      { label: "Relatórios e painéis", basico: "Básico", pro: "Completo", ent: "Completo + auditoria" },
    ],
  },
  {
    group: "Suporte",
    rows: [
      { label: "Canal de suporte", basico: "E-mail", pro: "WhatsApp e e-mail", ent: "Gerente dedicado" },
      { label: "Implantação assistida", basico: null, pro: "Onboarding guiado", ent: "Parceiro homologado" },
    ],
  },
];
