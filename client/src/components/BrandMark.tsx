interface Props {
  size?: number;
  className?: string;
}

/**
 * Elisia mark — concentric emerald/cyan rings around a luminous core.
 * Reads as "intelligence" without a generic letter mark.
 */
export function BrandMark({ size = 28, className }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <defs>
        <radialGradient id="brand-core" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#5eead4" />
          <stop offset="60%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#0f766e" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="brand-ring" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#34d399" />
          <stop offset="100%" stopColor="#22d3ee" />
        </linearGradient>
      </defs>
      <circle cx="16" cy="16" r="14" stroke="url(#brand-ring)" strokeWidth="1.2" opacity="0.85" />
      <circle cx="16" cy="16" r="9.5" stroke="url(#brand-ring)" strokeWidth="0.9" opacity="0.55" />
      <circle cx="16" cy="16" r="5.5" fill="url(#brand-core)" />
      <circle cx="16" cy="16" r="2" fill="#a5f3fc" />
    </svg>
  );
}
