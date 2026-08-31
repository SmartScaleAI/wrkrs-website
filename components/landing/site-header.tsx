import { GitHubIcon } from "@/components/icons/github-icon";
import { BrandLink } from "@/components/landing/brand-link";
import { ExternalLink } from "@/components/landing/external-link";
import { Shell } from "@/components/landing/shell";
import { docsUrl, repositoryUrl } from "@/lib/landing-content";
import { cn } from "@/lib/utils";

const action =
  "inline-flex min-h-10 items-center rounded-control border px-3 py-2 text-[13px] font-medium md:px-3.5 md:py-2.25";

export function SiteHeader() {
  return (
    <header>
      <Shell
        as="nav"
        aria-label="Primary"
        className="flex h-15 items-center justify-between md:h-18"
      >
        <BrandLink className="gap-2 text-[20px]" markClassName="size-8" />
        <div className="flex items-center gap-2">
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
