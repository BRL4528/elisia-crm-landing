import type { ReactNode } from "react";
import {
  BarChart3,
  BarChartBig,
  Calendar,
  Check,
  LayoutTemplate,
  Megaphone,
  MessageCircle,
  MessagesSquare,
  Package,
  Receipt,
  Store,
  Wallet,
  Workflow,
  Zap,
} from "lucide-react";

/** Marca "elísia" com o monograma de três barras do design. */
export function Logo({ href = "/#top" }: { href?: string }) {
  return (
    <a className="logo" href={href}>
      <span className="logo-m" aria-hidden>
        <i />
        <i />
        <i />
      </span>
      elísia
    </a>
  );
}

/** Check verde usado nas listas de benefícios. */
export function Tick({ size = 16 }: { size?: number }) {
  return <Check size={size} strokeWidth={2.6} aria-hidden />;
}

const FEATURE_ICONS: Record<string, ReactNode> = {
  funnel: <BarChart3 size={18} strokeWidth={2} />,
  whatsapp: <MessageCircle size={18} strokeWidth={2} />,
  ai: <Zap size={18} strokeWidth={2} />,
  flow: <Workflow size={18} strokeWidth={2} />,
  calendar: <Calendar size={18} strokeWidth={2} />,
  assistant: <MessagesSquare size={18} strokeWidth={2} />,
  social: <Megaphone size={18} strokeWidth={2} />,
  orders: <Package size={18} strokeWidth={2} />,
  fiscal: <Receipt size={18} strokeWidth={2} />,
  finance: <Wallet size={18} strokeWidth={2} />,
  pdv: <Store size={18} strokeWidth={2} />,
  sites: <LayoutTemplate size={18} strokeWidth={2} />,
  reports: <BarChartBig size={18} strokeWidth={2} />,
};

export function featureIcon(name: string): ReactNode {
  return FEATURE_ICONS[name] ?? <Zap size={18} strokeWidth={2} />;
}
