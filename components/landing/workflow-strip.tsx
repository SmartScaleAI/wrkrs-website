import { Shell } from "@/components/landing/shell";
import { workflow } from "@/lib/landing-content";

/**
 * The five-step delivery pipeline as a full-bleed Ink band: one tall cell per
 * step with the step number pinned to the top and the owning role, step name,
 * and description at the bottom. Cells sit in one row from 1001px and stack
 * into a single bordered column below.
 */
export function WorkflowStrip() {
  return (
    <section aria-label="How the team delivers" className="surface-ink text-white">
      <Shell className="py-16 md:py-24">
        <div className="grid grid-cols-1 border-b border-[#353535] lg:grid-cols-5 lg:border-b-0">
          {workflow.map((step) => (
            <article
              className="flex flex-col justify-between gap-9 border-t border-[#353535] pt-4.5 pb-6 lg:min-h-[330px] lg:border-b lg:border-l lg:px-5.5 lg:first:border-l-0 lg:first:pl-0"
              key={step.number}
            >
              <span className="font-mono text-[11px] text-[#686868]">{step.number}</span>
              <div>
                <span className="font-mono text-[9px] tracking-[0.04em] text-[#777] uppercase">
                  {step.owner}
                </span>
                <h3 className="mt-3 mb-3.5 text-[24px] font-medium tracking-[-0.035em]">
                  {step.title}
                </h3>
                <p className="max-w-[340px] text-[12px] leading-[1.62] text-[#8d8d8d]">
                  {step.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </Shell>
    </section>
  );
}
