import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

/** The 1280px content shell with the site's responsive gutters (20 / 28 / 48px). */
export function Shell({
  as: Component = "div",
  className,
  ...props
}: ComponentPropsWithoutRef<"div"> & { as?: "div" | "section" | "nav" | "footer" }) {
  return (
    <Component
      className={cn("mx-auto w-full max-w-shell px-5 md:px-7 lg:px-12", className)}
      {...props}
    />
  );
}
