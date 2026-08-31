import { CopyCommand } from "@/components/hero/copy-command";
import { Shell } from "@/components/landing/shell";
import { SetupTerminalAnimation } from "@/components/terminal/setup-terminal-animation";
import { command } from "@/lib/landing-content";

export function Hero() {
  return (
    <Shell as="section" id="top" className="pb-14 md:pb-[90px]">
      <div className="mx-auto flex max-w-[960px] flex-col items-center pt-13 pb-10 text-center md:pt-18 md:pb-14">
        <h1 className="text-[clamp(36px,12vw,44px)] leading-[0.98] font-[520] tracking-[-0.06em] text-balance sm:text-[clamp(40px,12vw,60px)] md:text-[clamp(58px,6.2vw,92px)] md:leading-[0.94] md:tracking-[-0.072em]">
          Install an AI team into any repository.
        </h1>
        <p className="mt-5.5 max-w-[590px] text-[16px] leading-[1.58] tracking-[-0.015em] text-grey-700 md:mt-8 md:text-[18px]">
          wrkrs is an open-source CLI that installs a small team of configured AI agents, called
          workers, into your repository. Your coding agent runs the team from configuration your
          repo owns.
        </p>
        <div className="mt-6.5 flex flex-col items-center gap-1.5 md:mt-9.5 md:flex-row md:gap-6">
          <CopyCommand command={command} />
          <a
            className="inline-flex min-h-11 items-center text-[14px] text-grey-700 underline decoration-grey-350 underline-offset-4 transition-[color] hover:text-black dark:hover:text-white"
            href="#installed"
          >
            See what the CLI installs
          </a>
        </div>
      </div>

      <div // The "desktop" behind the terminal: a navy-to-azure wallpaper gradient lit by two soft glows, picking up the prompt's blue. Deliberately bare — no dock or menu bar.
        className="flex justify-center overflow-hidden rounded-window bg-[radial-gradient(90%_70%_at_82%_0%,rgba(133,187,255,.5),transparent_62%),radial-gradient(80%_85%_at_6%_100%,rgba(47,111,228,.55),transparent_58%),linear-gradient(160deg,#0a1a38_0%,#123a7c_45%,#2160d4_78%,#5f97f2_100%)] px-4 py-12 shadow-[inset_0_1px_0_rgba(255,255,255,.16)] sm:px-8 md:rounded-[16px] md:px-14 md:py-20 lg:py-24"
      >
        <SetupTerminalAnimation />
      </div>
    </Shell>
  );
}
