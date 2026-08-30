"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { TerminalChrome } from "@/components/terminal/terminal-chrome";
import { cn } from "@/lib/utils";
import {
  FINAL_FRAME_INDEX,
  setupScript,
  setupTerminalDescription,
  setupTerminalFrames,
  type ScriptEntry,
} from "@/components/terminal/setup-terminal-script";

const PROMPT_USER = "colin@MacBook-Pro";
const PROMPT_PATH = "zerro";
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeToReducedMotion(onChange: () => void) {
  const media = window.matchMedia(REDUCED_MOTION_QUERY);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

const getReducedMotion = () => window.matchMedia(REDUCED_MOTION_QUERY).matches;
const getServerReducedMotion = () => false;

function subscribeToDocumentVisibility(onChange: () => void) {
  document.addEventListener("visibilitychange", onChange);
  return () => document.removeEventListener("visibilitychange", onChange);
}

const getDocumentVisible = () => document.visibilityState === "visible";
const getServerDocumentVisible = () => true;

interface Playback {
  /** Index into `setupTerminalFrames`. */
  frame: number;
  /** False while the server-rendered completed session is still waiting for its first fade. */
  started: boolean;
}

const initialPlayback: Playback = { frame: FINAL_FRAME_INDEX, started: false };

function advance({ frame }: Playback): Playback {
  return { frame: (frame + 1) % setupTerminalFrames.length, started: true };
}

/**
 * The hero terminal: a looping, data-driven replay of `npx wrkrs init` and
 * `npx wrkrs check`. The server renders the completed session as a preview; as
 * soon as playback is allowed, the loop fades it and replays from the first
 * keystroke. Later loops hold the completed session for `FINAL_HOLD_MS` before
 * fading. Playback pauses while the terminal is off screen or the tab is hidden,
 * and never starts when the visitor prefers reduced motion.
 */
export function SetupTerminalAnimation() {
  const visualRef = useRef<HTMLDivElement>(null);
  const screenRef = useRef<HTMLDivElement>(null);
  const [playback, setPlayback] = useState(initialPlayback);
  const [inView, setInView] = useState(false);
  const reducedMotion = useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotion,
    getServerReducedMotion,
  );
  const documentVisible = useSyncExternalStore(
    subscribeToDocumentVisibility,
    getDocumentVisible,
    getServerDocumentVisible,
  );
  const playing = inView && documentVisible && !reducedMotion;

  useEffect(() => {
    const element = visualRef.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      (entries) => setInView(entries[entries.length - 1].isIntersecting),
      { threshold: 0.2 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!playing) return;
    // The server-rendered session is a preview, not the end of a loop: fade it as
    // soon as playback is allowed instead of holding it for FINAL_HOLD_MS first.
    const duration = playback.started ? setupTerminalFrames[playback.frame].duration : 0;
    const timer = window.setTimeout(() => setPlayback(advance), duration);
    return () => window.clearTimeout(timer);
  }, [playing, playback.frame, playback.started]);

  const frame = setupTerminalFrames[reducedMotion ? FINAL_FRAME_INDEX : playback.frame];

  // Keep the newest line in view by scrolling the fixed-height screen. Scrolling is
  // not a layout shift, unlike moving the buffer. The server-rendered preview stays
  // at the top of the transcript until playback starts; reduced motion shows the end.
  useEffect(() => {
    const screen = screenRef.current;
    if (!screen || frame.clearing) return;
    if (!playback.started && !reducedMotion) return;
    screen.scrollTop = screen.scrollHeight;
  }, [frame, playback.started, reducedMotion]);
  const committed = setupScript.slice(0, frame.lines);
  const typing = frame.typed === undefined ? null : setupScript[frame.lines];

  return (
    <div
      ref={visualRef}
      className="w-full max-w-[640px] self-center overflow-hidden rounded-window border border-[#282828] bg-grey-950 text-[#f2f2f2] shadow-[0_32px_90px_rgba(0,0,0,.18),0_6px_18px_rgba(0,0,0,.1),inset_0_0_0_1px_rgba(255,255,255,.025)] lg:w-auto lg:max-w-none"
      role="img"
      aria-label={setupTerminalDescription}
    >
      <TerminalChrome title="zerro · zsh · 118×32" />
      <div
        ref={screenRef} // Fixed height (the completed transcript) so playback never shifts layout; rows that scroll past the top fade instead of clipping mid-glyph.
        className="relative h-[273px] overflow-hidden bg-grey-950 mask-[linear-gradient(to_bottom,transparent,#000_18px)] font-mono text-grey-150 [font-variant-ligatures:none] md:h-[315px] md:mask-[linear-gradient(to_bottom,transparent,#000_23px)]"
      >
        <div // The buffer fills from the top; the screen scrolls to keep the newest line in view (scrollTop is set above).
          className={cn(
            "grid min-h-full [align-content:start] gap-0.5 px-3.5 pt-4.5 pb-5 text-[9px] leading-[1.45] text-[#e3e3e3] md:px-6 md:pt-[23px] md:pb-[25px]",
            frame.clearing &&
              "opacity-0 transition-opacity duration-[420ms] motion-reduce:transition-none",
          )}
        >
          {committed.map((entry, index) => (
            <TerminalLine key={index} entry={entry} />
          ))}
          {typing ? <TerminalLine entry={typing} typed={frame.typed} /> : null}
        </div>
      </div>
    </div>
  );
}

function TerminalLine({ entry, typed }: { entry: ScriptEntry; typed?: number }) {
  switch (entry.kind) {
    case "command":
      return (
        <ShellPrompt>
          <strong className="font-medium text-white">
            {typed === undefined ? entry.command : entry.command.slice(0, typed)}
          </strong>
          {typed === undefined ? null : <Caret idle={typed === 0} />}
        </ShellPrompt>
      );
    case "prompt":
      return (
        <ShellPrompt>
          <Caret idle />
        </ShellPrompt>
      );
    case "blank":
      return <div className="h-3.5" />;
    case "banner":
      return (
        <Row>
          <span className="text-[#6c6c6c]">┌</span>
          <p className="min-w-0">
            <b className="font-semibold text-white">{entry.name}</b>{" "}
            <span className="text-[#858585]">{entry.version}</span>
          </p>
        </Row>
      );
    case "spacer":
      return (
        <Row className="h-1.5">
          <span className="text-[#6c6c6c]">│</span>
          <p className="min-w-0" />
        </Row>
      );
    case "step":
      return (
        <Row>
          <span className="text-terminal-green">◇</span>
          <p className="min-w-0">
            {entry.text}
            {entry.note ? (
              <>
                {" "}
                <span className="text-[#858585]">{entry.note}</span>
              </>
            ) : null}
          </p>
        </Row>
      );
    case "detail":
      return (
        <Row className="text-grey-450">
          <span className="text-[#6c6c6c]">│</span>
          <p className="min-w-0">{entry.text}</p>
        </Row>
      );
    case "plan":
      return (
        <div className="grid min-w-0 grid-cols-[16px_47px_minmax(0,1fr)] items-baseline text-grey-300">
          <span className="text-[#6c6c6c]">│</span>
          <b
            className={cn(
              "text-[.88em] font-semibold",
              entry.action === "ADD" ? "text-terminal-green" : "text-[#a1a1a1]",
            )}
          >
            {entry.action}
          </b>
          <code className="truncate text-grey-300">{entry.path}</code>
        </div>
      );
    case "confirm":
      return (
        <Row>
          <span className="text-terminal-amber">?</span>
          <p className="min-w-0">
            {entry.question} <span className="text-[#858585]">{entry.hint}</span>{" "}
            <strong>{typed === undefined ? entry.answer : entry.answer.slice(0, typed)}</strong>
            {typed === undefined ? null : <Caret idle={typed === 0} />}
          </p>
        </Row>
      );
    case "check":
      return (
        <Row>
          <span className="text-terminal-green">✓</span>
          <p className="min-w-0">{entry.text}</p>
        </Row>
      );
    case "end":
      return (
        <Row>
          <span className="text-terminal-green">└</span>
          <p className="min-w-0">{entry.text}</p>
        </Row>
      );
  }
}

/** A transcript line: a 16px gutter for the tree glyph or marker, then the text. */
function Row({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={cn("grid min-w-0 grid-cols-[16px_1fr] items-baseline", className)}>
      {children}
    </div>
  );
}

function ShellPrompt({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[10px] leading-normal whitespace-nowrap text-grey-150">
      <span className="text-[#72d78e]">{PROMPT_USER}</span>{" "}
      <span className="text-[#67aaf5]">{PROMPT_PATH}</span>{" "}
      <span className="text-[#a6a6a6]">%</span> {children}
    </div>
  );
}

function Caret({ idle }: { idle: boolean }) {
  return (
    <span
      className={cn(
        "ml-px inline-block h-[1.05em] w-[.55em] bg-[#d8d8d8] align-[-.15em]",
        idle && "animate-terminal-cursor motion-reduce:animate-none",
      )}
    />
  );
}
