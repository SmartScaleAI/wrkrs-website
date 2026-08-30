import { CopyCommand } from "@/components/hero/copy-command";
import { Shell } from "@/components/landing/shell";
import { SetupTerminalAnimation } from "@/components/terminal/setup-terminal-animation";
import { command } from "@/lib/landing-content";

export function Hero() {
  return (
    <Shell
      as="section"
      id="top"
      // The ::before paints twelve faint column guides, faded at the top and bottom edges.
      className="relative grid grid-cols-1 items-center gap-0 overflow-hidden pb-14 before:pointer-events-none before:absolute before:inset-x-5 before:inset-y-0 before:-z-1 before:bg-[linear-gradient(to_right,transparent_calc(100%-1px),#f1f1f1_1px)] before:mask-[linear-gradient(to_bottom,transparent,black_14%,black_86%,transparent)] before:bg-size-[calc(100%/12)_100%] before:content-[''] md:min-h-[680px] md:pb-[90px] md:before:inset-x-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(420px,0.95fr)] lg:gap-24 lg:pb-0"
    >
      <div className="max-w-[740px] pt-13 pb-10 md:pt-18 md:pb-16 lg:max-w-none lg:pb-20">
        <div className="mb-5.5 flex items-start gap-[9px] font-mono text-[11px] leading-normal tracking-[0.02em] text-grey-700 uppercase md:mb-7.5 md:items-center">
          <span className="mt-[5px] size-1.5 shrink-0 rounded-[50%] bg-live shadow-[0_0_0_3px_#e8f7ed] md:mt-0 md:shrink" />
          Open-source CLI
        </div>
        <h1 className="max-w-[680px] text-[clamp(36px,12vw,44px)] leading-[0.98] font-[520] tracking-[-0.06em] sm:text-[clamp(40px,12vw,60px)] md:text-[clamp(58px,6.2vw,92px)] md:leading-[0.94] md:tracking-[-0.072em]">
          Install an AI team into any repository.
        </h1>
        <p className="mt-5.5 max-w-[590px] text-[16px] leading-[1.58] tracking-[-0.015em] text-grey-700 md:mt-8 md:text-[18px]">
          wrkrs is an open-source CLI that installs a small team of configured AI agents, called
          workers, into your repository. Your coding agent runs the team from configuration your
          repo owns.
        </p>
        <div className="mt-6.5 flex flex-col items-start gap-1.5 md:mt-9.5 md:flex-row md:items-center md:gap-6">
          <CopyCommand command={command} />
          <a
            className="inline-flex min-h-11 items-center text-[14px] text-grey-700 underline decoration-grey-350 underline-offset-4 transition-[color] hover:text-black"
            href="#installed"
          >
            See what the CLI installs
          </a>
        </div>
      </div>

      <SetupTerminalAnimation />
    </Shell>
  );
}
