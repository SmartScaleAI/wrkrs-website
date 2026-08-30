import { GitHubIcon } from "@/components/icons/github-icon";
import { BrandLink } from "@/components/landing/brand-link";
import { ExternalLink } from "@/components/landing/external-link";
import { Shell } from "@/components/landing/shell";
import { docsUrl, navLinks, repositoryUrl } from "@/lib/landing-content";
import { cn } from "@/lib/utils";

const action =
  "inline-flex min-h-10 items-center rounded-control border px-3 py-2 text-[13px] font-medium md:px-3.5 md:py-2.25";

export function SiteHeader() {
  return (
    <header>
      <Shell
        as="nav"
        aria-label="Primary"
        className="grid h-auto grid-cols-[1fr_auto] grid-rows-[60px_auto] items-center border-b border-line md:h-18 md:grid-cols-[1fr_auto_1fr] md:grid-rows-none"
      >
        <BrandLink className="gap-[7px]" markClassName="size-5.5" />
        {/* Below 761px the section links move to a second, horizontally scrolling row. */}
        <div className="col-span-full row-start-2 -mx-5 flex [scrollbar-width:none] items-center gap-1 overflow-x-auto border-t border-line px-3 text-[13px] text-[#4d4d4d] md:col-auto md:row-auto md:mx-0 md:gap-5 md:overflow-x-visible md:border-t-0 md:px-0 lg:gap-4.5 [&::-webkit-scrollbar]:hidden">
          {navLinks.map((link) => (
            <a
              className="inline-flex min-h-11 items-center px-2 whitespace-nowrap transition-[color] hover:text-black md:px-1.5 md:whitespace-normal"
              href={link.href}
              key={link.href}
            >
              {link.label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-2 justify-self-end">
          <ExternalLink
            className={cn(
              action,
              "border-grey-200 bg-paper transition-[background,border-color] hover:border-[#d2d2d2] hover:bg-soft",
            )}
            href={docsUrl}
          >
            Docs
          </ExternalLink>
          <ExternalLink
            className={cn(
              action,
              "gap-2 border-ink bg-ink text-white transition-[background] hover:bg-[#2a2a2a]",
            )}
            href={repositoryUrl}
            hint=" repository (opens in a new tab)"
          >
            <GitHubIcon />
            GitHub
          </ExternalLink>
        </div>
      </Shell>
    </header>
  );
}
