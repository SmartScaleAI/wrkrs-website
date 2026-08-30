import type { ComponentPropsWithoutRef } from "react";

/** A new-tab link that announces the new tab to screen readers. */
export function ExternalLink({
  hint = " (opens in a new tab)",
  children,
  ...props
}: ComponentPropsWithoutRef<"a"> & { hint?: string }) {
  return (
    <a target="_blank" rel="noreferrer" {...props}>
      {children}
      <span className="sr-only">{hint}</span>
    </a>
  );
}
