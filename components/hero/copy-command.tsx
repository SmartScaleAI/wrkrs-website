"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { Check, Copy } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type CopyStatus = "idle" | "copied" | "failed";

interface Feedback {
  status: CopyStatus;
  /** Incremented per attempt so a repeat click restarts the reset timer. */
  attempt: number;
}

const RESET_DELAY_MS = 1800;
const idleFeedback: Feedback = { status: "idle", attempt: 0 };

/** Legacy fallback for browsers without the async Clipboard API or in insecure contexts. */
function copyWithExecCommand(text: string): boolean {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.append(textarea);
  textarea.select();
  let copied = false;
  try {
    copied = document.execCommand("copy");
  } catch {
    copied = false;
  }
  textarea.remove();
  return copied;
}

async function copyText(text: string): Promise<boolean> {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // Permission denied or unsupported here: try the legacy path below.
    }
  }
  return copyWithExecCommand(text);
}

const copyCommand = cva(
  "group inline-grid w-full max-w-[360px] min-w-[230px] cursor-pointer appearance-none grid-cols-[auto_1fr_auto] items-center gap-[11px] rounded-control border bg-[#0a0a0a] text-left font-mono text-white transition-[background] focus-visible:outline-white",
  {
    variants: {
      variant: {
        hero: "border-grey-900 px-3.5 py-3 text-[12px] hover:bg-[#272727] md:w-auto md:max-w-none dark:border-[#2f2f2f] dark:bg-[#171717]",
        cta: "mx-auto mt-6 grid border-[#333] bg-[#111] px-4.5 py-[15px] text-[13px] hover:bg-[#1c1c1c] md:mt-7.5 md:max-w-[440px] dark:bg-[#202020] dark:hover:bg-[#292929]",
      },
    },
    defaultVariants: { variant: "hero" },
  },
);

/**
 * The hero command card as a copy button. Click, Enter, or Space copies the
 * command; the card shows "Copied" or "Failed" briefly without changing size.
 * The final CTA renders the wider `cta` variant.
 */
export function CopyCommand({
  command,
  variant,
}: { command: string } & VariantProps<typeof copyCommand>) {
  const [feedback, setFeedback] = useState(idleFeedback);

  useEffect(() => {
    if (feedback.status === "idle") return;
    const timer = window.setTimeout(() => setFeedback(idleFeedback), RESET_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, [feedback]);

  async function handleCopy() {
    const copied = await copyText(command);
    setFeedback((current) => ({
      status: copied ? "copied" : "failed",
      attempt: current.attempt + 1,
    }));
  }

  return (
    <button
      type="button"
      className={cn(copyCommand({ variant }))}
      data-state={feedback.status}
      aria-label={`Copy ${command}`}
      onClick={handleCopy}
    >
      <span className="text-grey-500" aria-hidden="true">
        $
      </span>
      <code>{command}</code>
      <span className="inline-flex min-w-[62px] justify-end text-[#a3a3a3] group-hover:text-[#d4d4d4] group-data-[state=copied]:text-terminal-green group-data-[state=failed]:text-terminal-amber">
        {feedback.status === "idle" ? (
          <span className="inline-flex items-center gap-1.5 whitespace-nowrap" aria-hidden="true">
            <Copy className="size-3.5" strokeWidth={1.75} aria-hidden="true" />
            Copy
          </span>
        ) : null}
        <span role="status" className="inline-flex items-center gap-1.5 whitespace-nowrap">
          {feedback.status === "copied" ? (
            <>
              <Check className="size-3.5" strokeWidth={1.75} aria-hidden="true" />
              Copied
            </>
          ) : null}
          {feedback.status === "failed" ? "Failed" : null}
        </span>
      </span>
    </button>
  );
}
