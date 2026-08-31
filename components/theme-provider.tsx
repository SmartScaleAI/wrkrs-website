"use client";

import { useEffect } from "react";
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";

/** Browser-chrome colour per theme, mirroring --color-paper. */
const themeColor = { light: "#ffffff", dark: "#0a0a0a" } as const;

/**
 * Keeps <meta name="theme-color"> in step with the active theme. The static viewport metadata
 * can only key off prefers-color-scheme, so on its own it desyncs the moment someone toggles.
 */
function ThemeColorSync() {
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    // Undefined until mounted; writing then would stamp light over a correct dark first paint.
    if (resolvedTheme !== "light" && resolvedTheme !== "dark") return;
    const color = themeColor[resolvedTheme];
    // Both entries, so whichever the OS media query selects carries the chosen theme.
    for (const meta of document.querySelectorAll('meta[name="theme-color"]')) {
      meta.setAttribute("content", color);
    }
  }, [resolvedTheme]);

  return null;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      /* globals.css sets a site-wide 160ms default transition, so without this every
         transitioned element would animate its colour on each toggle. */
      disableTransitionOnChange
    >
      <ThemeColorSync />
      {children}
    </NextThemesProvider>
  );
}
