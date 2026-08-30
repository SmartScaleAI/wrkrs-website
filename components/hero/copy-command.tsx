"use client";

import { Check, Copy } from "lucide-react";
import { useEffect, useState } from "react";

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

/**
 * The hero command card as a copy button. Click, Enter, or Space copies the
 * command; the card shows "Copied" or "Failed" briefly without changing size.
 */
export function CopyCommand({
  command,
  className = "hero-command",
}: {
  command: string;
  /** Style hook; the final CTA passes an additional variant class. */
  className?: string;
}) {
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
      className={className}
      data-state={feedback.status}
      aria-label={`Copy ${command}`}
      onClick={handleCopy}
    >
      <span aria-hidden="true">$</span>
      <code>{command}</code>
      <span className="copy-slot">
        {feedback.status === "idle" ? (
          <span className="copy-label" aria-hidden="true">
            <Copy className="copy-command-icon" aria-hidden="true" />
            Copy
          </span>
        ) : null}
        <span role="status" className="copy-label">
          {feedback.status === "copied" ? (
            <>
              <Check className="copy-command-icon" aria-hidden="true" />
              Copied
            </>
          ) : null}
          {feedback.status === "failed" ? "Failed" : null}
        </span>
      </span>
    </button>
  );
}
