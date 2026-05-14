import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface Props {
  href: string;
  variant?: "primary" | "ghost";
  children: ReactNode;
  external?: boolean;
  className?: string;
  hint?: string;
}

export function CTAButton({ href, variant = "primary", children, external = true, className, hint }: Props) {
  const isPrimary = variant === "primary";
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      data-cursor={isPrimary ? "cta" : "link"}
      data-cursor-label={hint}
      className={cn(
        "group relative inline-flex items-center gap-2 rounded-full px-5 py-3 text-[13px] font-semibold tracking-tight transition-all duration-300",
        isPrimary
          ? "text-emerald-950 bg-gradient-to-r from-emerald-300 via-emerald-400 to-cyan-400 hover:shadow-[0_0_32px_-4px_rgba(94,234,212,0.7)]"
          : "text-foreground/90 border border-white/[0.1] bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/[0.18]",
        className,
      )}
    >
      <span>{children}</span>
      <svg width="12" height="12" viewBox="0 0 10 10" className="transition-transform duration-300 group-hover:translate-x-0.5">
        <path
          d="M1 5h7m0 0L5 2m3 3L5 8"
          stroke="currentColor"
          strokeWidth="1.4"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </a>
  );
}
