import { ExternalLink } from "@/components/landing/external-link";
import { projectFacts } from "@/lib/landing-content";

export function Facts() {
  return (
    <dl className="grid grid-cols-1 gap-x-5 border-t border-ink sm:grid-cols-2 md:gap-x-7 lg:grid-cols-3">
      {projectFacts.map((fact) => (
        <div className="min-w-0 border-b border-line py-3.5 md:py-4.5" key={fact.label}>
          <dt className="font-mono text-[9px] tracking-[.06em] text-grey-600 uppercase">
            {fact.label}
          </dt>
          <dd className="mt-2 text-[14px] leading-[1.55] wrap-anywhere">
            {"href" in fact ? (
              <ExternalLink
                className="underline decoration-grey-350 underline-offset-4 hover:decoration-ink"
                href={fact.href}
              >
                {fact.value}
              </ExternalLink>
            ) : "code" in fact ? (
              <code className="text-[.92em]">{fact.value}</code>
            ) : (
              fact.value
            )}
          </dd>
        </div>
      ))}
    </dl>
  );
}
