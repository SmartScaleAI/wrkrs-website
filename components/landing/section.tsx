import type { ReactNode } from "react";
import { Shell } from "@/components/landing/shell";
import { cn } from "@/lib/utils";

const padding = "pt-11 pb-12 sm:pt-13 sm:pb-14 md:pt-16 md:pb-18";
const split = "grid grid-cols-1 items-start gap-9 md:gap-12 lg:grid-cols-[.9fr_1.1fr] lg:gap-18";

/**
 * A landing-page section. Light sections are a single shell element with a top rule; dark
 * sections are full-bleed Ink with the shell inside. `split` lays the heading and its
 * companion side by side on wide screens.
 */
export function Section({
  id,
  tone = "light",
  layout = "stack",
  children,
}: {
  id: string;
  tone?: "light" | "dark";
  layout?: "stack" | "split";
  children: ReactNode;
}) {
  if (tone === "dark") {
    return (
      <section id={id} className={cn(padding, "bg-ink text-white")}>
        <Shell className={layout === "split" ? split : undefined}>{children}</Shell>
      </section>
    );
  }
  return (
    <Shell
      as="section"
      id={id}
      className={cn(padding, "border-t border-line", layout === "split" && split)}
    >
      {children}
    </Shell>
  );
}
