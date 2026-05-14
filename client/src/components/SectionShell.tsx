import { ReactNode, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface Props {
  id: string;
  children: ReactNode;
  className?: string;
  fullHeight?: boolean;
}

/**
 * Standard section wrapper — full viewport tall (one chapter == one segment of
 * the global scroll), establishes the relative parent for absolute panels,
 * and exposes a data-section attribute consumed by ScrollTrigger if needed.
 */
export const SectionShell = forwardRef<HTMLElement, Props>(function SectionShell(
  { id, children, className, fullHeight = true },
  ref,
) {
  return (
    <section
      ref={ref}
      id={id}
      data-section={id}
      className={cn(
        "relative w-full",
        fullHeight && "min-h-screen flex items-center py-24 md:py-28",
        className,
      )}
    >
      {children}
    </section>
  );
});
