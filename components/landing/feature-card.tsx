import type { ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export function FeatureGrid({ columns, children }: { columns: 3 | 4; children: ReactNode }) {
  return (
    <ul
      className={cn(
        "mt-8 grid grid-cols-1 gap-x-8 md:mt-9 md:grid-cols-2",
        columns === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3",
      )}
    >
      {children}
    </ul>
  );
}

const card = cva("min-w-0 border-t pt-4 pb-4.5 md:pt-4.5 md:pb-5", {
  variants: { tone: { light: "border-line", dark: "border-[#2b2b2b]" } },
  defaultVariants: { tone: "light" },
});

const body = cva("text-[13.5px] leading-[1.65]", {
  variants: { tone: { light: "text-grey-650", dark: "text-grey-400" } },
  defaultVariants: { tone: "light" },
});

export function FeatureCard({
  tone,
  eyebrow,
  title,
  body: bodyText,
}: VariantProps<typeof card> & { eyebrow?: ReactNode; title: string; body: string }) {
  return (
    <li className={card({ tone })}>
      {eyebrow}
      <h3 className="mb-2.5 text-[17px] font-[550] tracking-[-0.02em]">{title}</h3>
      <p className={body({ tone })}>{bodyText}</p>
    </li>
  );
}

/** The role identifier above a team card, with a "primary" badge for the coordinating role. */
export function RoleTag({ id, primary }: { id: string; primary: boolean }) {
  return (
    <span className="mb-3 flex items-center gap-2 font-mono text-[10px] text-grey-600 md:mb-4.5">
      {id}
      {primary ? (
        <em className="rounded-[999px] border border-line px-1.5 py-0.5 text-[9px] tracking-[.06em] text-check uppercase not-italic">
          primary
        </em>
      ) : null}
    </span>
  );
}
