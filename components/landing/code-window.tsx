import { installedFiles } from "@/lib/landing-content";
import { cn } from "@/lib/utils";

/** Literal classes per ownership mode so Tailwind's scanner can see them. */
const fileModeClass = {
  seeded: "text-terminal-green",
  managed: "text-[#79aef4]",
} as const satisfies Record<(typeof installedFiles)[number]["mode"], string>;

/** The planned-paths window for the "What gets installed" section. */
export function CodeWindow() {
  return (
    <div className="overflow-hidden rounded-window border border-grey-900 bg-[#0c0c0c] text-grey-100 shadow-[0_28px_80px_rgba(0,0,0,.12)] dark:border-[#2b2b2b] dark:bg-[#171717] dark:shadow-none">
      <div className="flex h-auto min-h-11 flex-wrap items-center justify-between gap-y-1 border-b border-grey-900 px-4.5 py-3 font-mono text-[10px] text-[#999] md:h-12 md:min-h-auto md:flex-nowrap md:gap-y-0 md:py-0">
        <span>npx wrkrs init · planned paths</span>
        <span className="text-[#5cbb79]">12 files created · 0 modified</span>
      </div>
      <ul className="grid gap-3 px-4.5 pt-4.5 pb-5 font-mono text-[12px] md:px-6 md:pt-5.5 md:pb-6.5">
        {installedFiles.map((file) => (
          <li
            className="grid grid-cols-[1fr] items-baseline gap-1 md:grid-cols-[minmax(0,1.1fr)_58px_minmax(0,1.1fr)] md:gap-3.5"
            key={file.path}
          >
            <code className="overflow-hidden wrap-anywhere text-ellipsis whitespace-normal text-grey-100 md:wrap-normal md:whitespace-nowrap">
              {file.path}
            </code>
            <span className={cn("text-[9px] tracking-[.05em] uppercase", fileModeClass[file.mode])}>
              {file.mode}
            </span>
            <span className="text-[11px] leading-normal text-grey-500">{file.note}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
