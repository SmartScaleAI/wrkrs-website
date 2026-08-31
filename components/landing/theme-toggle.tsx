"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

/**
 * Light/dark switch. Both icons are always rendered and chosen with the `dark` variant rather
 * than from React state, so the server and client markup are identical: no hydration mismatch,
 * and no `mounted` guard blanking the button on first paint.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { setTheme } = useTheme();

  return (
    <button
      className={className}
      onClick={() =>
        // Read the DOM, not `resolvedTheme`, which is undefined until after hydration.
        setTheme(document.documentElement.classList.contains("dark") ? "light" : "dark")
      }
      type="button"
    >
      <Sun aria-hidden="true" className="hidden size-3.5 dark:block" strokeWidth={1.75} />
      <Moon aria-hidden="true" className="size-3.5 dark:hidden" strokeWidth={1.75} />
      <span className="sr-only dark:hidden">Switch to dark mode</span>
      <span className="sr-only hidden dark:inline">Switch to light mode</span>
    </button>
  );
}
