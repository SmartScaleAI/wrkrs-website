import type { ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const kicker = cva("font-mono text-[10px] tracking-[0.08em] uppercase", {
  variants: { tone: { light: "text-grey-600", dark: "text-grey-500" } },
  defaultVariants: { tone: "light" },
});

const title = cva("mt-4 leading-[1.04] font-medium tracking-tighter text-balance", {
  variants: {
    layout: {
      stack: "text-[clamp(28px,8vw,34px)] md:text-[clamp(34px,3.8vw,50px)]",
      split: "text-[clamp(26px,7.4vw,32px)] md:text-[clamp(30px,3.1vw,40px)]",
    },
  },
  defaultVariants: { layout: "stack" },
});

const lede = cva("mt-3.5 max-w-[540px] text-[15px] leading-[1.65] md:mt-4.5", {
  variants: { tone: { light: "text-grey-650", dark: "text-grey-400" } },
  defaultVariants: { tone: "light" },
});

/** The small mono label above a heading. */
export function Kicker({
  tone,
  className,
  children,
}: VariantProps<typeof kicker> & { className?: string; children: ReactNode }) {
  return <p className={cn(kicker({ tone }), className)}>{children}</p>;
}

/** Kicker, heading, and optional lede; `children` render after the lede (the canonical line). */
export function SectionHeading({
  kicker: kickerText,
  title: titleText,
  lede: ledeText,
  tone,
  layout,
  children,
}: VariantProps<typeof kicker> &
  VariantProps<typeof title> & {
    kicker: string;
    title: ReactNode;
    lede?: ReactNode;
    children?: ReactNode;
  }) {
  return (
    <div className={layout === "split" ? "max-w-none" : "max-w-[760px]"}>
      <Kicker tone={tone}>{kickerText}</Kicker>
      <h2 className={title({ layout })}>{titleText}</h2>
      {ledeText ? <p className={lede({ tone })}>{ledeText}</p> : null}
      {children}
    </div>
  );
}
