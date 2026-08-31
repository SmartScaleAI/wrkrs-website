import { Shell } from "@/components/landing/shell";
import { proofPoints } from "@/lib/landing-content";

/** Four proof points under the hero: one row on wide screens, two columns, then stacked. */
export function SignalStrip() {
  return (
    <Shell
      as="section"
      aria-label="How wrkrs treats your repository"
      className="grid min-h-16 grid-cols-1 items-center border-y border-line py-1.5 font-mono text-[10px] tracking-[0.03em] text-[#626262] uppercase sm:grid-cols-[1fr_1fr] md:py-2 lg:grid-cols-[repeat(4,1fr)] lg:py-0 dark:text-grey-650"
    >
      {proofPoints.map((point) => (
        <span
          className="flex min-h-10 items-center border-line not-first:border-t sm:not-first:border-t-0 sm:even:border-l sm:even:pl-3.5 md:min-h-[42px] lg:block lg:min-h-auto lg:not-first:border-l lg:not-first:pl-6"
          key={point}
        >
          {point}
        </span>
      ))}
    </Shell>
  );
}
