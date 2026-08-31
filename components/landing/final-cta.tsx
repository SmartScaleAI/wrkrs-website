import { WrkrsMark } from "@/components/brand/wrkrs-mark";
import { CopyCommand } from "@/components/hero/copy-command";
import { ExternalLink } from "@/components/landing/external-link";
import { Kicker } from "@/components/landing/section-heading";
import { Shell } from "@/components/landing/shell";
import { command, docsUrl, repositoryUrl } from "@/lib/landing-content";

const link =
  "inline-flex min-h-11 items-center px-1 text-grey-300 underline decoration-grey-800 underline-offset-4 transition-[color] hover:text-white focus-visible:outline-white";

export function FinalCta() {
  return (
    <section id="install" className="surface-ink text-center text-white">
      <Shell className="pt-18 pb-20 md:pt-21 md:pb-23">
        <div className="mx-auto mb-7 grid size-12.5 place-items-center rounded-[50%] border border-[#343434]">
          <WrkrsMark className="size-6" />
        </div>
        <Kicker tone="dark">Try it</Kicker>
        <h2 className="mx-auto mt-4.5 max-w-[680px] text-[clamp(30px,8.5vw,38px)] leading-[1.02] font-medium tracking-[-0.055em] text-balance md:text-[clamp(38px,4.6vw,58px)]">
          Install the team in your repository.
        </h2>
        <p className="mx-auto mt-4.5 text-[15px] text-grey-450 md:mt-6.5">
          Review the plan, approve the install, and keep working in your coding agent.
        </p>
        <CopyCommand command={command} variant="cta" />
        <div className="mt-4.5 flex justify-center gap-1 text-[14px] md:mt-7 md:gap-7">
          <ExternalLink className={link} href={repositoryUrl}>
            View on GitHub
          </ExternalLink>
          <ExternalLink className={link} href={docsUrl}>
            Read the docs
          </ExternalLink>
        </div>
      </Shell>
    </section>
  );
}
