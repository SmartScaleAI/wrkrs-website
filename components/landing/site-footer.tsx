import { BrandLink } from "@/components/landing/brand-link";
import { ExternalLink } from "@/components/landing/external-link";
import { Shell } from "@/components/landing/shell";
import { docsUrl, issuesUrl, repositoryUrl } from "@/lib/landing-content";

const footerLinks = [
  { href: repositoryUrl, label: "GitHub" },
  { href: docsUrl, label: "Docs" },
  { href: issuesUrl, label: "Issues" },
] as const;

export function SiteFooter() {
  return (
    <footer className="border-t border-grey-900 surface-ink text-white">
      <Shell className="grid min-h-0 grid-cols-1 items-center gap-1 pt-5 pb-6 md:min-h-[100px] md:grid-cols-[1fr_auto_1fr] md:gap-0 md:py-0">
        <BrandLink />
        <p className="order-3 mt-1 text-[13px] text-grey-450 md:order-none md:mt-0">
          © 2026 SmartScale Solutions LLC. All rights reserved.
        </p>
        <div className="order-2 flex flex-wrap items-center gap-x-4 gap-y-1 justify-self-start text-[13px] text-grey-400 md:order-none md:flex-nowrap md:gap-3 md:justify-self-end">
          {footerLinks.map((link) => (
            <ExternalLink
              className="inline-flex min-h-11 items-center px-1.5 transition-[color] hover:text-white focus-visible:outline-white"
              href={link.href}
              key={link.label}
            >
              {link.label}
            </ExternalLink>
          ))}
          <span className="font-mono text-[10px] tracking-[0.06em] text-grey-500 uppercase">
            MIT
          </span>
        </div>
      </Shell>
    </footer>
  );
}
