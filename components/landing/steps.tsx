import { steps } from "@/lib/landing-content";

/**
 * The four steps as one row, two rows of two, then a single column. Dividers follow the
 * layout: left rules between columns, top rules between rows.
 */
export function Steps() {
  return (
    <ol className="mt-8 grid grid-cols-1 border-t border-ink md:mt-10 md:grid-cols-2 lg:grid-cols-4">
      {steps.map((step) => (
        <li
          className="min-w-0 border-t border-line pt-4.5 pb-5.5 first:border-t-0 first:pt-1 md:border-t-0 md:pt-5.5 md:pr-7 md:pb-2 md:not-first:border-l md:not-first:pl-7 md:first:pt-5.5 md:odd:border-l-0 md:odd:pl-0 md:nth-[n+3]:border-t lg:not-first:border-l lg:not-first:pl-7 lg:nth-[n+3]:border-t-0"
          key={step.number}
        >
          <span className="font-mono text-[9px] text-grey-600">{step.number}</span>
          <h3 className="mt-4.5 mb-2.5 text-[20px] font-[520] tracking-[-0.03em] md:mt-8 md:text-[22px]">
            {step.title}
          </h3>
          <p className="text-[13.5px] leading-[1.65] text-grey-650">{step.body}</p>
        </li>
      ))}
    </ol>
  );
}
